(function(){
  
  window.addEventListener('load', window_load_handler, false);

  // access point
  function window_load_handler () {
    photos.add_handlers_for_thumbs ();
    calendar.initialize ();
  }


  // helper for selectors 
  function $ (selector) {
    return document.getElementById(selector);
  }


  // toolset for viewing zoomed pictures
  var photos = {

    // setting actions for each thumb
    add_handlers_for_thumbs: function () {
      var i, j, gallery_divs = $("gallery").getElementsByTagName("div");

      for (i in gallery_divs) {
        if (gallery_divs.hasOwnProperty(i)) {
          if (gallery_divs[i].className === 'thumbs') {

            var thumbs = gallery_divs[i].getElementsByTagName("div");
            for (j in thumbs) {
              if (thumbs.hasOwnProperty(j)) {
                if (typeof thumbs[j] === 'object') {
                  thumbs[j].addEventListener('click', photos.open, false);
                }
              }
            }
          }
        }
      }
    },

    
    open: function () {
      var image_name = this.getElementsByTagName("img").length > 0 ? 
        this.getElementsByTagName("img")[0].src.split("/").pop() : "";

      photos.open_holder();
      photos.place_image(image_name);
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
        photos.close_holder();
      }, false);

      image.onload = function() {
        if (this.height > window.innerHeight) {
          this.height = window.innerHeight - 30;
        }
      };
    }
  };


  var calendar = {
    draw: function () {
      var month, 
          calendar = $("calendar"),
          date = new Date(),
          day_in_month = [null, 31, 28, 31, 30, 31, 30, 31, 31, 31, 30, 31, 31],
          month_names = [null, "Январь", "Февраль", "Март", "Апрель", "Май", 
                         "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", 
                         "Ноябрь", "Декабрь"];

      // drawing monthes
      for (month = 1; month <= day_in_month.length; month++) {
        var month_el = document.createElement("div");
        month_el.setAttribute("class", "month");
        month_el.setAttribute("id", "m-" + month);
        calendar.appendChild(month_el);

        // drawing days in month
        var day;
        for (day = 1; day <= day_in_month[month]; day++) {

          // margin from beggining of the week
          if (day === 1) {
            var dow = (new Date(date.getYear() + "/" + month + "/" + day)).getDay();
            
            if (dow !== 6) {
              var blank_day;
              for (blank_day = 0; blank_day <= dow; blank_day++) {
                var blank_day_el = document.createElement("div");
                blank_day_el.setAttribute("class", "day");
                $("m-" + month).appendChild(blank_day_el);
              }
            }

            // inserting month name
            var month_name_el = document.createElement("div");
            month_name_el.setAttribute("class", "name");
            month_name_el.innerHTML = month_names[month];
            $("m-" + month).appendChild(month_name_el);
          }

          var day_el = document.createElement("div"),
              el_class = "day";

          // detecting holidays
          var _dow = (new Date(date.getYear() + "/" + month + "/" + day)).getDay();
          if (_dow === 4 || _dow === 5) {
            el_class += " holiday";
          }

          day_el.setAttribute("class", el_class);
          day_el.setAttribute("id", "d-" + day);
          day_el.innerHTML = day;
          $("m-" + month).appendChild(day_el);
        }
      }
    },


    book_dates: {

      draw: function (dates) {
        var i, j;

        // setting marks for booked days
        for (i = 0; i < dates.length; i++) {
          var date = new Date(dates[i]),
              month_el = $("m-" + (date.getMonth() + 1));

          for (j = 0; j < month_el.childNodes.length; j++) {
            var day = month_el.childNodes[j];
            if (day.getAttribute("id") === "d-" + (date.getDate())) {
              day.className = day.className + " booked";
            }
          }
        }

        // randomly coloring backgrounds for booked days
        var divs = document.getElementsByTagName("div"), 
            k;

        for (k = 0; k < divs.length; k++) {
          if (RegExp("booked").test(divs[k].className)) {
            var url = "images/booked-bg/" + (Math.floor(Math.random() * 7) + 1) + ".png";
            divs[k].style.backgroundImage = "url(" + url + ")";
          }
        }
      },


      initialize: function () {
        var request = window.XMLHttpRequest ? 
          new XMLHttpRequest() : 
          new ActiveXObject("Microsoft.XMLHTTP");

        request.open("GET", "booked_dates", true);
        request.send();
        request.onload = function () {
          calendar.book_dates.draw(
            request.responseText.split(/\n/).filter(function (i) {
              return i.length > 0;
            })
          );
        };
      }
    },


    initialize: function () {
      calendar.draw();
      calendar.book_dates.initialize();
    }
  };

}());
