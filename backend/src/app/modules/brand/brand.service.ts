import { unknown } from "zod";
import { uploadToCloudinary } from "../../utils/cloudinary";
import { Tbrand } from "./brand.interface";
import { Brand } from "./brand.model";

const addbrand = async (data:Tbrand, file:Express.Multer.File)=>{
    const { brand } = data;
    const uppercase = brand.toLocaleUpperCase()
    let imageUrls
    if (file !==undefined) {
 const uploads = await uploadToCloudinary(file) as { secure_url: string } | {  secure_url: string }[];
    imageUrls = Array.isArray(uploads) ? uploads[0]?.secure_url : uploads.secure_url;
}
    const category = new Brand({
        brand: uppercase,
        image: imageUrls|| "" 
    });
    const result = await category.save();
    return result;

}
const getBrand = async()=>{
    const result = await Brand.find();
    return result;
}
export const brandService = {
    addbrand,
    getBrand,
}