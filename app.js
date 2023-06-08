const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));


app.listen(8080, () => {
    console.log('Server running on port 8080');
});