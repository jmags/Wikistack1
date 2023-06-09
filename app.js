const express = require('express');
const morgan = require('morgan');
const {db, Page, User} = require('./models');

const PORT = 8080;


const app = express();
app.use(morgan('dev'));
app.use(express.static('static'));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res, next) => {
    try {
        res.send('walrus');
    } catch (err) {
        next(err);
    }
})


async function confirmDBState() {
    // Make sure the DB looks the way we want it.
    // TODO: Put this in try/catch and report if they didn't work.
    await db.sync({force: true});
}


const main = (check = false) => {
    if (check) confirmDBState();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

main();