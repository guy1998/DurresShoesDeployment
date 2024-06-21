const mongoose = require("mongoose");
const { Schema } = mongoose;

const articleSchema = new Schema({
  code: { type: String, required: true },
  costPerArticle: { type: Number, required: true },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
