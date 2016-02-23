/**
 * Hacker News Enhancement Suite
 *
 * Enhance the HN experience.
 *
 * @copyright 2011 passive.ly LLC
 * @license   MIT
 * @author    Dan DeFelippi <dan at driver dan dot com>
 */

(function(doc, undef) {
  // hnes is the app's namespace
  var hnes = {}
    , el = doc.createElement("script");

  // Base URL to HNES files
  hnes.baseUrl = "https://raw.github.com/driverdan/Hacker-News-Enhancement-Suite/master/"

  // Gets some jQueries
  el.setAttribute("src", "https://code.jquery.com/jquery.js");

  // When jQuery is ready run that shit
  // If your browser doesn't support addEventListener you shouldn't be reading HN
  el.addEventListener("load", function() {
    hnes.load();
  });
  doc.body.appendChild(el);

  // Append CSS file
  el = doc.createElement("link");
  el.rel = "stylesheet";
  el.href = hnes.baseUrl + "style.css";
  doc.head.appendChild(el);

  /**
   * Initializes hnes
   */
  hnes.load = function() {
    var $ = jQuery.noConflict(true)
      // This is the main content section of the site
      , $main = $("table tr:eq(4) td:eq(0)")
      // Used for right hand content div
      , $content;

    // Setup layout and append content div
    $("table", $main)
    .addClass("main")
    .parent().append('<div id="content">');

    // Cache the content div
    $content = $("#content");

    // Intercept all link clicks and process at runtime.
    // This allows handling changed content without rebinding.
    $("a").live("click", function(e) {
      var $this = $(this)
        , href = $this.attr("href")
        , $topic;

      // Internal content/comment links are loaded to content div
      if (href.indexOf("item") === 0) {
        $topic = $this.parent().parent();

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
      }

      // Handle top navigation links
      if ($this.parent().hasClass("pagetop")) {
        $.get(this.href, function(data) {
          $(".main").html($("table tr:eq(4) td:eq(0) tr", data));
          $content.empty();
        });
        return false;
      }

      // Open articles in new tabs and auto open comments
      if ($this.parent().hasClass("title")) {
        $this.parent().parent().next().find(".subtext a:eq(2)").click();
      }
    });

    // Open external links in new tabs
    $("a[href^='http']").attr("target", "_blank");
  };
})(document);
