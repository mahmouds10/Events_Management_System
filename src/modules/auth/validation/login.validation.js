import Joi from "joi";

export const loginSchema = {
    body: Joi.object().keys({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required(),
        password: Joi.string().min(8).required(),
    }),
};
