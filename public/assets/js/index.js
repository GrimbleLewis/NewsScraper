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
        // displayArticles()
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
$(document).on('click', '.save-article', function () {
  var articleId = $(this).data('id');
  $.ajax({
    url: '/save/'+ articleId,
    type: 'GET',
    success: function (response) {
      window.location.href = '/';
    },
    error: function (error) {
      res.json(error);
    }
  });
});

// deletes selected article from the saved article page
$(document).on('click', '.delete-article', function (e){
  e.preventDefault();
  var id = $(this).data('id');
  $.ajax({
    url: '/deletearticle/'+id,
    type: 'GET',
    success: function (response) {
      window.location.href = '/saved';
    },
    error: function (error) {
      showErrorModal(error);
    }
  });
});

});