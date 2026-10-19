/**
 * Teacher dashboard and class list PDF export
 */

// ============================================
// TEACHER DASHBOARD
// ============================================
function showTeacher(user) {
    hideMainNavbar();
    document.getElementById('teacherPage').style.display = 'block';
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('enrollmentPage').style.display = 'none';
    document.getElementById('schedulePage').style.display = 'none';
    document.getElementById('adminPage').style.display = 'none';
    document.getElementById('studentPage').style.display = 'none';
    document.body.style.overflow = 'hidden';
    document.getElementById('teacherDropdownName').textContent = user.fullName || 'Teacher';
    document.getElementById('teacherDropdownFullName').textContent = user.fullName || 'Teacher';
    document.getElementById('teacherAvatarInitial').textContent = (user.fullName || 'T').charAt(0).toUpperCase();
    document.getElementById('teacherHeroTitle').textContent = 'Adviser: ' + (user.fullName || 'Teacher');
    renderTeacherSections(user);
    if (user.assignedSections && user.assignedSections.length > 0) {
        selectTeacherSection(user.assignedSections[0]);
    }
}
function closeTeacher() {
    showMainNavbar();
    document.getElementById('teacherPage').style.display = 'none';
    document.body.style.overflow = 'auto';
}
function renderTeacherSections(user) {
    const list = document.getElementById('sectionList');
    list.innerHTML = '';
    (user.assignedSections || []).forEach((section) => {
        const item = document.createElement('div');
        item.className = 'section-item';
        item.textContent = section;
        item.dataset.section = section;
        item.onclick = function() { selectTeacherSection(section); };
        list.appendChild(item);
    });
}
function selectTeacherSection(section) {
    activeTeacherSection = section;
    document.querySelectorAll('.section-item').forEach(el => {
        el.classList.toggle('active', el.dataset.section === section);
    });
    document.getElementById('teacherSectionTitle').innerHTML = section + ' <span class="subject-badge">Science</span>';
    renderClassList(section);
}
function renderClassList(section) {
    const tbody = document.getElementById('classListBody');
    tbody.innerHTML = '';
    const baseStudents = MASTER_ROSTER[section] || [];
    const addedStudents = mockStudents.filter(s => s.section === section && !baseStudents.some(b => b.lrn === s.lrn))
        .map(s => ({ name: `${s.lastName}, ${s.firstName} ${s.middleName}`, lrn: s.lrn, grade: s.grade, gender: s.gender, status: s.status }));
    const students = [...baseStudents, ...addedStudents];
    if (students.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:30px;color:#888;">No students assigned to this section yet.</td></tr>';
        return;
    }
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(s => {
        const statusClass = s.status === 'Enrolled' ? 'enrolled' : s.status === 'Pending' ? 'pending' : 'incomplete';
        const row = document.createElement('tr');
        row.innerHTML = `<td class="student-name"></td><td class="lrn"></td><td></td><td></td><td><span class="enroll-status ${statusClass}"></span></td>`;
        row.children[0].textContent = s.name;
        row.children[1].textContent = s.lrn;
        row.children[2].textContent = s.grade;
        row.children[3].textContent = section;
        row.children[4].querySelector('span').textContent = s.status;
        tbody.appendChild(row);
    });
}

