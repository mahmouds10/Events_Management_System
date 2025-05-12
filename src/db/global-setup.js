// Setup global mongoose plugins and configurations.

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

mongoose.plugin(mongoosePaginate);

export default mongoose;