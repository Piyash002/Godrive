import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";

import { extractPublicId } from "cloudinary-build-url";
import multer from "multer";
import { config } from './../config/index';

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME!,
  api_key: config.CLOUDINARY_API_KEY!,
  api_secret: config.CLOUDINARY_API_SECRET!,
});

type UploadResult = {
  secure_url: string;
  public_id: string;
};


export const uploadToCloudinary = async (
  files: Express.Multer.File | Express.Multer.File[]
): Promise<UploadResult[]> => {
  const filesArray = Array.isArray(files) ? files : [files];

  const uploadPromises = filesArray.map((file) => {
    return new Promise<UploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "brands",
          public_id: uuid(),
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      ).end(file.buffer);
    });
  });

  return await Promise.all(uploadPromises);
};
export const upload = multer({ storage: multer.memoryStorage() });





export const deleteImageFromCloudinary = async (cloudinaryUrl: string) => {
  try {
    const publicId = extractPublicId(cloudinaryUrl);
    await cloudinary.uploader.destroy(publicId);
    console.log("Image deleted from Cloudinary:", publicId);
  } catch (error) {
    console.error("Failed to delete image from Cloudinary:", error);
  }
};
