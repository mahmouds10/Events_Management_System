import UserModel from "../../../db/models/user.model.js";
import AppError from "../../../utils/AppError.util.js";

export const changeRole = async (req, res, next) => {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
        return next(new AppError("User not found", 404));
    }

    if (role == user.role) {
        return next(new AppError("User already has this role", 400));
    }
    const oldRole = user.role;

    user.role = role;
    await user.save();

    res.status(200).json({
        status: "success",
        message: `Role updated successfully`,
        data: {
            newRole: role,
            oldRole: oldRole,
        },
    });
};
