import "css-loader!owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";

(function() {
  const $wrapper = $(".single_ad .slider-wrapper"),
    $owl = $wrapper.find(".single_ad__slider"),
    $dotsWrapper = $(".owl-dots"),
    $modal = $("#adsSliderModal");
  // prevent running if there is no single ad slider
  if (!$owl.length) {
    return;
  }

  $owl.on("initialize.owl.carousel", function() {
    $owl.parent().addClass("is-loading");
  });
  $owl.on("initialized.owl.carousel", function() {
    setTimeout(function() {
      $owl.parent().removeClass("is-loading");
    }, 1000);
  });
  // AD PAGE SLIDERl
  initOwlWithThumbs($owl, function() {
    $owl.owlCarousel({
      items: 1,
      nav: true,
      navText: [
        '<i class="exp-icon-chevron-left"></i>',
        '<i class="exp-icon-chevron-right"></i>'
      ],
      loop: true,
      dots: true,
      dotsData: true,
      dotsContainer: $owl.parent().find(".owl-dots")
    });
  });
  $modal
    .on("show.bs.modal", function() {
      var $currentIndex = $owl.data("owl.carousel")._current - 1;
      $modal.addClass("is-loading");
      $modal.find(".owl-carousel").owlCarousel({
        items: 1,
        nav: true,
        navText: [
          '<i class="exp-icon-chevron-left"></i>',
          '<i class="exp-icon-chevron-right"></i>'
        ],
        loop: true,
        dots: false,
        startPosition: $currentIndex - 1,
        onInitialized: function() {
          setTimeout(function() {
            $modal.removeClass("is-loading");
          }, 500);
        }
      });
    })
    .on("hidden.bs.modal", function() {
      $modal.find(".owl-carousel").trigger("destroy.owl.carousel");
    });

  function initOwlWithThumbs(owl, callback) {
    owl.find(".one_slide").each(function(i, el) {
      let $dot = $('<button role="button" class="owl-dot"></button>').append(
        $(el)
          .find("img")
          .clone()
      );
      $dotsWrapper.append($dot);
    });
    owl.after($dotsWrapper);
    if (callback && typeof callback === "function") {
      callback();
    }
  }
})();
