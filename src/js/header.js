(function() {
  const $menuToggler = $(".menu_toggler");
  $menuToggler.on("click", function(e) {
    e.preventDefault();
    $("body").toggleClass("nav-open");
  });
})();
