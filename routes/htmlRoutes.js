// Require all models
var db = require("../models");

module.exports = function(app) {
    // Load index page
    app.get("/", (req, res) => {
        db.Article.find({}).limit(20)
        .then(articles => res.render("index", {articles}))
        .catch(err => res.json(err));
    });
    // load saved articles
    app.get("/saved", (req, res) => {
        db.Article.find({})
        .then(result => res.render("saved", {articles: result}))
        .catch(err => res.json(err));
    });


};