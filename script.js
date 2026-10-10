/* ==========================================================
   KAYGRAFIXDESIGN — script.js
   PART A (Stage 3): hero carousel + selected-project state
   PART B (Stage 4): filters, lightbox, nav, reveals, counters, form
   Data comes from data.js (window.KAY_HERO / KAY_PORTFOLIO).
   ========================================================== */
(function () {
  "use strict";
  if (window.__kayHeroInit) return; // run once only
  window.__kayHeroInit = true;
  var hero = document.getElementById("home");
  var stage = document.getElementById("carStage");
  var carousel = document.getElementById("carousel");
  var items = window.KAY_HERO || [];
  if (!hero || !stage || !items.length) return;

  var N = items.length;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var mqMobile = window.matchMedia("(max-width: 767px)");
  var AUTOPLAY_MS = 4000;

  var $ = function (id) { return document.getElementById(id); };
  var el = {
    count: $("carCount"), dots: $("carDots"), prev: $("carPrev"), next: $("carNext"),
    cat: $("hpCat"), title: $("hpTitle"), desc: $("hpDesc"), services: $("hpServices"),
    yearWrap: $("hpYearWrap"), year: $("hpYear"), img: $("hpImg"), imgCount: $("hpCount"),
    view: $("hpView"), back: $("hpBack")
  };
  var pad = function (n) { return String(n).padStart(2, "0"); };

  var active = 0, selected = false, cards = [], dots = [];
  var timer = null, hovering = false, focusing = false, dragging = false, inView = true;

  /* ── Build cards + dots ── */
  items.forEach(function (it, i) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "car-card";
    b.setAttribute("role", "group"); b.setAttribute("aria-roledescription", "slide");
    b.setAttribute("aria-label", (i + 1) + " of " + N + ": " + it.title + ", " + it.categoryLabel);
    b.style.setProperty("--o", 0); b.style.setProperty("--s", ".6");
    var im = new Image();
    im.src = it.image; im.alt = it.title + " — " + it.categoryLabel + " design by Kaygrafixdesign";
    im.width = it.w; im.height = it.h; im.decoding = "async"; im.draggable = false;
    if (i > 4) im.loading = "lazy";
    b.appendChild(im);
    b.addEventListener("click", function () {
      if (dragging) return;
      go(i); openProject(); restartTimer();
    });
    stage.appendChild(b); cards.push(b);

    var d = document.createElement("button");
    d.type = "button"; d.setAttribute("aria-label", "Show design " + (i + 1));
    d.addEventListener("click", function () { go(i); restartTimer(); });
    el.dots.appendChild(d); dots.push(d);
  });

  /* ── Layout: every card gets CSS vars; CSS does the transform ── */
  function offset(i) { var d = (i - active) % N; if (d > N / 2) d -= N; if (d < -N / 2) d += N; return d; }

  function pose(d) {
    var a = Math.abs(d), s = d < 0 ? -1 : 1, mob = mqMobile.matches;
    if (selected) { // small thumbnail strip under the project
      var max = mob ? 2 : 4;
      if (a > max) return { dx: s * (max + 1) * 1.15, o: 0, s: .6, z: 0, b: .5, r: 0, ry: 0, dy: 0 };
      return { dx: d * 1.18, dy: 0, r: 0, ry: 0, s: d === 0 ? 1.15 : .88, o: d === 0 ? 1 : Math.max(.25, .8 - a * .17), z: 10 - a, b: d === 0 ? 1 : .6 };
    }
    var t = [ // straight line: no rotation, no vertical offset
      { dx: 0,    s: 1.1,  o: 1,   b: 1,   z: 10 },
      { dx: 1.12, s: .88,  o: .9,  b: .75, z: 8 },
      { dx: 2.05, s: .76,  o: .6,  b: .55, z: 6 },
      { dx: 2.85, s: .66,  o: .3,  b: .4,  z: 4 }
    ];
    var vis = mob ? 1 : 3;
    if (a > vis) return { dx: s * (vis + .9), dy: 0, r: 0, ry: 0, s: .5, o: 0, b: .4, z: 0 };
    var p = t[a];
    return { dx: s * p.dx, dy: 0, r: 0, ry: 0, s: p.s, o: p.o, b: p.b, z: p.z };
  }

  function layout() {
    cards.forEach(function (c, i) {
      var d = offset(i), p = pose(d), st = c.style;
      st.setProperty("--dx", p.dx); st.setProperty("--dy", p.dy);
      st.setProperty("--r", p.r + "deg"); st.setProperty("--ry", p.ry + "deg");
      st.setProperty("--s", p.s); st.setProperty("--o", p.o);
      st.setProperty("--z", p.z); st.setProperty("--b", p.b);
      var on = d === 0;
      c.classList.toggle("active", on);
      c.tabIndex = on ? 0 : -1;
      if (on) c.setAttribute("aria-current", "true"); else c.removeAttribute("aria-current");
      c.setAttribute("aria-hidden", p.o === 0 ? "true" : "false");
    });
    dots.forEach(function (d, i) { d.classList.toggle("on", i === active); if (i === active) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current"); });
    el.count.textContent = pad(active + 1) + " / " + pad(N);
    hero.style.setProperty("--bg-img", 'url("' + items[active].image + '")');
  }

  /* ── Navigation ── */
  function go(i) {
    active = (i + N) % N;
    layout();
    if (selected) fillProject(true);
  }
  function step(n) { go(active + n); restartTimer(); }

  /* ── Selected-project state ── */
  function fillProject(animate) {
    var it = items[active];
    var apply = function () {
      el.img.src = it.image;
      el.img.alt = it.title + " — " + it.categoryLabel + " design by Kaygrafixdesign";
      el.img.onload = function () { el.img.classList.remove("swap"); };
      if (el.img.complete) el.img.classList.remove("swap");
    };
    el.cat.textContent = it.categoryLabel;
    el.title.textContent = it.title;
    el.desc.textContent = it.description;
    el.services.textContent = (it.services || []).join(" · ");
    el.yearWrap.hidden = !it.year; if (it.year) el.year.textContent = it.year;
    el.imgCount.textContent = pad(active + 1) + " / " + pad(N);
    if (animate && !reduce) { el.img.classList.add("swap"); setTimeout(apply, 260); } else apply();
  }

  function openProject() {
    if (selected) return;
    selected = true; fillProject(false);
    hero.classList.add("is-selected");
    layout(); stopTimer();
  }
  function closeProject() {
    if (!selected) return;
    selected = false;
    hero.classList.remove("is-selected");
    layout(); restartTimer();
  }
  el.back.addEventListener("click", closeProject);
  el.view.addEventListener("click", function () {
    var it = items[active];
    if (typeof window.KayOpenLightbox === "function") window.KayOpenLightbox(it.id);
    else window.location.hash = "work";
  });

  /* ── Autoplay (5–7s; paused on hover / focus / drag / hidden tab / selected) ── */
  function stopTimer() { clearTimeout(timer); timer = null; }
  function restartTimer() {
    stopTimer();
    if (reduce || selected || hovering || focusing || dragging || !inView || document.hidden) return;
    timer = setTimeout(function () { go(active + 1); restartTimer(); }, AUTOPLAY_MS);
  }
  var PAUSE_ON_HOVER = false; // set to true if you want hovering to pause the carousel
  carousel.addEventListener("mouseenter", function () { if (PAUSE_ON_HOVER) { hovering = true; stopTimer(); } });
  carousel.addEventListener("mouseleave", function () { hovering = false; restartTimer(); });
  carousel.addEventListener("focusin", function () { focusing = true; stopTimer(); });
  carousel.addEventListener("focusout", function () { focusing = false; restartTimer(); });
  document.addEventListener("visibilitychange", restartTimer);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { inView = e[0].isIntersecting; restartTimer(); }, { threshold: .25 }).observe(hero);
  }

  /* ── Buttons ── */
  el.prev.addEventListener("click", function () { step(-1); });
  el.next.addEventListener("click", function () { step(1); });

  /* ── Keyboard (arrows anywhere in the hero, Esc closes the project) ── */
  hero.addEventListener("keydown", function (e) {
    var tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
    if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
  });
  document.addEventListener("keydown", function (e) {
    var lb = $("lb");
    if (e.key === "Escape" && selected && !(lb && lb.classList.contains("open"))) closeProject();
  });

  /* ── Drag / swipe (no pointer capture, so card clicks still work) ── */
  var sx = 0, sy = 0, down = false, moved = false;
  carousel.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    down = true; moved = false; sx = e.clientX; sy = e.clientY;
  });
  window.addEventListener("pointermove", function (e) {
    if (!down) return;
    var dx = e.clientX - sx;
    if (!moved && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(e.clientY - sy)) {
      moved = true; dragging = true; carousel.classList.add("dragging"); stopTimer();
    }
  });
  function endDrag(e, cancelled) {
    if (!down) return; down = false;
    var dx = e.clientX - sx;
    carousel.classList.remove("dragging");
    if (moved && !cancelled && Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    setTimeout(function () { dragging = false; restartTimer(); }, 60); // lets the trailing click be ignored
  }
  window.addEventListener("pointerup", function (e) { endDrag(e, false); });
  window.addEventListener("pointercancel", function (e) { endDrag(e, true); });

  /* ── Responsive re-layout ── */
  if (mqMobile.addEventListener) mqMobile.addEventListener("change", layout);

  /* ── Init: cards start stacked & hidden, then fan out ── */
  layout.call(null);
  cards.forEach(function (c) { c.style.setProperty("--o", 0); c.style.setProperty("--s", ".6"); c.style.setProperty("--dx", 0); });
  requestAnimationFrame(function () { requestAnimationFrame(function () { layout(); restartTimer(); }); });

  window.KayHero = { go: go, open: openProject, close: closeProject };
})();

