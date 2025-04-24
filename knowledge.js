// Knowledge page functionality

// Initialize the knowledge page
function initKnowledgePage() {
    // Set up topic links
    const topicLinks = document.querySelectorAll('.topic-link');
    
    topicLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        topicLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // In a real application, this would load content for the selected topic
        alert('주제별 지식 콘텐츠 로딩 기능은 현재 개발 중입니다.');
      });
    });
    
    // Set up knowledge actions
    const knowledgeActions = document.querySelectorAll('.knowledge-actions .btn');
    
    knowledgeActions.forEach(action => {
      action.addEventListener('click', function() {
        const actionType = this.textContent.trim();
        
        if (actionType.includes('저장')) {
          // Toggle saved state
          const icon = this.querySelector('i');
          
          if (icon.className === 'ri-bookmark-line') {
            icon.className = 'ri-bookmark-fill';
            alert('지식창고 글이 저장되었습니다.');
          } else {
            icon.className = 'ri-bookmark-line';
            alert('지식창고 글 저장이 취소되었습니다.');
          }
        } else if (actionType.includes('공유')) {
          alert('공유 기능은 현재 개발 중입니다.');
        } else if (actionType.includes('편집')) {
          alert('편집 요청 기능은 현재 개발 중입니다.');
        }
      });
    });
  }