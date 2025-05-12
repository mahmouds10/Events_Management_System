import EventModel from "../../../db/models/event.model.js";

export const getAllEvents = async (req, res, next) => {
    try {
        const events = await EventModel.find({})
            .populate({
                path: "createdBy",
                select: "name email",
            })
            .select("-__v -createdAt -updatedAt")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Events fetched successfully",
            events,
        });
    } catch (error) {
        next(error);
    }
};
