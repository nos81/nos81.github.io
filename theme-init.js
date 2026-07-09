/* Runs before first paint (loaded blocking in <head>): applies the saved theme
   so there is no flash of the wrong colours, and flags that JS is available so
   the progressive-enhancement styles (scroll reveal) can engage. Kept separate
   so the Content-Security-Policy can forbid inline scripts. This edition
   defaults to dark; only an explicit choice sets data-theme. */
(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t === "dark" || t === "light") {
      document.documentElement.setAttribute("data-theme", t);
    }
  } catch (e) {}
  document.documentElement.classList.add("js");
})();
