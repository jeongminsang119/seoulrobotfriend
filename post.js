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
      comments: 12,
      shares: 5,
      images: [
        'https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ]
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
      comments: 23,
      shares: 8,
      images: [
        'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ]
    },
    {
      id: 'post-3',
      author: {
        id: 'user-4',
        name: '박메카',
        avatar: 'https://i.pravatar.cc/150?img=61'
      },
      title: '프로그래밍 스터디 모집',
      content: '자바스크립트와 파이썬 스터디원을 모집합니다! 매주 토요일 오후 2시부터 4시까지 학교 메이커스페이스에서 진행됩니다. 난이도는 초중급이고, 함께 미니 프로젝트도 진행할 예정입니다. 관심 있으신 분은 댓글이나 메시지 주세요. (현재 5명 참여 중, 최대 10명까지 가능)',
      category: 'sharing',
      createdAt: '2023-10-17T10:20:00',
      likes: 31,
      comments: 18,
      shares: 4,
      images: []
    },
    {
      id: 'post-4',
      author: {
        id: 'user-5',
        name: '최프로그',
        avatar: 'https://i.pravatar.cc/150?img=62'
      },
      title: '로봇공학과 대학 추천',
      content: '올해 대학 지원을 앞두고 로봇공학 관련 학과를 알아보고 있는데, 좋은 학교 추천 부탁드립니다! 특히 로봇 경진대회나 프로젝트 활동이 활발한 곳으로 알고 싶어요. 졸업하신 선배님들 조언 부탁드립니다.',
      category: 'question',
      createdAt: '2023-10-15T18:10:00',
      likes: 28,
      comments: 34,
      shares: 2,
      images: []
    },
    {
      id: 'post-5',
      author: {
        id: 'admin',
        name: '관리자',
        avatar: 'https://i.pravatar.cc/150?img=69'
      },
      title: '2025학년도 입학설명회 안내',
      content: '2025학년도 서울로봇고등학교 입학설명회를 다음과 같이 개최합니다.\n\n일시: 2023년 11월 11일 (토) 오후 2시\n장소: 학교 대강당\n대상: 중학교 3학년 학생 및 학부모\n\n학교 소개, 입학 전형 안내, 진로 및 취업 현황, 학과별 체험 부스 등이 운영됩니다. 많은 관심과 참여 바랍니다.',
      category: 'announcement',
      createdAt: '2023-10-12T09:00:00',
      likes: 65,
      comments: 15,
      shares: 42,
      images: [
        'https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ]
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
      comments: 0,
      shares: 0,
      images: postData.images || []
    };
    
    // Add the post to the beginning of the array
    posts.unshift(newPost);
    
    // In a real application, this would save to a database
    // For demo purposes, we're just using the posts array
    return newPost;
  }
  
  // Generate post HTML
  function generatePostHTML(post) {
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
          ${imagesHTML}
          
          <div class="post-actions">
            <div class="post-action ${isLiked ? 'liked' : ''}" data-action="like">
              <i class="${isLiked ? 'ri-heart-fill' : 'ri-heart-line'}"></i>
              <span>${post.likes}</span>
            </div>
            <div class="post-action" data-action="comment">
              <i class="ri-chat-1-line"></i>
              <span>${post.comments}</span>
            </div>
            <div class="post-action" data-action="share">
              <i class="ri-share-forward-line"></i>
              <span>${post.shares}</span>
            </div>
            <div class="post-action" data-action="bookmark">
              <i class="ri-bookmark-line"></i>
            </div>
          </div>
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
    
    // Filter posts if needed
    let filteredPosts = [...posts];
    
    if (options.category && options.category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === options.category);
    }
    
    if (options.author) {
      filteredPosts = filteredPosts.filter(post => post.author.id === options.author);
    }
    
    // Sort posts
    if (options.sort === 'popular') {
      filteredPosts.sort((a, b) => b.likes - a.likes);
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
    const postActions = postList.querySelectorAll('.post-action');
    postActions.forEach(action => {
      action.addEventListener('click', handlePostAction);
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
    const post = posts.find(p => p.id === postId);
    
    if (!post) return;
    
    switch (action) {
      case 'like':
        // Toggle like state
        const likeButton = e.currentTarget;
        const likeIcon = likeButton.querySelector('i');
        const likeCount = likeButton.querySelector('span');
        
        if (likeButton.classList.contains('liked')) {
          // Unlike
          likeButton.classList.remove('liked');
          likeIcon.className = 'ri-heart-line';
          post.likes--;
        } else {
          // Like
          likeButton.classList.add('liked');
          likeIcon.className = 'ri-heart-fill';
          post.likes++;
          
          // Add animation
          likeIcon.classList.add('scale');
          setTimeout(() => {
            likeIcon.classList.remove('scale');
          }, 300);
        }
        
        likeCount.textContent = post.likes;
        break;
        
      case 'comment':
        // Show comment form
        alert('댓글 기능은 현재 개발 중입니다.');
        break;
        
      case 'share':
        // Show share options
        alert('공유 기능은 현재 개발 중입니다.');
        break;
        
      case 'bookmark':
        // Toggle bookmark state
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