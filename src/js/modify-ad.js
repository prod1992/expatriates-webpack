(function() {
  if ($(".modify-ad").length) {
    $(window).on("scroll", function() {
      if (
        $(window).scrollTop() >=
        $("footer").offset().top - $(window).height()
      ) {
        $(".modify-ad").addClass("hold-actions");
      } else {
        $(".modify-ad").removeClass("hold-actions");
      }
    });
  }
  $("#removeAd").on("show.bs.modal", function(event) {
    var button = $(event.relatedTarget);
    var unit = button.data("unit");
    var modal = $(this);
    modal.find("#unit").text(unit);
  });
})();
