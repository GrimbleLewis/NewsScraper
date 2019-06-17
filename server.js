var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server



var PORT = 8080;

// Initialize Express
var app = express();




// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsscrape";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });



// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });