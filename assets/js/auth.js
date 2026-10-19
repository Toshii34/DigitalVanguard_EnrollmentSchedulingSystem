/**
 * Login, password recovery and sign out
 */

// ============================================
// LOGIN
// ============================================
function handleLogin() {
    const usernameEl = document.getElementById('loginUsername');
    const passwordEl = document.getElementById('loginPassword');
    const username = normalizeUsername(usernameEl.value);
    const password = passwordEl.value;
    if (!username || !password) { alert('Please enter both your full name and password.'); return; }
    let user = userDatabase.find(u => u.username === username && u.password === password);
    if (!user) user = teacherAccounts.find(u => u.username === username && u.password === password);
    if (!user) { alert('Invalid name or password. Please try again.'); return; }
    usernameEl.value = '';
    passwordEl.value = '';
    if (user.role === 'admin') {
        showAdmin();
    } else if (user.role === 'teacher') {
        currentTeacherUser = user;
        showTeacher(user);
    } else if (user.role === 'student') {
        currentStudentUser = user;
        showStudent(user);
    }
}

function showForgotPassword() {
    document.getElementById('forgotEmail').value = '';
    document.getElementById('forgotModal').classList.add('active');
}
function closeForgotModal() { document.getElementById('forgotModal').classList.remove('active'); }
function recoverPassword() {
    const email = document.getElementById('forgotEmail').value.trim().toLowerCase();
    if (!email) { alert('Please enter your Gmail address.'); return; }
    const user = userDatabase.find(u =>
        (u.studentData && u.studentData.email && u.studentData.email.toLowerCase() === email) ||
        (u.email && u.email.toLowerCase() === email)
    );
    if (!user) { alert('No account found with that Gmail address.'); return; }
    alert('Account Found!\n\nName: ' + (user.fullName || user.username) + '\nPassword: ' + user.password);
    closeForgotModal();
}

function signOutAdmin() {
    if (!confirm('Are you sure you want to sign out?')) return;
    closeAdmin();
}
function signOutStudent() {
    if (!confirm('Are you sure you want to sign out?')) return;
    closeStudent();
}
function signOutTeacher() {
    if (!confirm('Are you sure you want to sign out?')) return;
    closeTeacher();
}
