import AppError from "../utils/AppError.util.js";

const requestKeys = ["body", "params", "query", "headers"];

const validate = (schema) => {
    return (req, res, next) => {
        for (const key of requestKeys) {
            if (!schema[key]) continue; 

            const { error } = schema[key].validate(req[key], {
                abortEarly: false,
            }); 

            if (error) {
                const details = error.details.map((err) => ({
                    field: err.path.join("."),
                    message: err.message.replace(/['"]/g, ""), 
                }));

                return next(new AppError("Validation Error", 400, details));
            }
        }

        next();
    };
};

export default validate;
