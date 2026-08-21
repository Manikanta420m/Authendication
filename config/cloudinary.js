const cloudinary = require('cloudnary').v2;

cloudinary.config({
    cloud_name : process.env.CLOUIDNARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
});

module.export = cloudinary;