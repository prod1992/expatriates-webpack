$.ui.autocomplete.prototype._renderItem = function(ul, item) {
  var re = new RegExp("^" + this.term, "i");
  var t = item.label.replace(
    re,
    "<span class='matched'>" + this.term + "</span>"
  );
  return $("<li>")
    .attr("data-value", item.label)
    .append(t)
    .appendTo(ul);
};
var _options = {
  delay: 200,
  create: function(e) {
    var $el = $(e.target),
      valueData = $el.data("value"),
      defaultValue = $el.data("defaultvalue");

    if (!!valueData) {
      $(
        "<input type='hidden' id='" +
          valueData +
          "' name='" +
          valueData +
          "' value='" +
          defaultValue +
          "'/>"
      ).appendTo($el.parent());
    }
  },
  select: function(e, ui) {
    e.preventDefault();
    var item = ui.item,
      $itemsEl = $(e.currentTarget),
      $inputEl = $(e.target);
    $itemsEl.find("li").removeClass("ui-state-focus");
    $itemsEl
      .find('li[data-value="' + item.label + '"]')
      .addClass("ui-state-focus");
    $inputEl.val(item.label);
    if (typeof $(e.target).data("value") !== "undefined") {
      var $valueEl = $("#" + $(e.target).data("value"));
      $valueEl.val(item.value);
    }
  },
  close: function(e) {
    var $itemsEl = $(e.currentTarget);
    $itemsEl.find("li.ui-state-focus").removeClass("ui-state-focus");
  },
  focus: function(e, ui) {
    e.preventDefault();
    var item = ui.item,
      $valueEl = $("#" + $(e.target).data("value"));
    $(e.currentTarget)
      .find("li")
      .removeClass("ui-state-focus");
    $(e.currentTarget)
      .find('li[data-value="' + item.label + '"]')
      .addClass("ui-state-focus");
    $valueEl.val(item.value);
  },
  search: function(e) {
    var _src = $(e.target).data("source");
    // get current input value
    var sValue = $(e.target).val(),
      re = new RegExp("^" + this.term, "i");
    // init new search array
    var arr = [];
    // for each element in the main array ...
    $(_src).each(function(i, el) {
      // ... if element starts with input value ...
      if (
        el.label.substr(0, sValue.length).toLowerCase() == sValue.toLowerCase()
      ) {
        // ... add element
        arr.push(el);
      }
    });
    // change search array
    $(e.target).autocomplete("option", "source", arr);
  }
};

$("input.autocomplete")
  .each(function(i, el) {
    var $el = $(el);
    _options.source = $el.data("source");
    $el.autocomplete(_options);
  })
  .on("input:clear", function(e) {
    console.log(e);
    $(this)
      .parent()
      .find("input")
      .val(null);
  });
