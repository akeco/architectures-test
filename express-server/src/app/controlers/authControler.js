const router = require('express').Router();
const Service = require('../services/userService');
const userService = new Service();
const userValidator = require('../middlewares/validators/userValidator');

router.post('/login', userService.createUser);
router.post('/register', userValidator, userService.createUser);
router.post('/authorized', userValidator, userService.createUser);

module.exports = router;
