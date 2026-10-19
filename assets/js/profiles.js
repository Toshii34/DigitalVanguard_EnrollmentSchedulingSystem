/**
 * Profile view/edit modals for admin, student and teacher
 */

// ============================================
// PROFILE PAGES
// ============================================
function openProfileModal(title, bodyHTML) {
    document.getElementById('profileModalTitle').textContent = title;
    document.getElementById('profileModalBody').innerHTML = bodyHTML;
    document.getElementById('profileModal').classList.add('active');
}
function closeProfileModal() { document.getElementById('profileModal').classList.remove('active'); }
document.getElementById('profileModal').addEventListener('click', function(e) { if (e.target === this) closeProfileModal(); });

function openAdminProfile() {
    const user = userDatabase.find(u => u.role === 'admin');
    if (!user) return;
    const body = `
        <div class="profile-tab-buttons">
            <button class="profile-tab-btn active" onclick="switchProfileTab('admin', 'view')">View</button>
            <button class="profile-tab-btn" onclick="switchProfileTab('admin', 'edit')">Edit</button>
        </div>
        <div id="adminProfileTabContent"></div>
    `;
    openProfileModal('My Profile — Admin', body);
    renderAdminProfileView();
}

function renderAdminProfileView() {
    const user = userDatabase.find(u => u.role === 'admin');
    if (!user) return;
    document.getElementById('adminProfileTabContent').innerHTML = `
        <div class="profile-info-row"><span class="info-label">Full Name</span><span class="info-value">${user.fullName || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Email Address</span><span class="info-value">${user.email || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Role</span><span class="info-value">Admin / Admission Staff</span></div>
    `;
}

function switchProfileTab(role, tab) {
    const buttons = document.querySelectorAll('.profile-tab-btn');
    buttons.forEach(btn => btn.classList.toggle('active', btn.textContent.toLowerCase() === tab));
    const content = document.getElementById(role + 'ProfileTabContent');
    if (!content) return;
    if (role === 'admin') {
        if (tab === 'view') renderAdminProfileView();
        else content.innerHTML = renderAdminProfileEditForm();
    } else if (role === 'student') {
        if (tab === 'view') renderStudentProfileView();
        else content.innerHTML = renderStudentProfileEditForm();
    } else if (role === 'teacher') {
        if (tab === 'view') renderTeacherProfileView();
        else content.innerHTML = renderTeacherProfileEditForm();
    }
}

function renderAdminProfileEditForm() {
    const user = userDatabase.find(u => u.role === 'admin');
    return `
        <label>Full Name</label>
        <input type="text" id="profileFullName" value="${user.fullName || ''}">
        <label>Email Address</label>
        <input type="email" id="profileEmail" value="${user.email || ''}">
        <label>New Password (leave blank to keep current)</label>
        <input type="password" id="profileNewPassword" placeholder="Enter new password">
        <label>Confirm New Password</label>
        <input type="password" id="profileConfirmPassword" placeholder="Re-enter new password">
        <div class="profile-modal-footer" style="padding:0;margin-top:10px;">
            <button class="btn-profile-cancel" onclick="switchProfileTab('admin', 'view')">Cancel</button>
            <button class="btn-profile-save" onclick="saveAdminProfile()">Save Changes</button>
        </div>
    `;
}

