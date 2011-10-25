(function() {
  var s = document.createElement("script");
  s.setAttribute("src", "http://code.jquery.com/jquery.js");
  document.body.appendChild(s);

  s.addEventListener("load", function() {
    var $ = jQuery.noConflict()
      , $main = $("table tr:eq(4) td:eq(0)")
      , $content;

    // Add CSS rules
    $("<style>.selected {background:#ffec8b} a:visited{background:#ffe4cf}</style>").appendTo("head");

    // Setup layout and append content div
    $("table", $main)
    .css({width:"30%",float:"left"})
    .parent().append('<div id="content" style="margin:0 10px">');

    $content = $("#content");

    // Hijack internal clicks
    $("a[href^='item']").live("click", function(e) {
      var $this = $(this)
        , $topic = $this.parent().parent();

      // Highlight topic when link is clicked
      $("tr", $main).removeClass("selected");

      if ($this.parent().hasClass('subtext')) {
        $topic = $topic.prev();
      }
      $topic.addClass("selected");

      $content.html('<p>Please wait...</p>');
      $.get(this.href, function(data) {
        $content.html($("table tr:eq(4) td:eq(0)", data));
      });
      return false;
    });
  });
})();
