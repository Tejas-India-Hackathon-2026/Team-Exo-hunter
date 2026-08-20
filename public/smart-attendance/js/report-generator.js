// Disha AI Smart Attendance - PDF Report Generator

(function() {
  window.asaReports = {
    generatePDF: function(sessionRecord, studentLogs) {
      if (!sessionRecord) {
        alert("No session record found to generate report.");
        return;
      }

      const { jsPDF } = window.jspdf;
      if (!jsPDF) {
        alert("jsPDF library is not loaded. Please connect to the internet to load CDN resources.");
        return;
      }

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // 1. Color Palette Setup
      const primaryColor = [13, 17, 33]; // Deep Navy
      const accentColor = [0, 102, 255]; // Royal Blue
      const lightGrey = [240, 244, 248];
      const darkText = [30, 41, 59];

      // Page dimensions
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;

      // 2. Report Header Block
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, pageWidth, 42, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(20);
      doc.text("DISHA AI", margin, 18);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(11);
      doc.setTextColor(0, 229, 255); // Cyan highlights
      doc.text("AI Smart Attendance System Portal", margin, 24);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(200, 200, 200);
      doc.text("Generated: " + new Date().toLocaleString(), pageWidth - margin - 50, 18);
      doc.text("Version: 1.0.0 (Prototype)", pageWidth - margin - 50, 24);

      // 3. Institution Title Block
      doc.setTextColor(...darkText);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(14);
      doc.text("CLASSROOM ATTENDANCE SUMMARY REPORT", margin, 54);

      // Draw thin accent border line below title
      doc.setDrawColor(...accentColor);
      doc.setLineWidth(0.5);
      doc.line(margin, 58, pageWidth - margin, 58);

      // 4. Session Info Meta Block (2-column layout)
      doc.setTextColor(...darkText);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(10);

      // Left Column
      doc.text("Class Name:", margin, 68);
      doc.text("Subject Name:", margin, 74);
      doc.text("Faculty Name:", margin, 80);

      doc.setFont("Helvetica", "normal");
      doc.text(sessionRecord.className || "N/A", margin + 28, 68);
      doc.text(sessionRecord.subjectName || "N/A", margin + 28, 74);
      doc.text(sessionRecord.facultyName || "N/A", margin + 28, 80);

      // Right Column
      doc.setFont("Helvetica", "bold");
      doc.text("Date:", pageWidth / 2 + 10, 68);
      doc.text("Total Strength:", pageWidth / 2 + 10, 74);
      doc.text("Present / Absent:", pageWidth / 2 + 10, 80);

      doc.setFont("Helvetica", "normal");
      doc.text(sessionRecord.date || "N/A", pageWidth / 2 + 45, 68);
      doc.text(String(sessionRecord.totalStudents || 0), pageWidth / 2 + 45, 74);
      doc.text(`${sessionRecord.presentCount} Present / ${sessionRecord.absentCount} Absent`, pageWidth / 2 + 45, 80);

      // 5. Attendance Summary Widget Box
      const boxY = 88;
      const boxHeight = 22;
      doc.setFillColor(...lightGrey);
      doc.rect(margin, boxY, pageWidth - (margin * 2), boxHeight, 'F');
      doc.setDrawColor(200, 210, 220);
      doc.rect(margin, boxY, pageWidth - (margin * 2), boxHeight, 'S');

      // Centered Large Attendance Rate Widget
      doc.setTextColor(...accentColor);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.text(`${sessionRecord.attendanceRate}%`, pageWidth / 2 - 10, boxY + 10);
      doc.setFontSize(9);
      doc.setTextColor(...darkText);
      doc.text("AVERAGE CLASSROOM ATTENDANCE RATE", pageWidth / 2 - 32, boxY + 16);

      // 6. Student Attendance Table Headers
      let tableY = 120;
      doc.setFillColor(...primaryColor);
      doc.rect(margin, tableY, pageWidth - (margin * 2), 8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.text("S.No", margin + 2, tableY + 5);
      doc.text("Student Name", margin + 15, tableY + 5);
      doc.text("Roll Number", margin + 65, tableY + 5);
      doc.text("Match Time", margin + 95, tableY + 5);
      doc.text("AI Confidence", margin + 125, tableY + 5);
      doc.text("Status", margin + 155, tableY + 5);

      // Table Rows
      doc.setFont("Helvetica", "normal");
      let rowY = tableY + 8;
      const rowHeight = 8;

      studentLogs.forEach((log, index) => {
        // Alternating row background colors
        if (index % 2 === 1) {
          doc.setFillColor(248, 250, 252);
          doc.rect(margin, rowY, pageWidth - (margin * 2), rowHeight, 'F');
        }

        // Row Border divider line
        doc.setDrawColor(230, 235, 240);
        doc.setLineWidth(0.2);
        doc.line(margin, rowY + rowHeight, pageWidth - margin, rowY + rowHeight);

        // Draw row cells
        doc.setTextColor(...darkText);
        doc.text(String(index + 1), margin + 2, rowY + 5);
        doc.text(log.studentName || "N/A", margin + 15, rowY + 5);
        doc.text(log.rollNo || "N/A", margin + 65, rowY + 5);
        doc.text(log.detectionTime || "-", margin + 95, rowY + 5);
        doc.text(log.confidence ? `${log.confidence}%` : "-", margin + 125, rowY + 5);

        // Highlight status cell based on attendance value
        if (log.status === "Present") {
          doc.setTextColor(16, 185, 129); // Green
          doc.text("PRESENT", margin + 155, rowY + 5);
        } else {
          doc.setTextColor(239, 68, 68); // Red
          doc.text("ABSENT", margin + 155, rowY + 5);
        }

        rowY += rowHeight;

        // Simple page overflow safety wrapper
        if (rowY > pageHeight - 35 && index < studentLogs.length - 1) {
          doc.addPage();
          rowY = margin;
          // Re-render table headers on new page
          doc.setFillColor(...primaryColor);
          doc.rect(margin, rowY, pageWidth - (margin * 2), 8, 'F');
          doc.setTextColor(255, 255, 255);
          doc.text("S.No", margin + 2, rowY + 5);
          doc.text("Student Name", margin + 15, rowY + 5);
          doc.text("Roll Number", margin + 65, rowY + 5);
          doc.text("Match Time", margin + 95, rowY + 5);
          doc.text("AI Confidence", margin + 125, rowY + 5);
          doc.text("Status", margin + 155, rowY + 5);
          rowY += 8;
        }
      });

      // 7. Footer Signatures Block
      let signatureY = Math.min(rowY + 15, pageHeight - 35);
      doc.setTextColor(...darkText);
      doc.setFont("Helvetica", "bold");
      doc.text("Faculty Signature", margin + 10, signatureY + 8);
      doc.setDrawColor(150, 150, 150);
      doc.line(margin + 5, signatureY, margin + 45, signatureY);

      doc.text("Authorized Admin Seal", pageWidth - margin - 45, signatureY + 8);
      doc.line(pageWidth - margin - 50, signatureY, pageWidth - margin - 10, signatureY);

      // Footer branding tagline
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...darkText);
      doc.text("Smart Recognition. Accurate Attendance. Better Classrooms.", pageWidth / 2 - 40, pageHeight - 12);
      doc.setTextColor(150, 150, 150);
      doc.text("Powered by Disha AI Pvt. Ltd.", pageWidth / 2 - 25, pageHeight - 8);

      // Save PDF to file downloads
      const filename = `Attendance_Report_${sessionRecord.className.replace(/\s+/g, '_')}_${sessionRecord.date}.pdf`;
      doc.save(filename);
      return filename;
    }
  };
})();
