const express = require('express');
const authMiddleware=require ('../middleware/auth-middleware');
const adminMiddleware=require ('../middleware/admin-middleware');
const uploadMiddleware = require('../middleware/upload-middleware');

const {uploadImageController,fetchImagesController} = require('../controllers/image-controllers');

const router = express.Router();


router.post('/upload',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),uploadImageController);
router.get('/fetch',authMiddleware,adminMiddleware,uploadMiddleware.single('image'),fetchImagesController);


module.exports = router;