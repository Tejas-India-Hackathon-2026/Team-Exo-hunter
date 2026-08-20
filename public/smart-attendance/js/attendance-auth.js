// Disha AI Smart Attendance - Authentication & Access Controls

(function() {
  // Prototype Credentials Database
  // WARNING: Hardcoding credentials is ONLY for this frontend prototype.
  // Production releases MUST utilize secure HTTPS endpoints, encrypted tokens, 
  // and server-side database user authentication.
  const demoUsers = {
    admin: { password: "admin123", role: "Admin", name: "System Administrator" },
    faculty: { password: "faculty123", role: "Faculty", name: "Mr. Anand Raj (AP)" },
    student: { password: "student123", role: "Student", name: "Ayush Raj (CSE-001)" }
  };

  window.asaAuth = {
    login: function(username, password, selectedRole) {
      username = username.toLowerCase().trim();
      const user = demoUsers[username];
      
      if (user && user.password === password) {
        if (user.role.toLowerCase() !== selectedRole.toLowerCase()) {
          return { success: false, error: `Invalid credentials for ${selectedRole} role.` };
        }
        
        const sessionData = {
          username: username,
          role: user.role,
          name: user.name,
          loginTime: new Date().toISOString()
        };
        sessionStorage.setItem('asa_user_session', JSON.stringify(sessionData));
        return { success: true, user: sessionData };
      }
      return { success: false, error: "Invalid username or password." };
    },

    logout: function() {
      sessionStorage.removeItem('asa_user_session');
      // Redirect to landing page relative to the current module path
      window.location.href = "index.html";
    },

    getSession: function() {
      const session = sessionStorage.getItem('asa_user_session');
      return session ? JSON.parse(session) : null;
    },

    requireRole: function(allowedRoles) {
      const session = this.getSession();
      if (!session) {
        window.location.href = "login.html?redirect=" + encodeURIComponent(window.location.pathname);
        return false;
      }
      
      const rolesArray = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      if (!rolesArray.includes(session.role)) {
        alert("Unauthorized access! You do not have permissions for this page.");
        window.location.href = "login.html";
        return false;
      }
      return true;
    }
  };
})();

// Credentials parameters constraints

// Try-catch token validators checks

// Routing dispatcher optimization details
