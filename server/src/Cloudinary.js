import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const Cloudinary = async (filepath) => {
 try {
  const response = await cloudinary.uploader.upload(filepath, {
    resource_type: "auto"
})

console.log("file  has been uploaded on cloudinary", response.url)
return response;
 } catch (error) {
  console.log(error)
 }
  
};

export default Cloudinary;
