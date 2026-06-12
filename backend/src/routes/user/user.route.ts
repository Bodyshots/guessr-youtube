import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

import config from '../../config/config';
import User from '../../models/User';
import authSchema from '../../validations/user.schema';
import AuthMiddleware from '../../middleware/auth.middleware';
import ValidationMiddleware from '../../middleware/validation.middleware';

const router = express.Router();

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

interface generateTokenProps {
  userId: string;
  refresh: boolean;
}

// Helpers
const getBasicUserInfo = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  }
}

const generateToken = ({ userId, refresh }: generateTokenProps) => {
  return jwt.sign({ userId: userId },
    (refresh ? config.REFRESH_TOKEN_SECRET : config.ACCESS_TOKEN_SECRET) as string,
    { expiresIn: (refresh ? config.REFRESH_EXPIRY_TIME : config.ACCESS_EXPIRY_TIME) as any });
}

const getUserByIdHelper = async (id: string) => {
  const user = await User.findOne({ where: { id: id } })
  return user || null;
}

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email: email } })
  return user || null;
}

const getCookieOptions = (refresh: boolean) => {
  const baseOptions = {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    secure: process.env.ENVIRONMENT === "production",
    sameSite: "strict" as const,
  };

  if (refresh) return baseOptions;
  return {
    ...baseOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
};

// Endpoints
const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({ message: 'Success', users });
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await getUserByIdHelper(Array.isArray(userId) ? userId[0] : userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'Success', user });
});

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, password_confirmation } = req.body as z.infer<typeof authSchema.register>;

  try {
    // Check if user already exists
    if (await getUserByEmail(email)) {
      res.status(409).json({ message: "User already exists" })
    }

    // Valid user, given parsed zod. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword
    });

    res.json({
      message: 'Success',
      user: getBasicUserInfo(newUser)
    });

  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ message: 'Error registering user' });
    return;
  }
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // Valid user, give access + refresh tokens
    const accessToken = generateToken({ refresh: false, userId: user.id })
    const refreshToken = generateToken({ refresh: true, userId: user.id })

    user.refreshToken = refreshToken; // Store refresh in DB
    user.save();

    res.cookie("accessToken", accessToken, getCookieOptions(false))
    res.cookie("refreshToken", refreshToken, getCookieOptions(true))

    res.json({
      message: 'Login successful',
      user: getBasicUserInfo(user)
    });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

const logOut = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    if (userId) {
      const user = await getUserByIdHelper(userId);
      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }

    // Remove "cookie tokens"
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });
  }
  catch (error) {
    console.error("Error logging out", error);
    res.status(500).json({ message: "Error logging out" })
  }
});

const refreshToken = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    console.log("refreshhing")
    const { userId } = req.body;
    const refreshToken = req.cookies.refreshToken;

    const user = await getUserByIdHelper(userId);

    if (!user || !user.refreshToken) {
      res.status(401).json({ message: "Refresh token not found" })
    }

    if (user?.refreshToken !== refreshToken) {
      res.status(401).json({ message: "Invalid refresh token" })
    }

    const newAccessToken = generateToken({ userId: userId, refresh: false })

    res.cookie("accessToken", newAccessToken, getCookieOptions(false));
    res.json({ message: "Access token refreshed successfully" })
  }
  catch (error) {
    console.error("Failed to refresh token", error);
    res.status(500).json({ message: "Failed to refresh token" })
  }
});

// GET
router.get(
  '/',
  getUsers
);
router.get(
  '/:userId',
  getUserById,
  AuthMiddleware.authenticateUser
);

// POST
router.post(
  '/',
  createUser,
  ValidationMiddleware.validateBody(authSchema.register)
);
router.post(
  '/login',
  login,
  ValidationMiddleware.validateBody(authSchema.login)
);
router.post(
  '/logout',
  logOut,
  AuthMiddleware.authenticateUser // Check if logged in
)
router.post(
  "/token",
  refreshToken,
  AuthMiddleware.refreshTokenValidation // Check if valid refreshToken
);

export default router;