/*/ GLOBAL /*/
//HIGHLIGHT NAV//
  function highlightNav() {
  // Remove old highlights
  document.querySelectorAll("nav a").forEach(link => {
    link.classList.remove("active");
  });

  // Current path
  const currentPath = window.location.pathname;

  // Find the matching link by href
  const activeLink = document.querySelector(`nav a[href="${currentPath}"]`);

  if (activeLink) {
    activeLink.classList.add("active");
  }
}
// Run once on first load
  highlightNav();




// PAGE TRANSITION //
// page-transition.js
class PageTransition {
  constructor() {
    if (window.__pageTransitionInitialized) return;
    window.__pageTransitionInitialized = true;

    this.overlay = document.createElement("div");
    this.overlay.id = "page-overlay";
    document.body.appendChild(this.overlay);

    // Animate overlay down on page load
    window.addEventListener("load", () => {
      requestAnimationFrame(() => this.overlay.classList.add("enter"));
    });

    this.bindInternalLinks(document);
  }

  getPageRoot() {
    return document.getElementById("swup") || document.querySelector("main") || document.body;
  }

  bindInternalLinks(scope) {
    scope.querySelectorAll("a[href]").forEach(link => {
      if (link.__bound) return;
      link.__bound = true;

      link.addEventListener("click", e => {
        const href = link.getAttribute("href");
        if (!href.startsWith("#") && !link.target) {
          e.preventDefault();
          this.showExitOverlay(() => window.location.href = href);
        }
      });
    });
  }

showExitOverlay(callback) {
  const root = this.getPageRoot();

  // Animate page: shrink + slide
  root.style.transition = "transform 0.8s cubic-bezier(0.65,0,0.35,1), opacity 0.8s cubic-bezier(0.65,0,0.35,1)";
  root.style.transformOrigin = "50% 50%";
  requestAnimationFrame(() => {
    root.style.transform = "translateY(-3vh) scale(0.9)";
    root.style.opacity = "0.9";
  });

  // Animate overlay
  this.overlay.classList.remove("enter");
  this.overlay.classList.add("exit");

  // Wait for overlay to finish before navigating
  const onEnd = () => {
    this.overlay.removeEventListener("transitionend", onEnd);
    callback();
  };
  this.overlay.addEventListener("transitionend", onEnd);
}
};

new PageTransition();
