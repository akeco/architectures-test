const router = require('express').Router();
const Service = require('../services/productsService');
const productsService = new Service();
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
    .get(productsService.getProducts)
    .post(upload.single('image'), productsService.createProduct);

//router.post('/photo', upload.single('avatar'), productsService.createProduct);

module.exports = router;
