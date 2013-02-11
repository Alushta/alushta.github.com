(function(){
  
  window.addEventListener('load', window_load_handler, false);


  // access point
  function window_load_handler () {
    activate_thumbs ();
  }


  // helper for selectors 
  function $ (selector) {
    return document.getElementById(selector);
  }


  // setting actions for each thumb
  function activate_thumbs () {
    var i, j, gallery_divs = $("gallery").getElementsByTagName("div");

    for (i in gallery_divs) 
      if (gallery_divs.hasOwnProperty(i)) 
        if (gallery_divs[i].className === 'thumbs') {

          var thumbs = gallery_divs[i].getElementsByTagName("div");
          for (j in thumbs) 
            if (thumbs.hasOwnProperty(j)) 
              if (typeof thumbs[j] === 'object') 
                thumbs[j].addEventListener('click', big_picture.open, false);
        }
  }


  // toolset for viewing zoomed pictures
  var big_picture = {
    
    open: function () {
      var image_name = this.getElementsByTagName("img").length > 0 ? 
        this.getElementsByTagName("img")[0].src.split("/").pop() : "";

      big_picture.open_holder();
      big_picture.place_image(image_name);
    },

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
      image.addEventListener('click', function() {
        big_picture.close_holder();
      }, false);

      image.onload = function() {
        if (this.height > window.innerHeight) {
          this.height = window.innerHeight - 30;
        }
      };
    }
  };

}());
