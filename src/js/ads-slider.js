(function() {
  var $el = $(".ads_slider__self"),
    $path = $el.data("path");
  $(window).on("load", function() {
    var $owl;
    $owl = $el.owlCarousel({
      items: 3,
      margin: 0,
      navText: [
        '<i class="exp-icon-chevron-left"></i>',
        '<i class="exp-icon-chevron-right"></i>'
      ],
      autoWidth: true,
      nav: false,
      lazyLoad: true,
      path: $path,
      dragEndSpeed: 200,
      dots: false,
      // Ad Favourite can be enabled/disabled here (default: enabled)

      responsive: {
        "768": {
          autoWidth: false,
          items: 4,
          margin: 5,
          loop: true,
          nav: true,
          infinite: true
        },
        "992": {
          autoWidth: false,
          margin: 5,
          items: 5,
          nav: true,
          loop: true,
          infinite: true
        },
        "1200": {
          autoWidth: false,
          items: 6,
          margin: 20,
          loop: true,
          nav: true,
          infinite: true
        }
      },
      slideBuilder: function slideBuilder(i, url, imgSrc, descr, alt) {
        var _owlData = $owl.data("owl.carousel");
        var _items = _owlData.settings.items;
        // ENABLES/DISABLES STAR
        var $slideEl = $("<figure>");
        $slideEl.addClass("ad_box");
        var $slideAnchor = $("<a>");
        $slideAnchor.attr("title", alt).attr("href", url);
        var buildPicture = function() {
          if (i < _items) {
            return $(
              '<div class="image_self" style="background-image: url(' +
                imgSrc +
                ')">'
            ).append('<img src="' + imgSrc + '">');
          }
          return $(
            '<div class="image_self owl-lazy" data-src="' + imgSrc + '">'
          ).append('<img data-src="' + imgSrc + '">');
        };
        var $imgPicture = buildPicture();
        var $imgHtml = $('<div class="image_holder">').append($imgPicture);
        var $descrHtml = $('<div class="ad_descr"></div>').append(
          $("<p>").html(descr)
        );
        $slideAnchor.append($imgHtml, $descrHtml);
        $slideAnchor.appendTo($slideEl);
        return $slideEl;
      },
      onSuccess: function(res) {
        var items = res.data.list;
        var baseUrl = "https://www.expatriates.com";
        var $slideHtml, _alt, _descr, _fav, _imgSrc, _url;
        if (items && items.length) {
          $.each(items, function(i) {
            if (items.hasOwnProperty(i)) {
              _alt = items[i].alt;
              _descr = items[i].alt;
              _fav = !!items[i].fav;
              _imgSrc = baseUrl + items[i].img;
              _url = items[i].url;
              $slideHtml = $owl
                .data("owl.carousel")
                .options.slideBuilder(i, _url, _imgSrc, _descr, _alt, _fav);
              $owl.trigger("add.owl.carousel", $slideHtml);
            }
          });
        }
      },
      onError: function(error) {
        console.log(error);
      }
    });
    (function() {
      var blockMenuHeaderScroll = false,
        lastY;
      $(window).on("touchstart", function(e) {
        if ($(e.target).closest(".ads_slider__self").length === 1) {
          blockMenuHeaderScroll = true;
        }
      });
      $(window).on("touchend", function() {
        blockMenuHeaderScroll = false;
      });
      $(window).on("touchmove", function(e) {
        if (blockMenuHeaderScroll) {
          var currentY = e.originalEvent.touches[0].clientY;
          if (lastY !== currentY) {
            e.preventDefault();
          }
          lastY = currentY;
        }
      });

      var waves = 0;

      $("body").on("click touchend", ".owl-nav > div", function(e) {
        if (waves) {
          return;
        }

        var $btn = $(this);

        var $el = $("<div></div>");
        $el
          .addClass("wave")
          .css({
            left: e.offsetX,
            top: e.offsetY
          })
          .appendTo($btn);

        var $wave = $btn.find(".wave");

        $wave.parent().addClass("waving");
        $wave.parent().append($wave);
        waves++;
        setTimeout(function() {
          $wave.parent().removeClass("waving");
          $wave.remove();
          waves = 0;
        }, 500);
      });
    })();
  });
})();
