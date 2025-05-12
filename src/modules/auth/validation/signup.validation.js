import Joi from "joi";

export const signupSchema = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        email: Joi.string().email().trim().lowercase().required(),
        password: Joi.string().min(8).required(),
        confirmPassword: Joi.string()
            .valid(Joi.ref("password"))
            .required()
            .messages({
                "any.only": "Passwords do not match",
            }),
        age: Joi.number().integer().min(0).required(),
        gender: Joi.string().valid("male", "female").optional(),
        profilePicture: Joi.optional(),
        dateOfBirth: Joi.date()
            .less("now")
            .required()
            .messages({
                "date.less": "Date of birth must be in the past",
            }),
    }),
};
