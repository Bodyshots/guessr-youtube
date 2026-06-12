import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

class ValidationMiddleware {
  static validateBody(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error) {
        if (error instanceof ZodError) {
          const formattedErrors: Record<string, string[]> = {};

          error.issues.forEach((err) => {
            const field = err.path.join(".");

            if (!formattedErrors[field]) {
              formattedErrors[field] = [];
            }

            formattedErrors[field].push(err.message);
          });

          return res.status(400).json({
            errors: formattedErrors,
          });
        }

        return res.status(500).json({
          message: "Invalid request data",
        });
      }
    };
  }
}

export default ValidationMiddleware;