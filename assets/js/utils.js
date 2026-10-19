/**
 * Small shared helpers
 */

function normalizeUsername(name) {
    return name.trim().toLowerCase().replace(/[\s\u00A0]+/g, ' ');
}

// ============================================
// PHONE VALIDATION HELPER (11–12 digits only)
// ============================================
function isValidPhone(val) {
    const digits = String(val || '').replace(/[^0-9]/g, '');
    return digits.length >= 11 && digits.length <= 12;
}
