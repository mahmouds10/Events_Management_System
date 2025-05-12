import UserModel from "../../../db/models/user.model.js";
import AppError from "../../../utils/AppError.util.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await UserModel.findOne({
        email
    }).select("+password");
    if (!user) {
        return next(
            new AppError("No user found with the provided email", 404, {
                error: "Authentication error",
                issue: "User not found",
            })
        );
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return next(
            new AppError("Password doesn't match", 401, {
                error: "Authentication error",
                issue: "Invalid password",
            })
        );
    }

    // Generate token
    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.AUTH_SECRET,
        {
            expiresIn: process.env.AUTH_TOKEN_EXPIRE,
        }
    );

    res.status(200).json({
        message: "Login successful",
        token,
    });
};
