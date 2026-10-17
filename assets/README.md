const eventSlides = Array.from(document.querySelectorAll('.event-slide'));
const eventDots = Array.from(document.querySelectorAll('.event-dot'));
let currentEventIndex = 0;

function closeAllOverlays() {
  document.getElementById('loginPage')?.style.setProperty('display', 'none');
  document.getElementById('enrollmentPage')?.style.setProperty('display', 'none');
  document.getElementById('schedulePage')?.style.setProperty('display', 'none');
  document.getElementById('forgotModal')?.classList.remove('active');
}

function showLogin() {
  closeAllOverlays();
  document.getElementById('loginPage').style.display = 'flex';
}

function closeLogin() {
  document.getElementById('loginPage').style.display = 'none';
}

function showEnrollment() {
  closeAllOverlays();
  document.getElementById('enrollmentPage').style.display = 'block';
}

function closeEnrollment() {
  document.getElementById('enrollmentPage').style.display = 'none';
}

function showForgotPassword() {
  document.getElementById('forgotModal').classList.add('active');
}

function closeForgotModal() {
  document.getElementById('forgotModal').classList.remove('active');
}

function togglePassword(id, btn) {
  const input = document.getElementById(id);
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
}

function handleLogin() {
  const name = document.getElementById('loginUsername')?.value.trim();
  const password = document.getElementById('loginPassword')?.value.trim();

  if (!name || !password) {
    alert('Please enter both your full name and password.');
    return;
  }

  closeLogin();
  alert(`Welcome, ${name}! You have been logged in.`);
}

function recoverPassword() {
  const email = document.getElementById('forgotEmail')?.value.trim();
  if (!email) {
    alert('Please enter your Gmail address.');
    return;
  }

  alert(`Password recovery requested for ${email}.`);
  closeForgotModal();
}

function saveDraft() {
  alert('Draft saved successfully.');
}

function submitEnrollment() {
  alert('Enrollment submitted successfully.');
  closeEnrollment();
}

function showSchedule() {
  closeAllOverlays();
  document.getElementById('schedulePage').style.display = 'block';
  renderCalendar();
}

function closeSchedule() {
  document.getElementById('schedulePage').style.display = 'none';
}

function changeEventSlide(direction) {
  currentEventIndex = (currentEventIndex + direction + eventSlides.length) % eventSlides.length;
  renderEventSlides();
}

function goToEventSlide(index) {
  currentEventIndex = index;
  renderEventSlides();
}

function renderEventSlides() {
  eventSlides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentEventIndex);
  });
  eventDots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentEventIndex);
  });
}

function buildCalendarGrid(year, month) {
  const grid = document.getElementById('calendarGrid');
  if (!grid) return;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  grid.innerHTML = '';

  days.forEach((day) => {
    const header = document.createElement('div');
    header.className = 'calendar-day-header';
    header.textContent = day;
    grid.appendChild(header);
  });

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay();
  const totalDays = lastDay.getDate();

  for (let i = 0; i < startWeekday; i++) {
    const empty = document.createElement('div');
    empty.className = 'calendar-day empty';
    grid.appendChild(empty);
  }

  for (let day = 1; day <= totalDays; day++) {
    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'calendar-day';
    cell.innerHTML = `<span class="day-number">${day}</span><span class="day-status">Open</span>`;
    cell.addEventListener('click', () => {
      alert(`Selected ${new Date(year, month, day).toDateString()}`);
    });
    grid.appendChild(cell);
  }
}

function renderCalendar() {
  const calendarLabel = document.getElementById('calendarMonthLabel');
  const today = new Date();
  const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(today);
  calendarLabel.textContent = monthLabel;
  buildCalendarGrid(today.getFullYear(), today.getMonth());
}

function changeMonth(offset) {
  const calendarLabel = document.getElementById('calendarMonthLabel');
  const current = new Date(calendarLabel.dataset.value || Date.now());
  current.setMonth(current.getMonth() + offset);
  calendarLabel.dataset.value = current.toISOString();
  const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(current);
  calendarLabel.textContent = monthLabel;
  buildCalendarGrid(current.getFullYear(), current.getMonth());
}

window.addEventListener('DOMContentLoaded', () => {
  renderEventSlides();
  renderCalendar();

  document.getElementById('loginUsername')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleLogin();
  });

  document.getElementById('loginPassword')?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') handleLogin();
  });
});

window.closeAllOverlays = closeAllOverlays;
window.showLogin = showLogin;
window.closeLogin = closeLogin;
window.showEnrollment = showEnrollment;
window.closeEnrollment = closeEnrollment;
window.showForgotPassword = showForgotPassword;
window.closeForgotModal = closeForgotModal;
window.togglePassword = togglePassword;
window.handleLogin = handleLogin;
window.recoverPassword = recoverPassword;
window.saveDraft = saveDraft;
window.submitEnrollment = submitEnrollment;
window.showSchedule = showSchedule;
window.closeSchedule = closeSchedule;
window.changeEventSlide = changeEventSlide;
window.goToEventSlide = goToEventSlide;
window.changeMonth = changeMonth;
