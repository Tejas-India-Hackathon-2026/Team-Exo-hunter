# AutoSoft AI Smart Attendance System

> **“Smart Recognition. Accurate Attendance. Better Classrooms.”**

An independent, fully modular, and responsive AI-powered classroom attendance system prototype built for **AutoSoft Solutions**. This system uses facial recognition simulations to identify students, log attendance, enable faculty override verifications, compile professional PDF summaries, and share data via WhatsApp.

---

## 📂 Directory Structure

All files associated with this module are isolated inside the `smart-attendance/` directory:

```text
smart-attendance/
│
├── index.html                  # Landing Page & Workflow Overview
├── login.html                  # Role-Based Login (Admin, Faculty, Student)
├── student-registration.html    # Academic Form & Web-camera Scanning Wizard
├── admin-dashboard.html        # Admin Stats & Analytics charts (Chart.js)
├── faculty-dashboard.html      # Assigned Daily Class Sessions
├── live-attendance.html        # Camera feed scanner & 20-student AI simulation
├── attendance-records.html      # Logs table, searches, & present/absent overrides
├── unrecognized-faces.html     # Verification queue for unknown face mappings
├── reports.html                # PDF reports generation & WhatsApp summary shares
├── classroom-analytics.html    # Analytics dashboard (occupancy & trends charts)
├── privacy.html                # Biometrics policy & student rights guidelines
├── README.md                   # System configuration & instructions (This file)
│
├── css/
│   └── attendance-style.css    # Scoped stylesheet (using unique '.asa-' prefixes)
│
└── js/
    ├── attendance-app.js       # LocalStorage core & seed database
    ├── attendance-auth.js      # Credentials validator & session guards
    ├── face-registration.js    # Multi-angle face capture driver
    ├── face-recognition.js     # Live camera matching draw loop & demo simulator
    └── report-generator.js     # jsPDF reports compiler
```

---

## ⚡ Key Features

1. **Role-Based Authentication (Simulated)**
   * **Admin** (`admin` / `admin123`) &rarr; Accesses global dashboards, charts, and configurations.
   * **Faculty** (`faculty` / `faculty123`) &rarr; Initiates scans, manages daily schedules, overrides logs, resolves faces, and exports summaries.
   * **Student** (`student` / `student123`) &rarr; Enrolls via the registration wizard.

2. **Webcam Biometric Capture**
   * Accesses user hardware webcam to guide candidates through capturing 5 core angles (front, left, right, up, down) with a mandatory Biometric Consent check.

3. **High-Fidelity AI Scanning Simulation**
   * Operates a live scan of a classroom, logging 20+ students sequentially with randomized confidence scores. Captures a low-confidence match and an unrecognized face, routing the latter to the unresolved queue.

4. **Faculty Override Control**
   * Lets faculty directly override logs (Mark Present/Mark Absent) and resolve unidentified faces with verification prompts.

5. **jsPDF Report Compiler**
   * Generates formatted A4 attendance summary sheets (totals, class name, date, subject, attendance rate, signatures) on the client side.

6. **WhatsApp Integration**
   * Compiles attendance summary text templates automatically and triggers `wa.me` chat redirections.

---

## 🚀 How to Run the Project Locally

Since the module is designed as static HTML/CSS/JS, it is fully compatible with any standard local web server.

### Option A: Using Visual Studio Code Live Server
1. Open the project root `d:/Autosoftsolution` in VS Code.
2. Click **Go Live** on the bottom status bar.
3. Open `http://127.0.0.1:5500/smart-attendance/` in your browser.

### Option B: Using Node.js HTTP-Server
1. Open terminal inside `d:/Autosoftsolution`:
   ```bash
   npx http-server .
   ```
2. Open `http://localhost:8080/smart-attendance/` in your browser.

---

## 🌐 Netlify Deployment Instructions

This module is 100% compatible with static Netlify hosting.

To deploy changes to production:
1. Ensure you have the Netlify CLI tools or run the deployment command:
   ```bash
   npx netlify-cli deploy --prod --dir=.
   ```
2. The card is integrated on the main portal homepage at `https://autosoftsolution.com`. Click **Open Smart Attendance** to launch the dashboard.
