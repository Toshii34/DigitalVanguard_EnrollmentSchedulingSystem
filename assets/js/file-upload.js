/**
 * Enrollment document upload and preview
 */

// ============================================
// FILE UPLOAD
// ============================================
const uploadedFiles = { psa: null, report: null, moral: null };

function handleFileUpload(input, docType) {
    const file = input.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('File is too large. Maximum size is 5MB.'); input.value = ''; return; }
    uploadedFiles[docType] = file;
    const statusEl = document.getElementById('status-' + docType);
    const uploadBtn = document.getElementById('uploadBtn-' + docType);
    const viewBtn = document.getElementById('viewBtn-' + docType);
    const replaceBtn = document.getElementById('replaceBtn-' + docType);
    const removeBtn = document.getElementById('removeBtn-' + docType);
    statusEl.textContent = file.name;
    statusEl.classList.add('has-file');
    uploadBtn.style.display = 'none';
    viewBtn.style.display = 'inline-block';
    replaceBtn.style.display = 'inline-block';
    removeBtn.style.display = 'inline-block';
    document.getElementById('upload-' + docType).classList.remove('error');
}
function removeFile(docType) { if (!confirm('Are you sure you want to remove this file?')) return; removeFileSilent(docType); }
function removeFileSilent(docType) {
    uploadedFiles[docType] = null;
    const fileInput = document.getElementById('file-' + docType);
    if (fileInput) fileInput.value = '';
    const statusEl = document.getElementById('status-' + docType);
    const uploadBtn = document.getElementById('uploadBtn-' + docType);
    const viewBtn = document.getElementById('viewBtn-' + docType);
    const replaceBtn = document.getElementById('replaceBtn-' + docType);
    const removeBtn = document.getElementById('removeBtn-' + docType);
    statusEl.textContent = 'No file uploaded';
    statusEl.classList.remove('has-file');
    uploadBtn.style.display = 'inline-block';
    viewBtn.style.display = 'none';
    replaceBtn.style.display = 'none';
    removeBtn.style.display = 'none';
    document.getElementById('upload-' + docType).classList.remove('error');
}

function openPreview(docType) {
    const file = uploadedFiles[docType];
    if (!file) { alert('No file uploaded.'); return; }
    const overlay = document.getElementById('previewOverlay');
    const title = document.getElementById('previewTitle');
    const body = document.getElementById('previewBody');
    const titles = { psa: 'PSA Birth Certificate', report: 'Your Previous Report Card', moral: 'Certificate of Good Moral Character' };
    title.textContent = titles[docType] || 'Document Preview';
    body.innerHTML = '';
    const fileURL = URL.createObjectURL(file);
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = fileURL;
        body.appendChild(img);
    } else if (file.type === 'application/pdf') {
        const iframe = document.createElement('iframe');
        iframe.src = fileURL;
        body.appendChild(iframe);
    } else {
        body.innerHTML = '<div class="no-preview">Preview not available.</div>';
    }
    overlay.classList.add('active');
}
function closePreview() { document.getElementById('previewBody').innerHTML = ''; document.getElementById('previewOverlay').classList.remove('active'); }
document.getElementById('previewOverlay').addEventListener('click', function(e) { if (e.target === this) closePreview(); });
document.addEventListener('keydown', function(e) { if (e.key === 'Escape') { closePreview(); closeRescheduleModal(); closeProfileModal(); } });