/* ==========================================================
   PART B (Stage 4)
   ========================================================== */
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var pad = function (n) { return String(n).padStart(2, "0"); };
  /* Placeholder for any missing image (also used by the brand folders) */
  var PH = "data:image/svg+xml;utf8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#111"/><rect x="14" y="14" width="372" height="272" fill="none" stroke="#d3af37" stroke-opacity=".35" stroke-dasharray="6 6"/><text x="200" y="146" text-anchor="middle" fill="#d3af37" font-family="Montserrat,Arial,sans-serif" font-size="16" letter-spacing="3">ADD IMAGE</text><text x="200" y="172" text-anchor="middle" fill="#9a9385" font-family="Arial,sans-serif" font-size="11">Placeholder</text></svg>');
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && !t.dataset.ph) { t.dataset.ph = "1"; t.src = PH; }
  }, true);
  root.classList.add("js");

  /* ── Scroll reveals ── */
  var revealEls = [].slice.call(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !reduce) {
    var ro = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
    }, { threshold: .1, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (e) { ro.observe(e); });
  } else revealEls.forEach(function (e) { e.classList.add("in"); });

  /* ── Nav: scrolled state, active link, mobile menu ── */
  var nav = $("nav"), burger = $("burger"), links = $("navLinks");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  var navAnchors = [].slice.call(links.querySelectorAll("a[href^='#']"));
  var secs = ["home", "about", "work", "reviews", "contact"].map($).filter(Boolean);
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        navAnchors.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach(function (s) { so.observe(s); });
  }
  function setMenu(open) {
    links.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  burger.addEventListener("click", function () { setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  links.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    document.addEventListener("click", function (e) { if (!nav.contains(e.target)) setMenu(false); }); // click outside closes
  window.addEventListener("scroll", function () { if (links.classList.contains("open")) setMenu(false); }, { passive: true }); // scrolling closes

  /* ── Counters ── */
  var counters = [].slice.call(document.querySelectorAll(".count"));
  function runCount(el) {
    var target = +el.dataset.target, dur = 1600, t0 = null;
    if (reduce) { el.textContent = target; return; }
    (function tick(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    })(performance.now());
  }
  if ("IntersectionObserver" in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
    }, { threshold: .6 });
    counters.forEach(function (c) { co.observe(c); });
  } else counters.forEach(function (c) { c.textContent = c.dataset.target; });

  /* ── Portfolio: filters + editorial grid ── */
  var ALL = window.KAY_PORTFOLIO || [], CATS = window.KAY_CATEGORIES || [];
  var grid = $("grid"), filtersEl = $("filters"), moreBtn = $("moreBtn"), countEl = $("workCount");
  var GRIDALL = ALL.filter(function (x) { return x.category !== "branding"; }); // branding now lives in the brand folder
  var PAGE = 16, shown = PAGE, current = "all", filtered = GRIDALL.slice();
  var ROW = 8, GAP = 16, PAD_B = 16;

  CATS.forEach(function (c) {
    var n = c.id === "all" ? GRIDALL.length : c.id === "branding" ? (window.KAY_BRANDS || []).length : ALL.filter(function (x) { return x.category === c.id; }).length;
    if (!n) return;
    var b = document.createElement("button");
    b.type = "button"; b.dataset.cat = c.id; b.setAttribute("aria-pressed", c.id === "all");
    b.textContent = c.label + " · " + n;
    b.addEventListener("click", function () { setFilter(c.id); });
    filtersEl.appendChild(b);
  });

  var BRANDS = window.KAY_BRANDS || [];
  var bv = $("brandsView"), bList = $("brandList"), bDetail = $("brandDetail"), crumbsEl = $("crumbs");
  var FOLDER_RATIO = 1.6; // folder card width / height (matches the CSS aspect-ratio 16/10)
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function scrollWork() { $("work").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }

  function isWide(it) { return it.w / it.h > 1.45; }
  function cols() { var t = getComputedStyle(grid).gridTemplateColumns.split(" ").length; return t || 1; }

  function spans() { // set row-span for every card from known image dimensions
    var n = cols(), gw = grid.clientWidth, cw = (gw - GAP * (n - 1)) / n;
    [].forEach.call(grid.children, function (node) {
      var w = (node.classList.contains("w2") && n > 1) ? cw * 2 + GAP : cw, h;
      if (node.classList.contains("folder")) h = w / FOLDER_RATIO;
      else { var it = ALL[+node.dataset.idx]; h = w * it.h / it.w; }
      node.style.setProperty("--rs", Math.ceil((h + PAD_B) / ROW));
    });
  }

  function folderCard() {
    var designs = BRANDS.reduce(function (t, b) { return t + b.images.length; }, 0);
    var b = document.createElement("button");
    b.type = "button"; b.className = "item folder w2";
    b.setAttribute("aria-label", "Open Branding — " + BRANDS.length + " brands");
    b.innerHTML = '<figure><div class="fold-stack">' + BRANDS.slice(0, 3).map(function (br, i) {
      return '<img class="fs fs' + i + '" loading="lazy" decoding="async" src="' + esc(br.cover) + '" alt="">';
    }).join("") + '</div><div class="fold-cap"><small>Branding</small><b>Brand Collections</b><span>' +
      BRANDS.length + " brands · " + designs + " designs</span></div></figure>";
    return b;
  }

  function render(animate) {
    grid.innerHTML = "";
    var list = filtered.slice(0, shown), frag = document.createDocumentFragment();
    if (current === "all" && BRANDS.length) {
      var f = folderCard(); if (animate && !reduce) f.classList.add("enter"); frag.appendChild(f);
    }
    list.forEach(function (it, i) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "item" + (isWide(it) ? " w2" : "");
      b.dataset.idx = ALL.indexOf(it); b.dataset.id = it.id;
      b.setAttribute("aria-label", "View " + it.title + " — " + it.categoryLabel);
      if (animate && !reduce) { b.classList.add("enter"); b.style.setProperty("--d", Math.min(i % 16, 12) * .04 + "s"); }
      b.innerHTML = '<figure><img loading="lazy" decoding="async" width="' + it.w + '" height="' + it.h + '" src="' + it.image +
        '" alt="' + it.title.replace(/"/g, "&quot;") + " — " + it.categoryLabel + ' design"><div class="ov"><small>' + it.categoryLabel + "</small><b>" + it.title + "</b></div></figure>";
      frag.appendChild(b);
    });
    grid.appendChild(frag); spans();
    var rem = filtered.length - list.length;
    moreBtn.parentNode.hidden = rem <= 0;
    moreBtn.textContent = "Load More · " + rem + " remaining";
    var label = current === "all" ? "" : " in " + (window.KAY_CATEGORY_META[current] || {}).label;
    countEl.textContent = "Showing " + list.length + " of " + filtered.length + " projects" + label;
  }

  function setFilter(id) {
    [].forEach.call(filtersEl.children, function (b) { b.setAttribute("aria-pressed", b.dataset.cat === id); });
    if (id === "branding") { showBrands(); return; }
    current = id; shown = PAGE;
    filtered = id === "all" ? GRIDALL.slice() : GRIDALL.filter(function (x) { return x.category === id; });
    bv.hidden = true; grid.hidden = false; countEl.hidden = false;
    if (reduce) { render(false); return; }
    grid.style.transition = "opacity .25s"; grid.style.opacity = 0;
    setTimeout(function () { render(true); grid.style.opacity = 1; }, 250);
  }
  moreBtn.addEventListener("click", function () {
    var before = shown + (grid.querySelector(".folder") ? 1 : 0); shown += 12; render(false);
    var nodes = grid.children; // soft-enter only the new ones
    for (var i = before; i < nodes.length && !reduce; i++) { nodes[i].classList.add("enter"); nodes[i].style.setProperty("--d", (i - before) * .04 + "s"); }
    var first = nodes[before]; if (first) first.focus({ preventScroll: true });
  });
  grid.addEventListener("click", function (e) {
    var it = e.target.closest(".item"); if (!it) return;
    if (it.classList.contains("folder")) { setFilter("branding"); scrollWork(); }
    else openLB(it.dataset.id, it);
  });
  if (grid && ALL.length) {
    render(false);
    if ("ResizeObserver" in window) new ResizeObserver(function () { spans(); }).observe(grid);
    else window.addEventListener("resize", spans);
  }

  /* ── Lightbox ── */
  var lb = $("lb"), lbImg = $("lbImg"), lbStage = $("lbStage"), lbList = [], lbI = 0, lastFocus = null;
  function lbShow(i, animate) {
    lbI = (i + lbList.length) % lbList.length;
    var it = lbList[lbI];
    var apply = function () {
      lbImg.src = it.image; lbImg.alt = it.title + " — " + it.categoryLabel + " design by Kaygrafixdesign";
      lbImg.onload = function () { lbImg.classList.remove("swap"); };
      if (lbImg.complete) lbImg.classList.remove("swap");
    };
    $("lbCat").textContent = it.categoryLabel; $("lbTitle").textContent = it.title;
    $("lbCount").textContent = pad(lbI + 1) + " / " + pad(lbList.length);
    if (animate && !reduce) { lbImg.classList.add("swap"); setTimeout(apply, 220); } else apply();
    [1, -1].forEach(function (d) { var n = lbList[(lbI + d + lbList.length) % lbList.length]; (new Image()).src = n.image; });
  }
  function openLBList(list, idx, from) {
    if (!list.length || idx < 0) return;
    lbList = list; lastFocus = from || document.activeElement;
    lb.hidden = false; void lb.offsetWidth; lb.classList.add("open");
    document.body.style.overflow = "hidden";
    lbShow(idx, false); $("lbClose").focus();
  }
  function openLB(id, from) {
    var list = filtered.some(function (x) { return x.id === id; }) ? filtered : ALL;
    openLBList(list, list.findIndex(function (x) { return x.id === id; }), from);
  }
  function closeLB() {
    if (lb.hidden) return;
    lb.classList.remove("open"); document.body.style.overflow = "";
    setTimeout(function () { lb.hidden = true; lbImg.removeAttribute("src"); }, 400);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  window.KayOpenLightbox = function (id) { openLB(id, document.activeElement); };
  $("lbClose").addEventListener("click", closeLB);
  $("lbPrev").addEventListener("click", function () { lbShow(lbI - 1, true); });
  $("lbNext").addEventListener("click", function () { lbShow(lbI + 1, true); });
  lb.addEventListener("click", function (e) { if (e.target === lb || e.target === lbStage) closeLB(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLB();
    else if (e.key === "ArrowLeft") lbShow(lbI - 1, true);
    else if (e.key === "ArrowRight") lbShow(lbI + 1, true);
    else if (e.key === "Tab") { // keep focus inside the dialog
      var f = [$("lbClose"), $("lbPrev"), $("lbNext")], i = f.indexOf(document.activeElement);
      e.preventDefault(); f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    }
  });
  var tx = 0, ty = 0;
  lbStage.addEventListener("touchstart", function (e) { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  lbStage.addEventListener("touchend", function (e) {
    var dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) lbShow(lbI + (dx < 0 ? 1 : -1), true);
  }, { passive: true });

    /* ── Brand folders ── */
  function setCrumbs(brand) {
    crumbsEl.innerHTML = '<button type="button" data-go="work">Work</button><span aria-hidden="true">/</span>' +
      (brand ? '<button type="button" data-go="brands">Branding</button><span aria-hidden="true">/</span><span class="cur" aria-current="page">' + esc(brand.name) + "</span>"
             : '<span class="cur" aria-current="page">Branding</span>');
  }
  crumbsEl.addEventListener("click", function (e) {
    var go = e.target.dataset && e.target.dataset.go;
    if (go === "work") { setFilter("all"); scrollWork(); } else if (go === "brands") showBrands();
  });
  function stagger(parent) {
    if (reduce) return;
    [].forEach.call(parent.children, function (c, i) { c.classList.add("enter"); c.style.setProperty("--d", Math.min(i, 12) * .06 + "s"); });
  }
  function showBrands() {
    current = "branding";
    [].forEach.call(filtersEl.children, function (b) { b.setAttribute("aria-pressed", b.dataset.cat === "branding"); });
    grid.hidden = true; countEl.hidden = true; moreBtn.parentNode.hidden = true;
    bv.hidden = false; bDetail.hidden = true; bList.hidden = false;
    setCrumbs(null);
    bList.innerHTML = BRANDS.map(function (b, i) {
      return '<button type="button" class="brand-card" data-id="' + esc(b.id) + '" aria-label="Open ' + esc(b.name) + ' brand folder">' +
        '<span class="bc-cover' + (b.coverFit === "contain" ? " contain" : "") + '" style="display:block"><img loading="lazy" decoding="async" src="' + esc(b.cover) + '" alt="' + esc(b.name) + ' brand cover"></span>' +
        '<span class="bc-meta"><small>' + pad(i + 1) + '</small><b>' + esc(b.name) + '</b><i>' + esc(b.tagline) + '</i><em>' + b.images.length + ' designs →</em></span></button>';
    }).join("");
    stagger(bList); scrollWork();
  }
  function showBrand(id) {
    var b = BRANDS.find(function (x) { return x.id === id; }); if (!b) return;
    bList.hidden = true; bDetail.hidden = false; setCrumbs(b);
    var meta = '<div><dt>Services</dt><dd>' + esc((b.services || []).join(" · ")) + "</dd></div>";
    if (b.year) meta += '<div><dt>Year</dt><dd>' + esc(b.year) + "</dd></div>";
    if (b.client) meta += '<div><dt>Client</dt><dd>' + esc(b.client) + "</dd></div>";
    bDetail.innerHTML = '<div class="bd-head"><p class="eyebrow">Brand Identity</p><h3 class="display bd-title">' + esc(b.name) + '</h3><p class="section-sub">' + esc(b.description) + '</p><dl class="hp-meta">' + meta + '</dl></div>' +
      '<div class="bd-gallery">' + b.images.map(function (im, i) {
        var t = im.title || (b.name + " — " + (i + 1));
        return '<button type="button" class="bd-item" data-i="' + i + '" aria-label="View ' + esc(t) + '"><img loading="lazy" decoding="async" src="' + esc(im.src) + '" alt="' + esc(t) + " — " + esc(b.name) + '"></button>';
      }).join("") + '</div><button type="button" class="btn btn-ghost bd-back">← All Brands</button>';
    bDetail.querySelector(".bd-back").addEventListener("click", showBrands);
    var gal = bDetail.querySelector(".bd-gallery");
    gal.addEventListener("click", function (e) {
      var t = e.target.closest(".bd-item"); if (!t) return;
      openLBList(b.images.map(function (im, i) { return { image: im.src, title: im.title || (b.name + " — " + (i + 1)), categoryLabel: b.name }; }), +t.dataset.i, t);
    });
    stagger(gal); scrollWork();
  }
  bList.addEventListener("click", function (e) { var c = e.target.closest(".brand-card"); if (c) showBrand(c.dataset.id); });

  /* ── Reviews slider ── */
  var revs = [].slice.call(document.querySelectorAll(".rev")), ri = 0, rt = null;
  function showRev(i) {
    ri = (i + revs.length) % revs.length;
    revs.forEach(function (r, k) { r.classList.toggle("active", k === ri); });
    $("revCount").textContent = pad(ri + 1) + " / " + pad(revs.length);
  }
  function revAuto() { clearInterval(rt); if (!reduce) rt = setInterval(function () { showRev(ri + 1); }, 8000); }
  $("revPrev").addEventListener("click", function () { showRev(ri - 1); revAuto(); });
  $("revNext").addEventListener("click", function () { showRev(ri + 1); revAuto(); });
  var rw = document.querySelector(".rev-wrap");
  rw.addEventListener("mouseenter", function () { clearInterval(rt); }); rw.addEventListener("mouseleave", revAuto);
  showRev(0); revAuto();

  /* ── Contact form (Web3Forms) ── */
  var form = $("contactForm"), note = $("formNote"), btn = $("submitBtn"), btnTxt = $("submitText");
  function setNote(msg, cls) { note.textContent = msg; note.className = "form-note" + (cls ? " " + cls : ""); }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("fname").value.trim(), email = $("femail").value.trim(), service = $("fservice").value, message = $("fmessage").value.trim();
    if (!name || !email || !service || !message) { setNote("Please fill in every field.", "err"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setNote("Please enter a valid email address.", "err"); $("femail").focus(); return; }
    btn.disabled = true; btnTxt.textContent = "Sending…"; setNote("");
    fetch("https://api.web3forms.com/submit", {
      method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: form.querySelector('[name="access_key"]').value,
        subject: "New Hire Request — KayGrafix Design", from_name: "KayGrafix Website",
        name: name, email: email, service: service, message: message
      })
    }).then(function (r) { return r.json(); }).then(function (res) {
      btn.disabled = false; btnTxt.textContent = "Start a Project";
      if (res.success) { form.hidden = true; $("formSuccess").hidden = false; form.reset(); }
      else setNote("Something went wrong. Please try again.", "err");
    }).catch(function () {
      btn.disabled = false; btnTxt.textContent = "Start a Project";
      setNote("Network error. Please check your connection and try again.", "err");
    });
  });
  $("formReset").addEventListener("click", function () { $("formSuccess").hidden = true; form.hidden = false; setNote(""); $("fname").focus(); });

  /* ── Background canvas: faint geometric drift (gold / cream, very low alpha) ── */
  var cv = $("bgCanvas"), cx = cv && cv.getContext("2d");
  if (cx && !reduce) {
    var W, H, shapes = [], mouse = { x: 0, y: 0 }, TYPES = ["triangle", "square", "hexagon", "diamond", "ring"];
    var rand = function (a, b) { return a + Math.random() * (b - a); };
    function size() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
    function make() {
      return { t: TYPES[Math.floor(Math.random() * 5)], x: rand(0, W), y: rand(0, H), s: rand(12, 48), a: rand(0, 6.28), rs: rand(-.004, .004),
        vx: rand(-.16, .16), vy: rand(-.16, .16), al: rand(.05, .14), c: Math.random() > .5 ? "211,175,55" : "245,241,232", z: rand(.3, 1) };
    }
    function poly(n, r) { cx.beginPath(); for (var i = 0; i < n; i++) { var a = i / n * 6.283; cx[i ? "lineTo" : "moveTo"](Math.cos(a) * r, Math.sin(a) * r); } cx.closePath(); }
    function draw(s) {
      cx.save(); cx.translate(s.x + (mouse.x - W / 2) * .01 * s.z, s.y + (mouse.y - H / 2) * .01 * s.z); cx.rotate(s.a);
      var col = (s.c === "245,241,232" && document.documentElement.getAttribute("data-theme") === "light") ? "11,11,11" : s.c; // cream shapes turn dark on the light theme
      cx.strokeStyle = "rgba(" + col + "," + s.al + ")"; cx.lineWidth = 1;
      if (s.t === "ring") { cx.beginPath(); cx.arc(0, 0, s.s / 2, 0, 6.283); }
      else if (s.t === "square") { cx.beginPath(); cx.rect(-s.s / 2, -s.s / 2, s.s, s.s); }
      else poly(s.t === "triangle" ? 3 : s.t === "hexagon" ? 6 : 4, s.s / 2);
      cx.stroke(); cx.restore();
    }
    var running = true;
    function frame() {
      if (running) {
        cx.clearRect(0, 0, W, H);
        shapes.forEach(function (s) {
          s.x += s.vx; s.y += s.vy; s.a += s.rs;
          if (s.x < -60) s.x = W + 60; if (s.x > W + 60) s.x = -60; if (s.y < -60) s.y = H + 60; if (s.y > H + 60) s.y = -60;
          draw(s);
        });
      }
      requestAnimationFrame(frame);
    }
    size(); for (var i = 0; i < 22; i++) shapes.push(make());
    addEventListener("resize", size);
    addEventListener("mousemove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    document.addEventListener("visibilitychange", function () { running = !document.hidden; });
    frame();
  }
})();


