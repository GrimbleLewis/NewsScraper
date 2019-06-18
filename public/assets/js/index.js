/* global bootbox */
$(document).ready(function() {
  // Setting a reference to the article-container div where all the dynamic content will go
  // Adding event listeners to any dynamically generated "save article"
  // and "scrape new article" buttons
  var articleContainer = $(".article-container");
  $(".scrape-new").on("click", handleArticleScrape);
  $(".clear").on("click", handleArticleClear);

  function handleArticleScrape() {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/scrape").then(function(data) {
      articleContainer.hide();
      window.location.reload();
    });
  }

  function handleArticleClear() {
    $.get("api/clear").then(function() {
      window.location.reload();
    });
  }

  // changes the saved value of the article to true and sends to article to the saved.handlebars
  $(document).on("click", ".save-article", function() {
    var articleId = $(this).data("id");
    $.ajax({
      url: "/article/save/" + articleId,
      type: "GET",
      success: function(response) {
        window.location.href = "/";
      },
      error: function(error) {
        res.json(error);
      }
    });
  });


  // deletes selected article from the saved article page
  $(document).on("click", ".delete-article", function(e) {
    e.preventDefault();
    var id = $(this).data("id");
    $.ajax({
      url: "/deletearticle/" + id,
      type: "GET",
      success: function(response) {
        window.location.href = "/saved";
      },
      error: function(error) {
        res.json(error);
      }
    });
  });



// Note functionality //

$(document).on("click", ".add-note", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' placeholder='Note Title'>");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body' placeholder='Tell us what you think'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      // A button to delete a saved note
      $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});


// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click the savenote button
$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a DELETE request to remove the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/delete/" + thisId
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});


});
