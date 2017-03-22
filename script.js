function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

  // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/************************/
function getFont() {
  var fonts = ['Amatic SC', 'Cookie8','monospace','roboto', 'Dawning of a New Day', 'La Belle Aurore', 'League Script', 'Lily Script One', 'Oleo Script Swash Caps', 'Pacifico', 'Pattaya', 'Poiret One', 'Poppins', 'Quicksand', 'Reenie Beanie', 'Satisfy', 'Shrikhand', 'Yanone Kaffeesatz']

  shuffle(fonts);
  return fonts.pop();
}

function getQuote(callback) {
  $.ajax({
    headers: {
    "X-Mashape-Key": "CWLgxkJ5rumshUwxJnFYOkFN9dx5p1DvxsGjsnvZRWBsi7JW8b",
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded"
    },                                             
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous',
    success: function(response) {
      var r = JSON.parse(response);
      $(".quote").html("\u201C" + r.quote + "\u201D");
      $("footer").html(r.author);
      var font = getFont();
      $(".quote").css("font-family", font);
      $("#author").css("font-family", font);
      callback();
    }
  })
};

function getPicture(callback) {
  var rand = new Date().getTime();
  url = "https://unsplash.it/" + screen.height + "/" + screen.width + "/?random=rand";
  $.ajax({
    url: url,
    cache: false,
    success: function(response) {
      $(".bg-div").css("background-image", "url(" + url + "=" + rand + ")");
      callback();
    }
  });
}

function tweet() {
  var quote = document.getElementById("thequote").textContent;
  var author = document.getElementById("author").textContent;
  // console.log("tweet");
  var url = "http://twitter.com/share?text=" + encodeURIComponent(quote + '"') + encodeURIComponent("-" + author) + "&hashtags=famousQuote";
  window.open(url);
}

function share() {
  var url = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("http://codepen.io/bobbidigi34/full/pRRpXW/");
  window.open(url);
}

function loading() {
  $(".bg-div").css("background-image", "http://www.downgraf.com/wp-content/uploads/2014/09/01-progress.gif");
}

function onClick() {
  $(".bg-div").fadeOut("1000", function() {
    getPicture(function() {
      getQuote(function() {
        $(".bg-div").fadeIn("500");
      });
    });
  });
}

// var margin = screen.height;
// $(".element").css("margin",margin);

$(document).ready(function() {
  $("#new-quote").on('click', onClick);
  $("#tweet").on('click', tweet);
  $("#fb").on('click', share);
});


 /*"X-Mashape-Key": "wfCzrNcRT4msh2qGHhfQd1TWRRnUp1j3dNGjsnwBjxmBI3HcD8",*/
//mashape.com/?cat=movies'
 //"wfCzrNcRT4msh2qGHhfQd1TWRRnUp1j3dNGjsnwBjxmBI3HcD8"