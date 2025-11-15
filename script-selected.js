/*/ SELECTED /*/
// THUMBNAIL STAGGER & DELAY //
document.querySelectorAll('.horizontal-thumbnail').forEach((thumb, i) => {
thumb.style.animationDelay = `${i * 0.015}s`; // very small stagger
});



// SELECTED HORIZONTAL + VERTICAL SIDEWAYS SCROLLING //
const thumbRow = document.getElementById("thumbRow");
const thumbs = document.querySelectorAll(".thumbnails img");
const mainDisplay = document.getElementById("mainDisplay");


// Smooth Horizontal Scroll Setup
let targetScroll2 = thumbRow.scrollLeft;

// Wheel scroll anywhere on page
window.addEventListener("wheel", e => {
    e.preventDefault();

    // Combine vertical and horizontal wheel movement
    targetScroll2 += e.deltaY + e.deltaX;

    // Clamp to scrollable bounds
    targetScroll2 = Math.max(0, Math.min(targetScroll2, thumbRow.scrollWidth - thumbRow.clientWidth));
}, { passive: false });


// Smooth easing animation
function selectedSmoothScroll() {
    thumbRow.scrollLeft += (targetScroll2 - thumbRow.scrollLeft) * 0.1; // ease factor
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