/* ── Image marquee: builds two identical sets so the loop is seamless ── */
(function () {
  var track = document.getElementById("mqTrack"), paths = window.KAY_MARQUEE || [];
  if (!track || !paths.length) return;
  var byImg = {};
  (window.KAY_PORTFOLIO || []).forEach(function (x) { byImg[x.image] = x; });
  for (var s = 0; s < 2; s++) {
    var set = document.createElement("div");
    set.className = "mq-set";
    if (s) set.setAttribute("aria-hidden", "true"); // the duplicate set is decoration only
    paths.forEach(function (p) {
      var it = byImg[p], box = document.createElement("div"), im = new Image();
      box.className = "mq-item";
      im.src = p; im.loading = "lazy"; im.decoding = "async"; im.draggable = false;
      im.alt = s ? "" : (it ? it.title + " — " + it.categoryLabel : "Design by Kaygrafixdesign");
      box.appendChild(im); set.appendChild(box);
    });
    track.appendChild(set);
  }

  /* Constant speed: loop time = strip length ÷ pixels-per-second, so the speed
     stays the same no matter how many images are in the list. */
  var SPEED = 55; // pixels per second — raise for faster, lower for slower
  var marq = track.closest(".marquee"), firstSet = track.firstChild;
  function setSpeed() {
    var w = firstSet.getBoundingClientRect().width;
    if (w > 0) marq.style.setProperty("--mq-speed", (w / SPEED).toFixed(1) + "s");
  }
  setSpeed();
  if ("ResizeObserver" in window) new ResizeObserver(setSpeed).observe(firstSet);
  else window.addEventListener("resize", setSpeed);
})();


/* ── Theme toggle: dark by default, light on request, remembered between visits ── */
(function () {
  var root = document.documentElement, btn = document.getElementById("themeToggle");
  var meta = document.querySelector('meta[name="theme-color"]');
  if (!btn) return;
  function apply(theme, save) {
    if (theme === "light") root.setAttribute("data-theme", "light"); else root.removeAttribute("data-theme");
    btn.setAttribute("aria-label", theme === "light" ? "Switch to dark theme" : "Switch to light theme");
    btn.setAttribute("aria-pressed", theme === "light");
    if (meta) meta.setAttribute("content", theme === "light" ? "#f5f1e8" : "#0b0b0b");
    if (save) { try { localStorage.setItem("kay-theme", theme); } catch (e) {} }
  }
  apply(root.getAttribute("data-theme") === "light" ? "light" : "dark", false);
  btn.addEventListener("click", function () {
    root.classList.add("theme-anim");                       // smooth colour fade for ~0.5s
    apply(root.getAttribute("data-theme") === "light" ? "dark" : "light", true);
    setTimeout(function () { root.classList.remove("theme-anim"); }, 500);
  });
})();