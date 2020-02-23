import "./scss/homepage.scss";
import "bootstrap-sass/assets/javascripts/bootstrap/dropdown";
import "jquery-ui/ui/widgets/autocomplete";
import "./js/autocomplete";
import "./js/header";

(function() {
  $(document).on("click", ".categories_dropdown [data-value] a", function(e) {
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
  });
})();
