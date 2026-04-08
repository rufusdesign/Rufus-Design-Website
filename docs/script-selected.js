// THUMBNAIL STAGGER & DELAY //
document.querySelectorAll('.horizontal-thumbnail').forEach((thumb, i) => {
  thumb.style.animationDelay = `${i * 0.015}s`;
});

const thumbRow = document.getElementById("thumbRow");
const thumbs = document.querySelectorAll(".thumbnails img");
const mainDisplay = document.getElementById("mainDisplay");

let targetScroll2 = thumbRow.scrollLeft;
let lastInputWasWheel = false;
let wheelDebounce;

/* DESKTOP WHEEL SUPPORT */
window.addEventListener("wheel", e => {
  if (window.innerWidth > 768) {
    e.preventDefault();
    lastInputWasWheel = true;
    clearTimeout(wheelDebounce);
    wheelDebounce = setTimeout(() => { lastInputWasWheel = false; }, 150);
    targetScroll2 += e.deltaY + e.deltaX;
    targetScroll2 = Math.max(0, Math.min(targetScroll2, thumbRow.scrollWidth - thumbRow.clientWidth));
  }
}, { passive: false });

/* Sync target when native scroll happens (mobile touch/momentum) */
thumbRow.addEventListener('scroll', () => {
  if (!lastInputWasWheel) targetScroll2 = thumbRow.scrollLeft;
});

/* SMOOTH EASING LOOP — only runs on wheel input */
function selectedSmoothScroll() {
  if (lastInputWasWheel) {
    thumbRow.scrollLeft += (targetScroll2 - thumbRow.scrollLeft) * 0.1;
  }
  requestAnimationFrame(selectedSmoothScroll);
}
selectedSmoothScroll();



// Update Active Thumbnail
function updateActive() {
  const scrollLeft = thumbRow.scrollLeft;
  let current = null;

  for (let i = 0; i < thumbs.length; i++) {
    const thumb = thumbs[i];
    const thumbRight = thumb.offsetLeft + thumb.offsetWidth;

    if (thumbRight > scrollLeft) {
      current = thumb;
      break;
    }
  }

  if (current) {
    thumbs.forEach(t => t.classList.remove("active"));
    current.classList.add("active");
    mainDisplay.src = current.src;
    const info = document.querySelector(".artwork-info");
    if (info) info.textContent = current.dataset.info || "";
  }
}

let ticking = false;
thumbRow.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateActive();
      ticking = false;
    });
    ticking = true;
  }
});



// Click-to-Jump Active
thumbs.forEach(thumb => {
  thumb.addEventListener("click", () => {
    targetScroll2 = thumb.offsetLeft;
    targetScroll2 = Math.max(0, Math.min(targetScroll2, thumbRow.scrollWidth - thumbRow.clientWidth));

    mainDisplay.src = thumb.src;
    thumbs.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");

    const info = document.querySelector(".artwork-info");
    if (info) info.textContent = thumb.dataset.info || "";
  });
});


// Initialize
updateActive();
