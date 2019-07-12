const router = require('express').Router();
const Service = require('../services/userService');
const userService = new Service();
const path = require('path');
const cloudinary = require('cloudinary');
const userValidator = require('../middlewares/validators/userValidator');
const { upload } = require('../../config/multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

router
    .route('/')
    .get( userService.getUsers)
    .post( userValidator, userService.createUser);

router.post('/photo', upload.single('avatar'), userService.uploadUserAvatar);

module.exports = router;
