import AppError from "../utils/AppError.util.js";

const handelError = (API) => {
    return async (req, res, next) => {
        API(req, res, next).catch((err) => {
            next(
                new AppError(err.message, 500, {
                    error: "Internal Server Error",
                    stack: process.env.NODE_ENV === "dev" ? err.stack : null,
                })
            );
        });
    };
};

export default handelError;
