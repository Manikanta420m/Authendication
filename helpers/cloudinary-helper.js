const cloudnary = require("../config/cloudinary");

const uploadToCloudnary = async(filePath)=>{
    try{
       const result = await cloudnary.uploader.upload(filePath);
       return{
        url : result.secure_url,
        publicId : result.public_id
       };
    }
    catch(error){
        console.error('Error while Uploading',error);
        throw new Error('Error while Uploading');
    }
}

module.exports = {
    uploadToCloudnary
}