// Gallery page functionality

// Initialize the gallery page
function initGalleryPage() {
    // Get posts with images for gallery
    const galleryPosts = posts.filter(post => post.images && post.images.length > 0);
    
    // Generate gallery items
    const galleryLayout = document.querySelector('.gallery-layout');
    if (!galleryLayout) return;
    
    let galleryHTML = '';
    
    galleryPosts.forEach(post => {
      post.images.forEach(image => {
        galleryHTML += `
          <div class="gallery-item" data-post-id="${post.id}">
            <img src="${image}" alt="${post.title}">
          </div>
        `;
      });
    });
    
    // Handle empty state
    if (galleryPosts.length === 0) {
      galleryHTML = `
        <div class="empty-state">
          <i class="ri-image-line"></i>
          <h3>이미지가 없습니다</h3>
          <p>아직 업로드된 이미지가 없습니다. 새로운 사진을 공유해보세요!</p>
          <button class="btn btn-primary" id="empty-create-post">사진 업로드</button>
        </div>
      `;
    }
    
    // Set the HTML
    galleryLayout.innerHTML = galleryHTML;
    
    // Set up view options (grid or list)
    const viewOptions = document.querySelectorAll('.view-option');
    if (viewOptions.length > 0) {
      viewOptions.forEach(option => {
        option.addEventListener('click', function() {
          // Remove active class from all options
          viewOptions.forEach(opt => opt.classList.remove('active'));
          
          // Add active class to clicked option
          this.classList.add('active');
          
          // Update the gallery layout
          const view = this.getAttribute('data-view');
          galleryLayout.className = `gallery-layout ${view}-view`;
        });
      });
    }
    
    // Set up search functionality
    const searchInput = document.querySelector('.gallery-search input');
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        // Filter posts based on search term
        const filteredPosts = posts.filter(post => 
          (post.images && post.images.length > 0) && 
          (post.title.toLowerCase().includes(searchTerm) || 
           post.content.toLowerCase().includes(searchTerm) || 
           post.author.name.toLowerCase().includes(searchTerm))
        );
        
        // Re-generate gallery items
        let filteredHTML = '';
        
        filteredPosts.forEach(post => {
          post.images.forEach(image => {
            filteredHTML += `
              <div class="gallery-item" data-post-id="${post.id}">
                <img src="${image}" alt="${post.title}">
              </div>
            `;
          });
        });
        
        // Handle empty state
        if (filteredPosts.length === 0) {
          filteredHTML = `
            <div class="empty-state">
              <i class="ri-search-line"></i>
              <h3>검색 결과가 없습니다</h3>
              <p>"${searchTerm}"에 대한 검색 결과가 없습니다. 다른 검색어를 시도해보세요.</p>
            </div>
          `;
        }
        
        // Set the HTML
        galleryLayout.innerHTML = filteredHTML;
      });
    }
    
    // Add click event to gallery items to show post details
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const postId = this.getAttribute('data-post-id');
        const post = posts.find(p => p.id === postId);
        
        if (post) {
          // In a real application, this would navigate to the post detail page
          alert(`"${post.title}" 게시글 보기 기능은 현재 개발 중입니다.`);
        }
      });
    });
    
    // Set up sort selector
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        alert('정렬 기능은 현재 개발 중입니다.');
      });
    }
    
    // Set up empty create button
    const emptyCreateBtn = document.querySelector('#empty-create-post');
    if (emptyCreateBtn) {
      emptyCreateBtn.addEventListener('click', function() {
        openModal('create-post-modal');
      });
    }
  }