const express = require('express');
const authMiddleware=require ('../middleware/auth-middleware');
const adminMiddleware=require ('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');

const {uploadImageController,fetchImagesController,deleteImageController} = require('../controllers/image-controllers');

const router = express.Router();


router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImageController);
router.get('/fetch',authMiddleware,fetchImagesController);
router.delete('/:id',authMiddleware,adminMiddleware,deleteImageController);


module.exports = router;

//. 6a88b4054564df2fbae7d796