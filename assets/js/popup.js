/**
 * Generic popup dialog
 */

// ============================================
// POPUP
// ============================================
function showPopup(title, message, type, callback) {
    const overlay = document.getElementById('popupOverlay');
    const icon = document.getElementById('popupIcon');
    icon.className = 'popup-icon ' + type;
    icon.textContent = (type === 'success') ? 'OK' : '!';
    document.getElementById('popupTitle').textContent = title;
    document.getElementById('popupMessage').textContent = message;
    overlay.style.display = 'flex';
    window._popupCallback = callback || null;
}
function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    if (window._popupCallback) { const cb = window._popupCallback; window._popupCallback = null; cb(); }
}
document.getElementById('popupOverlay').addEventListener('click', function(e) { if (e.target === this) closePopup(); });
