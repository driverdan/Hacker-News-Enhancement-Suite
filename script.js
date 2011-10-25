(function(doc, undef) {
  var baseUrl = "https://raw.github.com/driverdan/Hacker-News-Enhancement-Suite/master/"
    , el = doc.createElement("script");
  el.setAttribute("src", "http://code.jquery.com/jquery.js");
  doc.body.appendChild(el);

  el.addEventListener("load", function() {
    var $ = jQuery.noConflict(true)
      // This is the main content section of the site
      , $main = $("table tr:eq(4) td:eq(0)")
      // Used for right hand content div
      , $content;

    // Setup layout and append content div
    $("table", $main)
    .addClass("main")
    .parent().append('<div id="content">');

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

    // Setup AJAX for top nav
    $(".pagetop a").click(function(e) {
      $.get(this.href, function(data) {
        $(".main").html($("table tr:eq(4) td:eq(0) tr", data));
      });
      return false;
    });

    // Open articles in new tabs and auto open comments
    $("a[href^='http']")
    .click(function(e) {
      if ($(this).parent().hasClass("title")) {
        $(this).parent().parent().next().find(".subtext a:eq(2)").click();
      }
    })
    .attr("target", "_blank");
  });

  // Add CSS
  el = doc.createElement("link");
  el.rel = "stylesheet";
  el.href = baseUrl + "style.css";
  doc.head.appendChild(el);
})(document);
