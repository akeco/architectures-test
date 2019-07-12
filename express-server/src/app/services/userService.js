const User = require('../models/userModel');
const { promisify } = require('util');
const cloudinary = require('../../config/cloudinary');
const { validationResult } = require('express-validator/check');
const create = promisify(User.create.bind(User));
const uploadToCloudinary = promisify(cloudinary.v2.uploader.upload);
const find = promisify(User.find.bind(User));

class UserService {
    async createUser (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(new Error(errors.array()))
        }

        try {
            const result = await create(req.body);
            res.status(201).json(result);
        }
        catch(er) {
            next(er);
        }
    };

    async getUsers (req, res, next) {
        try {
            const result = await find();
            res.json(result);
        }
        catch(er) {
            next(er);
        }
    };

    async uploadUserAvatar (req, res, next) {
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
}

module.exports = UserService;
