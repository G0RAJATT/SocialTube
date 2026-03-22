import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'
import dotenv from "dotenv";
dotenv.config({
  path: './.env'
})

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    

    try {
        if (!localFilePath){ 
            
            console.log(localFilePath);
            
            return null}
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
        console.log("this file is uploaded on cloudinary", response);
        fs.unlinkSync(localFilePath);
        return response;

    } catch (error) {

        fs.unlinkSync(localFilePath); //remove locally stored file 
        console.log(error.message);
        
        console.log("File is not uploaded on cloudinary");
        return null;
        
    }
}

export {uploadOnCloudinary}
