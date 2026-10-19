/**
 * In-memory application state (resets on page reload)
 */

// ============================================
// IN-MEMORY DATA
// ============================================
let userDatabase = JSON.parse(JSON.stringify(defaultUserDatabase));
let mockStudents = JSON.parse(JSON.stringify(defaultMockStudents));
let teachers = JSON.parse(JSON.stringify(defaultTeachers));
let teacherAccounts = [];

let maxStudentsPerDay = 5;

const sections = ['Grade 7 - Section A', 'Grade 7 - Section B', 'Grade 8 - Section A', 'Grade 8 - Section B', 'Grade 9 - Section A', 'Grade 9 - Section B', 'Grade 10 - Section A', 'Grade 10 - Section B'];

let currentStudentUser = null;
let currentTeacherUser = null;
let activeTeacherSection = null;
let miniCalDate = new Date(2026, 6, 1);
let miniCalSelectedDate = null;
let scheduledDate = null;
let directorySelectionMode = false;
let adminRefreshInterval = null;
