/* ==========================================================================
   TSUNAGU MEDIA — Shared Premium Animation Layer
   Add this ONE line before </body> on every page (index, about, services,
   portfolio, pricing, contact):

     <script src="tsunagu-animations.js"></script>

   This file does NOT touch your existing HTML/CSS content. It injects its
   own styles and behavior at runtime only. Safe to drop into any page.
   ========================================================================== */

(function () {
  "use strict";

  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const RED = "#FF2D2D";
  const BLACK = "#0B0B0C";

  /* ============================================================
     0. INJECTED STYLES — all runtime CSS lives here
     ============================================================ */
  const style = document.createElement("style");
  style.textContent = `
    /* ---- Loader ---- */
    #tsg-loader{position:fixed;inset:0;background:${BLACK};z-index:100000;
      display:flex;align-items:center;justify-content:center;
      transition:opacity .5s ease, visibility .5s ease;}
    #tsg-loader.hide{opacity:0;visibility:hidden;pointer-events:none;}
    #tsg-loader svg{width:56px;height:56px;animation:tsgSpin 1s linear infinite;}
    @keyframes tsgSpin{to{transform:rotate(360deg);}}

    /* ---- Page transition (katana slash) ---- */
    #tsg-transition{position:fixed;inset:0;z-index:99999;pointer-events:none;display:none;}
    #tsg-transition.active{display:block;}
    .tsg-panel{position:fixed;top:0;width:52%;height:100%;background:${BLACK};}
    .tsg-panel.left{left:0;clip-path:polygon(0 0,100% 0,88% 100%,0 100%);transform:translateX(-105%);}
    .tsg-panel.right{right:0;clip-path:polygon(12% 0,100% 0,100% 100%,0 100%);transform:translateX(105%);}
    #tsg-transition.active .tsg-panel.left{animation:tsgInLeft .42s cubic-bezier(.7,0,.2,1) forwards;}
    #tsg-transition.active .tsg-panel.right{animation:tsgInRight .42s cubic-bezier(.7,0,.2,1) forwards;}
    @keyframes tsgInLeft{to{transform:translateX(0);}}
    @keyframes tsgInRight{to{transform:translateX(0);}}
    .tsg-slash{position:fixed;top:0;left:50%;width:3px;height:100%;background:#fff;
      box-shadow:0 0 40px 6px ${RED},0 0 80px 20px rgba(255,45,45,.6);
      transform:translateX(-50%) rotate(6deg) scaleY(0);opacity:0;}
    #tsg-transition.active .tsg-slash{animation:tsgSlash .32s ease-out forwards;}
    @keyframes tsgSlash{0%{transform:translateX(-50%) rotate(6deg) scaleY(0);opacity:1;}
      100%{transform:translateX(-50%) rotate(6deg) scaleY(1);opacity:1;}}

    /* ---- Custom cursor (desktop only) ---- */
    body.tsg-has-cursor, body.tsg-has-cursor a, body.tsg-has-cursor button{cursor:none;}
    #tsg-cursor-dot{position:fixed;width:6px;height:6px;background:${RED};border-radius:50%;
      pointer-events:none;z-index:99998;transform:translate(-50%,-50%);
      box-shadow:0 0 10px 2px rgba(255,45,45,.8);transition:opacity .2s ease;}
    #tsg-cursor-ring{position:fixed;width:34px;height:34px;border:1px solid rgba(255,45,45,.55);
      border-radius:50%;pointer-events:none;z-index:99998;transform:translate(-50%,-50%);
      transition:width .2s ease, height .2s ease, border-color .2s ease, opacity .2s ease, transform .1s linear;}
    #tsg-cursor-ring.hover{width:52px;height:52px;border-color:${RED};
      background:radial-gradient(circle, rgba(255,45,45,.08), transparent 70%);}
    #tsg-cursor-shuriken{position:fixed;width:22px;height:22px;pointer-events:none;z-index:99998;
      transform:translate(-50%,-50%);opacity:0;transition:opacity .2s ease;}
    #tsg-cursor-shuriken.show{opacity:1;animation:tsgShurikenSpin .6s linear infinite;}
    @keyframes tsgShurikenSpin{to{transform:translate(-50%,-50%) rotate(360deg);}}

    /* ---- Scroll reveal (generic, auto-applied) ---- */
    .tsg-reveal{opacity:0;transform:translateY(34px);
      transition:opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1);}
    .tsg-reveal.tsg-in{opacity:1;transform:translateY(0);}

    /* ---- Parallax layer ---- */
    .tsg-parallax-layer{position:absolute;inset:-10% -10% -10% -10%;z-index:0;pointer-events:none;
      background:radial-gradient(circle at 30% 30%, rgba(255,45,45,.06), transparent 55%);
      will-change:transform;}

    /* ---- Section divider (ink slash) ---- */
    .tsg-divider{position:relative;height:2px;width:100%;overflow:hidden;background:rgba(255,255,255,.05);}
    .tsg-divider::before{content:'';position:absolute;top:0;left:-100%;height:100%;width:60%;
      background:linear-gradient(90deg, transparent, ${RED}, transparent);
      animation:tsgDividerSlash 3.2s ease-in-out infinite;}
    @keyframes tsgDividerSlash{0%{left:-60%;}50%{left:110%;}100%{left:110%;}}

    /* ---- Button premium hover ---- */
    body.tsg-ready .btn, body.tsg-ready .nav-cta{position:relative;overflow:hidden;}
    body.tsg-ready .btn::after, body.tsg-ready .nav-cta::after{content:'';position:absolute;top:0;left:-120%;
      width:60%;height:100%;background:linear-gradient(115deg, transparent, rgba(255,255,255,.35), transparent);
      transform:skewX(-20deg);transition:left .5s ease;pointer-events:none;}
    body.tsg-ready .btn:hover::after, body.tsg-ready .nav-cta:hover::after{left:130%;}

    /* ---- Click ripple ---- */
    .tsg-ripple{position:absolute;border-radius:50%;background:rgba(255,45,45,.45);
      transform:scale(0);animation:tsgRipple .55s ease-out forwards;pointer-events:none;}
    @keyframes tsgRipple{to{transform:scale(1);opacity:0;}}

    /* ---- Generic 3D card tilt ---- */
    .tsg-tilt{transition:transform .12s ease-out;transform-style:preserve-3d;will-change:transform;}

    @media(max-width:900px){
      #tsg-cursor-dot,#tsg-cursor-ring,#tsg-cursor-shuriken{display:none;}
    }
  `;
  document.head.appendChild(style);

  /* ============================================================
     1. LOADER — minimal spinning blade, hides once page is ready
     ============================================================ */
  const loader = document.createElement("div");
  loader.id = "tsg-loader";
  loader.innerHTML = `
    <svg viewBox="0 0 50 50" fill="none">
      <circle cx="25" cy="25" r="20" stroke="#2a2a2a" stroke-width="3"/>
      <path d="M25 5 A20 20 0 0 1 45 25" stroke="${RED}" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  document.body.appendChild(loader);
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hide"), 250);
    document.body.classList.add("tsg-ready");
  });

  /* ============================================================
     2. PAGE TRANSITION — katana slash on internal navigation
     ============================================================ */
  const transitionOverlay = document.createElement("div");
  transitionOverlay.id = "tsg-transition";
  transitionOverlay.innerHTML = `
    <div class="tsg-panel left"></div>
    <div class="tsg-panel right"></div>
    <div class="tsg-slash"></div>`;
  document.body.appendChild(transitionOverlay);

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || !href.endsWith(".html")) return;
    if (link.target === "_blank" || link.hasAttribute("download")) return;

    e.preventDefault();
    transitionOverlay.classList.add("active");
    setTimeout(() => { window.location.href = href; }, 380);
  });

  /* ============================================================
     3. CUSTOM CURSOR — glow dot + ring + shuriken on hover
     ============================================================ */
  if (!isTouch) {
    document.body.classList.add("tsg-has-cursor");
    const dot = document.createElement("div");
    dot.id = "tsg-cursor-dot";
    const ring = document.createElement("div");
    ring.id = "tsg-cursor-ring";
    const shuriken = document.createElement("div");
    shuriken.id = "tsg-cursor-shuriken";
    shuriken.innerHTML = `<svg viewBox="0 0 100 100"><path fill="${RED}" d="M50 0 L58 40 L100 50 L58 60 L50 100 L42 60 L0 50 L42 40 Z"/></svg>`;
    document.body.append(dot, ring, shuriken);

    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
      shuriken.style.left = mx + "px"; shuriken.style.top = my + "px";
    });
    (function ringLoop() {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.left = rx + "px"; ring.style.top = ry + "px";
      requestAnimationFrame(ringLoop);
    })();

    const hoverables = "a, button, .btn, .nav-cta, [class*='card'], [class*='item']";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverables)) {
        ring.classList.add("hover");
        shuriken.classList.add("show");
        dot.style.opacity = "0";
      }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverables)) {
        ring.classList.remove("hover");
        shuriken.classList.remove("show");
        dot.style.opacity = "1";
      }
    });
  }

  /* ============================================================
     4. SCROLL REVEAL — auto-applied to section children
        (skips elements already using your existing .reveal class
        so it never conflicts with pages that already animate)
     ============================================================ */
  document.querySelectorAll("section").forEach((section) => {
    Array.from(section.children).forEach((child) => {
      if (child.classList.contains("reveal")) return; // already handled by page's own script
      if (child.classList.contains("tsg-parallax-layer")) return;
      child.classList.add("tsg-reveal");
    });
  });
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("tsg-in"), (i % 3) * 90);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".tsg-reveal").forEach((el) => revealObserver.observe(el));

  /* ============================================================
     5. PARALLAX — subtle background drift on hero / page-header
     ============================================================ */
  const parallaxHosts = document.querySelectorAll(".hero, .page-header");
  parallaxHosts.forEach((host) => {
    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    const layer = document.createElement("div");
    layer.className = "tsg-parallax-layer";
    host.insertBefore(layer, host.firstChild);
  });
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    parallaxHosts.forEach((host) => {
      const layer = host.querySelector(".tsg-parallax-layer");
      if (layer) layer.style.transform = `translateY(${y * 0.08}px)`;
    });
  }, { passive: true });

  /* ============================================================
     6. SECTION DIVIDERS — thin ink-slash line between sections
     ============================================================ */
  const sections = document.querySelectorAll("section");
  sections.forEach((sec, i) => {
    if (i === sections.length - 1) return;
    const divider = document.createElement("div");
    divider.className = "tsg-divider";
    sec.after(divider);
  });

  /* ============================================================
     7. GENERIC 3D CARD TILT — skips portfolio (has its own tilt)
     ============================================================ */
  const tiltTargets = document.querySelectorAll(
    ".service-card, .price-card, .value-card, .why-card, .stat, .preview-card, .service-row"
  );
  tiltTargets.forEach((card) => {
    card.classList.add("tsg-tilt");
    const maxTilt = 5;
    function tilt(x, y) {
      const rect = card.getBoundingClientRect();
      const px = x - rect.left, py = y - rect.top;
      const cx = rect.width / 2, cy = rect.height / 2;
      const rotateY = ((px - cx) / cx) * maxTilt;
      const rotateX = -((py - cy) / cy) * maxTilt;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
    function reset() { card.style.transform = ""; }
    if (!isTouch) {
      card.addEventListener("mousemove", (e) => tilt(e.clientX, e.clientY));
      card.addEventListener("mouseleave", reset);
    }
  });

  /* ============================================================
     8. CLICK RIPPLE — on buttons / CTAs
     ============================================================ */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn, .nav-cta");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 1.4;
    ripple.className = "tsg-ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    if (getComputedStyle(btn).position === "static") btn.style.position = "relative";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });

})();