// Disha AI Smart Attendance - Classroom Face Scanner Simulator

(function() {
  let demoTimer = null;
  let activeStream = null;
  let scannedIndices = [];
  let detectedLogs = [];
  let unrecognizedCount = 0;
  let averageConfidenceTotal = 0;
  
  // Audio chime feedback simulation
  function playBeep(frequency = 880, duration = 100) {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      
      oscillator.start();
      setTimeout(() => oscillator.stop(), duration);
    } catch(e) {
      console.warn("Audio Context beep ignored:", e);
    }
  }

  window.asaFaceRec = {
    startCamera: async function(videoElId) {
      const video = document.getElementById(videoElId);
      if (!video) return;
      try {
        activeStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = activeStream;
        video.play();
        video.style.background = "none";
      } catch (err) {
        console.warn("No camera feed found. Launching simulator layout backdrop.");
        video.style.background = "#090f1a";
      }
    },

    stopCamera: function() {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
        activeStream = null;
      }
      if (demoTimer) {
        clearInterval(demoTimer);
        demoTimer = null;
      }
    },

    runSimulationDemo: function(videoContainerId, tableBodyId, statsIdMap, onCompleteCallback) {
      const container = document.getElementById(videoContainerId);
      const tbody = document.getElementById(tableBodyId);
      if (!container || !tbody) return;

      // Clear previous boxes and table
      container.querySelectorAll('.asa-face-box').forEach(el => el.remove());
      tbody.innerHTML = '';
      scannedIndices = [];
      detectedLogs = [];
      unrecognizedCount = 0;
      averageConfidenceTotal = 0;

      // Reset statistics widgets
      document.getElementById(statsIdMap.detected).innerText = "0";
      document.getElementById(statsIdMap.present).innerText = "0";
      document.getElementById(statsIdMap.unrecognized).innerText = "0";
      document.getElementById(statsIdMap.confidence).innerText = "0%";

      // Dynamic Class & Subject filter
      const params = new URLSearchParams(window.location.search);
      const classId = params.get('class') || 'CL-01';
      const subCode = params.get('subject') || '105406';

      let targetBranch = "Computer Science";
      let targetSemester = "Semester IV";
      let activeClassName = "B.Tech CSE – Semester IV (Sec A+B Combined)";
      let activeSubjectName = "Computer Networks";
      let activeFacultyName = "Mr. Anand Raj (AP)";

      const classes = window.asaDB.get("asa_classes");
      const targetClass = classes.find(c => c.id === classId);
      if (targetClass) {
        targetBranch = targetClass.branch;
        targetSemester = targetClass.semester;
        activeClassName = targetClass.name;
      }

      const subjects = window.asaDB.get("asa_subjects");
      const targetSubject = subjects.find(s => s.code === subCode);
      if (targetSubject) {
        activeSubjectName = targetSubject.name;
      }

      // Find assigned faculty for this period from local timetable config
      const timetable = JSON.parse(localStorage.getItem('asa_timetable') || '{}');
      const currentDay = new Date().getDay();
      const todaySessions = timetable[currentDay] || [];
      const sessionMatch = todaySessions.find(s => s.code === subCode);
      if (sessionMatch) {
        activeFacultyName = sessionMatch.faculty;
      } else {
        const session = JSON.parse(sessionStorage.getItem('asa_user_session') || '{}');
        if (session.name) activeFacultyName = session.name;
      }

      // Retrieve the registered/approved students
      const allStudents = window.asaDB.get("asa_students");
      const defaultStudentIds = [
        "STU-CSE-1001", "STU-CSE-1002", "STU-CSE-1003", "STU-CSE-1004", 
        "STU-CSE-1005", "STU-CSE-1006", "STU-CSE-1007", "STU-CSE-1008", 
        "STU-CSE-1009", "STU-CSE-1010", "STU-CSE-1011", "STU-CSE-1012",
        "STU-ECE-2001", "STU-ECE-2002", "STU-ECE-2003",
        "STU-ME-3001", "STU-ME-3002",
        "STU-CE-4001", "STU-CE-4002",
        "STU-CSE-1025"
      ];
      
      // Get approved/active custom students matching target class
      let customStudents = allStudents.filter(s => 
        !defaultStudentIds.includes(s.id) &&
        s.faceRegistered === true &&
        (s.approvalStatus === "Approved" || s.status === "Active") &&
        s.branch === targetBranch &&
        s.semester === targetSemester
      );

      // Fallback: check for any approved/active custom student regardless of class
      if (customStudents.length === 0) {
        customStudents = allStudents.filter(s => 
          !defaultStudentIds.includes(s.id) &&
          s.faceRegistered === true &&
          (s.approvalStatus === "Approved" || s.status === "Active")
        );
      }

      // Fallback: check for any custom student at all (even pending) to guarantee recognition feedback
      if (customStudents.length === 0) {
        customStudents = allStudents.filter(s => 
          !defaultStudentIds.includes(s.id) &&
          s.faceRegistered === true
        );
      }

      const activeStudents = customStudents;
      const totalStudents = activeStudents.length;
      let stepIndex = 0;
      const scanLength = totalStudents > 0 ? totalStudents + 3 : 5;

      // Save properties globally in window.asaFaceRec scope for save callbacks
      this.activeClassName = activeClassName;
      this.activeSubjectName = activeSubjectName;
      this.activeFacultyName = activeFacultyName;
      this.targetBranch = targetBranch;
      this.targetSemester = targetSemester;

      // Add scanner line
      let scanLine = container.querySelector('.asa-scanner-line');
      if (!scanLine) {
        scanLine = document.createElement('div');
        scanLine.className = 'asa-scanner-line';
        scanLine.setAttribute('style', `
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--asa-primary);
          box-shadow: 0 0 12px var(--asa-primary);
          animation: asa-scan 3s ease-in-out infinite;
          z-index: 2;
        `);
        container.appendChild(scanLine);
      }

      // Add CSS animation for scanline if not already in document
      if (!document.getElementById('asa-scan-keyframe')) {
        const style = document.createElement('style');
        style.id = 'asa-scan-keyframe';
        style.innerText = `
          @keyframes asa-scan {
            0% { top: 0%; }
            50% { top: 100%; }
            100% { top: 0%; }
          }
        `;
        document.head.appendChild(style);
      }

      demoTimer = setInterval(() => {
        if (stepIndex >= scanLength) {
          clearInterval(demoTimer);
          demoTimer = null;
          if (scanLine) scanLine.remove();
          
          this.saveDemoAttendanceSession();
          if (typeof onCompleteCallback === 'function') {
            onCompleteCallback();
          }
          return;
        }

        stepIndex++;

        // Step 1: Unrecognized Face trigger
        if (stepIndex === 1) {
          playBeep(440, 300);
          unrecognizedCount++;
          
          const box = document.createElement('div');
          box.className = 'asa-face-box unknown';
          box.setAttribute('style', `
            width: 80px;
            height: 80px;
            top: ${25 + Math.random() * 20}%;
            left: ${15 + Math.random() * 20}%;
            border-color: var(--asa-danger);
            box-shadow: 0 0 10px var(--asa-danger-glow);
          `);
          box.innerHTML = `<span class="asa-face-label" style="background: var(--asa-danger); color: #fff;">Unidentified Student</span>`;
          container.appendChild(box);

          const unrecognizedDB = window.asaDB.get("asa_unrecognized");
          unrecognizedDB.push({
            id: `UNR-${100 + unrecognizedDB.length + 1}`,
            date: new Date().toLocaleDateString('en-CA'),
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            className: this.activeClassName,
            subjectName: this.activeSubjectName,
            confidence: 34,
            status: "Pending"
          });
          window.asaDB.save("asa_unrecognized", unrecognizedDB);

          const tr = document.createElement('tr');
          tr.style.background = 'rgba(239, 68, 68, 0.05)';
          tr.innerHTML = `
            <td><i class="fa-solid fa-triangle-exclamation" style="color: var(--asa-danger);"></i> Unknown Face</td>
            <td style="color: var(--asa-text-muted);">-</td>
            <td>${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
            <td style="color: var(--asa-danger);">34%</td>
            <td><span class="asa-badge asa-badge-pending">UNRESOLVED</span></td>
          `;
          tbody.appendChild(tr);
          tr.scrollIntoView({ behavior: 'smooth', block: 'end' });

          document.getElementById(statsIdMap.unrecognized).innerText = unrecognizedCount;
          document.getElementById(statsIdMap.detected).innerText = detectedLogs.length + unrecognizedCount;

          setTimeout(() => box.remove(), 2500);
          return;
        }

        // Steps 2 to (totalStudents + 1): Detect registered/custom students
        if (stepIndex > 1 && stepIndex <= totalStudents + 1) {
          const student = activeStudents[stepIndex - 2];
          playBeep(880, 100);

          const matchConf = Math.floor(92 + Math.random() * 7);
          averageConfidenceTotal += matchConf;

          const box = document.createElement('div');
          box.className = 'asa-face-box';
          box.setAttribute('style', `
            width: 130px;
            height: 130px;
            top: 25%;
            left: 38%;
            border: 3.5px solid var(--asa-primary);
            box-shadow: 0 0 15px var(--asa-primary-glow);
          `);
          box.innerHTML = `<span class="asa-face-label">${student.fullName} (${matchConf}%)</span>`;
          container.appendChild(box);

          detectedLogs.push({
            id: `LOG-${1000 + detectedLogs.length + 1}`,
            studentId: student.id,
            studentName: student.fullName,
            rollNo: student.rollNo,
            className: this.activeClassName,
            subjectName: this.activeSubjectName,
            date: new Date().toLocaleDateString('en-CA'),
            detectionTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            confidence: matchConf,
            status: "Present",
            verified: "Verified"
          });

          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td><strong>${student.fullName}</strong></td>
            <td>${student.rollNo}</td>
            <td>${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
            <td style="color: var(--asa-success); font-weight: 700;">${matchConf}%</td>
            <td><span class="asa-badge asa-badge-present">PRESENT</span></td>
          `;
          tbody.appendChild(tr);
          tr.scrollIntoView({ behavior: 'smooth', block: 'end' });

          const activeCount = detectedLogs.length;
          const avgConf = Math.round(averageConfidenceTotal / activeCount);
          document.getElementById(statsIdMap.present).innerText = activeCount;
          document.getElementById(statsIdMap.detected).innerText = activeCount + unrecognizedCount;
          document.getElementById(statsIdMap.confidence).innerText = `${avgConf}%`;

          setTimeout(() => box.remove(), 2500);
          return;
        }

        // Last step: Low confidence alert
        if (stepIndex === totalStudents + 2) {
          playBeep(660, 200);
          
          const box = document.createElement('div');
          box.className = 'asa-face-box low-conf';
          box.setAttribute('style', `
            width: 80px;
            height: 80px;
            top: ${30 + Math.random() * 20}%;
            left: ${50 + Math.random() * 20}%;
            border-color: var(--asa-warning);
            box-shadow: 0 0 10px var(--asa-warning-glow);
          `);
          box.innerHTML = `<span class="asa-face-label" style="background: var(--asa-warning); color: #070913;">Low Match (55%)</span>`;
          container.appendChild(box);

          const tr = document.createElement('tr');
          tr.style.background = 'rgba(245, 158, 11, 0.05)';
          tr.innerHTML = `
            <td><i class="fa-solid fa-user-slash" style="color: var(--asa-warning);"></i> Low Confidence Match</td>
            <td style="color: var(--asa-text-muted);">-</td>
            <td>${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</td>
            <td style="color: var(--asa-warning);">55%</td>
            <td><span class="asa-badge asa-badge-pending">Low Confidence</span></td>
          `;
          tbody.appendChild(tr);
          tr.scrollIntoView({ behavior: 'smooth', block: 'end' });

          setTimeout(() => box.remove(), 2500);
          return;
        }
      }, 1500);
    },

    saveDemoAttendanceSession: function() {
      // Save logs if any
      if (detectedLogs.length > 0) {
        const logsDB = window.asaDB.get("asa_logs");
        detectedLogs.forEach(entry => logsDB.push(entry));
        window.asaDB.save("asa_logs", logsDB);
      }

      // Always save history record so the session is registered in the database
      const historyDB = window.asaDB.get("asa_history");
      const studentsTotal = window.asaDB.get("asa_students").filter(s => 
        s.branch === this.targetBranch && 
        s.semester === this.targetSemester
      ).length;
      
      const newSessionRecord = {
        id: `REC-${100 + historyDB.length + 1}`,
        date: new Date().toLocaleDateString('en-CA'),
        className: this.activeClassName,
        subjectName: this.activeSubjectName,
        facultyName: this.activeFacultyName,
        totalStudents: studentsTotal || 15,
        presentCount: detectedLogs.length,
        absentCount: Math.max(0, (studentsTotal || 15) - detectedLogs.length),
        attendanceRate: Math.round((detectedLogs.length / (studentsTotal || 15)) * 100),
        status: "Verified"
      };

      historyDB.push(newSessionRecord);
      window.asaDB.save("asa_history", historyDB);
    }
  };
})();
