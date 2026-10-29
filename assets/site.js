/* Shared header, footer and animations. Edit the nav and footer once here and every page updates. */
(function () {
  var EMAIL = "hello@yourdomain.com"; // TODO: Sheridan's real email
  var MARK = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="11" fill="FILL"/><path d="M11 36 L19.5 28 L27 31 L33 19" fill="none" stroke="#F1FBFB" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="36" r="3" fill="#F1FBFB"/><circle cx="19.5" cy="28" r="3" fill="#F1FBFB"/><circle cx="27" cy="31" r="3" fill="#F1FBFB"/><path class="spark" d="M35 6.5 Q35 14 42.5 14 Q35 14 35 21.5 Q35 14 27.5 14 Q35 14 35 6.5 Z" fill="#1CCBC0"/></svg>';
  var here = (location.pathname.split("/").pop() || "index.html").replace(/\.html$/, "");
  var group = { "insight-market-before-marketing": "insights", "story-sample": "stories" }[here] || here;
  var links = [["services", "Services"], ["about", "About"], ["stories", "Customer stories"], ["insights", "Insights"]];
  var head = document.getElementById("site-head");
  if (head) {
    head.className = "site-head";
    head.innerHTML = '<div class="wrap bar"><a class="brand" href="index.html" aria-label="GTM Collective, home">' + MARK.replace("FILL", "#0A2F6B") + '<span>GTM Collective</span></a>' +
      '<button class="menu-btn" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<nav class="nav" aria-label="Primary"><ul>' + links.map(function (l) { return '<li><a href="' + l[0] + '.html"' + (group === l[0] ? ' aria-current="page"' : "") + ">" + l[1] + "</a></li>"; }).join("") +
      '</ul><a class="btn small" href="contact.html">Book a call <span class="arr">&rarr;</span></a></nav></div>';
    var btn = head.querySelector(".menu-btn");
    btn.addEventListener("click", function () { var o = document.body.classList.toggle("menu-open"); btn.setAttribute("aria-expanded", o); });
    var onScroll = function () { head.classList.toggle("scrolled", window.scrollY > 12); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }
  var foot = document.getElementById("site-foot");
  if (foot) {
    foot.className = "site-foot navy";
    foot.innerHTML = '<div class="wrap"><div class="top"><div><a class="brand" href="index.html">' + MARK.replace("FILL", "#14407F") + '<span>GTM Collective</span></a>' +
      '<div class="script">start with strategy</div><p class="muted" style="margin-top:18px;max-width:24em">Go-to-market strategy and fractional CMO leadership for B2B SaaS companies.</p></div>' +
      '<div><h4>Explore</h4><ul><li><a href="services.html">Services</a></li><li><a href="about.html">About Sheridan</a></li><li><a href="stories.html">Customer stories</a></li><li><a href="insights.html">Insights</a></li></ul></div>' +
      '<div><h4>Get in touch</h4><ul><li><a href="contact.html">Book a 30-minute call</a></li><li><a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li><li><a href="#" aria-label="LinkedIn (add link)">LinkedIn</a></li><li class="muted">Raleigh-Durham, working across the US</li></ul></div></div>' +
      '<div class="bottom"><span>&copy; ' + new Date().getFullYear() + ' Sheridan Orr. All rights reserved.</span><span>Strategy first. Everything else follows.</span></div></div>';
  }
  document.querySelectorAll("[data-email]").forEach(function (a) { a.href = "mailto:" + EMAIL; if (!a.textContent.trim()) a.textContent = EMAIL; });

  // Give the hero map room for larger labels on phones
  if (window.innerWidth < 760) document.querySelectorAll(".map").forEach(function (m) { m.setAttribute("viewBox", "-60 -20 720 500"); m.querySelectorAll("text").forEach(function (t) { var y = +t.getAttribute("y"); if ([100, 180, 260, 340].indexOf(y) > -1) t.setAttribute("y", y - 6); if ([118, 198, 278, 358].indexOf(y) > -1) t.setAttribute("y", y + 6); }); });

  // Hand-drawn underline under script callouts
  document.querySelectorAll(".script[data-ul]").forEach(function (s) {
    s.insertAdjacentHTML("beforeend", '<svg class="ul" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 9 C 50 3, 110 12, 197 5"/></svg>');
  });

  // Split hero headline into words for the rise-in
  document.querySelectorAll("[data-split]").forEach(function (h) {
    var i = 0;
    h.innerHTML = h.innerHTML.split(/(<[^>]+>|\s+)/).map(function (t) {
      if (!t || /^\s+$/.test(t) || t.charAt(0) === "<") return t;
      return '<span class="w" style="--i:' + (i++) + '">' + t + "</span>";
    }).join("");
  });

  // Twinkling star field
  document.querySelectorAll(".stars").forEach(function (f) {
    var n = +f.dataset.n || 40, html = "";
    for (var k = 0; k < n; k++) html += '<i style="left:' + (Math.random() * 100).toFixed(1) + "%;top:" + (Math.random() * 100).toFixed(1) + "%;--t:" + (Math.random() * 4).toFixed(2) + 's"></i>';
    f.innerHTML = html;
  });

  // Glow follows the cursor in navy heroes
  document.querySelectorAll("[data-glow]").forEach(function (h) {
    var g = h.querySelector(".glow"); if (!g) return;
    h.addEventListener("mousemove", function (e) { var r = h.getBoundingClientRect(); g.style.setProperty("--gx", (e.clientX - r.left) + "px"); g.style.setProperty("--gy", (e.clientY - r.top) + "px"); });
  });

  // Reveal on scroll, counters, step lines
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      if (e.target.dataset.count) count(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".rv, .steps, .quote, [data-count], .script[data-ul]").forEach(function (el) { io.observe(el); });
  document.querySelectorAll("[data-stagger]").forEach(function (p) {
    Array.prototype.forEach.call(p.children, function (c, i) { c.classList.add("rv"); c.style.setProperty("--d", (i * 0.09) + "s"); io.observe(c); });
  });
  function count(el) {
    var end = +el.dataset.count, t0 = null, dur = 1600;
    function step(t) { if (!t0) t0 = t; var p = Math.min((t - t0) / dur, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }

  // Rotating "moments" ticker
  document.querySelectorAll(".rot").forEach(function (r) {
    var items = r.querySelectorAll("span"), i = 0;
    items[0].classList.add("on");
    setInterval(function () {
      items[i].classList.remove("on"); items[i].classList.add("off");
      var prev = items[i]; setTimeout(function () { prev.classList.remove("off"); }, 650);
      i = (i + 1) % items.length; items[i].classList.add("on");
    }, 3000);
  });

  // Approach flow toggle
  var flow = document.querySelector(".flow");
  if (flow) {
    var stages = flow.querySelectorAll(".stage"), bar = flow.querySelector(".bar"), note = document.querySelector(".flow-note");
    var notes = {
      us: "Start with the market and every step after it gets sharper. Your ideal customer comes into focus, your message lands, and the right leads show up on their own.",
      most: "Start at leads and you are guessing. Campaigns launch on a hunch, the message shifts every quarter, and pipeline never quite converts."
    };
    function setMode(m) {
      document.querySelectorAll(".flow-ctl button").forEach(function (b) { b.classList.toggle("on", b.dataset.mode === m); b.setAttribute("aria-pressed", b.dataset.mode === m); });
      var startAt = m === "us" ? 0 : 3;
      stages.forEach(function (s, i) {
        s.style.setProperty("--d", (Math.max(i - startAt, 0) * 0.18) + "s");
        s.classList.toggle("lit", i >= startAt); s.classList.toggle("skip", i < startAt);
        var f = s.querySelector(".flag"); if (f) f.classList.toggle("show", (m === "us" && i === 0) || (m === "most" && i === 3));
      });
      var w = flow.clientWidth, col = (w - 14 * 5) / 6, from = startAt * (col + 14) + 13, end = 5 * (col + 14) + 13;
      bar.style.left = from + "px"; bar.style.width = "0";
      requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.width = (end - from) + "px"; }); });
      if (note) { note.style.opacity = 0; setTimeout(function () { note.textContent = notes[m]; note.style.opacity = 1; }, 250); }
    }
    document.querySelectorAll(".flow-ctl button").forEach(function (b) { b.addEventListener("click", function () { setMode(b.dataset.mode); }); });
    var fio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { setMode("us"); fio.disconnect(); } }, { threshold: 0.4 });
    fio.observe(flow);
  }

  // Timeline fill and reading progress
  var tl = document.querySelector(".timeline"), prog = document.querySelector(".progress"), art = document.querySelector(".article");
  if (tl || prog) {
    var fill = tl && tl.querySelector(".fill");
    var tick = function () {
      if (fill) { var r = tl.getBoundingClientRect(), p = Math.min(Math.max((innerHeight * 0.6 - r.top) / r.height, 0), 1); fill.style.setProperty("--h", (p * (r.height - 16)) + "px"); }
      if (prog && art) { var a = art.getBoundingClientRect(), q = Math.min(Math.max(-a.top / (a.height - innerHeight), 0), 1); prog.style.width = (q * 100) + "%"; }
    };
    window.addEventListener("scroll", tick, { passive: true }); tick();
  }

  // Insights filter
  document.querySelectorAll("[data-filter]").forEach(function (c) {
    c.addEventListener("click", function () {
      document.querySelectorAll("[data-filter]").forEach(function (x) { x.classList.toggle("on", x === c); });
      var f = c.dataset.filter;
      document.querySelectorAll(".post[data-cat]").forEach(function (p) { p.classList.toggle("hidden", f !== "all" && p.dataset.cat.indexOf(f) < 0); });
    });
  });

  // Contact form: local staging, so it opens an email instead of submitting
  var form = document.querySelector("form.form");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(form), body = "";
    d.forEach(function (v, k) { body += k + ": " + v + "\n"; });
    location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Intro call request") + "&body=" + encodeURIComponent(body);
    form.style.display = "none"; document.querySelector(".sent").classList.add("show");
  });
})();
