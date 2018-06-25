
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  headLine: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  byLine: {
    type: String,
    byLine: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
