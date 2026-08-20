// AutoSoft AI Smart Attendance - Face Registration Controller

(function() {
  let stream = null;
  let capturedCount = 0;
  let capturedSnapshots = [];
  const totalPositions = 5;
  const positions = [
    { label: "Front Face", instruction: "Please look straight into the camera." },
    { label: "Slightly Left", instruction: "Please look slightly toward the left." },
    { label: "Slightly Right", instruction: "Please look slightly toward the right." },
    { label: "Slightly Upward", instruction: "Please look slightly upward." },
    { label: "Slightly Downward", instruction: "Please look slightly downward." }
  ];

  window.asaFaceReg = {
    startCamera: async function(videoElementId, statusOverlayId) {
      const video = document.getElementById(videoElementId);
      const overlay = document.getElementById(statusOverlayId);
      
      if (!video) return;

      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera API is not available in this browser.');
        }

        video.muted = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('autoplay', '');

        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "user" },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        video.srcObject = stream;
        await video.play().catch(() => {});
        if (overlay) {
          overlay.innerHTML = `<p style="color: var(--asa-success);"><i class="fa-solid fa-circle-check"></i> Camera active. Face guide aligned.</p>`;
        }
      } catch (err) {
        console.error("Camera access failed:", err);
        if (overlay) {
          overlay.innerHTML = `<p style="color: var(--asa-warning);"><i class="fa-solid fa-triangle-exclamation"></i> Camera access denied or unavailable. Check browser permissions and try again.</p>`;
        }
        // Fallback simulated screen
        video.style.background = "#111827";
      }
    },

    stopCamera: function() {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
      }
    },

    captureNext: function(videoElementId, statusOverlayId, progressTextId, progressBarId, capturedGridId) {
      if (capturedCount >= totalPositions) return;

      const overlay = document.getElementById(statusOverlayId);
      const snapshot = this.captureRegistrationSnapshot(videoElementId);
      if (snapshot && capturedSnapshots.length < 4) {
        capturedSnapshots.push(snapshot);
      }
      const progressText = document.getElementById(progressTextId);
      const progressBar = document.getElementById(progressBarId);
      const grid = document.getElementById(capturedGridId);

      // Flash animation on scanner
      const scanner = document.querySelector('.asa-scanner-view');
      if (scanner) {
        scanner.style.opacity = '0.3';
        setTimeout(() => scanner.style.opacity = '1', 150);
      }

      // Add image preview block to captured grid
      capturedCount++;
      const posLabel = positions[capturedCount - 1].label;
      
      if (grid) {
        const item = document.createElement('div');
        item.style.width = '64px';
        item.style.height = '64px';
        item.style.borderRadius = '10px';
        item.style.border = '1px solid var(--asa-primary)';
        item.style.overflow = 'hidden';
        item.style.position = 'relative';
        item.style.background = 'rgba(0, 229, 255, 0.1)';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.justifyContent = 'center';
        item.innerHTML = `<i class="fa-solid fa-user-check" style="color: var(--asa-primary); font-size: 1.2rem;"></i>`;
        grid.appendChild(item);
      }

      // Update progress bar
      if (progressBar) {
        const pct = (capturedCount / totalPositions) * 100;
        progressBar.style.width = `${pct}%`;
      }

      // Update instructions
      if (capturedCount < totalPositions) {
        const nextPos = positions[capturedCount];
        if (progressText) {
          progressText.innerText = `Face Registration Progress: ${capturedCount}/${totalPositions} Captured`;
        }
        if (overlay) {
          overlay.innerHTML = `<p style="color: var(--asa-primary); font-weight: 700;"><i class="fa-solid fa-arrows-spin fa-spin"></i> ${nextPos.instruction}</p>`;
        }
      } else {
        if (progressText) {
          progressText.innerText = `Face Registration Progress: 5/5 Completed`;
        }
        if (overlay) {
          overlay.innerHTML = `<p style="color: var(--asa-success); font-weight: 700;"><i class="fa-solid fa-circle-check"></i> Face registration completed successfully.</p>`;
        }
        
        // Show complete state
        this.stopCamera();
        const triggerBtn = document.getElementById('capture-btn');
        if (triggerBtn) {
          triggerBtn.disabled = true;
          triggerBtn.innerText = "Captured Successfully";
          triggerBtn.style.opacity = '0.5';
        }
        
        const registerSubmitBtn = document.getElementById('submit-reg-btn');
        if (registerSubmitBtn) {
          registerSubmitBtn.disabled = false;
        }
      }
    },

    captureRegistrationSnapshot: function(videoElementId) {
      const video = document.getElementById(videoElementId);
      if (!video || !video.videoWidth || !video.videoHeight) return null;

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let brightnessSum = 0;
      let brightnessVariance = 0;
      const brightnessValues = [];

      for (let i = 0; i < imageData.length; i += 4) {
        const avg = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
        brightnessValues.push(avg);
        brightnessSum += avg;
      }

      const mean = brightnessSum / brightnessValues.length;
      brightnessValues.forEach(value => {
        const diff = value - mean;
        brightnessVariance += diff * diff;
      });

      const qualityScore = (mean * 0.7) + ((brightnessVariance / brightnessValues.length) * 0.3);
      return {
        dataUrl: canvas.toDataURL('image/png'),
        qualityScore
      };
    },

    pickBestFaceImage: function(snapshots, videoElementId) {
      if (snapshots && snapshots.length > 0) {
        return snapshots.reduce((best, current) => {
          return current.qualityScore > best.qualityScore ? current : best;
        }).dataUrl;
      }

      const fallback = this.captureRegistrationSnapshot(videoElementId);
      return fallback ? fallback.dataUrl : null;
    },

    saveRegistration: function(formData, videoElementId) {
      const dbStudents = window.asaDB.get("asa_students");
      const faceImage = this.pickBestFaceImage(capturedSnapshots, videoElementId);
      
      // Auto-generate student ID
      const count = dbStudents.length + 1;
      const branchCode = formData.branch.substring(0, 3).toUpperCase();
      const studentId = `STU-${branchCode}-${1000 + count}`;

      const newStudent = {
        id: studentId,
        fullName: formData.fullName,
        rollNo: formData.rollNo,
        email: formData.email,
        mobile: formData.mobile,
        branch: formData.branch,
        semester: formData.semester,
        section: formData.section,
        session: formData.session,
        regNo: formData.regNo || `UG-2025-${Math.floor(10000 + Math.random() * 90000)}`,
        faceRegistered: true,
        status: "Pending Approval",
        approvalStatus: "Pending",
        registrationDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        faceImage: faceImage || null
      };

      dbStudents.push(newStudent);
      window.asaDB.save("asa_students", dbStudents);
      return newStudent;
    },

    resetWizard: function() {
      this.stopCamera();
      capturedCount = 0;
      capturedSnapshots = [];
    }
  };
})();
