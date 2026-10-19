/**
 * Admin student directory, student profile and reschedule approvals
 */

// ============================================
// STUDENT DIRECTORY
// ============================================
function openDirectory() {
    syncRescheduleToMock();
    directorySelectionMode = false;
    openAdminModal('Student Directory', `
        <div class="directory-search">
            <input type="text" id="dirSearchInput" placeholder="Search by name or LRN..." oninput="filterDirectory()">
            <select id="dirGradeFilter" onchange="filterDirectory()">
                <option value="">All Grade Levels</option>
                <option>Grade 7</option>
                <option>Grade 8</option>
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
                <option>Grade 12</option>
            </select>
            <select id="dirStatusFilter" onchange="filterDirectory()">
                <option value="">All Status</option>
                <option>Pending</option>
                <option>Enrolled</option>
            </select>
            <select id="dirSortFilter" onchange="filterDirectory()">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name_asc">Name (A-Z)</option>
                <option value="name_desc">Name (Z-A)</option>
                <option value="lrn">LRN</option>
            </select>
        </div>
        <div class="directory-header-row" id="directoryHeaderRow">
            <button class="btn-dots" id="headerDotsBtn" onclick="toggleDirectorySelectionMode(true)" title="Select students to delete">⋮</button>
        </div>
        <div id="directoryActionBar" class="directory-action-bar"></div>
        <table class="directory-table" id="directoryTable">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Grade Level</th>
                    <th>Section</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="directoryBody"></tbody>
        </table>
    `);
    renderDirectoryRows();
}

function renderDirectoryRows() {
    const body = document.getElementById('directoryBody');
    if (!body) return;
    body.innerHTML = '';
    const gradeFilter = document.getElementById('dirGradeFilter').value;
    const statusFilter = document.getElementById('dirStatusFilter').value;
    const searchQuery = (document.getElementById('dirSearchInput').value || '').toLowerCase();
    const sortMode = document.getElementById('dirSortFilter').value;

    let filtered = mockStudents.filter(s => {
        if (gradeFilter && s.grade !== gradeFilter) return false;
        if (statusFilter && s.status !== statusFilter) return false;
        if (searchQuery) {
            const hay = `${s.firstName} ${s.middleName} ${s.lastName} ${s.lrn}`.toLowerCase();
            if (!hay.includes(searchQuery)) return false;
        }
        return true;
    });

    if (sortMode === 'newest') filtered.sort((a, b) => b.id - a.id);
    else if (sortMode === 'oldest') filtered.sort((a, b) => a.id - b.id);
    else if (sortMode === 'name_asc') filtered.sort((a, b) => (a.lastName + a.firstName).localeCompare(b.lastName + b.firstName));
    else if (sortMode === 'name_desc') filtered.sort((a, b) => (b.lastName + b.firstName).localeCompare(a.lastName + a.firstName));
    else if (sortMode === 'lrn') filtered.sort((a, b) => a.lrn.localeCompare(b.lrn));

    filtered.forEach(s => {
        const statusClass = s.status === 'Pending' ? 'status-pending' : 'status-enrolled';
        const rowClass = s.hasRescheduleRequest ? 'reschedule-row' : '';
        const tr = document.createElement('tr');
        if (rowClass) tr.className = rowClass;

        const td1 = document.createElement('td');
        const strong = document.createElement('strong');
        strong.textContent = `${s.lastName}, ${s.firstName} ${s.middleName}`;
        const br = document.createElement('br');
        const small = document.createElement('small');
        small.style.color = '#888';
        small.textContent = 'LRN: ' + s.lrn;
        td1.appendChild(strong); td1.appendChild(br); td1.appendChild(small);

        const td2 = document.createElement('td');
        td2.textContent = s.grade;

        const td3 = document.createElement('td');
        if (s.section) td3.textContent = s.section;
        else td3.innerHTML = '<em style="color:#aaa">Not assigned</em>';

        const td4 = document.createElement('td');
        const badge = document.createElement('span');
        if (s.hasRescheduleRequest) { badge.className = 'status-badge status-reschedule'; badge.textContent = 'Reschedule'; }
        else { badge.className = `status-badge ${statusClass}`; badge.textContent = s.status; }
        td4.appendChild(badge);

        const td5 = document.createElement('td');
        const viewBtn = document.createElement('button');
        viewBtn.className = 'btn-action btn-view-student';
        viewBtn.textContent = 'View';
        viewBtn.onclick = function() { viewStudent(s.id); };
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-action btn-edit-student';
        editBtn.textContent = 'Edit';
        editBtn.onclick = function() { editStudent(s.id); };
        const assignBtn = document.createElement('button');
        assignBtn.className = 'btn-action btn-assign';
        assignBtn.textContent = 'Assign';
        assignBtn.onclick = function() { openAssignTeacher(s.id); };

        td5.appendChild(viewBtn);
        td5.appendChild(editBtn);
        td5.appendChild(assignBtn);

        if (directorySelectionMode) {
            const checkWrap = document.createElement('label');
            checkWrap.className = 'row-checkbox-wrap';
            const cb = document.createElement('input');
            cb.type = 'checkbox';
            cb.dataset.studentId = s.id;
            cb.onchange = function() { updateDirectorySelectionState(); };
            checkWrap.appendChild(cb);
            td5.appendChild(checkWrap);
        }

        tr.appendChild(td1); tr.appendChild(td2); tr.appendChild(td3); tr.appendChild(td4); tr.appendChild(td5);
        body.appendChild(tr);
    });

    if (filtered.length === 0) {
        body.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:30px;color:#888;">No students match the current filters.</td></tr>';
    }

    renderDirectoryActionBar();
}

