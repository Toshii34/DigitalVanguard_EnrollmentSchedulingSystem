/**
 * Default demo accounts, students and teachers
 */

// ============================================
// DEFAULT DATA
// ============================================
const defaultUserDatabase = [
    {
        username: 'marlon santos dela cruz', password: 'student123', role: 'student',
        fullName: 'Marlon Santos Dela Cruz',
        studentData: {
            firstName: 'Marlon', middleName: 'Santos', lastName: 'Dela Cruz',
            fullName: 'Marlon Santos Dela Cruz', lrn: '10287654321',
            gradeLevel: 'Grade 7', section: 'Pending Final Enrollment',
            phone: '+63 912 345 6789', guardian: 'Ramon Dela Cruz',
            email: 'marlon.delacruz@gmail.com'
        },
        appointment: {
            type: 'Passing of Enrollment Form', date: 'Monday, July 15, 2024',
            time: '10:00 AM - 11:00 AM', location: 'Admission Office, Main Building.',
            status: 'approved'
        },
        rescheduleRequest: null
    },
    {
        username: 'clarissa santos', password: 'teacher123', role: 'teacher',
        fullName: 'Clarissa Santos', subject: 'Science',
        email: 'clarissa.santos@agsnhs.edu.ph',
        assignedSections: ['Grade 7 - Section A', 'Grade 8 - Section A', 'Grade 9 - Section C', 'Grade 10 - Section B', 'Grade 11 - Academic Track', 'Grade 11 - TechPro Track', 'Grade 12 - Academic Track', 'Grade 12 - TechPro Track']
    },
    { username: 'admission staff', password: 'admin123', role: 'admin', fullName: 'Admission Staff', email: 'admission@agsnhs.edu.ph' },
    { username: 'maria clara santos', password: 'maria123', role: 'student', fullName: 'Maria Clara Santos',
      studentData: { firstName: 'Maria', middleName: 'Clara', lastName: 'Santos', fullName: 'Maria Clara Santos', lrn: '102876543211', gradeLevel: 'Grade 10', section: 'Grade 10 - Section B', phone: '+63 917 234 5678', guardian: 'Ana Santos', email: 'maria.santos@gmail.com' },
      appointment: null, rescheduleRequest: null },
    { username: 'roberto villanueva', password: 'roberto123', role: 'teacher', fullName: 'Roberto Villanueva',
      subject: 'Science', email: 'roberto.villanueva@agsnhs.edu.ph', assignedSections: ['Grade 7 - Section B', 'Grade 8 - Section B'] }
];

const defaultMockStudents = [
    { id: 1, firstName: 'John', middleName: 'Doe', lastName: 'Ramos', grade: 'Grade 7', section: 'Grade 7 - Section A', lrn: '102876543210', gender: 'Male', dob: '2012-05-15', address: 'Liciada, Bustos, Bulacan', phone: '09123456789', email: 'john.ramos@gmail.com', guardian: 'Ramon Ramos', guardianContact: '09129876543', status: 'Pending', timeReceived: '10 mins ago', actionRequired: 'Documents Review', docs: { psa: true, report: true, moral: false }, hasRescheduleRequest: false },
    { id: 2, firstName: 'Maria', middleName: 'Clara', lastName: 'Santos', grade: 'Grade 10', section: 'Grade 10 - Section B', lrn: '102876543211', gender: 'Female', dob: '2009-08-22', address: 'San Pedro, Bustos, Bulacan', phone: '09172345678', email: 'maria.santos@gmail.com', guardian: 'Ana Santos', guardianContact: '09178765432', status: 'Enrolled', timeReceived: '1 hour ago', actionRequired: 'Schedule Interview', docs: { psa: true, report: true, moral: true }, hasRescheduleRequest: false },
    { id: 3, firstName: 'Juan', middleName: 'Dela', lastName: 'Cruz', grade: 'Grade 8', section: 'Grade 8 - Section A', lrn: '102876543212', gender: 'Male', dob: '2011-03-10', address: 'Poblacion, Bustos, Bulacan', phone: '09183456789', email: 'juan.delacruz@gmail.com', guardian: 'Pedro Dela Cruz', guardianContact: '09189876543', status: 'Pending', timeReceived: '3 hours ago', actionRequired: 'Finalize Enrollment', docs: { psa: true, report: false, moral: true }, hasRescheduleRequest: false },
    { id: 4, firstName: 'Sarah', middleName: 'Mae', lastName: 'Flores', grade: 'Grade 9', section: 'Grade 9 - Section A', lrn: '102876543213', gender: 'Female', dob: '2010-11-30', address: 'Cambaog, Bustos, Bulacan', phone: '09194567890', email: 'sarah.flores@gmail.com', guardian: 'Liza Flores', guardianContact: '09196543210', status: 'Enrolled', timeReceived: 'Yesterday', actionRequired: 'Documents Review', docs: { psa: true, report: true, moral: true }, hasRescheduleRequest: false },
    { id: 5, firstName: 'Miguel', middleName: 'Antonio', lastName: 'Reyes', grade: 'Grade 7', section: 'Grade 7 - Section A', lrn: '102876543214', gender: 'Male', dob: '2012-07-04', address: 'Liciada, Bustos, Bulacan', phone: '09205678901', email: 'miguel.reyes@gmail.com', guardian: 'Rosa Reyes', guardianContact: '09207654321', status: 'Pending', timeReceived: '2 days ago', actionRequired: 'Documents Review', docs: { psa: false, report: true, moral: true }, hasRescheduleRequest: false },
    { id: 6, firstName: 'Marlon', middleName: 'Santos', lastName: 'Dela Cruz', grade: 'Grade 7', section: 'Pending Final Enrollment', lrn: '10287654321', gender: 'Male', dob: '2012-01-10', address: 'Liciada, Bustos, Bulacan', phone: '09123456789', email: 'marlon.delacruz@gmail.com', guardian: 'Ramon Dela Cruz', guardianContact: '09129876543', status: 'Enrolled', timeReceived: '5 hours ago', actionRequired: 'Schedule Interview', docs: { psa: true, report: true, moral: true }, hasRescheduleRequest: false, username: 'marlon santos dela cruz' }
];

const defaultTeachers = [
    { name: 'Clarissa Santos', section: 'Grade 7 - Section A', count: 12, students: 'Ana Cruz, Ben Santos, Chloe Reyes, ...', subject: 'Science' },
    { name: 'Roberto Villanueva', section: 'Grade 8 - Section A', count: 12, students: 'Dana Flores, Ethan Mendez, Fiona Cruz, ...', subject: 'Science' },
    { name: 'Diana Reyes', section: 'Grade 9 - Section C', count: 12, students: 'Gina Santos, Hannah Villanueva, Ian Reyes, ...', subject: 'Science' },
    { name: 'Carlo Mendez', section: 'Grade 10 - Section B', count: 12, students: 'Julia Cruz, Kevin Santos, Lily Mendez, ...', subject: 'Science' }
];
