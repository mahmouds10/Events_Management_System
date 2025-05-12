import { format } from "date-fns";
import { configCloudinary } from "../../../config/cloudinary.config.js";
import UserModel from "../../../db/models/user.model.js";
import AppError from "../../../utils/AppError.util.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword, gender, age, dateOfBirth } = req.body;

    const role = req.body.role || "user";

    if (role === "admin" && req.user.role !== "admin") {
        return next(
            new AppError("You are not authorized to create an admin", 403)
        );
    }

    const userProfilePicture = req.file;

    const exisitingEmail = await UserModel.findOne({ email });
    if (exisitingEmail) {
        return next(new AppError("User with this email already exists", 400));
    }

    if (password !== confirmPassword) {
        return next(new AppError("Passwords do not match", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser = new UserModel({
        name,
        email,
        password: hashedPassword,
        role,
        gender,
        age,
        dateOfBirth,
    });

    if (userProfilePicture) {
        const cloudinary = configCloudinary();
        const timestamp = format(new Date(), "yyyy-MM-dd_HH-mm-ss");
        const filename = `${email.split("@")[0]}_${timestamp}`;
        const uploadResult = await cloudinary.uploader.upload(
            userProfilePicture?.path,
            {
                folder: `Areeb/users/${role}`,
                filename_override: filename,
                discard_original_filename: true,
                use_filename: true,
                unique_filename: false,
            }
        );
        newUser.profilePicture = {
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
        };
    }

    await newUser.save();

    res.status(201).json({
        message: "User created successfully",
        user: {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
        },
    });
};
