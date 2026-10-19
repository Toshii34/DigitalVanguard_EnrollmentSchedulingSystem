/**
 * Section lists per grade level and the master student roster
 */

// ============================================
// SECTION LIST BY GRADE
// ============================================
const SECTIONS_BY_GRADE = {
    'Grade 7':  ['Grade 7 - Section A', 'Grade 7 - Section B'],
    'Grade 8':  ['Grade 8 - Section A', 'Grade 8 - Section B'],
    'Grade 9':  ['Grade 9 - Section A', 'Grade 9 - Section B', 'Grade 9 - Section C'],
    'Grade 10': ['Grade 10 - Section A', 'Grade 10 - Section B'],
    'Grade 11': ['Grade 11 - Academic Track', 'Grade 11 - TechPro Track'],
    'Grade 12': ['Grade 12 - Academic Track', 'Grade 12 - TechPro Track']
};

function updateNewEnrollmentSections() {
    const gradeSelect = document.getElementById('newGrade');
    const sectionSelect = document.getElementById('newSection');
    if (!gradeSelect || !sectionSelect) return;
    const selectedGrade = gradeSelect.value;
    sectionSelect.innerHTML = '<option value="">-- Not yet assigned --</option>';
    if (selectedGrade && SECTIONS_BY_GRADE[selectedGrade]) {
        SECTIONS_BY_GRADE[selectedGrade].forEach(sec => {
            const opt = document.createElement('option');
            opt.value = sec;
            opt.textContent = sec;
            sectionSelect.appendChild(opt);
        });
    }
}

