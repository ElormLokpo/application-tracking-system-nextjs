import { NextFunction, Response, Request } from "express";
import { CustomError } from "../utils";
import { verifyToken } from "../utils";
import { Role, StatusCodes } from "../../../../packages/types";
import { UserResponse } from "../dtos/auth.dto";

export interface AuthRequest extends Request {
  role?: Role;
}

interface DecodedToken {
  user: UserResponse;
}

export const AuthTokenMiddleware = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new CustomError(StatusCodes.UNAUTHORIZED, "Token is required"));
  }
  const decodedToken = (await verifyToken(token)) as DecodedToken;
  if (!decodedToken) {
    return next(new CustomError(StatusCodes.UNAUTHORIZED, "Invalid token"));
  }
  req.role = decodedToken.user?.role;
  next();
};

export const AuthRoleMiddleware = (allowedRoles: Role[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.role || !allowedRoles.includes(req.role)) {
      return next(
        new CustomError(
          StatusCodes.UNAUTHORIZED,
          "You are not authorized to access this resource",
        ),
      );
    }
    next();
  };
};
