/*/ SELECTED /*/
// THUMBNAIL STAGGER & DELAY //
document.querySelectorAll('.horizontal-thumbnail').forEach((thumb, i) => {
thumb.style.animationDelay = `${i * 0.015}s`; // very small stagger
});



const thumbRow = document.getElementById("thumbRow");
const thumbs = document.querySelectorAll(".thumbnails img");
const mainDisplay = document.getElementById("mainDisplay");

// Smooth Horizontal Scroll Setup
let targetScroll2 = thumbRow.scrollLeft;

/* ===============================
   MOBILE TOUCH SUPPORT
================================ */
let touchStartX = 0;
let touchStartScroll = 0;

thumbRow.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
    touchStartScroll = targetScroll2;
}, { passive: true });

thumbRow.addEventListener("touchmove", e => {
    const touchX = e.touches[0].clientX;
    const deltaX = touchStartX - touchX;

    targetScroll2 = touchStartScroll + deltaX;
    targetScroll2 = Math.max(
        0,
        Math.min(targetScroll2, thumbRow.scrollWidth - thumbRow.clientWidth)
    );
}, { passive: true });

/* ===============================
   DESKTOP WHEEL SUPPORT
================================ */
window.addEventListener("wheel", e => {
    if (window.innerWidth > 768) {
        e.preventDefault();
        targetScroll2 += e.deltaY + e.deltaX;
        targetScroll2 = Math.max(
            0,
            Math.min(targetScroll2, thumbRow.scrollWidth - thumbRow.clientWidth)
        );
    }
}, { passive: false });

/* ===============================
   SMOOTH EASING LOOP
================================ */
function selectedSmoothScroll() {
    thumbRow.scrollLeft += (targetScroll2 - thumbRow.scrollLeft) * 0.1;
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
        mainDisplay.src = current.src; // update main image
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






