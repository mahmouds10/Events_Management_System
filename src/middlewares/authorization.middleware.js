import AppError from "../utils/AppError.util.js";

const authorize = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const { user } = req;
            if (!user) {
                return next(
                    new AppError(
                        "Please authenticate before using this resource",
                        401,
                        {
                            error: "Authorization Error",
                            issue: "No user found",
                        }
                    )
                );
            }
            if (!allowedRoles.includes(user.role)) {
                return next(
                    new AppError(
                        "You are not authorized to access this resource",
                        403,
                        {
                            error: "Authorization Error",
                            issue: "Insufficient permissions",
                        }
                    )
                );
            }
            next();
        } catch (err) {
            return next(
                new AppError("An error occurred while authorizing", 500, {
                    error: "Authorization Error",
                    issue: err.message,
                })
            );
        }
    };
};

export default authorize;