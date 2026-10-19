/**
 * Screen navigation (login, enrollment, schedule, overlays)
 */

// ============================================
// NAVIGATION
// ============================================
function showLogin() {
    hideMainNavbar();
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('enrollmentPage').style.display = 'none';
    document.getElementById('schedulePage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'none';
    document.getElementById('studentPage').style.display = 'none';
    document.getElementById('teacherPage').style.display = 'none';
    document.body.style.overflow = 'hidden';
}
function closeLogin() {
    showMainNavbar();
    document.getElementById('loginPage').style.display = 'none';
    document.body.style.overflow = 'auto';
}
function showEnrollment() {
    hideMainNavbar();
    document.getElementById('enrollmentPage').style.display = 'block';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('schedulePage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'none';
    document.getElementById('studentPage').style.display = 'none';
    document.getElementById('teacherPage').style.display = 'none';
    document.body.style.overflow = 'hidden';
}
function closeEnrollment() {
    showMainNavbar();
    document.getElementById('enrollmentPage').style.display = 'none';
    document.body.style.overflow = 'auto';
}
function showSchedule() {
    hideMainNavbar();
    document.getElementById('schedulePage').style.display = 'block';
    document.getElementById('enrollmentPage').style.display = 'none';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'none';
    document.getElementById('studentPage').style.display = 'none';
    document.getElementById('teacherPage').style.display = 'none';
    document.body.style.overflow = 'hidden';
    renderCalendar();
}
function closeSchedule() {
    showMainNavbar();
    document.getElementById('schedulePage').style.display = 'none';
    document.body.style.overflow = 'auto';
}
function backToEnrollment() {
    hideMainNavbar();
    document.getElementById('schedulePage').style.display = 'none';
    document.getElementById('enrollmentPage').style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeAllOverlays() {
    showMainNavbar();
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('enrollmentPage').style.display = 'none';
    document.getElementById('schedulePage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'none';
    document.getElementById('studentPage').style.display = 'none';
    document.getElementById('teacherPage').style.display = 'none';
    document.body.style.overflow = 'auto';
}
