/**
 * Enrollment form: SHS strand logic, validation and submission
 */

// ============================================
// SHS STRAND LOGIC
// ============================================
const strandOptions = {
    'Academic': ['STEM', 'ABM', 'HUMSS', 'GAS'],
    'TechPro': ['BPP', 'FBS', 'ICT']
};

function toggleShsFields() {
    const gradeLevel = document.getElementById('gradeLevel').value;
    const shsFields = document.getElementById('shsFields');
    const isSHS = (gradeLevel === 'Grade 11' || gradeLevel === 'Grade 12');
    shsFields.style.display = isSHS ? 'block' : 'none';
    document.getElementById('documentsTitle').innerHTML = isSHS ? '5. Document Requirements' : '4. Document Requirements';
    document.getElementById('scheduleTitle').innerHTML = isSHS ? '6. Appointment Schedule' : '5. Appointment Schedule';
    if (!isSHS) {
        document.getElementById('shsTrack').value = '';
        document.getElementById('shsStrand').innerHTML = '<option value="">-- Select Track First --</option>';
        document.getElementById('generalAverageRow').style.display = 'none';
        document.getElementById('generalAverage').value = '';
    }
}

function updateStrandOptions() {
    const track = document.getElementById('shsTrack').value;
    const strandSelect = document.getElementById('shsStrand');
    const avgRow = document.getElementById('generalAverageRow');
    strandSelect.innerHTML = '<option value="">-- Select Strand --</option>';
    if (track && strandOptions[track]) {
        strandOptions[track].forEach(strand => {
            const opt = document.createElement('option');
            opt.value = strand;
            opt.textContent = strand;
            strandSelect.appendChild(opt);
        });
    } else {
        strandSelect.innerHTML = '<option value="">-- Select Track First --</option>';
        avgRow.style.display = 'none';
    }
}

function toggleStemAverage() {
    const strand = document.getElementById('shsStrand').value;
    const avgRow = document.getElementById('generalAverageRow');
    const avgInput = document.getElementById('generalAverage');
    const hint = document.getElementById('generalAverageHint');
    if (strand === 'STEM') {
        avgRow.style.display = 'flex';
        avgInput.required = true;
        hint.innerHTML = '<strong style="color:#dc3545;">STEM requires a General Average of 85 or higher.</strong>';
    } else if (strand) {
        avgRow.style.display = 'flex';
        avgInput.required = false;
        hint.textContent = 'Optional.';
    } else {
        avgRow.style.display = 'none';
        avgInput.value = '';
    }
}

