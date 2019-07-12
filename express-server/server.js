const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
//require('./src/config/mongoose')(app);

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json());
//require('./src/app/controlers')(app);

app.get('/', (req, res, next) => {
    return res.json({works: 'true'});
})

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}!`));
