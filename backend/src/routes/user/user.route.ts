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
import { Token } from '../../types';

const router = express.Router();

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

interface generateTokenProps {
  userId: string;
  token: Token;
}

// Helpers
const getBasicUserInfo = (user: User) => {
  return {
    id: user.id,
    email: user.email,
    username: user.username,
  }
}

const generateToken = ({ userId, token }: generateTokenProps) => {
  switch (token) {
    case 'access':
      return jwt.sign({ userId: userId },
        config.ACCESS_TOKEN_SECRET as string,
        { expiresIn: config.ACCESS_EXPIRY_TIME as any }
      );
    case 'refresh':
      return jwt.sign({ userId: userId },
        config.REFRESH_TOKEN_SECRET as string,
        { expiresIn: config.REFRESH_EXPIRY_TIME as any }
      );
    default:
      return null;
  }
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

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  // TODO - create deleteSchema
  const { email, password } = req.body;
  const userId = (req as any).userId;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (user.id !== userId) {
      res.status(404).json({ message: 'Users can only delete their own account' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(404).json({ message: "Invalid password" });
      return;
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    await User.destroy({ where: { email: email } });

    res.json({
      message: 'User successfully deleted',
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
    const accessToken = generateToken({ userId: user.id, token: 'access' })
    const refreshToken = generateToken({ userId: user.id, token: 'refresh' })

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
    const userId = (req as any).userId;
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
    const userId = (req as any).userId;
    const refreshToken = req.cookies.refreshToken;

    const user = await getUserByIdHelper(userId);

    if (!user || !user.refreshToken) {
      res.status(401).json({ message: "Refresh token not found" })
    }

    if (user?.refreshToken !== refreshToken) {
      res.status(401).json({ message: "Invalid refresh token" })
    }

    const newAccessToken = generateToken({ userId: userId, token: 'access' })

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
);

// POST
router.post(
  '/',
  ValidationMiddleware.validateBody(authSchema.register),
  createUser,
);
router.post(
  '/login',
  ValidationMiddleware.validateBody(authSchema.login),
  login,
);
router.post(
  '/logout',
  AuthMiddleware.authenticateUser, // Check if logged in
  logOut,
)
router.post(
  "/token",
  AuthMiddleware.refreshTokenValidation, // Check if valid refreshToken
  refreshToken,
);
router.delete(
  "/delete",
  AuthMiddleware.refreshTokenValidation,
  AuthMiddleware.authenticateUser,
  deleteUser,
)

export default router;