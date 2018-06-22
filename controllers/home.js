
const express = require('express');
const router = express.Router();
const scrape = require('../services/scrape/scrape');
const db = require('../models');

router.get('/', async (req,res) => {

  try {
    const articles = await db.Article.find({});
    res.render('index', { collection: articles });
  } catch(err) {
    console.log(err);
  }

});

module.exports = router;
