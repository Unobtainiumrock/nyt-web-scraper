
const express = require('express');
const router = express.Router();
const scrape = require('../services/scrape/scrape');
const db = require('../models');

// Route for getting all Articles from the db
router.get("/threads", (req, res) => {
  // TODO: Finish the route so it grabs all of the articles
  db.Article.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/threads/:id", (req, res) => {
  const id = req.params.id;
  db.Article.findOne({ _id: id })
    .populate("note")
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});


// Route for saving/updating an Article's associated Note
router.post("/threads/:id", (req, res) => {
  const id = req.params.id;
  const note = req.body;
  db.Note.create(note)
    .then(dbNote => {
      return db.Article.findOneAndUpdate({ _id: id }, { note: dbNote._id }, { new: true })
    })
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err =>{
      res.json(err);
    });
});

module.exports = router;
