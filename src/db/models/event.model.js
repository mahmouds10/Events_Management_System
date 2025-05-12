import mongoose from "../global-setup.js";
import ImageSchema from "./Image.model.js";

const eventSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: "",
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        place: {
            type: String,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
        latitude: {
            type: Number,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        attendees: {
            type: Number,
            default: 0,
        },
        price:{
            type: Number,
            required: true,
        },
        presenter:{
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["concert", "workshop", "meetup", "conference", "other"],
            default: "other",
        },
        status: {
            type: String,
            enum: ["upcoming", "ongoing", "completed", "cancelled"],
            default: "upcoming",
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        eventImage: {
            type: ImageSchema,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const EventModel =
    mongoose.models.Event || mongoose.model("Event", eventSchema);

export default EventModel;
