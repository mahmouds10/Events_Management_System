import EventModel from "../../../db/models/event.model.js";

export const getEvents = async (req, res, next) => {
    // Determine the filter
    const statusQuery = req.query.status;
    const filter = statusQuery
        ? { status: statusQuery }
        : { status: { $in: ["upcoming", "ongoing"] } };

    // Fetch and return events without pagination
    const events = await EventModel.find(filter)
        .select("-__v -createdAt -updatedAt")
        .sort({ createdAt: -1 });

    res.status(200).json({
        message: "Events fetched successfully",
        events,
    });
};
