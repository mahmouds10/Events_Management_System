import AppError from "../utils/AppError.util.js";

const globalErrorHandler = (err, req, res, next) => {
    if (!err) return next();

    if (!(err instanceof AppError)) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: err.message,
            details: process.env.NODE_ENV === "dev" ? err.stack : null,
        });
    }

    let response = {
        message: err.message,
    };
    if (err.details) {
        response.details = err.details; 
    }
    res.status(err.statusCode).json(response);
};

export default globalErrorHandler;
