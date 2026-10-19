/**
 * Admin dashboard, slot limit, walk-in enrollment and teacher accounts
 */

// ============================================
// ADMIN DASHBOARD
// ============================================
function showAdmin() {
    hideMainNavbar();
    document.getElementById('adminPage').style.display = 'block';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('enrollmentPage').style.display = 'none';
    document.getElementById('schedulePage').style.display = 'none';
    document.getElementById('studentPage').style.display = 'none';
    document.getElementById('teacherPage').style.display = 'none';
    document.body.style.overflow = 'hidden';
    const user = userDatabase.find(u => u.role === 'admin');
    if (user) {
        document.getElementById('adminDropdownName').textContent = user.fullName || 'Admin';
        document.getElementById('adminDropdownFullName').textContent = user.fullName || 'Admin';
        document.getElementById('adminAvatarInitial').textContent = (user.fullName || 'A').charAt(0).toUpperCase();
    }
    renderAdminDashboard();
    if (adminRefreshInterval) clearInterval(adminRefreshInterval);
    adminRefreshInterval = setInterval(function() {
        if (document.getElementById('adminPage').style.display === 'block') {
            renderAdminDashboard();
            if (document.getElementById('adminModal').classList.contains('active') &&
                document.getElementById('directoryBody')) {
                renderDirectoryRows();
            }
        }
    }, 4000);
}
function closeAdmin() {
    showMainNavbar();
    document.getElementById('adminPage').style.display = 'none';
    document.body.style.overflow = 'auto';
    if (adminRefreshInterval) { clearInterval(adminRefreshInterval); adminRefreshInterval = null; }
}

function syncRescheduleToMock() {
    userDatabase.forEach(u => {
        if (u.role === 'student' && u.rescheduleRequest) {
            const mock = mockStudents.find(s => s.lrn === u.studentData.lrn);
            if (mock) {
                mock.hasRescheduleRequest = true;
                mock.rescheduleRequest = u.rescheduleRequest;
            }
        }
    });
}

function recalcStats() {
    const totalEnrolled = mockStudents.filter(s => s.status === 'Enrolled').length;
    const pendingCount = mockStudents.filter(s => s.status === 'Pending').length;
    const elEnrolled = document.getElementById('statTotalEnrolled');
    const elPending = document.getElementById('statPending');
    if (elEnrolled) elEnrolled.textContent = totalEnrolled.toLocaleString();
    if (elPending) elPending.textContent = pendingCount.toLocaleString();
}

function renderAdminDashboard() {
    syncRescheduleToMock();
    recalcStats();

    const recentBody = document.getElementById('recentActivityBody');
    recentBody.innerHTML = '';
    const recentStudents = [...mockStudents].sort((a, b) => b.id - a.id).slice(0, 5);
    recentStudents.forEach(s => {
        const row = document.createElement('tr');
        if (s.hasRescheduleRequest) row.classList.add('reschedule-row');
        let tagClass = 'tag-review', tagText = s.actionRequired || 'Documents Review';
        if (s.hasRescheduleRequest) { tagClass = 'tag-reschedule'; tagText = 'Reschedule Request'; }
        else if (s.actionRequired === 'Documents Review') { tagClass = 'tag-review'; }
        else if (s.actionRequired === 'Schedule Interview') { tagClass = 'tag-interview'; }
        else { tagClass = 'tag-finalize'; }
        row.innerHTML = `<td></td><td></td><td></td><td><span class="tag ${tagClass}"></span></td>`;
        row.children[0].textContent = `${s.firstName} ${s.middleName} ${s.lastName}`;
        row.children[1].textContent = s.grade;
        row.children[2].textContent = s.timeReceived;
        row.children[3].querySelector('span').textContent = tagText;
        recentBody.appendChild(row);
    });

    const teachersBody = document.getElementById('teachersTableBody');
    teachersBody.innerHTML = '';
    teachers.forEach((t, idx) => {
        const row = document.createElement('tr');
        const td1 = document.createElement('td');
        const link = document.createElement('span');
        link.className = 'teacher-link';
        link.textContent = t.name;
        link.onclick = function() { showTeacherStudents(idx); };
        td1.appendChild(link);
        const td2 = document.createElement('td');
        td2.textContent = t.section;
        const td3 = document.createElement('td');
        const strong = document.createElement('strong');
        strong.textContent = t.count;
        td3.appendChild(strong);
        row.appendChild(td1); row.appendChild(td2); row.appendChild(td3);
        teachersBody.appendChild(row);
    });
}

