
const express = require('express');
const router = express.Router();
const scrape = require('../services/scrape/scrape');
const db = require('../models');
// const { scrape, doStuff } = require('../services');

router.get('/scrape', async (req, res) => {
  let scrapeData = await scrape();

  // Grab all articles from DB
  let existingDataUrls = await db.Article.find({});
  // Pull off the urls from all articles
  existingDataUrls = existingDataUrls
    .map((article) => {
      return article.url;
    });

  // Filter the scrape data to only have unique stories
  scrapeData = scrapeData.filter((article) => {
    return !existingDataUrls.includes(article.url);
  });

// Insert filtered articles into DB.
  try {
    const insertions = await db.Article.collection.insertMany(scrapeData);
    const numInserts = insertions.result.n
    res.render('modal', { numInserts, status: 'Success!', msg: 'Insertions:' });
  } catch (err) {
    console.log(err);
    // This block is only entered if there is 100% duplicates in scrape data and existing data
    res.render('modal', { numInserts: 0, status: 'Failure! All scrape data was duplicates', msg: 'Insertions:' });
  }

});

router.get('/scrape/test', (reg,res) => {
  res.send('Hello world!');
});

module.exports = router;
