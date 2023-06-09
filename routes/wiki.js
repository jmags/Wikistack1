const express = require('express');
const router = express.Router();
const {Page} = require('../models');
const {addPage, main, wikiPage} = require('../views');

router.get('/', async (req, res, next) => {
    try {
        const pages = await Page.findAll();
        // res.send(pages);
        res.send(main(pages));
    } catch (error) {
        next(error);
    }
});

router.get('/add', (req, res, next) => {
    // res.send('got to GET /wiki/add');
    res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {slug: req.params.slug}
        });
        res.send(wikiPage(page));
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    // res.send(req.body);
    try {
        const page = await Page.create({
            title: req.body.title,
            content: req.body.content
        });
        res.redirect(`/wiki/${page.slug}`);
    } catch (error) {
        next(error);
    }
});

module.exports = router;