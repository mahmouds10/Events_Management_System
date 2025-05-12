import mongoose from "../global-setup.js";
import imageSchema from "./Image.model.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: [true, "Please provide your date of birth"],
        },
        age: {
            type: Number,
            required: [true, "Please provide your age"],
            min: [0, "Age must be a positive number"],
        },
        gender: {
            type: String,
            enum: ["male", "female"],
        },
        profilePicture: {
            type: imageSchema,
            required: false,
        },
    },
    { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
