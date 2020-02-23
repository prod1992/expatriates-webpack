import "./scss/homepage.scss";

import "bootstrap-sass/assets/javascripts/bootstrap/transition";
import "bootstrap-sass/assets/javascripts/bootstrap/dropdown";
import "bootstrap-sass/assets/javascripts/bootstrap/collapse";

import "jquery-ui/ui/widgets/autocomplete";
import "./js/autocomplete";
import "./js/header";

(function() {
  // INPUTS WITH CLEAR
  $(".form-group.has-clear").each(function() {
    var $el = $(this),
      $input = $el.find("input:text"),
      $clearBtn = $('<span class="clear-btn exp-icon-close"></span>');
    $el.prepend($clearBtn);
    $input.on("input", function() {
      if (!!this.value) {
        $el.addClass("has-value");
      } else {
        $el.removeClass("has-value");
      }
    });
    $clearBtn.on("click", function(e) {
      e.preventDefault();
      $input.val("").trigger("input");
      $input.trigger("input:clear");
    });
  });
  $(document)
    .on("click", ".categories_dropdown [data-value] a", function(e) {
      console.log(e);
      e.preventDefault();
      var cTitle = $(this).text(),
        cId = $(this)
          .parent()
          .data("value"),
        $input = $(this)
          .parents(".form-group")
          .find("input"),
        $btn = $(this)
          .parents(".form-group")
          .find(".form-control:not(input)"),
        $dropdown = $(this)
          .parents(".form-group")
          .find("[data-toggle='dropdown']");
      $btn.text(cTitle);
      $input.val(cId);
      $dropdown.dropdown("toggle");
    })
    .on("click", ".dropdown-submenu > a", function(e) {
      e.preventDefault();
      if (ww < 768) {
        e.stopPropagation();
        if (
          $(this)
            .parents(".dropdown-submenu")
            .hasClass("open")
        ) {
          $(this)
            .parents(".dropdown-submenu")
            .removeClass("open");
          return;
        }
        $(this)
          .parents(".dropdown-menu")
          .find(".dropdown-submenu")
          .removeClass("open");
        $(this)
          .parents(".dropdown-submenu")
          .addClass("open");
      }
    });

  $(".category_box .collapse")
    .on("show.bs.collapse", function() {
      $(this)
        .parents(".category_box")
        .addClass("is_expanded");
    })
    .on("hide.bs.collapse", function() {
      $(this)
        .parents(".category_box")
        .removeClass("is_expanded");
    });
})();
