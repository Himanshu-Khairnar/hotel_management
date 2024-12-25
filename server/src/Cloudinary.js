import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Cloudinary = async (filepath) => {
  console.log(filepath)
  const uploadResult = cloudinary.uploader
    .upload(filepath)
    .then((result) => console.log(result))
    .catch((error) => {
      console.log(error);
    });

  return uploadResult;
};

export default Cloudinary;