function renderDirectoryActionBar() {
    const bar = document.getElementById('directoryActionBar');
    if (!bar) return;
    if (directorySelectionMode) {
        bar.innerHTML = `
            <button class="btn-cancel-select" onclick="toggleDirectorySelectionMode(false)">Cancel</button>
            <button class="btn-delete-selected" id="deleteSelectedStudentsBtn" onclick="deleteSelectedStudents()" disabled>Delete Selected</button>
        `;
    } else {
        bar.innerHTML = '';
    }
}

function toggleDirectorySelectionMode(enable) {
    directorySelectionMode = enable;
    const headerRow = document.getElementById('directoryHeaderRow');
    if (headerRow) headerRow.style.display = enable ? 'none' : 'flex';
    renderDirectoryRows();
}

function updateDirectorySelectionState() {
    const checked = document.querySelectorAll('#directoryBody input[type="checkbox"]:checked');
    const btn = document.getElementById('deleteSelectedStudentsBtn');
    if (!btn) return;
    btn.disabled = checked.length === 0;
    btn.textContent = checked.length > 0 ? `Delete Selected (${checked.length})` : 'Delete Selected';
}

function deleteSelectedStudents() {
    const checked = document.querySelectorAll('#directoryBody input[type="checkbox"]:checked');
    if (checked.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${checked.length} student(s)? This cannot be undone.`)) return;
    const ids = Array.from(checked).map(cb => parseInt(cb.dataset.studentId));
    ids.forEach(id => {
        const s = mockStudents.find(x => x.id === id);
        if (s) {
            userDatabase = userDatabase.filter(u => !(u.role === 'student' && u.studentData && u.studentData.lrn === s.lrn));
        }
    });
    mockStudents = mockStudents.filter(x => !ids.includes(x.id));
    directorySelectionMode = false;
    const headerRow = document.getElementById('directoryHeaderRow');
    if (headerRow) headerRow.style.display = 'flex';
    alert('Selected student(s) deleted successfully.');
    renderDirectoryRows();
    recalcStats();
}

function filterDirectory() { renderDirectoryRows(); }

function editStudent(id) {
    const s = mockStudents.find(x => x.id === id);
    if (!s) return;
    const content = `
        <button class="btn-back-directory" onclick="openDirectory()">&larr; Back to Directory</button>
        <div class="profile-section-title">Edit Student Information</div>
        <div class="row">
            <div class="col-md-4 mb-2"><label class="form-label-sm">First Name</label><input type="text" class="form-control form-control-sm" id="editFirstName" value="${s.firstName}"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Middle Name</label><input type="text" class="form-control form-control-sm" id="editMiddleName" value="${s.middleName}"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Last Name</label><input type="text" class="form-control form-control-sm" id="editLastName" value="${s.lastName}"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">LRN</label><input type="text" class="form-control form-control-sm" id="editLrn" value="${s.lrn}"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Grade</label><select class="form-select form-select-sm" id="editGrade"><option ${s.grade==='Grade 7'?'selected':''}>Grade 7</option><option ${s.grade==='Grade 8'?'selected':''}>Grade 8</option><option ${s.grade==='Grade 9'?'selected':''}>Grade 9</option><option ${s.grade==='Grade 10'?'selected':''}>Grade 10</option><option ${s.grade==='Grade 11'?'selected':''}>Grade 11</option><option ${s.grade==='Grade 12'?'selected':''}>Grade 12</option></select></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Section</label><input type="text" class="form-control form-control-sm" id="editSection" value="${s.section || ''}"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Phone (11–12 digits)</label><input type="text" class="form-control form-control-sm" id="editPhone" value="${s.phone}" inputmode="numeric" maxlength="13"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Email</label><input type="email" class="form-control form-control-sm" id="editEmail" value="${s.email}"></div>
            <div class="col-md-4 mb-2"><label class="form-label-sm">Guardian</label><input type="text" class="form-control form-control-sm" id="editGuardian" value="${s.guardian}"></div>
        </div>
        <div class="d-flex justify-content-end gap-2 mt-3">
            <button class="btn btn-outline-secondary btn-sm" onclick="openDirectory()">Cancel</button>
            <button class="btn-assign-confirm" onclick="saveEditedStudent(${s.id})">Save Changes</button>
        </div>
    `;
    openAdminModal('Edit Student', content);
    const headerRow = document.getElementById('directoryHeaderRow');
    if (headerRow) headerRow.style.display = 'none';
}

function saveEditedStudent(id) {
    const s = mockStudents.find(x => x.id === id);
    if (!s) return;
    const newPhone = document.getElementById('editPhone').value.trim();
    if (newPhone && !isValidPhone(newPhone)) { alert('Phone number must be 11–12 digits only.'); return; }
    s.firstName = document.getElementById('editFirstName').value.trim();
    s.middleName = document.getElementById('editMiddleName').value.trim();
    s.lastName = document.getElementById('editLastName').value.trim();
    s.lrn = document.getElementById('editLrn').value.trim();
    s.grade = document.getElementById('editGrade').value;
    s.section = document.getElementById('editSection').value.trim();
    s.phone = newPhone;
    s.email = document.getElementById('editEmail').value.trim();
    s.guardian = document.getElementById('editGuardian').value.trim();
    alert('Student information updated!');
    openDirectory();
}

function viewStudent(id) {
    const s = mockStudents.find(x => x.id === id);
    if (!s) return;
    const headerRow = document.getElementById('directoryHeaderRow');
    if (headerRow) headerRow.style.display = 'none';
    const statusClass = s.status === 'Pending' ? 'status-pending' : 'status-enrolled';
    const initials = (s.firstName[0] + s.lastName[0]).toUpperCase();
    const docPSA = s.docs.psa ? '<span class="doc-status">Uploaded</span>' : '<span class="doc-status" style="background:#f8d7da;color:#842029">Missing</span>';
    const docReport = s.docs.report ? '<span class="doc-status">Uploaded</span>' : '<span class="doc-status" style="background:#f8d7da;color:#842029">Missing</span>';
    const docMoral = s.docs.moral ? '<span class="doc-status">Uploaded</span>' : '<span class="doc-status" style="background:#f8d7da;color:#842029">Missing</span>';
    let rescheduleBanner = '';
    if (s.hasRescheduleRequest && s.rescheduleRequest) {
        rescheduleBanner = `
            <div class="reschedule-banner">
                <h6>Reschedule Request Pending</h6>
                <div class="banner-row"><strong>Preferred New Date:</strong> ${s.rescheduleRequest.preferredDate}</div>
                <div class="banner-row"><strong>Reason:</strong> ${s.rescheduleRequest.reason}</div>
                <div class="banner-row"><strong>Requested At:</strong> ${s.rescheduleRequest.requestedAt}</div>
                <button class="btn-approve-reschedule" onclick="approveReschedule(${s.id})">Approve Reschedule</button>
                <button class="btn-reject-reschedule" onclick="rejectReschedule(${s.id})">Reject Reschedule</button>
            </div>
        `;
    }
    const content = `
        <button class="btn-back-directory" onclick="openDirectory()">&larr; Back to Directory</button>
        <div class="student-profile-header">
            <div class="student-avatar">${initials}</div>
            <div class="info"><h4>${s.firstName} ${s.middleName} ${s.lastName}</h4><p>LRN: ${s.lrn} &middot; ${s.grade}</p><span class="status-badge ${statusClass}">${s.status}</span></div>
        </div>
        ${rescheduleBanner}
        <div class="profile-section-title">Personal Information</div>
        <div class="info-grid">
            <div class="info-item"><div class="label">Full Name</div><div class="value">${s.firstName} ${s.middleName} ${s.lastName}</div></div>
            <div class="info-item"><div class="label">Gender</div><div class="value">${s.gender}</div></div>
            <div class="info-item"><div class="label">Date of Birth</div><div class="value">${s.dob}</div></div>
            <div class="info-item"><div class="label">LRN</div><div class="value">${s.lrn}</div></div>
        </div>
        <div class="profile-section-title">Contact & Family</div>
        <div class="info-grid">
            <div class="info-item"><div class="label">Home Address</div><div class="value">${s.address}</div></div>
            <div class="info-item"><div class="label">Phone Number</div><div class="value">${s.phone}</div></div>
            <div class="info-item"><div class="label">Email Address</div><div class="value">${s.email}</div></div>
            <div class="info-item"><div class="label">Guardian Name</div><div class="value">${s.guardian}</div></div>
            <div class="info-item"><div class="label">Guardian Contact</div><div class="value">${s.guardianContact}</div></div>
        </div>
        <div class="profile-section-title">Academic Profile</div>
        <div class="info-grid">
            <div class="info-item"><div class="label">Grade Level</div><div class="value">${s.grade}</div></div>
            <div class="info-item"><div class="label">Section</div><div class="value">${s.section || 'Not yet assigned'}</div></div>
        </div>
        <div class="profile-section-title">Documents Submitted</div>
        <div class="doc-list">
            <div class="doc-item"><span class="doc-name">PSA Birth Certificate</span><span>${docPSA}</span></div>
            <div class="doc-item"><span class="doc-name">Your Previous Report Card</span><span>${docReport}</span></div>
            <div class="doc-item"><span class="doc-name">Certificate of Good Moral Character</span><span>${docMoral}</span></div>
        </div>
        <div class="assign-section">
            <h5>Assign to Teacher</h5>
            <label>Select Section</label>
            <select id="assignSectionSelect"><option value="">-- Select Section --</option>${sections.map(sec => `<option value="${sec}" ${s.section === sec ? 'selected' : ''}>${sec}</option>`).join('')}</select>
            <button class="btn-assign-confirm" onclick="confirmAssign(${s.id})">Assign Student</button>
        </div>
    `;
    openAdminModal('Student Profile', content);
}

// ============================================
// APPROVE / REJECT RESCHEDULE — reflects to student account
// FIX: capture the requested date BEFORE nulling the reschedule request
// ============================================
function approveReschedule(id) {
    const s = mockStudents.find(x => x.id === id);
    if (!s) return;

    // ⚠️ CRITICAL: Capture the requested date BEFORE we null out the request
    let approvedDateLong = null;
    let approvedDateRaw = null;
    if (s.rescheduleRequest) {
        approvedDateLong = s.rescheduleRequest.preferredDate || null;
        approvedDateRaw = s.rescheduleRequest.preferredDateRaw || null;
    }
    // Fallback: check the live student account if mock had no data
    if (!approvedDateLong) {
        userDatabase.forEach(u => {
            if (u.role === 'student' && u.studentData && u.studentData.lrn === s.lrn) {
                if (u.rescheduleRequest && u.rescheduleRequest.preferredDate) {
                    approvedDateLong = u.rescheduleRequest.preferredDate;
                    approvedDateRaw = u.rescheduleRequest.preferredDateRaw;
                }
            }
        });
    }

    // Now clear the mock's reschedule flag
    s.hasRescheduleRequest = false;
    s.rescheduleRequest = null;
    s.actionRequired = 'Schedule Interview';

    // Reflect on student account
    userDatabase.forEach(u => {
        if (u.role === 'student' && u.studentData && u.studentData.lrn === s.lrn) {
            u.rescheduleRequest = null;
            if (u.appointment) {
                u.appointment.status = 'approved';
                // ✅ Update the appointment date to the approved reschedule date
                if (approvedDateLong) {
                    u.appointment.date = approvedDateLong;
                }
                if (!u.appointment.time) u.appointment.time = '8:00 AM - 3:00 PM';
                if (!u.appointment.location) u.appointment.location = 'Admission Office, Main Building.';
            } else if (approvedDateLong) {
                // If the student had no appointment, create one with the new date
                u.appointment = {
                    type: 'Passing of Enrollment Form',
                    date: approvedDateLong,
                    time: '8:00 AM - 3:00 PM',
                    location: 'Admission Office, Main Building.',
                    status: 'approved'
                };
            }
        }
    });

    // Defensive: also clear any duplicate mock entries with same LRN
    mockStudents.forEach(m => {
        if (m.lrn === s.lrn && m !== s) {
            m.hasRescheduleRequest = false;
            m.rescheduleRequest = null;
        }
    });

    alert('Reschedule request approved!\n\nThe appointment has been moved to: ' + (approvedDateLong || '(no date specified)') + '\n\nThe student account has been updated.');
    closeAdminModal();
    renderAdminDashboard();

    // If the currently logged-in student IS this student, refresh their dashboard
    if (currentStudentUser && currentStudentUser.studentData && currentStudentUser.studentData.lrn === s.lrn) {
        const fresh = userDatabase.find(u => u.username === currentStudentUser.username);
        if (fresh) currentStudentUser = fresh;
        renderStudentDashboard(currentStudentUser);
    }
}
function rejectReschedule(id) {
    const s = mockStudents.find(x => x.id === id);
    if (!s) return;
    if (!confirm('Are you sure you want to reject this reschedule request?')) return;
    s.hasRescheduleRequest = false;
    s.rescheduleRequest = null;
    userDatabase.forEach(u => {
        if (u.role === 'student' && u.studentData && u.studentData.lrn === s.lrn) {
            u.rescheduleRequest = null;
            if (u.appointment) u.appointment.status = 'rejected';
        }
    });
    alert('Reschedule request rejected. The student account has been updated.');
    closeAdminModal();
    renderAdminDashboard();
    if (currentStudentUser && currentStudentUser.studentData && currentStudentUser.studentData.lrn === s.lrn) {
        renderStudentDashboard(currentStudentUser);
    }
}
function openAssignTeacher(id) { viewStudent(id); }
function confirmAssign(id) {
    const s = mockStudents.find(x => x.id === id);
    const selectedSection = document.getElementById('assignSectionSelect').value;
    if (!selectedSection) { alert('Please select a section to assign this student.'); return; }
    s.section = selectedSection;
    const studentName = `${s.lastName}, ${s.firstName} ${s.middleName}`;
    if (!MASTER_ROSTER[selectedSection]) MASTER_ROSTER[selectedSection] = [];
    if (!MASTER_ROSTER[selectedSection].some(x => x.lrn === s.lrn)) {
        MASTER_ROSTER[selectedSection].push({
            name: studentName,
            lrn: s.lrn,
            grade: s.grade,
            gender: s.gender,
            status: s.status
        });
    }
    const teacherObj = teachers.find(t => t.section === selectedSection);
    if (teacherObj) {
        teacherObj.count = (MASTER_ROSTER[selectedSection] || []).length;
    }
    alert('Student assigned to ' + selectedSection + ' successfully!');
    closeAdminModal();
    openDirectory();
    recalcStats();
}