function saveAdminProfile() {
    const user = userDatabase.find(u => u.role === 'admin');
    if (!user) return;
    const fullName = document.getElementById('profileFullName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const newPass = document.getElementById('profileNewPassword').value;
    const confirmPass = document.getElementById('profileConfirmPassword').value;
    if (!fullName || !email) { alert('Full name and email are required.'); return; }
    if (newPass) {
        if (newPass.length < 8) { alert('Password must be at least 8 characters.'); return; }
        if (newPass !== confirmPass) { alert('Passwords do not match.'); return; }
        user.password = newPass;
    }
    user.fullName = fullName;
    user.email = email;
    user.username = normalizeUsername(fullName);
    document.getElementById('adminDropdownName').textContent = fullName;
    document.getElementById('adminDropdownFullName').textContent = fullName;
    document.getElementById('adminAvatarInitial').textContent = fullName.charAt(0).toUpperCase();
    alert('Profile updated successfully!');
    closeProfileModal();
}

function openStudentProfile() {
    if (!currentStudentUser) return;
    const body = `
        <div class="profile-tab-buttons">
            <button class="profile-tab-btn active" onclick="switchProfileTab('student', 'view')">View</button>
            <button class="profile-tab-btn" onclick="switchProfileTab('student', 'edit')">Edit</button>
        </div>
        <div id="studentProfileTabContent"></div>
    `;
    openProfileModal('My Profile — Student', body);
    renderStudentProfileView();
}

function renderStudentProfileView() {
    if (!currentStudentUser) return;
    const s = currentStudentUser.studentData || {};
    document.getElementById('studentProfileTabContent').innerHTML = `
        <div class="profile-info-row"><span class="info-label">Full Name</span><span class="info-value">${s.fullName || currentStudentUser.fullName || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">LRN</span><span class="info-value">${s.lrn || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Grade Level</span><span class="info-value">${s.gradeLevel || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Section</span><span class="info-value">${s.section || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Email</span><span class="info-value">${s.email || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Phone</span><span class="info-value">${s.phone || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Guardian</span><span class="info-value">${s.guardian || '-'}</span></div>
    `;
}

function renderStudentProfileEditForm() {
    const s = currentStudentUser.studentData || {};
    return `
        <label>Full Name</label>
        <input type="text" id="studentProfileFullName" value="${currentStudentUser.fullName || ''}">
        <label>Email Address</label>
        <input type="email" id="studentProfileEmail" value="${s.email || ''}">
        <label>Phone Number</label>
        <input type="text" id="studentProfilePhone" value="${s.phone || ''}" inputmode="numeric" maxlength="13">
        <label>Guardian Name</label>
        <input type="text" id="studentProfileGuardian" value="${s.guardian || ''}">
        <label>New Password (leave blank to keep current)</label>
        <input type="password" id="studentProfileNewPassword" placeholder="Enter new password">
        <label>Confirm New Password</label>
        <input type="password" id="studentProfileConfirmPassword" placeholder="Re-enter new password">
        <div class="profile-modal-footer" style="padding:0;margin-top:10px;">
            <button class="btn-profile-cancel" onclick="switchProfileTab('student', 'view')">Cancel</button>
            <button class="btn-profile-save" onclick="saveStudentProfile()">Save Changes</button>
        </div>
    `;
}

function saveStudentProfile() {
    if (!currentStudentUser) return;
    const fullName = document.getElementById('studentProfileFullName').value.trim();
    const email = document.getElementById('studentProfileEmail').value.trim();
    const phone = document.getElementById('studentProfilePhone').value.trim();
    const guardian = document.getElementById('studentProfileGuardian').value.trim();
    const newPass = document.getElementById('studentProfileNewPassword').value;
    const confirmPass = document.getElementById('studentProfileConfirmPassword').value;
    if (!fullName) { alert('Full name is required.'); return; }
    if (phone && !isValidPhone(phone)) { alert('Phone number must be 11–12 digits only.'); return; }
    if (newPass) {
        if (newPass.length < 8) { alert('Password must be at least 8 characters.'); return; }
        if (newPass !== confirmPass) { alert('Passwords do not match.'); return; }
        currentStudentUser.password = newPass;
    }
    currentStudentUser.fullName = fullName;
    currentStudentUser.username = normalizeUsername(fullName);
    if (currentStudentUser.studentData) {
        currentStudentUser.studentData.fullName = fullName;
        currentStudentUser.studentData.email = email;
        currentStudentUser.studentData.phone = phone;
        currentStudentUser.studentData.guardian = guardian;
    }
    document.getElementById('studentDropdownName').textContent = fullName;
    document.getElementById('studentDropdownFullName').textContent = fullName;
    document.getElementById('studentAvatarInitial').textContent = fullName.charAt(0).toUpperCase();
    alert('Profile updated successfully!');
    switchProfileTab('student', 'view');
}

function openTeacherProfile() {
    if (!currentTeacherUser) return;
    const body = `
        <div class="profile-tab-buttons">
            <button class="profile-tab-btn active" onclick="switchProfileTab('teacher', 'view')">View</button>
            <button class="profile-tab-btn" onclick="switchProfileTab('teacher', 'edit')">Edit</button>
        </div>
        <div id="teacherProfileTabContent"></div>
    `;
    openProfileModal('My Profile — Teacher', body);
    renderTeacherProfileView();
}

function renderTeacherProfileView() {
    if (!currentTeacherUser) return;
    document.getElementById('teacherProfileTabContent').innerHTML = `
        <div class="profile-info-row"><span class="info-label">Full Name</span><span class="info-value">${currentTeacherUser.fullName || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Email</span><span class="info-value">${currentTeacherUser.email || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Subject</span><span class="info-value">${currentTeacherUser.subject || '-'}</span></div>
        <div class="profile-info-row"><span class="info-label">Assigned Sections</span><span class="info-value">${(currentTeacherUser.assignedSections || []).join(', ') || '-'}</span></div>
    `;
}

function renderTeacherProfileEditForm() {
    return `
        <label>Full Name</label>
        <input type="text" id="teacherProfileFullName" value="${currentTeacherUser.fullName || ''}">
        <label>Email Address</label>
        <input type="email" id="teacherProfileEmail" value="${currentTeacherUser.email || ''}">
        <label>Subject</label>
        <input type="text" id="teacherProfileSubject" value="${currentTeacherUser.subject || ''}">
        <label>New Password (leave blank to keep current)</label>
        <input type="password" id="teacherProfileNewPassword" placeholder="Enter new password">
        <label>Confirm New Password</label>
        <input type="password" id="teacherProfileConfirmPassword" placeholder="Re-enter new password">
        <div class="profile-modal-footer" style="padding:0;margin-top:10px;">
            <button class="btn-profile-cancel" onclick="switchProfileTab('teacher', 'view')">Cancel</button>
            <button class="btn-profile-save" onclick="saveTeacherProfile()">Save Changes</button>
        </div>
    `;
}

function saveTeacherProfile() {
    if (!currentTeacherUser) return;
    const fullName = document.getElementById('teacherProfileFullName').value.trim();
    const email = document.getElementById('teacherProfileEmail').value.trim();
    const subject = document.getElementById('teacherProfileSubject').value.trim();
    const newPass = document.getElementById('teacherProfileNewPassword').value;
    const confirmPass = document.getElementById('teacherProfileConfirmPassword').value;
    if (!fullName) { alert('Full name is required.'); return; }
    if (newPass) {
        if (newPass.length < 8) { alert('Password must be at least 8 characters.'); return; }
        if (newPass !== confirmPass) { alert('Passwords do not match.'); return; }
        currentTeacherUser.password = newPass;
    }
    currentTeacherUser.fullName = fullName;
    currentTeacherUser.username = normalizeUsername(fullName);
    currentTeacherUser.email = email;
    currentTeacherUser.subject = subject;
    document.getElementById('teacherDropdownName').textContent = fullName;
    document.getElementById('teacherDropdownFullName').textContent = fullName;
    document.getElementById('teacherAvatarInitial').textContent = fullName.charAt(0).toUpperCase();
    alert('Profile updated successfully!');
    switchProfileTab('teacher', 'view');
}
