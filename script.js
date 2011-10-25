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
  el.setAttribute("src", "http://code.jquery.com/jquery.js");

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
    hnes.$ = jQuery.noConflict(true);
    // This is the main content section of the site
    hnes.$main = hnes.$("table tr:eq(4) td:eq(0)");
    // Used for right hand content div
    hnes.$content;

    // Setup layout and append content div
    hnes.$("table", hnes.$main)
    .addClass("main")
    .parent().append('<div id="content">');

    // Cache the content div
    hnes.$content = hnes.$("#content");

    // Intercept all link clicks and process at runtime.
    // This allows handling changed content without rebinding.
    hnes.$("a").live("click", function(e) {
      hnes.clickedLink.call(this, e);
    });

    // Open external links in new tabs
    hnes.$("a[href^='http']").attr("target", "_blank");
  };

  /**
   * Action to take when a link is clicked.
   */
  hnes.clickedLink = function(e) {
    var $this = hnes.$(this)
      , $topic;

    // Internal content/comment links are loaded to content div
    if (this.href.indexOf("item") === 0) {
      $topic = $this.parent().parent();

      // Highlight topic when link is clicked
      hnes.$("tr", hnes.$main).removeClass("selected");

      if ($this.parent().hasClass('subtext')) {
        $topic = $topic.prev();
      }
      $topic.addClass("selected");

      hnes.$content.html('<p>Please wait...</p>');
      hnes.$.get(this.href, function(data) {
        hnes.$content.html(hnes.$("table tr:eq(4) td:eq(0)", data));
      });
      return false;
    }

    // Handle top navigation links
    if ($this.parent().hasClass("pagetop")) {
      hnes.$.get(this.href, function(data) {
        hnes.$(".main").html(hnes.$("table tr:eq(4) td:eq(0) tr", data));
        hnes.$content.empty();
      });
      return false;
    }

    // Open articles in new tabs and auto open comments
    if ($this.parent().hasClass("title")) {
      $this.parent().parent().next().find(".subtext a:eq(2)").click();
    }
  };
})(document);