// ============================================
// TEACHER - PDF
// ============================================
function generateStudentListPDF() {
    if (!currentTeacherUser) { alert('No teacher logged in.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const teacherName = currentTeacherUser.fullName || 'Teacher';
    const teacherSubject = currentTeacherUser.subject || 'Science';
    const teacherSections = currentTeacherUser.assignedSections || [];
    doc.setFontSize(18); doc.setFont(undefined, 'bold');
    doc.text('Alexis G. Santos National High School', 105, 25, { align: 'center' });
    doc.setFontSize(12); doc.setFont(undefined, 'normal');
    doc.text('Liciada, Bustos, Bulacan', 105, 33, { align: 'center' });
    doc.setFontSize(14); doc.setFont(undefined, 'bold');
    doc.text('OFFICIAL STUDENT LIST', 105, 50, { align: 'center' });
    doc.setFontSize(11); doc.setFont(undefined, 'normal');
    doc.text('Teacher: ' + teacherName, 105, 60, { align: 'center' });
    doc.text('Subject: ' + teacherSubject, 105, 66, { align: 'center' });
    doc.setFontSize(9);
    doc.text('Generated on: ' + new Date().toLocaleString(), 105, 74, { align: 'center' });
    doc.addPage();
    let isFirstSection = true;
    teacherSections.forEach(section => {
        const baseStudents = MASTER_ROSTER[section] || [];
        const addedStudents = mockStudents.filter(s => s.section === section && !baseStudents.some(b => b.lrn === s.lrn))
            .map(s => ({ name: `${s.lastName}, ${s.firstName} ${s.middleName}`, lrn: s.lrn, grade: s.grade, gender: s.gender, status: s.status }));
        const students = [...baseStudents, ...addedStudents];
        if (!isFirstSection) doc.addPage();
        isFirstSection = false;
        doc.setFontSize(14); doc.setFont(undefined, 'bold');
        doc.setTextColor(25, 135, 84);
        doc.text(section, 14, 20);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10); doc.setFont(undefined, 'normal');
        doc.text('Total Students: ' + students.length, 14, 27);
        const boys = students.filter(s => s.gender === 'Male').sort((a, b) => a.name.localeCompare(b.name));
        const girls = students.filter(s => s.gender === 'Female').sort((a, b) => a.name.localeCompare(b.name));
        let startY = 35;
        if (boys.length > 0) {
            doc.setFontSize(11); doc.setFont(undefined, 'bold');
            doc.text('BOYS', 14, startY);
            doc.setFont(undefined, 'normal');
            const boyRows = boys.map((s, i) => [i + 1, s.name, s.lrn, s.status]);
            doc.autoTable({
                startY: startY + 4,
                head: [['#', 'Name', 'LRN', 'Enrollment Status']],
                body: boyRows, theme: 'grid',
                headStyles: { fillColor: [26, 77, 62], textColor: 255, fontStyle: 'bold', fontSize: 9 },
                bodyStyles: { fontSize: 9 },
                alternateRowStyles: { fillColor: [240, 253, 244] },
                columnStyles: { 0: { cellWidth: 10, halign: 'center' }, 1: { cellWidth: 80 }, 2: { cellWidth: 40 }, 3: { cellWidth: 40, halign: 'center' } },
                margin: { left: 14, right: 14 }
            });
            startY = doc.lastAutoTable.finalY + 10;
        }
        if (girls.length > 0) {
            if (startY > 240) { doc.addPage(); startY = 20; }
            doc.setFontSize(11); doc.setFont(undefined, 'bold');
            doc.text('GIRLS', 14, startY);
            doc.setFont(undefined, 'normal');
            const girlRows = girls.map((s, i) => [i + 1, s.name, s.lrn, s.status]);
            doc.autoTable({
                startY: startY + 4,
                head: [['#', 'Name', 'LRN', 'Enrollment Status']],
                body: girlRows, theme: 'grid',
                headStyles: { fillColor: [26, 77, 62], textColor: 255, fontStyle: 'bold', fontSize: 9 },
                bodyStyles: { fontSize: 9 },
                alternateRowStyles: { fillColor: [240, 253, 244] },
                columnStyles: { 0: { cellWidth: 10, halign: 'center' }, 1: { cellWidth: 80 }, 2: { cellWidth: 40 }, 3: { cellWidth: 40, halign: 'center' } },
                margin: { left: 14, right: 14 }
            });
        }
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(120);
            doc.text('AGSNHS Enrollment System - Page ' + i + ' of ' + pageCount, 105, 290, { align: 'center' });
        }
    });
    doc.save('Student_List_' + teacherName.replace(/[^a-zA-Z0-9]/g, '_') + '.pdf');
}
