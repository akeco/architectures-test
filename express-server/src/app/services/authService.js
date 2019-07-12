const User = require('../models/userModel');
const { promisify } = require('util');

class AuthService {
    async login (req, res, next) {
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

    async register (req, res, next) {
        try {
            const result = await find();
            res.json(result);
        }
        catch(er) {
            next(er);
        }
    };

    async isAuthorized (req, res, next) {

    }
}

module.exports = AuthService;
