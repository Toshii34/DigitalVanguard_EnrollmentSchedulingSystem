/**
 * School events carousel on the landing page
 */

// ============================================
// EVENTS CAROUSEL
// ============================================
let currentEventSlide = 0;
const totalEventSlides = 3;

function showEventSlide(index) {
    const slides = document.querySelectorAll('.event-slide');
    const dots = document.querySelectorAll('.event-dot');
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentEventSlide = index;
}
function changeEventSlide(delta) {
    let newIndex = currentEventSlide + delta;
    if (newIndex < 0) newIndex = totalEventSlides - 1;
    if (newIndex >= totalEventSlides) newIndex = 0;
    showEventSlide(newIndex);
}
function goToEventSlide(index) { showEventSlide(index); }
setInterval(() => { changeEventSlide(1); }, 6000);
