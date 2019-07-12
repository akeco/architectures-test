const userControler = require('./userControler');
const productsControler = require('./productsControler');

module.exports = setControlers = (app) => {
    app.use('/users', userControler);
    app.use('/products', productsControler);

    app.use((err, req, res, next) => {
        switch (err.name) {
            case 'ValidationError':
                res.status(400).send(err.message);
                break;
        }
    });
};
