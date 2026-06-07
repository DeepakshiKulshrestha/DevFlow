import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { verifyToken } from "../utils/jwt";

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

interface AuthTokenPayload extends JwtPayload {
    id: string;
}

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Authentication token missing"
            });
            return;
        }

        const decoded = verifyToken(token) as AuthTokenPayload;

        if (!decoded.id) {
            res.status(401).json({
                success: false,
                message: "Invalid authentication token"
            });
            return;
        }

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid authentication token"
            });
            return;
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({
            success: false,
            message: "Invalid authentication token"
        });
    }
};