function showTeacherStudents(idx) {
    const t = teachers[idx];
    if (!t) return;
    const sampleStudents = MASTER_ROSTER[t.section] || [];
    const content = `
        <div class="student-profile-header">
            <div class="student-avatar">${t.name.charAt(0)}</div>
            <div class="info">
                <h4>${t.name}</h4>
                <p>Subject: <strong>${t.subject || 'Science'}</strong></p>
                <p>Section: <strong>${t.section}</strong></p>
            </div>
        </div>
        <div class="profile-section-title">Handled Students (${sampleStudents.length})</div>
        <ul style="font-size: 0.85rem; line-height: 1.8;">
            ${sampleStudents.sort((a, b) => a.name.localeCompare(b.name)).map(s => `<li>${s.name} &mdash; <span style="color:#666;font-size:0.75rem;">${s.status}</span></li>`).join('')}
        </ul>
    `;
    openAdminModal('Teacher Details', content);
}

function openAdminModal(title, contentHTML) {
    document.getElementById('adminModalTitle').textContent = title;
    document.getElementById('adminModalBody').innerHTML = contentHTML;
    document.getElementById('adminModal').classList.add('active');
}
function closeAdminModal() { document.getElementById('adminModal').classList.remove('active'); }
document.getElementById('adminModal').addEventListener('click', function(e) { if (e.target === this) closeAdminModal(); });

// ============================================
// MAX SLOT LIMIT
// ============================================
function openMaxLimitSettings() {
    const headerRow = document.getElementById('directoryHeaderRow');
    if (headerRow) headerRow.style.display = 'none';
    const content = `
        <p class="text-muted small mb-3">Set the maximum number of students allowed to book an appointment per day.</p>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label class="form-label-sm">Maximum Students Per Day <span class="req">*</span></label>
                <input type="number" class="form-control form-control-sm" id="maxLimitInput" value="${maxStudentsPerDay}" min="1" max="100">
                <span class="field-hint">Current limit: ${maxStudentsPerDay} students per day.</span>
            </div>
        </div>
        <div class="d-flex justify-content-end gap-2 mt-3">
            <button class="btn btn-outline-secondary btn-sm" onclick="closeAdminModal()">Cancel</button>
            <button class="btn-assign-confirm" onclick="saveMaxLimit()">Save Limit</button>
        </div>
    `;
    openAdminModal('Daily Slot Limit Settings', content);
}
function saveMaxLimit() {
    const val = parseInt(document.getElementById('maxLimitInput').value);
    if (!val || val < 1 || val > 100) { alert('Please enter a valid number between 1 and 100.'); return; }
    maxStudentsPerDay = val;
    alert('Daily limit updated to ' + val + ' students per day.');
    closeAdminModal();
}

