$("#clickMe").click(webData);

function randomEpisodeNumberGen(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function webData(e) {
  var randomNumber = randomEpisodeNumberGen(1, 100);
  console.log(randomNumber);
  $.ajax({
    method: "GET",
    url: "http://api.jikan.moe/anime/" + randomNumber + "/episodes",
    dataType: "json",
    beforeSend: function() {
      $("#clickMe").text("Loading...");
    },
    complete: function() {
      $("#clickMe").text("Click Here");
    }
  })
    .done(output, listEpisodes)
    .fail(function() {
      console.log("ERROR!!");
    });
}

function output(data) {
  console.log(data);
  var title = "<h2>" + data.title + "</h2>";
  var image = "<img src=" + data.image_url + ">";
  $("#episode-background").append(
    "<h2>" + "Background" + "</h2>" + "<p>" + data.background + "</p>"
  );
  $("#episode-synopsis").append(
    "<h2>" + "Synopsis" + "</h2>" + "<p>" + data.synopsis + "</p>"
  );
  $("#output").html(title + image);
}

function listEpisodes(data) {
  $.each(data.episode, function(i, val) {
    $("#episodes").append("<p>" + val.title + "</p>");
    // console.log(val.title);
  });
}
