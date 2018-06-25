
const express = require('express');
const router = express.Router();
const scrape = require('../services/scrape/scrape');
const db = require('../models');

// Route for getting all Articles from the db
router.get("/threads", async (req, res) => {

  try {
    const articles = await db.Article.find({});
    res.json(articles);
  } catch(err) {
    console.log(err);
  }

});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/threads/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const article = await db.Article.findOne({ _id }).populate('note');
    res.json(article);
  } catch(err) {
    console.log(err);
  }

});


// Route for saving/updating an Article's associated Note
router.post("/threads/:id", async (req, res) => {
  const _id = req.params.id;
  const note = req.body;
  
  try {
    const newNote = await db.Note.create(note);
    const updatedArticle = await db.Article.findOneAndUpdate({ _id }, { note: newNote._id }, { new: true });
    res.json(updatedArticle);
  } catch(err) {
    console.log(err);
  }

});

module.exports = router;
