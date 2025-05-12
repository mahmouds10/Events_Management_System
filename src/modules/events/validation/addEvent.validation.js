import Joi from "joi";

export const createEventSchema = {
    body: Joi.object().keys({
        name: Joi.string().trim().required(),
        description: Joi.string().allow("").optional(),
        startDate: Joi.date().required(),
        endDate: Joi.date().greater(Joi.ref("startDate")).required(),
        place: Joi.string().trim().required(),
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
        capacity: Joi.number().min(1).required(),
        price: Joi.number().min(0).required(),
        type: Joi.string()
            .valid("concert", "workshop", "meetup", "conference", "other")
            .default("other"),
        isFeatured: Joi.boolean().optional(),
        presenter: Joi.string().trim(),
        attendees: Joi.number().min(0).default(0),
        eventImage:Joi.optional(),
        createdBy: Joi.string().required(),
    })
};
