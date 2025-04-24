// Initialize the navbar functionality
function initNavbar() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
      mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
      });
    }
    
    if (mobileMenuClose && mobileMenu) {
      mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
      });
    }
    
    // User dropdown toggle
    const userMenuToggle = document.querySelector('.user-menu-toggle');
    const userDropdown = document.getElementById('user-dropdown');
    
    if (userMenuToggle && userDropdown) {
      userMenuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (userDropdown.classList.contains('active') && !userMenuToggle.contains(e.target)) {
          userDropdown.classList.remove('active');
        }
      });
    }
    
    // Notifications panel toggle
    const notificationsToggle = document.getElementById('notifications-toggle');
    const notificationsPanel = document.getElementById('notifications-panel');
    
    if (notificationsToggle && notificationsPanel) {
      notificationsToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationsPanel.classList.toggle('active');
        
        // Close user dropdown if open
        if (userDropdown && userDropdown.classList.contains('active')) {
          userDropdown.classList.remove('active');
        }
      });
      
      // Close notifications when clicking outside
      document.addEventListener('click', function(e) {
        if (notificationsPanel.classList.contains('active') && 
            !notificationsToggle.contains(e.target) && 
            !notificationsPanel.contains(e.target)) {
          notificationsPanel.classList.remove('active');
        }
      });
    }
    
    // Update user info in navbar if logged in
    const user = getCurrentUser();
    if (user) {
      const userAvatar = document.querySelector('.user-menu-toggle .avatar img');
      if (userAvatar) {
        userAvatar.src = user.avatar;
        userAvatar.alt = user.name;
      }
    }
  }