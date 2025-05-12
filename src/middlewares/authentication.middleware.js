import AppError from "../utils/AppError.util.js";
import jwt from "jsonwebtoken";
import UserModel from "../db/models/user.model.js";

const authToken = async (req, res, next) => {
    try {
        const { token } = req.headers;

        // Check the token exists
        if (!token) {
            next(
                new AppError("Please provide a token in the headers", 401, {
                    error: "Authentication Error",
                    issue: "No token provided",
                })
            );
        }

        // Check the prefix token
        const isValidPrefix = token?.startsWith("Areeb ");
        if (!isValidPrefix) {
            next(
                new AppError("Please provide a valid token prefix", 401, {
                    error: "Authentication Error",
                    issue: "Invalid token prefix",
                })
            );
        }

        // Check the token is valid
        const originalToken = token.split(" ")[1];
        const decoded = jwt.verify(originalToken, process.env.AUTH_SECRET);
        if (!decoded) {
            next(
                new AppError("Please provide a valid token", 401, {
                    error: "Authentication Error",
                    issue: "Invalid token",
                })
            );
        }

        // Check the user exists
        const user = await UserModel.findById(decoded.id);
        if (!user) {
            next(
                new AppError("No user with this email", 401, {
                    error: "Authentication Error",
                    issue: "Check your account",
                })
            );
        }
        
        // Add the user to the request
        req.user = user;

        next();
    } catch (err) {
        next(new AppError(err.message, 401));
    }
};

export default authToken;
