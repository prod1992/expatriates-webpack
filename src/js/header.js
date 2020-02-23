(function() {
  const $menuToggler = $(".menu_toggler");
  const $darkOverlay = $(".dark-overlay");
  $menuToggler.on("click touchend", function(e) {
    e.preventDefault();
    $("body").toggleClass("nav-open");
  });
  $darkOverlay.on("click touchend", function() {
    $("body").removeClass("nav-open");
  });
})();
