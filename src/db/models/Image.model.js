import mongoose from "../global-setup.js";

const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
    {
        _id: false,
    }
);

export default imageSchema;