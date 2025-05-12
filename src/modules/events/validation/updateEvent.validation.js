import Joi from "joi";

export const updateEventSchema = {
    body: Joi.object().keys({
        name: Joi.string().trim().optional(),
        description: Joi.string().allow("").optional(),
        startDate: Joi.date().optional(),
        endDate: Joi.date().greater(Joi.ref("startDate")).optional(),
        place: Joi.string().trim().optional(),
        longitude: Joi.number().optional(),
        latitude: Joi.number().optional(),
        capacity: Joi.number().min(1).optional(),
        attendees: Joi.number().min(0).optional(),
        price: Joi.number().min(0).optional(),
        presenter: Joi.string().trim().optional(),
        type: Joi.string()
            .valid("concert", "workshop", "meetup", "conference", "other")
            .optional(),
        status: Joi.string()
            .valid("upcoming", "ongoing", "completed", "cancelled")
            .optional(),
        isFeatured: Joi.boolean().optional(),
        eventImage: Joi.string().optional(),
    }),
};
