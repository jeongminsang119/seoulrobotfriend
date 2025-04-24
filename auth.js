// User authentication functions

// Login function
function login(email, password) {
    // In a real application, this would make an API call to your backend
    // For demonstration, we'll use localStorage
    
    // Check if this is a demo login (for testing)
    if (email === 'demo@example.com' && password === 'password') {
      const user = {
        id: 'user-1',
        name: '김로봇',
        email: 'demo@example.com',
        avatar: 'https://i.pravatar.cc/150?img=12',
        role: 'student',
        createdAt: new Date().toISOString()
      };
      
      // Store user in localStorage (in real app, this would be a JWT token)
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, user };
    }
    
    // Demo user check - validate against stored users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userMatch = users.find(user => user.email === email);
    
    if (userMatch && userMatch.password === password) {
      // Remove password before storing in localStorage
      const { password, ...userWithoutPassword } = userMatch;
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    
    return { success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' };
  }
  
  // Register function
  function register(name, email, password) {
    // In a real application, this would make an API call to your backend
    // For demonstration, we'll use localStorage
    
    // Check if user with this email already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
      return { success: false, message: '이미 사용 중인 이메일입니다.' };
    }
    
    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password, // In a real app, this would be hashed
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      role: 'student',
      createdAt: new Date().toISOString()
    };
    
    // Save to users list
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log in the user immediately
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  }
  
  // Logout function
  function logout() {
    localStorage.removeItem('user');
    return { success: true };
  }
  
  // Get current user
  function getCurrentUser() {
    const userJson = localStorage.getItem('user');
    if (!userJson) return null;
    
    try {
      return JSON.parse(userJson);
    } catch (e) {
      console.error('Error parsing user from localStorage', e);
      return null;
    }
  }
  
  // Check if email is a school email (simple validation)
  function isSchoolEmail(email) {
    // This is a placeholder validation
    // In a real application, you would check for a specific domain
    return email.endsWith('gmail.com') || email.includes('school');
  }
  
  // Check password strength
  function checkPasswordStrength(password) {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Uppercase, lowercase, number, special character checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    if (strength < 2) return { score: 1, text: '매우 약함' };
    if (strength < 3) return { score: 2, text: '약함' };
    if (strength < 4) return { score: 3, text: '보통' };
    if (strength < 5) return { score: 4, text: '강함' };
    return { score: 5, text: '매우 강함' };
  }
  
  // Set up event listeners for auth forms
  document.addEventListener('DOMContentLoaded', function() {
    // Login form submission
    const loginForm = document.getElementById('login-form');
    const submitLoginBtn = document.getElementById('submit-login');
    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    
    if (submitLoginBtn) {
      submitLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = loginEmailInput.value;
        const password = loginPasswordInput.value;
        
        // Simple form validation
        if (!email || !password) {
          alert('모든 필드를 입력해주세요.');
          return;
        }
        
        const result = login(email, password);
        
        if (result.success) {
          closeModal('login-modal');
          // Reload the page to reflect logged in state
          navigateTo('feed');
          location.reload();
        } else {
          alert(result.message || '로그인에 실패했습니다.');
        }
      });
    }
    
    // Registration form submission
    const registerForm = document.getElementById('register-form');
    const submitRegisterBtn = document.getElementById('submit-register');
    const registerNameInput = document.getElementById('register-name');
    const registerEmailInput = document.getElementById('register-email');
    const registerPasswordInput = document.getElementById('register-password');
    const registerPasswordConfirmInput = document.getElementById('register-password-confirm');
    const agreeTermsCheckbox = document.getElementById('agree-terms');
    const passwordMeter = document.getElementById('password-meter');
    const passwordStrength = document.getElementById('password-strength');
    
    if (submitRegisterBtn) {
      submitRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const name = registerNameInput.value;
        const email = registerEmailInput.value;
        const password = registerPasswordInput.value;
        const passwordConfirm = registerPasswordConfirmInput.value;
        const agreeTerms = agreeTermsCheckbox.checked;
        
        // Simple form validation
        if (!name || !email || !password || !passwordConfirm) {
          alert('모든 필드를 입력해주세요.');
          return;
        }
        
        if (!isSchoolEmail(email)) {
          alert('학교 이메일을 사용해주세요.');
          return;
        }
        
        if (password !== passwordConfirm) {
          alert('비밀번호가 일치하지 않습니다.');
          return;
        }
        
        if (!agreeTerms) {
          alert('이용약관에 동의해주세요.');
          return;
        }
        
        const passwordCheck = checkPasswordStrength(password);
        if (passwordCheck.score < 3) {
          alert('더 강력한 비밀번호를 사용해주세요.');
          return;
        }
        
        const result = register(name, email, password);
        
        if (result.success) {
          closeModal('register-modal');
          // Reload the page to reflect logged in state
          navigateTo('feed');
          location.reload();
        } else {
          alert(result.message || '회원가입에 실패했습니다.');
        }
      });
    }
    
    // Password strength meter
    if (registerPasswordInput && passwordMeter && passwordStrength) {
      registerPasswordInput.addEventListener('input', function() {
        const password = registerPasswordInput.value;
        const result = checkPasswordStrength(password);
        
        // Update the strength meter
        const meterSpan = passwordMeter.querySelector('span');
        meterSpan.style.width = `${result.score * 20}%`;
        
        // Update the color based on strength
        if (result.score <= 2) {
          meterSpan.style.backgroundColor = 'var(--color-error-500)';
        } else if (result.score <= 3) {
          meterSpan.style.backgroundColor = 'var(--color-warning-500)';
        } else {
          meterSpan.style.backgroundColor = 'var(--color-success-500)';
        }
        
        // Update the text
        passwordStrength.innerHTML = `비밀번호 강도: <span>${result.text}</span>`;
      });
    }
    
    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
        const passwordInput = this.previousElementSibling;
        const icon = this.querySelector('i');
        
        if (passwordInput.type === 'password') {
          passwordInput.type = 'text';
          icon.className = 'ri-eye-line';
        } else {
          passwordInput.type = 'password';
          icon.className = 'ri-eye-off-line';
        }
      });
    });
    
    // Navigation between login and register forms
    const goToRegisterBtn = document.getElementById('go-to-register');
    const goToLoginBtn = document.getElementById('go-to-login');
    
    if (goToRegisterBtn) {
      goToRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal('login-modal');
        openModal('register-modal');
      });
    }
    
    if (goToLoginBtn) {
      goToLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal('register-modal');
        openModal('login-modal');
      });
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logout-btn');
    const mobileLogoutBtn = document.getElementById('mobile-logout-btn');
    
    const handleLogout = function(e) {
      e.preventDefault();
      
      const result = logout();
      
      if (result.success) {
        // Reload the page to reflect logged out state
        location.reload();
      }
    };
    
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }
    
    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener('click', handleLogout);
    }
  });