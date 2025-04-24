// Post functionality

// Store for posts
let posts = [
    {
      id: 'post-1',
      author: {
        id: 'user-2',
        name: '김로봇',
        avatar: 'https://i.pravatar.cc/150?img=58'
      },
      title: '아두이노로 만든 LED 큐브',
      content: '방학 프로젝트로 8x8x8 RGB LED 큐브를 만들었습니다! 아두이노 메가로 제어하고 있고, 다양한 패턴을 표시할 수 있습니다. 코드와 회로도는 댓글로 문의해주세요.',
      category: 'project',
      createdAt: '2023-10-20T08:30:00',
      likes: 45,
      comments: [
        {
          id: 'comment-1',
          author: {
            id: 'user-3',
            name: '이기술',
            avatar: 'https://i.pravatar.cc/150?img=59'
          },
          content: '대단하네요! 회로도 좀 공유해주실 수 있나요?',
          createdAt: '2023-10-20T09:15:00',
          likes: 5
        },
        {
          id: 'comment-2',
          author: {
            id: 'user-4',
            name: '박메카',
            avatar: 'https://i.pravatar.cc/150?img=61'
          },
          content: '저도 비슷한 프로젝트 준비중인데 참고가 많이 되겠어요!',
          createdAt: '2023-10-20T10:30:00',
          likes: 3
        }
      ],
      shares: 5,
      images: [
        'https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      tags: ['아두이노', 'LED', '프로젝트', '전자공학']
    },
    {
      id: 'post-2',
      author: {
        id: 'user-3',
        name: '이기술',
        avatar: 'https://i.pravatar.cc/150?img=59'
      },
      title: '학교 축제 로봇 전시회 후기',
      content: '지난 주 학교 축제에서 진행된 로봇 전시회! 많은 학생들이 열심히 준비한 프로젝트를 선보였고, 외부 방문객들의 반응도 좋았습니다. 특히 1학년 학생들이 준비한 자율 주행 로봇이 인상적이었어요. 다들 수고하셨습니다!',
      category: 'daily',
      createdAt: '2023-10-18T15:45:00',
      likes: 72,
      comments: [
        {
          id: 'comment-3',
          author: {
            id: 'user-5',
            name: '최프로그',
            avatar: 'https://i.pravatar.cc/150?img=62'
          },
          content: '정말 멋진 행사였어요! 내년에는 더 발전된 모습 보여드리겠습니다.',
          createdAt: '2023-10-18T16:00:00',
          likes: 8
        }
      ],
      shares: 8,
      images: [
        'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      tags: ['학교행사', '로봇전시회', '자율주행']
    }
  ];
  
  // Create a post
  function createPost(postData) {
    const user = getCurrentUser();
    
    if (!user) {
      alert('로그인이 필요합니다.');
      return false;
    }
    
    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      title: postData.title,
      content: postData.content,
      category: postData.category,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      shares: 0,
      images: postData.images || [],
      tags: postData.tags || []
    };
    
    // Add the post to the beginning of the array
    posts.unshift(newPost);
    
    // Save to localStorage
    savePostsToStorage();
    
    return newPost;
  }
  
  // Save posts to localStorage
  function savePostsToStorage() {
    localStorage.setItem('posts', JSON.stringify(posts));
  }
  
  // Load posts from localStorage
  function loadPostsFromStorage() {
    const savedPosts = localStorage.getItem('posts');
    if (savedPosts) {
      posts = JSON.parse(savedPosts);
    }
  }
  
  // Add a comment to a post
  function addComment(postId, commentText) {
    const user = getCurrentUser();
    if (!user) {
      alert('로그인이 필요합니다.');
      return false;
    }
    
    const post = posts.find(p => p.id === postId);
    if (!post) return false;
    
    const newComment = {
      id: `comment-${Date.now()}`,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar
      },
      content: commentText,
      createdAt: new Date().toISOString(),
      likes: 0
    };
    
    post.comments.push(newComment);
    savePostsToStorage();
    
    return newComment;
  }
  
  // Like/unlike a post
  function togglePostLike(postId) {
    const user = getCurrentUser();
    if (!user) {
      alert('로그인이 필요합니다.');
      return false;
    }
    
    const post = posts.find(p => p.id === postId);
    if (!post) return false;
    
    // In a real app, we would check if the user has already liked the post
    // For now, we'll just toggle the like count
    post.likes = post.likes + 1;
    savePostsToStorage();
    
    return true;
  }
  
  // Share a post
  function sharePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return false;
    
    // In a real app, this would open a share dialog
    // For now, we'll just increment the share count
    post.shares = post.shares + 1;
    savePostsToStorage();
    
    return true;
  }
  
  // Generate post HTML
  function generatePostHTML(post) {
    const user = getCurrentUser();
    const isLiked = false; // In a real app, this would check if the current user liked this post
    
    let imagesHTML = '';
    if (post.images && post.images.length > 0) {
      imagesHTML = '<div class="post-images">';
      post.images.forEach(image => {
        imagesHTML += `
          <div class="post-image">
            <img src="${image}" alt="Post image">
          </div>
        `;
      });
      imagesHTML += '</div>';
    }
    
    let tagsHTML = '';
    if (post.tags && post.tags.length > 0) {
      tagsHTML = '<div class="post-tags">';
      post.tags.forEach(tag => {
        tagsHTML += `<span class="tag">#${tag}</span>`;
      });
      tagsHTML += '</div>';
    }
    
    let commentsHTML = '';
    if (post.comments && post.comments.length > 0) {
      commentsHTML = '<div class="comments-section">';
      post.comments.forEach(comment => {
        commentsHTML += `
          <div class="comment" data-comment-id="${comment.id}">
            <div class="comment-header">
              <div class="comment-avatar">
                <img src="${comment.author.avatar}" alt="${comment.author.name}">
              </div>
              <div class="comment-meta">
                <span class="comment-author">${comment.author.name}</span>
                <span class="comment-time">${formatDate(comment.createdAt)}</span>
              </div>
            </div>
            <div class="comment-content">${comment.content}</div>
            <div class="comment-actions">
              <button class="comment-action" data-action="like">
                <i class="ri-heart-line"></i>
                <span>${comment.likes}</span>
              </button>
              <button class="comment-action" data-action="reply">
                <i class="ri-reply-line"></i>
                답글
              </button>
            </div>
          </div>
        `;
      });
      commentsHTML += '</div>';
    }
    
    return `
      <div class="card post-card" data-post-id="${post.id}">
        <div class="post-header">
          <div class="post-avatar">
            <img src="${post.author.avatar}" alt="${post.author.name}">
          </div>
          <div class="post-meta">
            <h4 class="post-author">${post.author.name}</h4>
            <span class="post-time">${formatDate(post.createdAt)}</span>
          </div>
          <button class="btn-icon post-more">
            <i class="ri-more-2-fill"></i>
          </button>
        </div>
        
        <div class="post-content">
          <span class="post-category ${post.category}">${getCategoryName(post.category)}</span>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-text">${post.content}</p>
          ${tagsHTML}
          ${imagesHTML}
          
          <div class="post-actions">
            <div class="post-action ${isLiked ? 'liked' : ''}" data-action="like">
              <i class="${isLiked ? 'ri-heart-fill' : 'ri-heart-line'}"></i>
              <span>${post.likes}</span>
            </div>
            <div class="post-action" data-action="comment">
              <i class="ri-chat-1-line"></i>
              <span>${post.comments.length}</span>
            </div>
            <div class="post-action" data-action="share">
              <i class="ri-share-forward-line"></i>
              <span>${post.shares}</span>
            </div>
            <div class="post-action" data-action="bookmark">
              <i class="ri-bookmark-line"></i>
            </div>
          </div>
          
          ${commentsHTML}
          
          ${user ? `
            <div class="comment-form">
              <div class="comment-avatar">
                <img src="${user.avatar}" alt="${user.name}">
              </div>
              <div class="comment-input-container">
                <input type="text" class="comment-input" placeholder="댓글을 입력하세요...">
                <button class="btn btn-primary comment-submit">
                  <i class="ri-send-plane-line"></i>
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
  
  // Get category display name
  function getCategoryName(category) {
    const categories = {
      'project': '프로젝트',
      'daily': '일상',
      'question': '질문',
      'sharing': '자료공유',
      'announcement': '공지사항'
    };
    
    return categories[category] || category;
  }
  
  // Load posts for the feed
  function loadPosts(container, options = {}) {
    const postList = container || document.querySelector('.post-list');
    if (!postList) return;
    
    // Load posts from storage first
    loadPostsFromStorage();
    
    // Filter posts if needed
    let filteredPosts = [...posts];
    
    if (options.category && options.category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === options.category);
    }
    
    if (options.author) {
      filteredPosts = filteredPosts.filter(post => post.author.id === options.author);
    }
    
    if (options.tag) {
      filteredPosts = filteredPosts.filter(post => post.tags && post.tags.includes(options.tag));
    }
    
    // Sort posts
    if (options.sort === 'popular') {
      filteredPosts.sort((a, b) => b.likes - a.likes);
    } else if (options.sort === 'comments') {
      filteredPosts.sort((a, b) => b.comments.length - a.comments.length);
    } else {
      // Default to newest first
      filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    // Generate HTML for each post
    let postsHTML = '';
    filteredPosts.forEach(post => {
      postsHTML += generatePostHTML(post);
    });
    
    // Handle empty state
    if (filteredPosts.length === 0) {
      postsHTML = `
        <div class="empty-state">
          <i class="ri-file-list-3-line"></i>
          <h3>게시글이 없습니다</h3>
          <p>아직 게시글이 없습니다. 첫 게시글을 작성해보세요!</p>
          <button class="btn btn-primary" id="empty-create-post">글쓰기</button>
        </div>
      `;
    }
    
    // Set the HTML
    postList.innerHTML = postsHTML;
    
    // Add event listeners for post actions
    const postCards = postList.querySelectorAll('.post-card');
    postCards.forEach(card => {
      // Post actions
      const actions = card.querySelectorAll('.post-action');
      actions.forEach(action => {
        action.addEventListener('click', handlePostAction);
      });
      
      // Comment form
      const commentForm = card.querySelector('.comment-form');
      if (commentForm) {
        const input = commentForm.querySelector('.comment-input');
        const submit = commentForm.querySelector('.comment-submit');
        
        submit.addEventListener('click', () => {
          const postId = card.getAttribute('data-post-id');
          const commentText = input.value.trim();
          
          if (commentText) {
            const comment = addComment(postId, commentText);
            if (comment) {
              // Clear input
              input.value = '';
              
              // Reload posts to show new comment
              loadPosts(container, options);
            }
          }
        });
        
        // Submit on Enter
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            submit.click();
          }
        });
      }
      
      // Comment actions
      const commentActions = card.querySelectorAll('.comment-action');
      commentActions.forEach(action => {
        action.addEventListener('click', handleCommentAction);
      });
    });
    
    // Add event listener for empty state button
    const emptyCreateBtn = postList.querySelector('#empty-create-post');
    if (emptyCreateBtn) {
      emptyCreateBtn.addEventListener('click', function() {
        openModal('create-post-modal');
      });
    }
  }
  
  // Handle post actions (like, comment, share, bookmark)
  function handlePostAction(e) {
    const action = e.currentTarget.getAttribute('data-action');
    const postCard = e.currentTarget.closest('.post-card');
    const postId = postCard.getAttribute('data-post-id');
    
    switch (action) {
      case 'like':
        if (togglePostLike(postId)) {
          const likeButton = e.currentTarget;
          const likeIcon = likeButton.querySelector('i');
          const likeCount = likeButton.querySelector('span');
          
          // Toggle like state
          if (likeButton.classList.contains('liked')) {
            likeButton.classList.remove('liked');
            likeIcon.className = 'ri-heart-line';
          } else {
            likeButton.classList.add('liked');
            likeIcon.className = 'ri-heart-fill';
            
            // Add animation
            likeIcon.classList.add('scale');
            setTimeout(() => {
              likeIcon.classList.remove('scale');
            }, 300);
          }
          
          // Update count
          const post = posts.find(p => p.id === postId);
          if (post) {
            likeCount.textContent = post.likes;
          }
        }
        break;
        
      case 'comment':
        // Focus comment input if it exists
        const commentInput = postCard.querySelector('.comment-input');
        if (commentInput) {
          commentInput.focus();
        } else {
          alert('댓글을 작성하려면 로그인이 필요합니다.');
        }
        break;
        
      case 'share':
        if (sharePost(postId)) {
          // Update share count
          const shareCount = e.currentTarget.querySelector('span');
          const post = posts.find(p => p.id === postId);
          if (post) {
            shareCount.textContent = post.shares;
          }
          
          // Show share dialog
          const shareData = {
            title: post.title,
            text: post.content,
            url: window.location.href
          };
          
          if (navigator.share && navigator.canShare(shareData)) {
            navigator.share(shareData);
          } else {
            alert('공유하기 기능을 사용할 수 없습니다.');
          }
        }
        break;
        
      case 'bookmark':
        const bookmarkIcon = e.currentTarget.querySelector('i');
        
        if (bookmarkIcon.className === 'ri-bookmark-line') {
          bookmarkIcon.className = 'ri-bookmark-fill';
          bookmarkIcon.style.color = 'var(--color-primary-600)';
          
          // Add animation
          bookmarkIcon.classList.add('scale');
          setTimeout(() => {
            bookmarkIcon.classList.remove('scale');
          }, 300);
          
          alert('게시글이 저장되었습니다.');
        } else {
          bookmarkIcon.className = 'ri-bookmark-line';
          bookmarkIcon.style.color = '';
          alert('게시글 저장이 취소되었습니다.');
        }
        break;
    }
  }
  
  // Handle comment actions
  function handleCommentAction(e) {
    const action = e.currentTarget.getAttribute('data-action');
    const comment = e.currentTarget.closest('.comment');
    const commentId = comment.getAttribute('data-comment-id');
    
    switch (action) {
      case 'like':
        const likeIcon = e.currentTarget.querySelector('i');
        const likeCount = e.currentTarget.querySelector('span');
        
        if (likeIcon.className === 'ri-heart-line') {
          likeIcon.className = 'ri-heart-fill';
          likeCount.textContent = parseInt(likeCount.textContent) + 1;
          
          // Add animation
          likeIcon.classList.add('scale');
          setTimeout(() => {
            likeIcon.classList.remove('scale');
          }, 300);
        } else {
          likeIcon.className = 'ri-heart-line';
          likeCount.textContent = parseInt(likeCount.textContent) - 1;
        }
        break;
        
      case 'reply':
        const commentForm = comment.closest('.post-card').querySelector('.comment-form');
        if (commentForm) {
          const input = commentForm.querySelector('.comment-input');
          input.value = `@${comment.querySelector('.comment-author').textContent} `;
          input.focus();
        }
        break;
    }
  }
  
  // Initialize post functionality
  document.addEventListener('DOMContentLoaded', function() {
    // Load initial posts
    loadPostsFromStorage();
    
    // Set up post creation form
    const createPostForm = document.getElementById('post-form');
    const submitPostBtn = document.getElementById('submit-post');
    
    if (submitPostBtn) {
      submitPostBtn.addEventListener('click', function() {
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;
        const category = document.getElementById('post-category').value;
        const images = Array.from(document.getElementById('image-preview').querySelectorAll('img')).map(img => img.src);
        
        // Extract tags from content (words starting with #)
        const tags = content.match(/#\w+/g)?.map(tag => tag.slice(1)) || [];
        
        if (!title || !content) {
          alert('제목과 내용을 입력해주세요.');
          return;
        }
        
        const post = createPost({
          title,
          content,
          category,
          images,
          tags
        });
        
        if (post) {
          // Close modal and reset form
          closeModal('create-post-modal');
          createPostForm.reset();
          document.getElementById('image-preview').innerHTML = '';
          document.getElementById('upload-placeholder').style.display = 'flex';
          
          // Refresh feed
          loadPosts();
          
          // Show success message
          alert('게시글이 성공적으로 등록되었습니다.');
        }
      });
    }
  });