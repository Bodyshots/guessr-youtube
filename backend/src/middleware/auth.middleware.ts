import config from "../config/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface DecodedToken {
  userId: number;
}

class AuthMiddleware {
  /**
   * Middleware to authenticate the user based on the access token stored in the HttpOnly cookie.
   * This middleware will verify the access token and attach the user information to the request object.
   */
  static authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    // 1. Extract the access token from the HttpOnly cookie
    const token = req.cookies.accessToken;

    // If there's no access token, return an error
    if (!token) {
      res.status(401).json({ message: "Missing access token" })
    }

    try {
      // 2. Verify the token using the secret from the auth config
      const decodedToken = jwt.verify(token, config.ACCESS_TOKEN_SECRET as string) as DecodedToken;

      // If the token is valid, attach user information to the request object
      (req as any).userId = decodedToken.userId; // Attach userId to the request object

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // If the token verification fails (invalid or expired token), return an error
      console.error("Authentication failed: ", error);  // Log error for debugging
      res.status(401).json({ message: "Invalid/Expired access token" });
    }
  };

  static refreshTokenValidation = (req: Request, res: Response, next: NextFunction) => {
    // 1. Extract the refresh token from the HttpOnly cookie
    const refreshToken = req.cookies.refreshToken;

    // If there's no refresh token, return an error
    if (!refreshToken) res.status(401).json({ message: "No refresh token provided" });

    try {
      // 2. Verify the refresh token using the secret from the auth config
      const decodedToken = jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET as string) as DecodedToken;

      // If the token is valid, attach user information to the request object
      (req as any).userId = decodedToken.userId;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle token verification errors (invalid or expired token)
      console.error("Refresh Token authentication failed:", error);

      // Return a 401 Unauthorized with a more specific message
      res.status(401).json({ message: "Invalid/Expired refresh token" });
    }
  };
}

export default AuthMiddleware;