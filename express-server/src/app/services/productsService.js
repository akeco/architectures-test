const ProductsModel = require('../../../server/models').Products;
const { promisify } = require('util');
const cloudinary = require('../../config/cloudinary');
const { validationResult } = require('express-validator/check');
const create = promisify(ProductsModel.create.bind(ProductsModel));
const uploadToCloudinary = promisify(cloudinary.v2.uploader.upload);
//const find = promisify(User.find.bind(User));
const faker = require('faker');

class productsService {
    async createProduct (req, res, next) {
        try {
            const cloudinaryResult = await uploadToCloudinary(req.file.path);
            const result = await ProductsModel.create({
                title: req.body.title,
                image: cloudinaryResult.secure_url
            });

            res.status(201).json({ data: result.dataValues });
        }
        catch(er) {
            next(er);
        }
    };


    async getProducts (req, res, next) {
        const products = [];

        for(let i=0; i<50; i++) {
            products.push({
                product: faker.commerce.product(),
                image: faker.image.food(),
                productName: faker.commerce.productName(),
                price: faker.commerce.price(),
                productAdjective: faker.commerce.productAdjective(),
            });
        }

        res.json(products);

        /*
        try {
            const result = await find();
            res.json(result);
        }
        catch(er) {
            next(er);
        }
         */
    };


    /*
    async uploadProductImage (req, res, next) {
        try {
            const result = await uploadToCloudinary(req.file.path);
            res.json({
                data: {
                    url: result.secure_url
                }
            });
        }
        catch(e) {
            //
        }
    }
     */
}

module.exports = productsService;
