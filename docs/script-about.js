/*/ ABOUT /*/
//TEXT REVEAL//
const reveals2 = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
    }
    });
}, { threshold: 0.2 });

reveals2.forEach(r => io.observe(r));
} else {
reveals2.forEach(r => r.classList.add('is-visible'));
}




// CLICK TO REVEAL ABOUT //
const overlay = document.getElementById("about-full-screen-overlay-wrapper");
const container = document.getElementById("about-description-container");
const trigger = document.getElementById("about-seiko-cartoon");

// Open overlay when clicking the cartoon div
trigger.addEventListener("click", function (event) {
  overlay.style.display = "flex";
  event.stopPropagation(); // prevent click from instantly closing it
});

// Close overlay only when clicking outside the container
overlay.addEventListener("click", function (event) {
  const clickedInside = container.contains(event.target);
  if (!clickedInside) {
    overlay.style.display = "none";
  }
});

