import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import fs from 'fs'
import dotenv from "dotenv";
import { error } from "console";
import { response } from "express";
dotenv.config({
  path: './.env'
})

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// const uploadOnCloudinary = async (localFilePath) => {
    

//     try {
//         if (!localFilePath){ 
            
//             console.log(localFilePath);
            
//             return null}
//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" })
//         console.log("this file is uploaded on cloudinary", response);
//         fs.unlinkSync(localFilePath);
//         return response;

//     } catch (error) {

//         fs.unlinkSync(localFilePath); //remove locally stored file 
//         console.log(error.message);
        
//         console.log("File is not uploaded on cloudinary");
//         return null;
        
//     }
// }



const uploadOnCloudinary = async (localFilePath) => {
    

    try {
        if (!localFilePath){ 
            
            console.log(localFilePath);
            
            return null}
        //upload the file on cloudinary
        const response = await new Promise((resolve, reject) => {

            cloudinary.uploader.upload_large(
                localFilePath,
                {
                    resource_type: "auto",
                    chunk_size: 6000000, // 6MB chunk size
                },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            )

        }) 
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

// const uploadOnCloudinary = async (fileBuffer) => {

//     try {

//         console.log("fileBuffer:",fileBuffer);
        

//         if(!fileBuffer) return null;

//             return new Promise((resolve,reject) => {
//                 const stream = cloudinary.uploader.upload_stream(
//                     {resource_type: "auto"},

//                     (error,response) => {
//                         if(error){
//                             console.log("clodinary error:" , error);
                            
//                             reject(error);
//                         }else{
//                             resolve(response);
//                             console.log("response:" , response);
                            
//                         }
//                     }
//                 )
//             });

//             streamifier.createReadStream(fileBuffer).pipe(stream);
        
        
//     } catch (error) {

//         console.error("Error uploading file to Cloudinary:", error);
//         return null;

//     }
// }

export {uploadOnCloudinary}