// ============================================
// NEW ENROLLMENT (WALK-IN)
// ============================================
function openNewEnrollment() {
    const headerRow = document.getElementById('directoryHeaderRow');
    if (headerRow) headerRow.style.display = 'none';
    const content = `
        <p class="text-muted small mb-3">Register a new student who walked in to the admission office.</p>
        <div class="row">
            <div class="col-md-4 mb-2"><label class="form-label-sm">First Name <span class="req">*</span></label><input type="text" class="form-control form-control-sm" id="newFirstName" placeholder="First name"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Middle Name <span class="req">*</span></label><input type="text" class="form-control form-control-sm" id="newMiddleName" placeholder="Middle name"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Last Name <span class="req">*</span></label><input type="text" class="form-control form-control-sm" id="newLastName" placeholder="Last name"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Date of Birth <span class="req">*</span></label><input type="date" class="form-control form-control-sm" id="newDob"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Gender <span class="req">*</span></label><select class="form-select form-select-sm" id="newGender"><option value="">-- Select --</option><option>Male</option><option>Female</option></select></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">LRN</label><input type="text" class="form-control form-control-sm" id="newLrn" placeholder="12-digit LRN if known"></div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Home Address <span class="req">*</span></label><input type="text" class="form-control form-control-sm" id="newAddress" placeholder="Complete address"></div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Phone Number (11–12 digits) <span class="req">*</span></label><input type="text" class="form-control form-control-sm" id="newPhone" placeholder="09123456789" inputmode="numeric" maxlength="13"></div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Guardian Full Name <span class="req">*</span></label><input type="text" class="form-control form-control-sm" id="newGuardian" placeholder="Parent / Guardian name"></div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Guardian Contact (11–12 digits) <span class="req">*</span></label><input type="text" class="form-control form-control-sm" id="newGuardianContact" placeholder="09123456789" inputmode="numeric" maxlength="13"></div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Grade Level <span class="req">*</span></label><select class="form-select form-select-sm" id="newGrade" onchange="updateNewEnrollmentSections()"><option value="">-- Select Grade --</option><option>Grade 7</option><option>Grade 8</option><option>Grade 9</option><option>Grade 10</option><option>Grade 11</option><option>Grade 12</option></select></div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Assign to Section (optional)</label><select class="form-select form-select-sm" id="newSection"><option value="">-- Select Grade First --</option></select></div>
        </div>
        <div class="d-flex justify-content-end gap-2 mt-3">
            <button class="btn btn-outline-secondary btn-sm" onclick="closeAdminModal()">Cancel</button>
            <button class="btn-assign-confirm" onclick="registerNewStudent()">Register Student</button>
        </div>
    `;
    openAdminModal('New Enrollment Registration', content);
    updateNewEnrollmentSections();
}

function registerNewStudent() {
    const fn = document.getElementById('newFirstName').value.trim();
    const mn = document.getElementById('newMiddleName').value.trim();
    const ln = document.getElementById('newLastName').value.trim();
    const dob = document.getElementById('newDob').value;
    const gender = document.getElementById('newGender').value;
    const lrn = document.getElementById('newLrn').value.trim();
    const address = document.getElementById('newAddress').value.trim();
    const phone = document.getElementById('newPhone').value.trim();
    const guardian = document.getElementById('newGuardian').value.trim();
    const guardianContact = document.getElementById('newGuardianContact').value.trim();
    const grade = document.getElementById('newGrade').value;
    const section = document.getElementById('newSection').value;
    if (!fn || !mn || !ln || !dob || !gender || !address || !phone || !guardian || !guardianContact || !grade) { alert('Please fill in all required fields.'); return; }
    if (!isValidPhone(phone)) { alert('Phone number must be 11–12 digits only.'); return; }
    if (!isValidPhone(guardianContact)) { alert('Guardian contact must be 11–12 digits only.'); return; }
    const newId = Math.max(...mockStudents.map(s => s.id), 0) + 1;
    const newLrn = lrn || '—';
    mockStudents.push({ id: newId, firstName: fn, middleName: mn, lastName: ln, grade, section, lrn: newLrn, gender, dob, address, phone, email: '-', guardian, guardianContact, status: 'Pending', timeReceived: 'Just now', actionRequired: 'Documents Review', docs: { psa: false, report: false, moral: false }, hasRescheduleRequest: false });
    if (section) {
        const studentName = `${ln}, ${fn} ${mn}`;
        if (!MASTER_ROSTER[section]) MASTER_ROSTER[section] = [];
        if (!MASTER_ROSTER[section].some(x => x.lrn === newLrn)) {
            MASTER_ROSTER[section].push({
                name: studentName,
                lrn: newLrn,
                grade: grade,
                gender: gender,
                status: 'Pending'
            });
        }
        const teacherObj = teachers.find(t => t.section === section);
        if (teacherObj) teacherObj.count = (MASTER_ROSTER[section] || []).length;
    }
    alert('Student registered successfully!' + (section ? '\nAssigned to ' + section : ''));
    closeAdminModal();
    recalcStats();
}

