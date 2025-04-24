// Profile page functionality

// Initialize the profile page
function initProfilePage() {
    // Load user's posts
    const user = getCurrentUser();
    if (user) {
      // Load posts by this user
      const postList = document.querySelector('#posts-tab .post-list');
      if (postList) {
        loadPosts(postList, { author: user.id });
      }
    }
    
    // Set up profile tabs
    const profileTabs = document.querySelectorAll('.profile-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    profileTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all tabs
        profileTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => {
          content.style.display = 'none';
        });
        
        // Show selected tab content
        const selectedContent = document.getElementById(`${tabId}-tab`);
        if (selectedContent) {
          selectedContent.style.display = 'block';
        }
      });
    });
    
    // Set up profile actions
    const followButton = document.querySelector('.profile-actions .btn-primary');
    if (followButton) {
      followButton.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (icon.className === 'ri-user-add-line') {
          icon.className = 'ri-user-follow-line';
          this.textContent = ' 팔로잉';
          this.prepend(icon);
          alert('팔로우하였습니다.');
        } else {
          icon.className = 'ri-user-add-line';
          this.textContent = ' 팔로우';
          this.prepend(icon);
          alert('팔로우를 취소하였습니다.');
        }
      });
    }
    
    const messageButton = document.querySelector('.profile-actions .btn-outline');
    if (messageButton) {
      messageButton.addEventListener('click', function() {
        navigateTo('chat');
      });
    }
  }