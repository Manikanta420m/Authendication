const Image = require('../model/Image');
const {uploadToCloudnary} = require('../helpers/cloudinary-helper');


const uploadImage = async(req,res)=>{
   try{
     if(!req.file){
        res.status(400).json({
            success : false,
            message : 'File is required please upload an image'
        });
     }
    
     const {url,publicId} = await uploadToCloudnary(req.filePath); 
     
     const newlyUploadedImage = new Image({
       url,
       publicId,
       uploadedBy : req.userInfo.userId
     });

     await newlyUploadedImage.save();

     res.status(201).json({
        success : true,
        message : 'Image Uploaded Successfully',
        image : newlyUploadedImage
     });

   }
   catch(error){
    console.log(error);
    res.status(500).json({
        success : false,
        message : 'Somethong went wrong Try Again!'
    });
   }
}

module.exports={
    uploadImage
};