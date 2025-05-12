import EventModel from "../../../db/models/event.model.js";

export const getFeaturedEvents = async (req, res, next) => {
    const events = await EventModel.find({ isFeatured: true });
    res.status(200).json({
        message: "Featured events fetched successfully",
        events,
    });
};
