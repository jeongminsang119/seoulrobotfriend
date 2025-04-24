// Modal functionality

// Open a modal by ID
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      
      // Add event listeners for closing the modal
      const closeButtons = modal.querySelectorAll('.close-modal, .modal-overlay');
      closeButtons.forEach(button => {
        button.addEventListener('click', function() {
          closeModal(modalId);
        });
      });
      
      // Add escape key listener
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          closeModal(modalId);
        }
      });
    }
  }
  
  // Close a modal by ID
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    }
  }
  
  // Initialize modals
  function initModals() {
    // Set up close buttons for all modals
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
      const modal = button.closest('.modal');
      if (modal) {
        button.addEventListener('click', function() {
          modal.classList.remove('active');
        });
      }
    });
    
    // Set up overlay click to close
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
      const modal = overlay.closest('.modal');
      if (modal) {
        overlay.addEventListener('click', function() {
          modal.classList.remove('active');
        });
      }
    });
    
    // Set up escape key to close all modals
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(modal => {
          modal.classList.remove('active');
        });
      }
    });
    
    // Initialize file upload functionality in post creation modal
    const fileInput = document.getElementById('post-images');
    const imagePreview = document.getElementById('image-preview');
    const uploadPlaceholder = document.getElementById('upload-placeholder');
    
    if (fileInput && imagePreview && uploadPlaceholder) {
      fileInput.addEventListener('change', function() {
        // Clear existing previews
        imagePreview.innerHTML = '';
        
        if (fileInput.files.length > 0) {
          // Hide the placeholder when there are images
          uploadPlaceholder.style.display = 'none';
          
          // Create image previews
          for (let i = 0; i < fileInput.files.length; i++) {
            const file = fileInput.files[i];
            
            // Only process image files
            if (!file.type.match('image.*')) continue;
            
            const reader = new FileReader();
            
            reader.onload = function(e) {
              const div = document.createElement('div');
              div.className = 'image-preview';
              
              const img = document.createElement('img');
              img.src = e.target.result;
              img.alt = 'Image Preview';
              
              const removeBtn = document.createElement('div');
              removeBtn.className = 'remove-image';
              removeBtn.innerHTML = '<i class="ri-close-line"></i>';
              removeBtn.addEventListener('click', function() {
                div.remove();
                
                // Show placeholder if no more images
                if (imagePreview.children.length === 0) {
                  uploadPlaceholder.style.display = 'flex';
                }
              });
              
              div.appendChild(img);
              div.appendChild(removeBtn);
              imagePreview.appendChild(div);
            };
            
            reader.readAsDataURL(file);
          }
        } else {
          // Show placeholder if no images
          uploadPlaceholder.style.display = 'flex';
        }
      });
      
      // Make the placeholder clickable to open file dialog
      uploadPlaceholder.addEventListener('click', function() {
        fileInput.click();
      });
    }
    
    // Initialize post submission
    const submitPostBtn = document.getElementById('submit-post');
    
    if (submitPostBtn) {
      submitPostBtn.addEventListener('click', function() {
        const postTitle = document.getElementById('post-title').value;
        const postContent = document.getElementById('post-content').value;
        const postCategory = document.getElementById('post-category').value;
        
        if (!postTitle || !postContent) {
          alert('제목과 내용을 입력해주세요.');
          return;
        }
        
        // In a real application, this would send the post data to the server
        // For this demo, we'll just add it to the feed
        createPost({
          title: postTitle,
          content: postContent,
          category: postCategory,
          // Add any uploaded images
          images: Array.from(imagePreview.querySelectorAll('img')).map(img => img.src)
        });
        
        // Close the modal
        closeModal('create-post-modal');
        
        // Reset the form
        document.getElementById('post-form').reset();
        imagePreview.innerHTML = '';
        uploadPlaceholder.style.display = 'flex';
        
        // Alert success
        alert('게시글이 성공적으로 등록되었습니다.');
        
        // Refresh the feed
        navigateTo('feed');
      });
    }
  }