/**
 *  Helper for selectors
 */
var $ = function (selector) {
  return document.getElementById(selector);
};

var BigPicture = {
  open_holder: function () {
    $("big_picture_holder").style.display = "table";
    $("big_picture_help").style.display = "block";
  },

  close_holder: function () {
    $("big_picture_holder").style.display = "none";
    $("big_picture_help").style.display = "none";
  },

  place_image: function (image_name) {
    var image = $("big_picture").getElementsByTagName("img")[0];
    image.src = "images/big/" + image_name;
    image.onclick = function () {
      BigPicture.close_holder();
    };

    image.onload = function() {
      if (this.height > window.innerHeight) {
        this.height = window.innerHeight - 30;
      }
    };
  }
};

/**
 *  Onlick actions for each thumb
 */
var open_big_picture = function() {
  var bp = BigPicture;
  var image_name = this.getElementsByTagName("img").length > 0 ? 
    this.getElementsByTagName("img")[0].src.split("/").pop() : "";

  bp.open_holder();
  bp.place_image(image_name);
};

/**
 *  Setting actions for each thumb
 */
var set_click_handler_for_thumbs = function() {
  var i, j, gallery_divs = $("gallery").getElementsByTagName("div");

  for (i in gallery_divs) {
    if (gallery_divs.hasOwnProperty(i)) {
      if (gallery_divs[i].className === 'thumbs') {

        var thumbs = gallery_divs[i].getElementsByTagName("div");
            
        for (j in thumbs) {
          if (thumbs.hasOwnProperty(j)) {
            if (typeof thumbs[j] === 'object') {
              thumbs[j].onclick = open_big_picture;
            }
          }
        }
      }
    }
  }
};

var main = function() {
  set_click_handler_for_thumbs();
};

window.onload = main;