// ============================================
// VALIDATION & SUBMIT
// ============================================
function clearErrors() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    document.getElementById('errorMsg').classList.remove('show');
    document.getElementById('errorMsg').textContent = '';
}
function clearFieldError(event) {
    const target = event.target;
    if (target && target.classList && target.classList.contains('error')) target.classList.remove('error');
    const uploadParent = target.closest && target.closest('.upload-item.error');
    if (uploadParent) uploadParent.classList.remove('error');
}
function showError(msg, fieldEl) {
    const errBox = document.getElementById('errorMsg');
    errBox.textContent = msg;
    errBox.classList.add('show');
    if (fieldEl) { fieldEl.classList.add('error'); fieldEl.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
}

function submitEnrollment() {
    clearErrors();
    const username = document.getElementById('accountUsername');
    const accountEmail = document.getElementById('accountEmail');
    const password = document.getElementById('accountPassword');
    const confirmPassword = document.getElementById('accountConfirmPassword');
    if (!username.value.trim()) { return showError('Full name is required.', username); }
    if (/[0-9]/.test(username.value.trim())) { return showError('Full name must not contain numbers.', username); }
    if (username.value.trim().length < 4) { return showError('Full name is too short.', username); }
    if (!accountEmail.value.trim()) { return showError('Account email is required.', accountEmail); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(accountEmail.value.trim())) { return showError('Please enter a valid email address.', accountEmail); }
    if (!password.value) { return showError('Password is required.', password); }
    if (password.value.length < 8) { return showError('Password must be at least 8 characters long.', password); }
    if (!confirmPassword.value) { return showError('Please confirm your password.', confirmPassword); }
    if (password.value !== confirmPassword.value) { return showError('Passwords do not match.', confirmPassword); }

    const firstName = document.getElementById('firstName');
    const middleName = document.getElementById('middleName');
    const lastName = document.getElementById('lastName');
    const dob = document.getElementById('dob');
    const gender = document.getElementById('gender');
    const lrn = document.getElementById('lrn');
    if (!firstName.value.trim()) { return showError('First Name is required.', firstName); }
    if (!middleName.value.trim()) { return showError('Middle Name is required.', middleName); }
    if (!lastName.value.trim()) { return showError('Last Name is required.', lastName); }
    if (!dob.value) { return showError('Date of Birth is required.', dob); }
    if (!gender.value) { return showError('Please select your Gender.', gender); }
    const lrnClean = lrn.value.replace(/[^0-9]/g, '');
    if (lrnClean && (lrnClean.length < 10 || lrnClean.length > 12)) { return showError('LRN must be 10 to 12 digits long.', lrn); }

    const address = document.getElementById('address');
    const phone = document.getElementById('phone');
    const contactEmail = document.getElementById('contactEmail');
    const guardianName = document.getElementById('guardianName');
    const guardianContact = document.getElementById('guardianContact');
    if (!address.value.trim()) { return showError('Home Address is required.', address); }
    if (!phone.value.trim()) { return showError('Primary Phone Number is required.', phone); }
    if (!isValidPhone(phone.value.trim())) { return showError('Phone number must be 11–12 digits only (e.g., 09123456789).', phone); }
    if (!contactEmail.value.trim()) { return showError('Contact Email Address is required.', contactEmail); }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail.value.trim())) { return showError('Please enter a valid contact email address.', contactEmail); }
    if (!guardianName.value.trim()) { return showError('Parent / Guardian Full Name is required.', guardianName); }
    if (!guardianContact.value.trim()) { return showError('Parent / Guardian Emergency Contact is required.', guardianContact); }
    if (!isValidPhone(guardianContact.value.trim())) { return showError('Guardian contact must be 11–12 digits only.', guardianContact); }

    const gradeLevel = document.getElementById('gradeLevel');
    const prevSchool = document.getElementById('prevSchool');
    const schoolYear = document.getElementById('schoolYear');
    if (!gradeLevel.value) { return showError('Please select a Target Grade Level.', gradeLevel); }
    if (!prevSchool.value.trim()) { return showError('Previous School Attended is required.', prevSchool); }
    if (!schoolYear.value) { return showError('Please select a School Year.', schoolYear); }

    const isSHS = (gradeLevel.value === 'Grade 11' || gradeLevel.value === 'Grade 12');
    let shsTrack = '';
    let shsStrand = '';
    let generalAverage = '';
    if (isSHS) {
        const trackEl = document.getElementById('shsTrack');
        const strandEl = document.getElementById('shsStrand');
        const avgEl = document.getElementById('generalAverage');
        if (!trackEl.value) { return showError('Please select a Track.', trackEl); }
        if (!strandEl.value) { return showError('Please select a Strand.', strandEl); }
        shsTrack = trackEl.value;
        shsStrand = strandEl.value;
        if (shsStrand === 'STEM') {
            const avgVal = parseFloat(avgEl.value);
            if (!avgEl.value || isNaN(avgVal)) return showError('General Average is required for STEM applicants.', avgEl);
            if (avgVal < STEM_MINIMUM_AVERAGE) return showError('STEM applicants must have a General Average of ' + STEM_MINIMUM_AVERAGE + ' or higher.', avgEl);
            generalAverage = avgVal;
        } else if (avgEl.value) generalAverage = parseFloat(avgEl.value);
    }

    if (!uploadedFiles.psa) { document.getElementById('upload-psa').classList.add('error'); document.getElementById('upload-psa').scrollIntoView({ behavior: 'smooth', block: 'center' }); return showError('PSA Birth Certificate is required.'); }
    if (!uploadedFiles.report) { document.getElementById('upload-report').classList.add('error'); document.getElementById('upload-report').scrollIntoView({ behavior: 'smooth', block: 'center' }); return showError('Your Previous Report Card is required.'); }
    if (!uploadedFiles.moral) { document.getElementById('upload-moral').classList.add('error'); document.getElementById('upload-moral').scrollIntoView({ behavior: 'smooth', block: 'center' }); return showError('Certificate of Good Moral Character is required.'); }

    if (!scheduledDate) {
        document.getElementById('scheduleReminder').classList.add('error');
        document.getElementById('scheduleReminder').scrollIntoView({ behavior: 'smooth', block: 'center' });
        showPopup('Schedule Required', 'Please book a schedule first.', 'warning', function() { showSchedule(); });
        return;
    }

    const fn = firstName.value.trim();
    const mn = middleName.value.trim();
    const ln = lastName.value.trim();
    const newLrn = lrnClean || '—';
    const newId = Math.max(...mockStudents.map(s => s.id), 0) + 1;
    const fullName = fn + ' ' + mn + ' ' + ln;
    const accountUsername = normalizeUsername(fullName);

    mockStudents.push({
        id: newId, firstName: fn, middleName: mn, lastName: ln,
        grade: gradeLevel.value, section: '', lrn: newLrn,
        gender: gender.value, dob: dob.value, address: address.value.trim(),
        phone: phone.value.trim(), email: contactEmail.value.trim(),
        guardian: guardianName.value.trim(), guardianContact: guardianContact.value.trim(),
        status: 'Pending', timeReceived: 'Just now',
        actionRequired: 'Documents Review',
        docs: { psa: true, report: true, moral: true },
        hasRescheduleRequest: false, username: accountUsername,
        shsTrack: shsTrack, shsStrand: shsStrand, generalAverage: generalAverage
    });

    userDatabase.push({
        username: accountUsername, password: password.value, role: 'student',
        fullName: fullName, email: accountEmail.value.trim(),
        studentData: {
            firstName: fn, middleName: mn, lastName: ln, fullName: fullName,
            lrn: newLrn, gradeLevel: gradeLevel.value,
            section: 'Pending Final Enrollment',
            phone: phone.value.trim(), guardian: guardianName.value.trim(),
            email: accountEmail.value.trim(),
            shsTrack: shsTrack, shsStrand: shsStrand, generalAverage: generalAverage
        },
        appointment: {
            type: 'Passing of Enrollment Form',
            date: formatDateLong(scheduledDate),
            time: '8:00 AM - 3:00 PM',
            location: 'Admission Office, Main Building.',
            status: 'pending'
        },
        rescheduleRequest: null
    });

    showPopup('Enrollment Submitted!', 'Account created successfully. Your appointment is pending approval.', 'success', function() {
        document.getElementById('enrollmentForm').reset();
        ['psa','report','moral'].forEach(d => removeFileSilent(d));
        scheduledDate = null;
        const reminder = document.getElementById('scheduleReminder');
        const reminderText = document.getElementById('scheduleReminderText');
        reminder.classList.remove('booked');
        reminder.classList.remove('error');
        reminderText.innerHTML = '<strong>Required:</strong> Please book a schedule.';
        document.getElementById('shsFields').style.display = 'none';
        document.getElementById('shsTrack').value = '';
        document.getElementById('shsStrand').innerHTML = '<option value="">-- Select Track First --</option>';
        document.getElementById('generalAverageRow').style.display = 'none';
        closeAllOverlays();
        if (document.getElementById('adminPage').style.display === 'block') {
            recalcStats();
        }
    });
}
