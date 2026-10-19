/**
 * Student dashboard and reschedule requests
 */

// ============================================
// STUDENT DASHBOARD
// ============================================
function showStudent(user) {
    hideMainNavbar();
    document.getElementById('studentPage').style.display = 'block';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('enrollmentPage').style.display = 'none';
    document.getElementById('schedulePage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'none';
    document.getElementById('teacherPage').style.display = 'none';
    document.body.style.overflow = 'hidden';
    document.getElementById('studentDropdownName').textContent = user.fullName || 'Student';
    document.getElementById('studentDropdownFullName').textContent = user.fullName || 'Student';
    document.getElementById('studentAvatarInitial').textContent = (user.fullName || 'S').charAt(0).toUpperCase();
    renderStudentDashboard(user);
}
function closeStudent() {
    showMainNavbar();
    document.getElementById('studentPage').style.display = 'none';
    document.body.style.overflow = 'auto';
}
function renderStudentDashboard(user) {
    const s = user.studentData || {};
    const infoRows = document.getElementById('studentInfoRows');
    infoRows.innerHTML = `
        <div class="info-row"><span class="info-label">Full Name</span><span class="info-value"></span></div>
        <div class="info-row"><span class="info-label">Learner Reference Number (LRN)</span><span class="info-value"></span></div>
        <div class="info-row"><span class="info-label">Target Grade Level</span><span class="info-value"></span></div>
        <div class="info-row"><span class="info-label">Assigned Section</span><span class="info-value"></span></div>
        <div class="info-row"><span class="info-label">Contact Number</span><span class="info-value"></span></div>
        <div class="info-row"><span class="info-label">Parent / Guardian Name</span><span class="info-value"></span></div>
    `;
    const vals = infoRows.querySelectorAll('.info-value');
    vals[0].textContent = s.fullName || user.fullName || '-';
    vals[1].textContent = s.lrn || '-';
    vals[2].textContent = s.gradeLevel || '-';
    vals[3].textContent = s.section || '-';
    vals[4].textContent = s.phone || '-';
    vals[5].textContent = s.guardian || '-';

    const apptContent = document.getElementById('appointmentContent');
    // Resolve latest appointment data from userDatabase (source of truth) so admin changes reflect
    const liveUser = userDatabase.find(u => u.username === user.username) || user;
    if (liveUser.appointment) {
        const a = liveUser.appointment;
        const statusClass = a.status === 'pending' ? 'pending' : a.status === 'rejected' ? 'rejected' : 'approved';
        const statusText = a.status === 'pending' ? 'Pending Approval' : a.status === 'rejected' ? 'Rejected' : 'Approved';
        apptContent.innerHTML = `
            <div class="appointment-box">
                <div class="appt-type"></div>
                <div class="appt-date"></div>
                <div class="appt-time"></div>
                <div class="appt-location"></div>
                <div class="appt-status ${statusClass}"></div>
            </div>
            <button class="btn-reschedule" onclick="openRescheduleModal()">Request a Reschedule</button>
        `;
        const box = apptContent.querySelector('.appointment-box');
        box.querySelector('.appt-type').textContent = a.type;
        box.querySelector('.appt-date').textContent = a.date;
        box.querySelector('.appt-time').textContent = 'Time Slot: ' + a.time;
        box.querySelector('.appt-location').textContent = 'Location: ' + a.location;
        box.querySelector('.appt-status').textContent = statusText;
    } else {
        apptContent.innerHTML = `<div class="no-appointment"><p>You have no scheduled appointments yet.</p><button class="btn-reschedule" onclick="closeStudent(); showEnrollment();">Book an Appointment</button></div>`;
    }
}

// ============================================
// RESCHEDULE
// ============================================
function openRescheduleModal() {
    miniCalSelectedDate = null;
    miniCalDate = new Date(2026, 6, 1);
    document.getElementById('rescheduleReason').value = '';
    document.getElementById('selectedDateDisplay').classList.remove('show');
    document.getElementById('selectedDateDisplay').textContent = '';
    document.getElementById('rescheduleModal').classList.add('active');
    renderMiniCalendar();
}
function closeRescheduleModal() { document.getElementById('rescheduleModal').classList.remove('active'); }
document.getElementById('rescheduleModal').addEventListener('click', function(e) { if (e.target === this) closeRescheduleModal(); });

function renderMiniCalendar() {
    const year = miniCalDate.getFullYear();
    const month = miniCalDate.getMonth();
    document.getElementById('miniCalMonthYear').textContent = monthNames[month] + ' ' + year;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid = document.getElementById('miniCalGrid');
    grid.innerHTML = '';
    ['S','M','T','W','T','F','S'].forEach(d => {
        const h = document.createElement('div');
        h.className = 'mini-cal-day-header';
        h.textContent = d;
        grid.appendChild(h);
    });
    for (let i = 0; i < firstDay; i++) {
        const e = document.createElement('div');
        e.className = 'mini-cal-day empty';
        grid.appendChild(e);
    }
    const today = new Date(); today.setHours(0,0,0,0);
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dateStr = formatDate(dateObj);
        const dayOfWeek = dateObj.getDay();
        const cell = document.createElement('div');
        cell.className = 'mini-cal-day';
        cell.textContent = day;
        const isPast = dateObj < today;
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        const isClosed = closedDates.includes(dateStr);
        const isBooked = bookedDates.includes(dateStr);
        const isToday = dateObj.getTime() === today.getTime();
        if (isToday) cell.classList.add('today');
        if (isPast || isWeekend || isClosed || isBooked) {
            cell.classList.add('disabled');
            if (isPast) cell.classList.add('past');
            cell.onclick = function() {
                if (isWeekend) showPopup('School Closed', 'The school is closed on Saturdays and Sundays.', 'warning');
                else if (isClosed) showPopup('School Closed', 'The school is closed on this date (holiday).', 'warning');
                else if (isPast) showPopup('Invalid Date', 'This date has already passed.', 'warning');
                else showPopup('Date Full', 'This date is already fully booked.', 'danger');
            };
        } else {
            if (miniCalSelectedDate === dateStr) cell.classList.add('selected');
            cell.onclick = function() {
                miniCalSelectedDate = dateStr;
                const display = document.getElementById('selectedDateDisplay');
                display.textContent = 'Selected Date: ' + formatDateLong(dateStr);
                display.classList.add('show');
                renderMiniCalendar();
            };
        }
        grid.appendChild(cell);
    }
}
function miniCalChangeMonth(delta) { miniCalDate.setMonth(miniCalDate.getMonth() + delta); renderMiniCalendar(); }

