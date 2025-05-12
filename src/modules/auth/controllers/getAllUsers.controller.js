import UserModel from "../../../db/models/user.model.js";

export const getAllUsers = async (req, res, next) => {
    const users = await UserModel.find().select("-password");
    if (!users) {
        return res.status(404).json({
            status: "fail",
            message: "No users found",
        });
    }
    return res.status(200).json({
        status: "success",
        users,
    });
};
