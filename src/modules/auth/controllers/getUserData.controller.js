import AppError from "../../../utils/AppError.util.js";

export const getUserData = async (req, res, next) => {
    const { user } = req;


    const userData = {
        name: user.name,
        email: user.email,
        role: user.role,
        age: user.age,
        gender: user.gender,
        profilePicture: user.profilePicture || "",
    };

    res.status(200).json({
        status: "success",
        user: userData,
    });
};
