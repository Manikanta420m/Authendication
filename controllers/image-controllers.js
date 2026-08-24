const Image = require('../models/image');
const { uploadToCloudnary } = require('../helpers/cloudinary-helper');
const fs=require('fs');
const cloudinary = require('../config/cloudinary');

const uploadImageController = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File is required. Please upload an image.'
            });
        }

        const { url, publicId } = await uploadToCloudnary(req.file.path);

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });

        await newlyUploadedImage.save();

        // fs.unlinkSync(req.file.path);

        return res.status(201).json({
            success: true,
            message: 'Image uploaded successfully',
            image: newlyUploadedImage
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again!'
        });
    }
};

const fetchImagesController = async(req,res)=>{
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page-1)*limit;

    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1:-1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages/limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const images = await Image.find().sort(sortObj).skip(skip).limit(limit);

     if(images){
      res.status(200).json({
        success : true,
        currentPage : page,
        totalPages : totalPages,
        totalImages : totalImages,
        data : images
      });
     }
  }
  catch(e){
    console.log(e);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again!'
        });
  }
}

const deleteImageController = async(req,res)=>{
    try{
        const getCurrentIdOfImage = req.params.id;
        const userId = req.userInfo.userId;
        const image = await Image.findById(getCurrentIdOfImage);
        if(!image){
            return res.status(404).json({
               success : false,
               message : 'Image not found'
            });
        }
        if(image.uploadedBy.toString()!=userId){
           return res.status(403).json({
            success: false,
            message: 'You are Not authorized to delete this Image!'
          }); 
        }
      await cloudinary.uploader.destroy(image.publicId);
      await Image.findByIdAndDelete(getCurrentIdOfImage);
      res.status(200).json({
        success : true,
        message : 'Image deleted Successfully'
      });
    }
    catch(e){
    console.log(e);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong. Try again!'
        });
  }
}

module.exports = {
    uploadImageController,
    fetchImagesController,
    deleteImageController
};