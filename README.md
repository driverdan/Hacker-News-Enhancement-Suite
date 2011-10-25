# Hacker News Enhancement Suite
## What is?

In the spirit of Reddit Enhancement Suite comes the Hacker News
Enhancement Suite (HNES). The goal is to enhance the user experience of using
HN.

## How to use?

HNES is currently a bookmarklet. Use the following as a bookmark URL:

        javascript:(function(d,t){var j=d.createElement(t),s=d.getElementsByTagName(t)[0]||d.getElementsByTagName("link")[0];j.src='https://raw.github.com/driverdan/Hacker-News-Enhancement-Suite/master/script.js';s.parentNode.insertBefore(j,s);})(document,"script");

Run this on the [Hacker News homepage](http://news.ycombinator.com/news).

All internal links are loaded using XHR so no worries about reloading
the bookmarklet constantly.

## License?

Copyright 2011 passive.ly LLC.

Licensed under MIT.

## Who?

Created by [Dan DeFelippi](http://driverdan.com).