function submitReschedule() {
    if (!miniCalSelectedDate) { alert('Please select your preferred new date from the calendar.'); return; }
    const reason = document.getElementById('rescheduleReason').value.trim();
    if (!reason) { alert('Please provide a reason for the reschedule.'); return; }
    if (currentStudentUser) {
        currentStudentUser.rescheduleRequest = {
            preferredDate: formatDateLong(miniCalSelectedDate),
            preferredDateRaw: miniCalSelectedDate,
            reason: reason,
            requestedAt: new Date().toLocaleString(),
            status: 'pending'
        };
        const dbEntry = userDatabase.find(u => u.username === currentStudentUser.username);
        if (dbEntry) { dbEntry.rescheduleRequest = currentStudentUser.rescheduleRequest; }
        if (currentStudentUser.appointment) currentStudentUser.appointment.status = 'pending';
        if (dbEntry && dbEntry.appointment) dbEntry.appointment.status = 'pending';
        const mock = mockStudents.find(s => s.lrn === currentStudentUser.studentData.lrn);
        if (mock) {
            mock.hasRescheduleRequest = true;
            mock.rescheduleRequest = currentStudentUser.rescheduleRequest;
        }
        if (document.getElementById('adminPage').style.display === 'block') {
            renderAdminDashboard();
        }
    }
    closeRescheduleModal();
    showPopup('Reschedule Request Submitted', 'Your reschedule request for ' + formatDateLong(miniCalSelectedDate) + ' has been submitted and is pending approval.', 'success');
}
