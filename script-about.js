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

