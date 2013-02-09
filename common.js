var main = function() {
  var $ = function (selector) {
    return document.getElementById(selector);
  };

  var click_handler = function() {
    var image_name = this.getElementsByTagName("img").length > 0 ? 
      this.getElementsByTagName("img")[0].src.split("/").pop() : "";

    alert(image_name);
  };

  var i, j, gallery_divs = $("gallery").getElementsByTagName("div");

  for (i in gallery_divs) {
    if (gallery_divs.hasOwnProperty(i)) {
      if (gallery_divs[i].className === 'thumbs') {

        var thumbs = gallery_divs[i].getElementsByTagName("div");
            
        for (j in thumbs) {
          if (thumbs.hasOwnProperty(j)) {
            if (typeof thumbs[j] === 'object') {
              thumbs[j].onclick = click_handler;
            }
          }
        }
      }
    }
  }
};

window.onload = main;