// ============================================
// TEACHER ACCOUNT REGISTRATION
// ============================================
function openTeacherAccountReg() {
    const headerRow = document.getElementById('directoryHeaderRow');
    if (headerRow) headerRow.style.display = 'none';
    const content = `
        <p class="text-muted small mb-3">Create a new teacher account. The teacher can use their full name and password to log in.</p>
        <div class="row">
            <div class="col-md-6 mb-2"><label class="form-label-sm">Teacher Full Name <span class="req">*</span></label><input type="text" class="form-control form-control-sm" id="regTeacherName" placeholder="e.g., Clarissa Santos"></div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Email Address <span class="req">*</span></label><input type="email" class="form-control form-control-sm" id="regTeacherEmail" placeholder="teacher@agsnhs.edu.ph"></div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Password <span class="req">*</span></label>
                <div class="password-wrapper sm">
                    <input type="password" class="form-control form-control-sm" id="regTeacherPassword" placeholder="Min. 8 characters">
                    <button type="button" class="password-toggle" onclick="togglePassword('regTeacherPassword', this)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                </div>
            </div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Confirm Password <span class="req">*</span></label>
                <div class="password-wrapper sm">
                    <input type="password" class="form-control form-control-sm" id="regTeacherConfirmPassword" placeholder="Re-enter password">
                    <button type="button" class="password-toggle" onclick="togglePassword('regTeacherConfirmPassword', this)">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    </button>
                </div>
            </div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Assign Section <span class="req">*</span></label><select class="form-select form-select-sm" id="regTeacherSection"><option value="">-- Select Section --</option>${sections.map(sec => `<option value="${sec}">${sec}</option>`).join('')}</select></div>
            <div class="col-md-6 mb-2"><label class="form-label-sm">Subject <span class="req">*</span></label><input type="text" class="form-control form-control-sm" id="regTeacherSubject" placeholder="e.g., Science" value="Science"></div>
        </div>
        <div class="d-flex justify-content-end gap-2 mt-3">
            <button class="btn btn-outline-secondary btn-sm" onclick="closeAdminModal()">Cancel</button>
            <button class="btn-assign-confirm" onclick="registerTeacher()">Create Teacher Account</button>
        </div>
    `;
    openAdminModal('Teacher Account Registration', content);
}

function registerTeacher() {
    const name = document.getElementById('regTeacherName').value.trim();
    const email = document.getElementById('regTeacherEmail').value.trim();
    const password = document.getElementById('regTeacherPassword').value;
    const confirmPass = document.getElementById('regTeacherConfirmPassword').value;
    const section = document.getElementById('regTeacherSection').value;
    const subject = document.getElementById('regTeacherSubject').value.trim() || 'Science';
    const username = normalizeUsername(name);
    if (!name || !email || !password || !confirmPass || !section) { alert('Please fill in all required fields.'); return; }
    if (password.length < 8) { alert('Password must be at least 8 characters long.'); return; }
    if (password !== confirmPass) { alert('Passwords do not match.'); return; }
    if (userDatabase.find(u => u.username === username) || teacherAccounts.find(u => u.username === username)) { alert('A teacher with that name already exists.'); return; }
    teacherAccounts.push({ username, password, role: 'teacher', fullName: name, email, section, subject, assignedSections: [section] });
    teachers.push({ name: name, section: section, count: 0, students: 'No students assigned yet', subject: subject });
    alert('Teacher account created successfully!\n\nName: ' + name + '\nThey can now log in using their full name.');
    closeAdminModal();
    renderAdminDashboard();
}
