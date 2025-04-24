// Feed page functionality

// Initialize the feed page
function initFeedPage() {
    // Load posts
    loadPosts();
    
    // Set up category filters
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove active class from all categories
        categoryItems.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked category
        this.classList.add('active');
        
        // Get category
        const categoryName = this.querySelector('.category-name').textContent.trim();
        let category = 'all';
        
        // Map category name to category value
        if (categoryName.includes('프로젝트')) category = 'project';
        else if (categoryName.includes('일상')) category = 'daily';
        else if (categoryName.includes('질문')) category = 'question';
        else if (categoryName.includes('자료공유')) category = 'sharing';
        else if (categoryName.includes('공지사항')) category = 'announcement';
        
        // Load posts with category filter
        loadPosts(null, { category });
      });
    });
    
    // Set up sort filter
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        const category = document.querySelector('.category-item.active .category-name').textContent.trim();
        let categoryValue = 'all';
        
        // Map category name to category value
        if (category.includes('프로젝트')) categoryValue = 'project';
        else if (category.includes('일상')) categoryValue = 'daily';
        else if (category.includes('질문')) categoryValue = 'question';
        else if (category.includes('자료공유')) categoryValue = 'sharing';
        else if (category.includes('공지사항')) categoryValue = 'announcement';
        
        loadPosts(null, { 
          category: this.value === 'all' ? null : this.value,
          sort: document.querySelector('.filter-tab.active').textContent.includes('인기') ? 'popular' : 'newest'
        });
      });
    }
    
    // Set up filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    if (filterTabs.length > 0) {
      filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
          // Remove active class from all tabs
          filterTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Get sort order
          const sortOrder = this.textContent.includes('인기') ? 'popular' : 'newest';
          
          // Get category from sidebar
          const categoryName = document.querySelector('.category-item.active .category-name').textContent.trim();
          let category = 'all';
          
          // Map category name to category value
          if (categoryName.includes('프로젝트')) category = 'project';
          else if (categoryName.includes('일상')) category = 'daily';
          else if (categoryName.includes('질문')) category = 'question';
          else if (categoryName.includes('자료공유')) category = 'sharing';
          else if (categoryName.includes('공지사항')) category = 'announcement';
          
          // Load posts with new sort order
          loadPosts(null, { 
            category: category === 'all' ? null : category,
            sort: sortOrder
          });
        });
      });
    }
    
    // Set up popular tags
    const tags = document.querySelectorAll('.tag');
    if (tags.length > 0) {
      tags.forEach(tag => {
        tag.addEventListener('click', function() {
          alert(`태그 "${this.textContent}" 필터링 기능은 현재 개발 중입니다.`);
        });
      });
    }
  }