// ============================================
// MASTER STUDENT ROSTER
// ============================================
const MASTER_ROSTER = {
    'Grade 7 - Section A': [
        { name: 'Alvarez, Christian Paul', lrn: '1023456789012', grade: 'Grade 7', gender: 'Male', status: 'Enrolled' },
        { name: 'Bernardo, Kathryn Joyce', lrn: '1023456789013', grade: 'Grade 7', gender: 'Female', status: 'Pending' },
        { name: 'Dela Cruz, Juan Carlos', lrn: '1023456789014', grade: 'Grade 7', gender: 'Male', status: 'Enrolled' },
        { name: 'Estacio, Maria Teresa', lrn: '1023456789015', grade: 'Grade 7', gender: 'Female', status: 'Incomplete' },
        { name: 'Gomez, Francisco Lorenzo', lrn: '1023456789016', grade: 'Grade 7', gender: 'Male', status: 'Enrolled' },
        { name: 'Hernandez, Sofia Nicole', lrn: '1023456789017', grade: 'Grade 7', gender: 'Female', status: 'Pending' },
        { name: 'Mendoza, Alden James', lrn: '1023456789018', grade: 'Grade 7', gender: 'Male', status: 'Enrolled' },
        { name: 'Santos, Beatriz Louise', lrn: '1023456789019', grade: 'Grade 7', gender: 'Female', status: 'Incomplete' },
        { name: 'Reyes, Patricia Anne', lrn: '1023456789020', grade: 'Grade 7', gender: 'Female', status: 'Enrolled' },
        { name: 'Villanueva, Marco Paulo', lrn: '1023456789021', grade: 'Grade 7', gender: 'Male', status: 'Enrolled' },
        { name: 'Torres, Angela Rose', lrn: '1023456789022', grade: 'Grade 7', gender: 'Female', status: 'Pending' },
        { name: 'Lim, Jonathan David', lrn: '1023456789023', grade: 'Grade 7', gender: 'Male', status: 'Enrolled' }
    ],
    'Grade 8 - Section A': [
        { name: 'Aquino, Rafael Miguel', lrn: '1034567890123', grade: 'Grade 8', gender: 'Male', status: 'Enrolled' },
        { name: 'Bautista, Camille Anne', lrn: '1034567890124', grade: 'Grade 8', gender: 'Female', status: 'Enrolled' },
        { name: 'Castro, Luis Antonio', lrn: '1034567890125', grade: 'Grade 8', gender: 'Male', status: 'Pending' },
        { name: 'Diaz, Isabella Rose', lrn: '1034567890126', grade: 'Grade 8', gender: 'Female', status: 'Incomplete' },
        { name: 'Espiritu, Gabriel Luis', lrn: '1034567890127', grade: 'Grade 8', gender: 'Male', status: 'Enrolled' },
        { name: 'Fernandez, Patricia Mae', lrn: '1034567890128', grade: 'Grade 8', gender: 'Female', status: 'Enrolled' },
        { name: 'Gonzales, Ricardo Jr.', lrn: '1034567890129', grade: 'Grade 8', gender: 'Male', status: 'Enrolled' },
        { name: 'Ignacio, Patricia Nicole', lrn: '1034567890130', grade: 'Grade 8', gender: 'Female', status: 'Pending' },
        { name: 'Jimenez, Emmanuel', lrn: '1034567890131', grade: 'Grade 8', gender: 'Male', status: 'Enrolled' },
        { name: 'Lacson, Diana Marie', lrn: '1034567890132', grade: 'Grade 8', gender: 'Female', status: 'Enrolled' },
        { name: 'Manalo, Joshua', lrn: '1034567890133', grade: 'Grade 8', gender: 'Male', status: 'Incomplete' },
        { name: 'Nolasco, Bea Andrea', lrn: '1034567890134', grade: 'Grade 8', gender: 'Female', status: 'Enrolled' }
    ],
    'Grade 9 - Section C': [
        { name: 'Garcia, Miguel Angelo', lrn: '1045678901234', grade: 'Grade 9', gender: 'Male', status: 'Enrolled' },
        { name: 'Herrera, Juliana Marie', lrn: '1045678901235', grade: 'Grade 9', gender: 'Female', status: 'Pending' },
        { name: 'Isidro, Carlos Miguel', lrn: '1045678901236', grade: 'Grade 9', gender: 'Male', status: 'Enrolled' },
        { name: 'Jimenez, Sophia Grace', lrn: '1045678901237', grade: 'Grade 9', gender: 'Female', status: 'Incomplete' },
        { name: 'Lopez, Andres Felipe', lrn: '1045678901238', grade: 'Grade 9', gender: 'Male', status: 'Enrolled' },
        { name: 'Magno, Camille Joy', lrn: '1045678901239', grade: 'Grade 9', gender: 'Female', status: 'Enrolled' },
        { name: 'Navarro, Rafael', lrn: '1045678901240', grade: 'Grade 9', gender: 'Male', status: 'Enrolled' },
        { name: 'Ocampo, Alyssa Nicole', lrn: '1045678901241', grade: 'Grade 9', gender: 'Female', status: 'Pending' },
        { name: 'Pascual, Miguel Antonio', lrn: '1045678901242', grade: 'Grade 9', gender: 'Male', status: 'Enrolled' },
        { name: 'Quinto, Bianca Marie', lrn: '1045678901243', grade: 'Grade 9', gender: 'Female', status: 'Enrolled' },
        { name: 'Ramos, Mark Joseph', lrn: '1045678901244', grade: 'Grade 9', gender: 'Male', status: 'Incomplete' },
        { name: 'Salazar, Jessa Mae', lrn: '1045678901245', grade: 'Grade 9', gender: 'Female', status: 'Enrolled' }
    ],
    'Grade 10 - Section B': [
        { name: 'Martinez, Diego Rafael', lrn: '1056789012345', grade: 'Grade 10', gender: 'Male', status: 'Enrolled' },
        { name: 'Navarro, Angela Beatriz', lrn: '1056789012346', grade: 'Grade 10', gender: 'Female', status: 'Enrolled' },
        { name: 'Ocampo, Ricardo Jose', lrn: '1056789012347', grade: 'Grade 10', gender: 'Male', status: 'Pending' },
        { name: 'Perez, Valentina Sofia', lrn: '1056789012348', grade: 'Grade 10', gender: 'Female', status: 'Incomplete' },
        { name: 'Quinto, Eduardo Miguel', lrn: '1056789012349', grade: 'Grade 10', gender: 'Male', status: 'Enrolled' },
        { name: 'Reyes, Mariana Isabel', lrn: '1056789012350', grade: 'Grade 10', gender: 'Female', status: 'Enrolled' },
        { name: 'Santos, Fernando Luis', lrn: '1056789012351', grade: 'Grade 10', gender: 'Male', status: 'Pending' },
        { name: 'Tolentino, Andrea Nicole', lrn: '1056789012352', grade: 'Grade 10', gender: 'Female', status: 'Enrolled' },
        { name: 'Uy, Christopher John', lrn: '1056789012353', grade: 'Grade 10', gender: 'Male', status: 'Enrolled' },
        { name: 'Valencia, Kristine Joy', lrn: '1056789012354', grade: 'Grade 10', gender: 'Female', status: 'Enrolled' },
        { name: 'Yap, Michael Anthony', lrn: '1056789012355', grade: 'Grade 10', gender: 'Male', status: 'Incomplete' },
        { name: 'Zamora, Bianca Rose', lrn: '1056789012356', grade: 'Grade 10', gender: 'Female', status: 'Enrolled' }
    ],
    'Grade 11 - Academic Track': [
        { name: 'Aguilar, Patricia Mae', lrn: '1067890123456', grade: 'Grade 11', gender: 'Female', status: 'Enrolled' },
        { name: 'Bautista, Christian', lrn: '1067890123457', grade: 'Grade 11', gender: 'Male', status: 'Enrolled' },
        { name: 'Cruz, Stephanie Anne', lrn: '1067890123458', grade: 'Grade 11', gender: 'Female', status: 'Pending' },
        { name: 'Delos Santos, Miguel', lrn: '1067890123459', grade: 'Grade 11', gender: 'Male', status: 'Enrolled' },
        { name: 'Enriquez, Nicole', lrn: '1067890123460', grade: 'Grade 11', gender: 'Female', status: 'Incomplete' },
        { name: 'Francisco, Josh Matthew', lrn: '1067890123461', grade: 'Grade 11', gender: 'Male', status: 'Enrolled' },
        { name: 'Gutierrez, Jasmine', lrn: '1067890123462', grade: 'Grade 11', gender: 'Female', status: 'Enrolled' },
        { name: 'Hernandez, Marc Daniel', lrn: '1067890123463', grade: 'Grade 11', gender: 'Male', status: 'Enrolled' },
        { name: 'Ibarra, Kyla Marie', lrn: '1067890123464', grade: 'Grade 11', gender: 'Female', status: 'Pending' },
        { name: 'Javier, Patrick John', lrn: '1067890123465', grade: 'Grade 11', gender: 'Male', status: 'Enrolled' },
        { name: 'Katigbak, Samantha', lrn: '1067890123466', grade: 'Grade 11', gender: 'Female', status: 'Enrolled' },
        { name: 'Lorenzo, Christian Dave', lrn: '1067890123467', grade: 'Grade 11', gender: 'Male', status: 'Incomplete' },
        { name: 'Mercado, Sophia Grace', lrn: '1067890123468', grade: 'Grade 11', gender: 'Female', status: 'Enrolled' },
        { name: 'Nakpil, Juan Miguel', lrn: '1067890123469', grade: 'Grade 11', gender: 'Male', status: 'Enrolled' }
    ],
    'Grade 11 - TechPro Track': [
        { name: 'Ocampo, Justine', lrn: '1067890130001', grade: 'Grade 11', gender: 'Male', status: 'Enrolled' },
        { name: 'Pascual, Angelica', lrn: '1067890130002', grade: 'Grade 11', gender: 'Female', status: 'Enrolled' },
        { name: 'Quiambao, Mark Anthony', lrn: '1067890130003', grade: 'Grade 11', gender: 'Male', status: 'Pending' },
        { name: 'Roxas, Trisha Mae', lrn: '1067890130004', grade: 'Grade 11', gender: 'Female', status: 'Enrolled' },
        { name: 'Salvador, Ronald', lrn: '1067890130005', grade: 'Grade 11', gender: 'Male', status: 'Incomplete' },
        { name: 'Tan, Yvonne', lrn: '1067890130006', grade: 'Grade 11', gender: 'Female', status: 'Enrolled' },
        { name: 'Umali, Joseph Brian', lrn: '1067890130007', grade: 'Grade 11', gender: 'Male', status: 'Enrolled' },
        { name: 'Velasco, Mary Joy', lrn: '1067890130008', grade: 'Grade 11', gender: 'Female', status: 'Enrolled' },
        { name: 'Wenceslao, Ariel', lrn: '1067890130009', grade: 'Grade 11', gender: 'Male', status: 'Pending' },
        { name: 'Yumul, Camille', lrn: '1067890130010', grade: 'Grade 11', gender: 'Female', status: 'Enrolled' },
        { name: 'Zapata, Christian Lyle', lrn: '1067890130011', grade: 'Grade 11', gender: 'Male', status: 'Enrolled' }
    ],
    'Grade 12 - Academic Track': [
        { name: 'Abad, Lorenzo', lrn: '1078901245678', grade: 'Grade 12', gender: 'Male', status: 'Enrolled' },
        { name: 'Buenaventura, Clarisse', lrn: '1078901245679', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' },
        { name: 'Cordero, Vincent', lrn: '1078901245680', grade: 'Grade 12', gender: 'Male', status: 'Pending' },
        { name: 'Dimaculangan, Angela', lrn: '1078901245681', grade: 'Grade 12', gender: 'Female', status: 'Incomplete' },
        { name: 'Estrella, Marco', lrn: '1078901245682', grade: 'Grade 12', gender: 'Male', status: 'Enrolled' },
        { name: 'Fajardo, Patricia', lrn: '1078901245683', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' },
        { name: 'Gonzales, Rafael', lrn: '1078901245684', grade: 'Grade 12', gender: 'Male', status: 'Enrolled' },
        { name: 'Hilario, Jasmine', lrn: '1078901245685', grade: 'Grade 12', gender: 'Female', status: 'Pending' },
        { name: 'Ilagan, Marc Vincent', lrn: '1078901245686', grade: 'Grade 12', gender: 'Male', status: 'Enrolled' },
        { name: 'Javellana, Nicole', lrn: '1078901245687', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' },
        { name: 'Kalaw, Antonio', lrn: '1078901245688', grade: 'Grade 12', gender: 'Male', status: 'Incomplete' },
        { name: 'Ledesma, Sofia', lrn: '1078901245689', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' },
        { name: 'Magbanua, Jose Miguel', lrn: '1078901245690', grade: 'Grade 12', gender: 'Male', status: 'Enrolled' },
        { name: 'Nepomuceno, Trisha', lrn: '1078901245691', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' }
    ],
    'Grade 12 - TechPro Track': [
        { name: 'Ong, Kevin', lrn: '1078901250001', grade: 'Grade 12', gender: 'Male', status: 'Enrolled' },
        { name: 'Padilla, Michelle', lrn: '1078901250002', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' },
        { name: 'Quisumbing, Paolo', lrn: '1078901250003', grade: 'Grade 12', gender: 'Male', status: 'Pending' },
        { name: 'Rivera, Angelica', lrn: '1078901250004', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' },
        { name: 'Sandoval, Christian', lrn: '1078901250005', grade: 'Grade 12', gender: 'Male', status: 'Incomplete' },
        { name: 'Tiongson, Bernadette', lrn: '1078901250006', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' },
        { name: 'Urbano, Jonathan', lrn: '1078901250007', grade: 'Grade 12', gender: 'Male', status: 'Enrolled' },
        { name: 'Villamor, Katherine', lrn: '1078901250008', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' },
        { name: 'Wu, Brandon', lrn: '1078901250009', grade: 'Grade 12', gender: 'Male', status: 'Pending' },
        { name: 'Xavier, Danica', lrn: '1078901250010', grade: 'Grade 12', gender: 'Female', status: 'Enrolled' },
        { name: 'Yap, Miguel Angelo', lrn: '1078901250011', grade: 'Grade 12', gender: 'Male', status: 'Enrolled' }
    ]
};
