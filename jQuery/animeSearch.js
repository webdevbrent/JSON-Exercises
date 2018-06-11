$("#search").click(function(e) {
  e.preventDefault();
  fetchSearch();
});

function fetchSearch() {
  var animeType = $("#anime-type").val();
  var animeQuery = $("#anime-query").val();
  console.log(animeType, animeQuery);
  $.ajax({
    method: "GET",
    url: "https://api.jikan.moe/search/" + animeType + "/" + animeQuery + "/1",
    dataType: "json",
    beforeSend: function() {
      $("#search").text("Loading...");
    },
    complete: function() {
      $("#search").text("Search");
    }
  })
    .done(output, searchResults)
    .fail(function() {
      console.log("ERROR!!");
    });
}

function output(data) {
  console.log(data);
}

function searchResults(data) {
  $.each(data.result, function(i, val) {
    var alink =
      '<a class="badge badge-light" href=' +
      val.url +
      ">" +
      '<h5 class="mt-0 mb-1">' +
      val.title +
      "</h5>" +
      "</a>";
    var image = '<img class="mr-3" src= ' + val.image_url + ">";
    var platform = '<span class="badge badge-info p-2">' + val.type + "</span>";
    var score =
      '<span class="badge badge-warning p-2">' + val.score + "</span>";
    var description =
      '<div class="media-body">' +
      alink +
      "<p>" +
      val.description +
      "</p>" +
      "<br>" +
      platform +
      score +
      "</div>";
    $("#myList").append(
      '<li class="media mb-2">' + image + description + "</li>"
    );
  });
  var toTop =
    '<p class="text-center">' +
    '<a href="#top">' +
    "Back to the top" +
    "</a>" +
    "</p>";
  $("#myList").append(toTop);
}

var options = {
  url: function(phrase) {
    var animeType = $("#anime-type").val();
    return "https://api.jikan.moe/search/" + animeType + "/" + phrase + "/1";
  },

  getValue: "title",

  ajaxSettings: {
    dataType: "json"
  },

  listLocation: "result",

  requestDelay: 300,

  theme: "round"
};

$("#anime-query").easyAutocomplete(options);
