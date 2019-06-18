var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app) {
  app.get("/api/scrape", function(req, res) {
    axios.get("http://www.npr.org/").then(function(response) {
      var $ = cheerio.load(response.data);

      $("article").each(function(i, element) {
        var result = {};

        result.title = $(this)
          .find(".title")
          .text();
        result.summary = $(this)
          .find(".teaser")
          .text();
        result.link = $(this)
          .find("a")
          .attr("href");

        console.log(result);
        db.Article.create(result)
        .then(result => res.redirect('/'))

    
          .catch(function(err) {
            console.log(err);
          });
      });
    });
  });

  // Route for getting all Articles from the db
  app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .exec()
      .then(Article => {
        // If we were able to successfully find Articles, send them back to the client
        res.json({ Article });
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.get("/api/clear", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .remove()
      .then(result => res.json(result))
      .catch(err => res.json(err));
  });

  app.get('/save/:id', (req,res) => {
    db.Article
      .update({_id: req.params.id},{saved: true})
      .then(result => res.redirect('/saved'))
      .catch(err => res.json(err));
  });
};
