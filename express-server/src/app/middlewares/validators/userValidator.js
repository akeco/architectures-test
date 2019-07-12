const { check } = require('express-validator/check');

module.exports = [
    check('firstName'),
    check('lastName')
];
