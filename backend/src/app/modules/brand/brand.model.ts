import mongoose, { Schema } from "mongoose";
import { Tbrand } from "./brand.interface";

const brandSchema = new Schema({
    brand: {
        type:String,
        required:true
    },
    image:{ type:String}
})

export const Brand =  (mongoose.models.Brand as mongoose.Model<Tbrand>) || mongoose.model<Tbrand>('Brand', brandSchema);
