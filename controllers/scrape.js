
const express = require('express');
const router = express.Router();
const scrape = require('../services/scrape/scrape');
const db = require('../models');
// const { scrape, doStuff } = require('../services');

// console.log(Object.keys(db));
router.get('/scrape', async (req, res) => {
  let data = await scrape();
  // convert array-like object into an array, so insertMany() will work properly
  data = Array.from(data);

  try {

    const insertions = await db.Article.collection.insertMany(data);
    const numInserts = insertions.result.n
    res.render('modal', { numInserts , status: 'Success!', msg: 'Insertions:' });
    
  } catch (err) {
    // Will purposely fail each time, unless the database is dropped.
    res.render('modal', { numInserts: 0, status: 'Failure! Duplicates Exist', msg: 'Insertions:' });

  }

});

module.exports = router;
