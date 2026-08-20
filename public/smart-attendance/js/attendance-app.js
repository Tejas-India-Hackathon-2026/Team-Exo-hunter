// AutoSoft AI Smart Attendance - Database Setup & Seeding

(function() {
  // Seed data lists
  const defaultStudents = [
    { id: "STU-CSE-1001", fullName: "Ayush Raj", rollNo: "CSE-001", email: "ayush@autosoftsolution.com", mobile: "9931079287", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00431", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1002", fullName: "Rohan Sharma", rollNo: "CSE-002", email: "rohan@gmail.com", mobile: "9876543210", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00432", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1003", fullName: "Priya Patel", rollNo: "CSE-003", email: "priya@gmail.com", mobile: "9876543211", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00433", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1004", fullName: "Amit Kumar", rollNo: "CSE-004", email: "amit@gmail.com", mobile: "9876543212", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00434", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1005", fullName: "Ananya Sen", rollNo: "CSE-005", email: "ananya@gmail.com", mobile: "9876543213", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00435", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1006", fullName: "Aditya Verma", rollNo: "CSE-006", email: "aditya@gmail.com", mobile: "9876543214", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00436", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1007", fullName: "Shalini Singh", rollNo: "CSE-007", email: "shalini@gmail.com", mobile: "9876543215", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00437", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1008", fullName: "Vikram Malhotra", rollNo: "CSE-008", email: "vikram@gmail.com", mobile: "9876543216", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00438", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1009", fullName: "Sneha Nair", rollNo: "CSE-009", email: "sneha@gmail.com", mobile: "9876543217", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00439", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1010", fullName: "Abhishek Joshi", rollNo: "CSE-010", email: "abhishek@gmail.com", mobile: "9876543218", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00440", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1011", fullName: "Neha Gupta", rollNo: "CSE-011", email: "neha@gmail.com", mobile: "9876543219", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00441", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1012", fullName: "Kunwar Pratap", rollNo: "CSE-012", email: "kunwar@gmail.com", mobile: "9876543220", branch: "Computer Science", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00442", faceRegistered: true, status: "Active" },
    { id: "STU-ECE-2001", fullName: "Deepak Kumar", rollNo: "ECE-001", email: "deepak@ece.com", mobile: "9876543221", branch: "Electronics", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00501", faceRegistered: true, status: "Active" },
    { id: "STU-ECE-2002", fullName: "Simran Kaur", rollNo: "ECE-002", email: "simran@ece.com", mobile: "9876543222", branch: "Electronics", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00502", faceRegistered: true, status: "Active" },
    { id: "STU-ECE-2003", fullName: "Gaurav Gupta", rollNo: "ECE-003", email: "gaurav@ece.com", mobile: "9876543223", branch: "Electronics", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00503", faceRegistered: true, status: "Active" },
    { id: "STU-ME-3001", fullName: "Pankaj Yadav", rollNo: "ME-001", email: "pankaj@me.com", mobile: "9876543224", branch: "Mechanical", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00601", faceRegistered: true, status: "Active" },
    { id: "STU-ME-3002", fullName: "Varun Dhawan", rollNo: "ME-002", email: "varun@me.com", mobile: "9876543225", branch: "Mechanical", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00602", faceRegistered: true, status: "Active" },
    { id: "STU-CE-4001", fullName: "Sandeep Roy", rollNo: "CE-001", email: "sandeep@ce.com", mobile: "9876543226", branch: "Civil", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00701", faceRegistered: true, status: "Active" },
    { id: "STU-CE-4002", fullName: "Megha Rao", rollNo: "CE-002", email: "megha@ce.com", mobile: "9876543227", branch: "Civil", semester: "Semester IV", section: "A+B", session: "2025-2029", regNo: "UG-2025-00702", faceRegistered: true, status: "Active" },
    { id: "STU-CSE-1025", fullName: "John Doe", rollNo: "CSE-025", email: "john@gmail.com", mobile: "9876543228", branch: "Computer Science", semester: "Semester IV", section: "A+B", faceRegistered: false, status: "Active" }
  ];

  const defaultClasses = [
    { id: "CL-01", name: "B.Tech CSE – Semester IV (Sec A+B Combined)", branch: "Computer Science", semester: "Semester IV", section: "A+B" },
    { id: "CL-02", name: "B.Tech ECE – Semester IV (Sec A+B Combined)", branch: "Electronics", semester: "Semester IV", section: "A+B" }
  ];

  const defaultSubjects = [
    { code: "105406", name: "Computer Networks", branch: "Computer Science" },
    { code: "105401", name: "Computer Organization and Architecture", branch: "Computer Science" },
    { code: "105403", name: "Design and Analysis of Algorithms", branch: "Computer Science" },
    { code: "105404", name: "Database Management System", branch: "Computer Science" },
    { code: "105405", name: "Effective Technical Communication", branch: "Computer Science" },
    { code: "105402", name: "Formal Language and Automata Theory", branch: "Computer Science" }
  ];

  const defaultFaculties = [
    { id: "FAC-01", fullName: "Mr. Anand Raj (AP)", username: "faculty", email: "anand@autosoftsolution.com", department: "Computer Science" },
    { id: "FAC-02", fullName: "Mr. Niraj Nirmal (AP)", username: "niraj", email: "niraj@autosoftsolution.com", department: "Computer Science" },
    { id: "FAC-03", fullName: "Mr. Md. Zaki Anwer (AP)", username: "zaki", email: "zaki@autosoftsolution.com", department: "Computer Science" },
    { id: "FAC-04", fullName: "Ms. Manisha Rani (AP)", username: "manisha", email: "manisha@autosoftsolution.com", department: "Computer Science" }
  ];

  // Seed logs matching Semester IV
  const defaultHistory = [
    { id: "REC-101", date: "2026-07-05", className: "B.Tech CSE – Semester IV (Sec A+B Combined)", subjectName: "Computer Networks", facultyName: "Mr. Anand Raj (AP)", totalStudents: 12, presentCount: 11, absentCount: 1, attendanceRate: 91, status: "Verified" },
    { id: "REC-102", date: "2026-07-06", className: "B.Tech CSE – Semester IV (Sec A+B Combined)", subjectName: "Computer Organization and Architecture", facultyName: "Mr. Niraj Nirmal (AP)", totalStudents: 12, presentCount: 10, absentCount: 2, attendanceRate: 83, status: "Verified" },
    { id: "REC-103", date: "2026-07-07", className: "B.Tech CSE – Semester IV (Sec A+B Combined)", subjectName: "Design and Analysis of Algorithms", facultyName: "Mr. Md. Zaki Anwer (AP)", totalStudents: 12, presentCount: 11, absentCount: 1, attendanceRate: 91, status: "Verified" },
    { id: "REC-104", date: "2026-07-08", className: "B.Tech CSE – Semester IV (Sec A+B Combined)", subjectName: "Database Management System", facultyName: "Ms. Manisha Rani (AP)", totalStudents: 12, presentCount: 12, absentCount: 0, attendanceRate: 100, status: "Verified" },
    { id: "REC-105", date: "2026-07-09", className: "B.Tech CSE – Semester IV (Sec A+B Combined)", subjectName: "Formal Language and Automata Theory", facultyName: "Dr. Surjeet Kumar (AP)", totalStudents: 12, presentCount: 9, absentCount: 3, attendanceRate: 75, status: "Verified" }
  ];

  const defaultStudentAttendanceLogs = [
    { id: "LOG-001", studentId: "STU-CSE-1001", studentName: "Ayush Raj", rollNo: "CSE-001", className: "B.Tech CSE – Semester IV (Sec A+B Combined)", subjectName: "Computer Networks", date: "2026-07-05", detectionTime: "10:05 AM", confidence: 98, status: "Present", verified: "Verified" },
    { id: "LOG-002", studentId: "STU-CSE-1001", studentName: "Ayush Raj", rollNo: "CSE-001", className: "B.Tech CSE – Semester IV (Sec A+B Combined)", subjectName: "Computer Organization and Architecture", date: "2026-07-06", detectionTime: "10:06 AM", confidence: 96, status: "Present", verified: "Verified" },
    { id: "LOG-003", studentId: "STU-CSE-1001", studentName: "Ayush Raj", rollNo: "CSE-001", className: "B.Tech CSE – Semester IV (Sec A+B Combined)", subjectName: "Design and Analysis of Algorithms", date: "2026-07-07", detectionTime: "11:04 AM", confidence: 97, status: "Present", verified: "Verified" }
  ];

  const defaultUnrecognized = [
    { id: "UNR-01", date: "2026-07-09", time: "10:15 AM", className: "B.Tech CSE – Semester IV (Sec A+B Combined)", subjectName: "Formal Language and Automata Theory", confidence: 45, imagePath: "", status: "Pending" }
  ];

  // Dynamic Weekly Timetable Database Map
  const defaultTimetable = {
    1: [ // Monday
      { time: "10:00 AM – 11:00 AM", code: "105401", subject: "Computer Organization and Architecture", faculty: "Mr. Niraj Nirmal (AP)" },
      { time: "11:00 AM – 12:00 PM", code: "105405", subject: "Effective Technical Communication", faculty: "Dr. Avdhesh Kumar Suman (AP)" },
      { time: "12:00 PM – 01:00 PM", code: "105402", subject: "Formal Language and Automata Theory", faculty: "Dr. Surjeet Kumar (AP)" },
      { time: "02:00 PM – 03:00 PM", code: "105403", subject: "Design and Analysis of Algorithms", faculty: "Mr. Md. Zaki Anwer (AP)" }
    ],
    2: [ // Tuesday
      { time: "10:00 AM – 11:00 AM", code: "105401", subject: "Computer Organization and Architecture", faculty: "Mr. Niraj Nirmal (AP)" },
      { time: "11:00 AM – 12:00 PM", code: "105402", subject: "Formal Language and Automata Theory", faculty: "Dr. Surjeet Kumar (AP)" },
      { time: "12:00 PM – 01:00 PM", code: "105405", subject: "Effective Technical Communication", faculty: "Dr. Avdhesh Kumar Suman (AP)" }
    ],
    3: [ // Wednesday
      { time: "10:00 AM – 11:00 AM", code: "105404", subject: "Database Management System", faculty: "Ms. Manisha Rani (AP)" },
      { time: "11:00 AM – 12:00 PM", code: "105403", subject: "Design and Analysis of Algorithms", faculty: "Mr. Md. Zaki Anwer (AP)" },
      { time: "12:00 PM – 01:00 PM", code: "105401", subject: "Computer Organization and Architecture", faculty: "Mr. Niraj Nirmal (AP)" }
    ],
    4: [ // Thursday
      { time: "10:00 AM – 11:00 AM", code: "105402", subject: "Formal Language and Automata Theory", faculty: "Dr. Surjeet Kumar (AP)" },
      { time: "11:00 AM – 12:00 PM", code: "105404", subject: "Database Management System", faculty: "Ms. Manisha Rani (AP)" },
      { time: "12:00 PM – 01:00 PM", code: "105406", subject: "Computer Networks", faculty: "Mr. Anand Raj (AP)" }
    ],
    5: [ // Friday
      { time: "10:00 AM – 11:00 AM", code: "105406", subject: "Computer Networks", faculty: "Mr. Anand Raj (AP)" },
      { time: "11:00 AM – 12:00 PM", code: "105405", subject: "Effective Technical Communication", faculty: "Dr. Avdhesh Kumar Suman (AP)" },
      { time: "12:00 PM – 01:00 PM", code: "105404", subject: "Database Management System", faculty: "Ms. Manisha Rani (AP)" }
    ],
    6: [ // Saturday
      { time: "10:00 AM – 11:00 AM", code: "105403", subject: "Design and Analysis of Algorithms", faculty: "Mr. Md. Zaki Anwer (AP)" },
      { time: "11:00 AM – 12:00 PM", code: "105406", subject: "Computer Networks", faculty: "Mr. Anand Raj (AP)" },
      { time: "12:00 PM – 01:00 PM", code: "105402", subject: "Formal Language and Automata Theory", faculty: "Dr. Surjeet Kumar (AP)" }
    ],
    0: [] // Sunday
  };

  const seedIfMissing = (key, value) => {
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  // Initialize demo data once, while preserving any new registrations or approvals already stored
  seedIfMissing("asa_students", defaultStudents);
  seedIfMissing("asa_classes", defaultClasses);
  seedIfMissing("asa_subjects", defaultSubjects);
  seedIfMissing("asa_faculties", defaultFaculties);
  seedIfMissing("asa_history", defaultHistory);
  seedIfMissing("asa_logs", defaultStudentAttendanceLogs);
  seedIfMissing("asa_unrecognized", defaultUnrecognized);
  seedIfMissing("asa_timetable", defaultTimetable);

  // Global namespace configuration
  window.asaDB = {
    get: function(key) {
      return JSON.parse(localStorage.getItem(key) || '[]');
    },
    save: function(key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    clearAll: function() {
      localStorage.removeItem("asa_students");
      localStorage.removeItem("asa_classes");
      localStorage.removeItem("asa_subjects");
      localStorage.removeItem("asa_faculties");
      localStorage.removeItem("asa_history");
      localStorage.removeItem("asa_logs");
      localStorage.removeItem("asa_unrecognized");
      localStorage.removeItem("asa_timetable");
      window.location.reload();
    }
  };

  console.log("AutoSoft Database updated to Semester IV (Sec A+B Combined) with Dynamic Timetable seeding.");
})();
