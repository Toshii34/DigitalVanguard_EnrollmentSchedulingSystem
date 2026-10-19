/**
 * Enrollment schedule calendar and slot booking
 */

// ============================================
// CALENDAR
// ============================================
let currentDate = new Date(2026, 9, 1);
let selectedDate = null;
let pickerYear = 2026;
const bookedDates = ['2026-10-15', '2026-10-08'];
const closedDates = ['2026-10-25', '2026-10-12'];
const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const STEM_MINIMUM_AVERAGE = 85;

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    document.getElementById('calendarMonthYear').textContent = monthNames[month] + ' ' + year;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].forEach(day => {
        const h = document.createElement('div');
        h.className = 'calendar-day-header';
        h.textContent = day;
        grid.appendChild(h);
    });
    for (let i = 0; i < firstDay; i++) {
        const e = document.createElement('div');
        e.className = 'calendar-day empty';
        grid.appendChild(e);
    }
    const today = new Date(); today.setHours(0,0,0,0);
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'calendar-day';
        const dateObj = new Date(year, month, day);
        const dateStr = formatDate(dateObj);
        const dayOfWeek = dateObj.getDay();
        const dayNum = document.createElement('div');
        dayNum.className = 'day-number';
        dayNum.textContent = day;
        cell.appendChild(dayNum);
        const isPast = dateObj < today;
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        const isClosed = closedDates.includes(dateStr);
        const isBooked = bookedDates.includes(dateStr);
        const isToday = dateObj.getTime() === today.getTime();
        if (isToday) cell.classList.add('today');
        if (isPast || isWeekend || isClosed) {
            cell.classList.add('disabled');
            const status = document.createElement('div');
            status.className = 'day-status';
            status.textContent = (isWeekend || isClosed) ? 'School Closed' : 'Past Date';
            status.style.backgroundColor = '#e9ecef';
            status.style.color = '#6c757d';
            cell.appendChild(status);
            cell.onclick = function() {
                if (isWeekend) showPopup('School Closed', 'The school is closed on Saturdays and Sundays.', 'warning');
                else if (isClosed) showPopup('School Closed', 'The school is closed on this date.', 'warning');
                else showPopup('Invalid Date', 'This date has already passed.', 'warning');
            };
        } else if (isBooked) {
            cell.classList.add('disabled');
            const status = document.createElement('div');
            status.className = 'day-status slots-full';
            status.textContent = 'Slots Full';
            cell.appendChild(status);
            cell.onclick = function() { showPopup('Date Full', 'All slots for this date are taken.', 'danger'); };
        } else {
            const status = document.createElement('div');
            status.className = 'day-status slots-open';
            status.textContent = 'Slots Open';
            cell.appendChild(status);
            if (selectedDate === dateStr) {
                cell.classList.add('selected-day');
                status.textContent = 'Selected';
                status.style.backgroundColor = '#198754';
                status.style.color = 'white';
            }
            cell.onclick = function() { selectDate(dateStr, dateObj); };
        }
        grid.appendChild(cell);
    }
}
function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
}
function formatDateLong(dateStr) {
    const parts = dateStr.split('-');
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[date.getDay()] + ', ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
}
function selectDate(dateStr, dateObj) {
    selectedDate = dateStr;
    document.getElementById('selectedDateLabel').textContent = 'For ' + formatDateLong(dateStr);
    document.getElementById('btnBookSlot').disabled = false;
    renderCalendar();
}
function changeMonth(delta) {
    currentDate.setMonth(currentDate.getMonth() + delta);
    selectedDate = null;
    document.getElementById('selectedDateLabel').textContent = 'No date selected';
    document.getElementById('btnBookSlot').disabled = true;
    renderCalendar();
}
function toggleMonthPicker() {
    const picker = document.getElementById('monthPicker');
    picker.classList.toggle('active');
    if (picker.classList.contains('active')) { pickerYear = currentDate.getFullYear(); renderMonthPicker(); }
}
function renderMonthPicker() {
    document.getElementById('pickerYear').textContent = pickerYear;
    const grid = document.getElementById('monthGrid');
    grid.innerHTML = '';
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    for (let m = 0; m < 12; m++) {
        const monthEl = document.createElement('div');
        monthEl.className = 'month-item';
        monthEl.textContent = monthNames[m].substring(0, 3);
        const isPast = (pickerYear < currentYear) || (pickerYear === currentYear && m < currentMonth);
        const isCurrent = (pickerYear === currentDate.getFullYear() && m === currentDate.getMonth());
        if (isPast) {
            monthEl.classList.add('disabled');
            monthEl.onclick = function() { showPopup('Month Not Available', 'This month is already in the past.', 'warning'); };
        } else if (isCurrent) {
            monthEl.classList.add('current');
            monthEl.onclick = function() {
                currentDate = new Date(pickerYear, m, 1);
                selectedDate = null;
                document.getElementById('selectedDateLabel').textContent = 'No date selected';
                document.getElementById('btnBookSlot').disabled = true;
                closeMonthPicker();
                renderCalendar();
            };
        } else {
            monthEl.onclick = function() {
                currentDate = new Date(pickerYear, m, 1);
                selectedDate = null;
                document.getElementById('selectedDateLabel').textContent = 'No date selected';
                document.getElementById('btnBookSlot').disabled = true;
                closeMonthPicker();
                renderCalendar();
            };
        }
        grid.appendChild(monthEl);
    }
}
function changePickerYear(delta) { pickerYear += delta; renderMonthPicker(); }
function closeMonthPicker() { document.getElementById('monthPicker').classList.remove('active'); }
document.addEventListener('click', function(e) {
    const picker = document.getElementById('monthPicker');
    const header = document.getElementById('calendarMonthYear');
    if (picker && picker.classList.contains('active')) {
        if (!picker.contains(e.target) && e.target !== header) { closeMonthPicker(); }
    }
});
function bookSlot() {
    if (!selectedDate) return;
    scheduledDate = selectedDate;
    const reminder = document.getElementById('scheduleReminder');
    const reminderText = document.getElementById('scheduleReminderText');
    reminder.classList.add('booked');
    reminder.classList.remove('error');
    reminderText.innerHTML = '<strong>Schedule Booked:</strong> ' + formatDateLong(scheduledDate) + ' (8:00 AM - 3:00 PM)';
    showPopup('Appointment Booked!', 'Your document submission has been scheduled for ' + formatDateLong(selectedDate) + '.', 'success');
}
