/**
 * Shared UI helpers: navbar, profile dropdown, password toggle
 */

// ============================================
// NAVBAR HELPERS
// ============================================
const mainNavbar = document.getElementById('mainNavbar');
function hideMainNavbar() { if (mainNavbar) mainNavbar.style.display = 'none'; }
function showMainNavbar() { if (mainNavbar) mainNavbar.style.display = ''; }

// ============================================
// PROFILE DROPDOWN
// ============================================
function toggleProfileDropdown(e, id) {
    if (e) e.stopPropagation();
    const menu = document.getElementById(id);
    const isOpen = menu.classList.contains('active');
    closeAllProfileDropdowns();
    if (!isOpen) menu.classList.add('active');
}
function closeAllProfileDropdowns() {
    document.querySelectorAll('.profile-dropdown-menu').forEach(m => m.classList.remove('active'));
}
document.addEventListener('click', function(e) {
    if (!e.target.closest('.profile-dropdown-wrap')) closeAllProfileDropdowns();
});

function handleDropdownAction(e, actionFn) {
    if (e) { e.stopPropagation(); e.preventDefault(); }
    closeAllProfileDropdowns();
    setTimeout(function() {
        try { actionFn(); } catch (err) { console.error(err); }
    }, 50);
}

// ============================================
// PASSWORD TOGGLE
// ============================================
const EYE_OPEN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
const EYE_CLOSED_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';

function togglePassword(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    if (input.type === 'password') {
        input.type = 'text';
        if (btnEl) { btnEl.innerHTML = EYE_CLOSED_SVG; btnEl.title = 'Hide Password'; }
    } else {
        input.type = 'password';
        if (btnEl) { btnEl.innerHTML = EYE_OPEN_SVG; btnEl.title = 'Show Password'; }
    }
}
