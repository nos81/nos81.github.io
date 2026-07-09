/* Single-page enhancements: scroll progress, sticky header, scroll-spy nav,
   reveal-on-scroll, hero parallax. The page is fully usable without this. */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var progress = document.querySelector(".progress");
  var hero = document.querySelector(".hero");
  var reduce = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (header) header.classList.toggle("is-stuck", y > 6);

    if (progress) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Subtle parallax on the hero glow.
  if (hero && !reduce) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY || window.pageYOffset;
      hero.style.setProperty("--py", (y * 0.15) + "px");
    }, { passive: true });
  }

  // Reveal-on-scroll for .reveal / .stagger.
  var items = document.querySelectorAll(".reveal, .stagger");
  if (items.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Scroll-spy: highlight the nav link for the section in view.
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var links = {};
  document.querySelectorAll('.nav a[href^="#"]').forEach(function (a) {
    links[a.getAttribute("href").slice(1)] = a;
  });
  if (sections.length && "IntersectionObserver" in window) {
    var current = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (current && links[current]) links[current].classList.remove("is-active");
          current = entry.target.id;
          if (links[current]) links[current].classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }
})();

/* Click-to-expand lightbox for the mountains gallery. */
(function () {
  "use strict";

  var gallery = document.querySelector(".gallery");
  if (!gallery) return;

  var tiles = Array.prototype.slice.call(gallery.querySelectorAll(".tile"));
  if (!tiles.length) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.setAttribute("aria-label", "Photo viewer");
  box.innerHTML =
    '<button class="lightbox__btn lightbox__close" type="button" aria-label="Close">×</button>' +
    '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous photo">‹</button>' +
    '<figure class="lightbox__stage">' +
      '<img class="lightbox__img" alt="">' +
      '<figcaption class="lightbox__caption"></figcaption>' +
    '</figure>' +
    '<button class="lightbox__btn lightbox__next" type="button" aria-label="Next photo">›</button>';
  document.body.appendChild(box);

  var imgEl  = box.querySelector(".lightbox__img");
  var capEl  = box.querySelector(".lightbox__caption");
  var closeB = box.querySelector(".lightbox__close");
  var prevB  = box.querySelector(".lightbox__prev");
  var nextB  = box.querySelector(".lightbox__next");
  var current = -1;
  var lastFocus = null;

  if (tiles.length < 2) { prevB.style.display = nextB.style.display = "none"; }

  function render(i) {
    current = (i + tiles.length) % tiles.length;
    var tile = tiles[current];
    var img = tile.querySelector("img");
    var b   = tile.querySelector("figcaption b");
    var s   = tile.querySelector("figcaption span");
    imgEl.setAttribute("src", img.getAttribute("src"));
    imgEl.setAttribute("alt", img.getAttribute("alt") || "");
    capEl.innerHTML = (b && b.textContent ? "<b>" + b.textContent + "</b>" : "") +
                      (s && s.textContent ? "<span>" + s.textContent + "</span>" : "");
  }

  function open(i) {
    lastFocus = document.activeElement;
    render(i);
    box.classList.add("is-open");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey, true);
    closeB.focus();
  }

  function close() {
    box.classList.remove("is-open");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey, true);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function onKey(e) {
    if (e.key === "Escape") { close(); }
    else if (e.key === "ArrowRight") { render(current + 1); }
    else if (e.key === "ArrowLeft") { render(current - 1); }
    else if (e.key === "Tab") {
      var visible = [closeB, prevB, nextB].filter(function (el) {
        return el.style.display !== "none";
      });
      e.preventDefault();
      var idx = visible.indexOf(document.activeElement);
      var dir = e.shiftKey ? -1 : 1;
      visible[(idx + dir + visible.length) % visible.length].focus();
    }
  }

  tiles.forEach(function (tile, i) {
    var trigger = tile.querySelector(".tile__frame");
    if (trigger) { trigger.addEventListener("click", function () { open(i); }); }
  });

  closeB.addEventListener("click", close);
  prevB.addEventListener("click", function () { render(current - 1); });
  nextB.addEventListener("click", function () { render(current + 1); });
  box.addEventListener("click", function (e) {
    if (!e.target.closest(".lightbox__img, .lightbox__btn, .lightbox__caption")) { close(); }
  });
})();


/* Light / dark theme toggle. This edition defaults to dark; the choice persists. */
(function () {
  "use strict";
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  var root = document.documentElement;
  var meta = document.querySelector('meta[name="theme-color"]');
  var COLORS = { light: "#fbfbfd", dark: "#070709" };

  function effective() {
    return root.getAttribute("data-theme") === "light" ? "light" : "dark";
  }
  function paint(theme) {
    btn.classList.toggle("is-dark", theme === "dark");
    btn.setAttribute("aria-pressed", String(theme === "dark"));
    btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    if (meta) meta.setAttribute("content", COLORS[theme]);
  }
  paint(effective());
  btn.addEventListener("click", function () {
    var next = effective() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    paint(next);
  });
})();
