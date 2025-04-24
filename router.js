// Simple client-side router

// Store for the current page
let currentPage = null;
let pageCache = {};

// Initialize the router
function initRouter() {
  // Set up navigation event listeners
  const navLinks = document.querySelectorAll('[data-page]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      navigateTo(page);
    });
  });
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      loadPage(e.state.page);
    }
  });
}

// Navigate to a specific page
function navigateTo(page) {
  if (currentPage === page) return;
  
  // Update the history state
  window.history.pushState({ page }, `${page} - 서울로봇고 커뮤니티`, `#/${page}`);
  
  // Load the page content
  loadPage(page);
}

// Load page content
function loadPage(page) {
  // Update the current page
  currentPage = page;
  
  // Update active nav links
  const navLinks = document.querySelectorAll('[data-page]');
  navLinks.forEach(link => {
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && mobileMenu.classList.contains('active')) {
    mobileMenu.classList.remove('active');
  }
  
  // Check if user is logged in
  const user = getCurrentUser();
  if (!user && page !== 'login') {
    openModal('login-modal');
    return;
  }
  
  const pageContainer = document.getElementById('page-container');
  
  // Show loading state
  pageContainer.innerHTML = `
    <div class="loading">
      <span class="loading-spinner"></span>
      <span>로딩 중...</span>
    </div>
  `;
  
  // Check if we have this page in cache
  if (pageCache[page]) {
    pageContainer.innerHTML = pageCache[page];
    initPageScripts(page);
    return;
  }
  
  // In a real application, this might fetch from a server
  // For this demo, we'll just switch based on the page name
  
  switch (page) {
    case 'feed':
      loadFeedPage(pageContainer);
      break;
    case 'gallery':
      loadGalleryPage(pageContainer);
      break;
    case 'knowledge':
      loadKnowledgePage(pageContainer);
      break;
    case 'chat':
      loadChatPage(pageContainer);
      break;
    case 'profile':
      loadProfilePage(pageContainer);
      break;
    default:
      pageContainer.innerHTML = `
        <div class="empty-state">
          <i class="ri-error-warning-line"></i>
          <h3>페이지를 찾을 수 없습니다</h3>
          <p>요청하신 페이지가 존재하지 않습니다. 홈으로 돌아가 다시 시도해주세요.</p>
          <button class="btn btn-primary" data-page="feed">홈으로 가기</button>
        </div>
      `;
      
      // Re-attach event listeners
      const homeButton = pageContainer.querySelector('[data-page="feed"]');
      if (homeButton) {
        homeButton.addEventListener('click', function(e) {
          e.preventDefault();
          navigateTo('feed');
        });
      }
  }
}

// Initialize page-specific JavaScript
function initPageScripts(page) {
  switch (page) {
    case 'feed':
      initFeedPage();
      break;
    case 'gallery':
      initGalleryPage();
      break;
    case 'knowledge':
      initKnowledgePage();
      break;
    case 'chat':
      initChatPage();
      break;
    case 'profile':
      initProfilePage();
      break;
  }
}

// Load the feed page content
function loadFeedPage(container) {
  if (!pageCache['feed']) {
    // Generate the feed page HTML
    let html = `
      <div class="container">
        <div class="feed-layout">
          <div class="left-sidebar sidebar">
            <div class="card">
              <div class="sidebar-section">
                <h3 class="sidebar-section-title">카테고리</h3>
                <ul class="category-list">
                  <li class="category-item active">
                    <div class="category-name"><i class="ri-home-line"></i> 전체</div>
                    <span class="category-count">128</span>
                  </li>
                  <li class="category-item">
                    <div class="category-name"><i class="ri-code-s-slash-line"></i> 프로젝트</div>
                    <span class="category-count">42</span>
                  </li>
                  <li class="category-item">
                    <div class="category-name"><i class="ri-chat-1-line"></i> 일상</div>
                    <span class="category-count">56</span>
                  </li>
                  <li class="category-item">
                    <div class="category-name"><i class="ri-question-line"></i> 질문</div>
                    <span class="category-count">23</span>
                  </li>
                  <li class="category-item">
                    <div class="category-name"><i class="ri-folder-line"></i> 자료공유</div>
                    <span class="category-count">18</span>
                  </li>
                  <li class="category-item">
                    <div class="category-name"><i class="ri-megaphone-line"></i> 공지사항</div>
                    <span class="category-count">7</span>
                  </li>
                </ul>
              </div>
              
              <div class="sidebar-section">
                <h3 class="sidebar-section-title">인기 태그</h3>
                <div class="popular-tags">
                  <span class="tag">#아두이노</span>
                  <span class="tag">#로봇대회</span>
                  <span class="tag">#프로그래밍</span>
                  <span class="tag">#학교행사</span>
                  <span class="tag">#프로젝트</span>
                  <span class="tag">#코딩</span>
                  <span class="tag">#자바스크립트</span>
                  <span class="tag">#취업정보</span>
                </div>
              </div>
              
              <div class="sidebar-section">
                <h3 class="sidebar-section-title">온라인 사용자</h3>
                <div class="online-users">
                  <div class="user-list">
                    <div class="online-user">
                      <div class="avatar">
                        <img src="https://i.pravatar.cc/150?img=32" alt="사용자 이미지">
                      </div>
                      <span class="online-status"></span>
                    </div>
                    <div class="online-user">
                      <div class="avatar">
                        <img src="https://i.pravatar.cc/150?img=33" alt="사용자 이미지">
                      </div>
                      <span class="online-status"></span>
                    </div>
                    <div class="online-user">
                      <div class="avatar">
                        <img src="https://i.pravatar.cc/150?img=34" alt="사용자 이미지">
                      </div>
                      <span class="online-status"></span>
                    </div>
                    <div class="online-user">
                      <div class="avatar">
                        <img src="https://i.pravatar.cc/150?img=35" alt="사용자 이미지">
                      </div>
                      <span class="online-status"></span>
                    </div>
                    <div class="online-user">
                      <div class="avatar">
                        <img src="https://i.pravatar.cc/150?img=36" alt="사용자 이미지">
                      </div>
                      <span class="online-status"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="feed-content">
            <div class="welcome-message">
              <h3>로봇고 커뮤니티에 오신 것을 환영합니다! 👋</h3>
              <p>학생들과 소통하고, 멋진 프로젝트를 공유하세요. 서로의 지식을 나누고 함께 성장합시다.</p>
            </div>
            
            <div class="feed-filters">
              <div class="filter-tabs">
                <div class="filter-tab active">최신순</div>
                <div class="filter-tab">인기순</div>
                <div class="filter-tab">팔로잉</div>
              </div>
              <div class="filters-right">
                <select class="sort-select">
                  <option value="all">모든 게시글</option>
                  <option value="project">프로젝트만</option>
                  <option value="question">질문만</option>
                  <option value="sharing">자료공유만</option>
                </select>
              </div>
            </div>
            
            <div class="post-list">
              <!-- Posts will be loaded here -->
            </div>
          </div>
          
          <div class="right-sidebar sidebar">
            <div class="card">
              <div class="sidebar-section">
                <h3 class="sidebar-section-title">공지사항</h3>
                <ul class="category-list">
                  <li class="category-item">
                    <div class="category-name">2025학년도 입학설명회 안내</div>
                  </li>
                  <li class="category-item">
                    <div class="category-name">로봇 경진대회 참가자 모집</div>
                  </li>
                  <li class="category-item">
                    <div class="category-name">2학기 학사일정 안내</div>
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="card">
              <div class="sidebar-section">
                <h3 class="sidebar-section-title">이번 주 인기 게시글</h3>
                <ul class="category-list">
                  <li class="category-item">
                    <div class="category-name">아두이노로 만든 LED 큐브</div>
                  </li>
                  <li class="category-item">
                    <div class="category-name">학교 축제 로봇 전시회 후기</div>
                  </li>
                  <li class="category-item">
                    <div class="category-name">프로그래밍 스터디 모집</div>
                  </li>
                  <li class="category-item">
                    <div class="category-name">로봇공학과 대학 추천</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Cache the HTML
    pageCache['feed'] = html;
  }
  
  // Set the HTML
  container.innerHTML = pageCache['feed'];
  
  // Initialize page-specific scripts
  initFeedPage();
}

// Load Gallery page content
function loadGalleryPage(container) {
  if (!pageCache['gallery']) {
    // Generate the gallery page HTML
    let html = `
      <div class="container">
        <h2 class="mb-4">갤러리</h2>
        
        <div class="gallery-filters">
          <div class="gallery-search">
            <i class="ri-search-line"></i>
            <input type="text" placeholder="검색어를 입력하세요">
          </div>
          
          <div class="filters-right">
            <select class="sort-select">
              <option value="recent">최신순</option>
              <option value="popular">인기순</option>
              <option value="comments">댓글순</option>
            </select>
            
            <div class="gallery-view-options">
              <div class="view-option active" data-view="grid">
                <i class="ri-grid-line"></i>
              </div>
              <div class="view-option" data-view="list">
                <i class="ri-list-check"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div class="gallery-layout grid-view">
          <!-- Gallery items will be generated here -->
        </div>
      </div>
    `;
    
    // Cache the HTML
    pageCache['gallery'] = html;
  }
  
  // Set the HTML
  container.innerHTML = pageCache['gallery'];
  
  // Initialize page-specific scripts
  initGalleryPage();
}

// Load Knowledge page content
function loadKnowledgePage(container) {
  if (!pageCache['knowledge']) {
    // Generate the knowledge page HTML
    let html = `
      <div class="container">
        <div class="knowledge-layout">
          <div class="knowledge-sidebar">
            <div class="card">
              <div class="sidebar-section">
                <h3 class="sidebar-section-title">지식 카테고리</h3>
                <ul class="topic-list">
                  <li class="topic-item">
                    <a href="#" class="topic-link active">
                      <i class="ri-home-line"></i> 모든 지식
                    </a>
                  </li>
                  <li class="topic-item">
                    <a href="#" class="topic-link">
                      <i class="ri-robot-line"></i> 로봇공학
                    </a>
                  </li>
                  <li class="topic-item">
                    <a href="#" class="topic-link">
                      <i class="ri-code-s-slash-line"></i> 프로그래밍
                    </a>
                  </li>
                  <li class="topic-item">
                    <a href="#" class="topic-link">
                      <i class="ri-terminal-box-line"></i> 마이크로컨트롤러
                    </a>
                  </li>
                  <li class="topic-item">
                    <a href="#" class="topic-link">
                      <i class="ri-cpu-line"></i> 전자공학
                    </a>
                  </li>
                  <li class="topic-item">
                    <a href="#" class="topic-link">
                      <i class="ri-tools-line"></i> 기계공학
                    </a>
                  </li>
                  <li class="topic-item">
                    <a href="#" class="topic-link">
                      <i class="ri-ai-generate"></i> 인공지능
                    </a>
                  </li>
                  <li class="topic-item">
                    <a href="#" class="topic-link">
                      <i class="ri-apps-line"></i> 소프트웨어
                    </a>
                  </li>
                  <li class="topic-item">
                    <a href="#" class="topic-link">
                      <i class="ri-book-open-line"></i> 학습자료
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div class="knowledge-content">
            <div class="card">
              <div class="card-body">
                <div class="knowledge-header">
                  <h2 class="knowledge-title">아두이노 기초 가이드</h2>
                  <div class="knowledge-meta">
                    <div><i class="ri-user-line"></i> 박메카</div>
                    <div><i class="ri-time-line"></i> 2023-10-15</div>
                    <div><i class="ri-eye-line"></i> 243</div>
                    <div><i class="ri-bookmark-line"></i> 56</div>
                  </div>
                </div>
                
                <div class="knowledge-content">
                  <p>아두이노는 오픈 소스 하드웨어와 소프트웨어를 기반으로 한 마이크로컨트롤러 플랫폼입니다. 로봇 공학을 시작하는 학생들에게 가장 인기 있는 플랫폼 중 하나입니다.</p>
                  
                  <h3>아두이노란 무엇인가?</h3>
                  <p>아두이노는 간단한 프로젝트부터 복잡한 로봇까지 다양한 전자 프로젝트를 만들 수 있는 플랫폼입니다. 마이크로컨트롤러 보드와 IDE(통합개발환경)로 구성되어 있으며, C/C++ 기반의 간단한 프로그래밍 언어를 사용합니다.</p>
                  
                  <h3>아두이노의 주요 구성 요소</h3>
                  <ul>
                    <li><strong>디지털 핀:</strong> 전기적 신호를 ON(5V) 또는 OFF(0V)로 읽거나 쓸 수 있는 핀</li>
                    <li><strong>아날로그 핀:</strong> 0V에서 5V 사이의 전압값을 읽을 수 있는 핀</li>
                    <li><strong>PWM 핀:</strong> 디지털 출력을 아날로그처럼 시뮬레이션할 수 있는 핀</li>
                    <li><strong>전원 핀:</strong> 5V, 3.3V, GND 등의 전원을 제공하는 핀</li>
                  </ul>
                  
                  <h3>기본 프로그래밍 구조</h3>
                  <p>아두이노 프로그램은 최소한 두 개의 함수로 구성됩니다:</p>
                  <pre><code>void setup() {
  // 초기화 코드 (한 번만 실행)
  pinMode(13, OUTPUT);
}

void loop() {
  // 메인 코드 (반복 실행)
  digitalWrite(13, HIGH);  // LED 켜기
  delay(1000);             // 1초 대기
  digitalWrite(13, LOW);   // LED 끄기
  delay(1000);             // 1초 대기
}</code></pre>
                  
                  <h3>첫 번째 프로젝트: LED 깜빡이기</h3>
                  <p>아두이노를 시작하는 가장 기본적인 프로젝트는 LED를 깜빡이는 것입니다. 위의 코드 예제는 아두이노 보드의 내장 LED(핀 13)를 1초 간격으로 켜고 끄는 프로그램입니다.</p>
                  
                  <h3>센서 연결하기</h3>
                  <p>아두이노의 강점은 다양한 센서와 쉽게 연결할 수 있다는 것입니다. 온도 센서, 거리 센서, 모션 센서 등 다양한 센서를 사용해 환경 정보를 수집할 수 있습니다.</p>
                  
                  <p>다음은 초음파 거리 센서(HC-SR04)를 사용하는 예제입니다:</p>
                  <pre><code>#define TRIG_PIN 9
#define ECHO_PIN 10

void setup() {
  Serial.begin(9600);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
}

void loop() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  int distance = duration * 0.034 / 2;
  
  Serial.print("거리: ");
  Serial.print(distance);
  Serial.println(" cm");
  
  delay(500);
}</code></pre>
                  
                  <h3>다음 단계</h3>
                  <p>아두이노 기초를 배웠다면, 다음 단계로 모터 제어, 통신 프로토콜, 디스플레이 연결 등 더 복잡한 주제로 진행할 수 있습니다. 로봇 프로젝트를 위해서는 서보 모터와 DC 모터 제어가 특히 중요합니다.</p>
                </div>
                
                <div class="knowledge-actions">
                  <button class="btn btn-outline">
                    <i class="ri-bookmark-line"></i> 저장
                  </button>
                  <button class="btn btn-outline">
                    <i class="ri-share-line"></i> 공유
                  </button>
                  <button class="btn btn-outline">
                    <i class="ri-edit-line"></i> 편집 요청
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Cache the HTML
    pageCache['knowledge'] = html;
  }
  
  // Set the HTML
  container.innerHTML = pageCache['knowledge'];
  
  // Initialize page-specific scripts
  initKnowledgePage();
}

// Load Chat page content
function loadChatPage(container) {
  if (!pageCache['chat']) {
    // Generate the chat page HTML
    let html = `
      <div class="chat-layout">
        <div class="chat-sidebar">
          <div class="sidebar-section">
            <h3 class="sidebar-section-title">메시지</h3>
            <div class="chat-search">
              <input type="text" placeholder="대화 검색" class="form-control">
            </div>
          </div>
          
          <ul class="chat-list">
            <li class="chat-item active">
              <div class="avatar chat-avatar">
                <img src="https://i.pravatar.cc/150?img=58" alt="사용자 이미지">
              </div>
              <div class="chat-info">
                <div class="chat-name">김로봇</div>
                <div class="chat-last-message">안녕하세요! 프로젝트 진행상황은 어떻게 되고 있나요?</div>
              </div>
            </li>
            <li class="chat-item">
              <div class="avatar chat-avatar">
                <img src="https://i.pravatar.cc/150?img=59" alt="사용자 이미지">
              </div>
              <div class="chat-info">
                <div class="chat-name">이기술</div>
                <div class="chat-last-message">내일 학교에서 만나요!</div>
              </div>
            </li>
            <li class="chat-item">
              <div class="avatar chat-avatar">
                <img src="https://i.pravatar.cc/150?img=61" alt="사용자 이미지">
              </div>
              <div class="chat-info">
                <div class="chat-name">박메카</div>
                <div class="chat-last-message">아두이노 자료 공유해 주셔서 감사합니다.</div>
              </div>
            </li>
            <li class="chat-item">
              <div class="avatar chat-avatar">
                <img src="https://i.pravatar.cc/150?img=62" alt="사용자 이미지">
              </div>
              <div class="chat-info">
                <div class="chat-name">최프로그</div>
                <div class="chat-last-message">코딩 스터디 내일 7시에 시작합니다!</div>
              </div>
            </li>
          </ul>
        </div>
        
        <div class="chat-main">
          <div class="chat-header">
            <div class="avatar chat-avatar">
              <img src="https://i.pravatar.cc/150?img=58" alt="사용자 이미지">
            </div>
            <div class="chat-info">
              <div class="chat-name">김로봇</div>
              <div class="chat-status">온라인</div>
            </div>
          </div>
          
          <div class="chat-messages">
            <div class="message message-incoming">
              <div class="message-content">안녕하세요! 프로젝트 진행상황은 어떻게 되고 있나요?</div>
              <div class="message-time">오전 10:23</div>
            </div>
            
            <div class="message message-outgoing">
              <div class="message-content">안녕하세요! 아두이노 부분은 거의 완성했고, 지금 서보 모터 조정 중이에요.</div>
              <div class="message-time">오전 10:25</div>
              <div class="message-status message-read">읽음</div>
            </div>
            
            <div class="message message-incoming">
              <div class="message-content">좋네요! 혹시 회로도 완성됐나요?</div>
              <div class="message-time">오전 10:26</div>
            </div>
            
            <div class="message message-outgoing">
              <div class="message-content">네, 회로도는 어제 완성했어요. 내일 학교에서 보여드릴게요!</div>
              <div class="message-time">오전 10:28</div>
              <div class="message-status">전송됨</div>
            </div>
          </div>
          
          <div class="chat-footer">
            <div class="chat-input-container">
              <input type="text" class="chat-input" placeholder="메시지를 입력하세요...">
              <button class="chat-send-btn">
                <i class="ri-send-plane-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Cache the HTML
    pageCache['chat'] = html;
  }
  
  // Set the HTML
  container.innerHTML = pageCache['chat'];
  
  // Initialize page-specific scripts
  initChatPage();
}

// Load Profile page content
function loadProfilePage(container) {
  // Get the current user
  const user = getCurrentUser();
  
  if (!user) {
    // If not logged in, redirect to login
    openModal('login-modal');
    return;
  }
  
  if (!pageCache['profile']) {
    // Generate the profile page HTML
    let html = `
      <div class="container">
        <div class="profile-layout">
          <div class="profile-header">
            <img src="${user.avatar}" alt="${user.name}" class="profile-avatar">
            <h2>${user.name}</h2>
            <p>@${user.name.toLowerCase().replace(/\s/g, '')}</p>
            
            <div class="profile-stats">
              <div class="stat-item">
                <div class="stat-value">42</div>
                <div class="stat-label">게시글</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">128</div>
                <div class="stat-label">팔로워</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">64</div>
                <div class="stat-label">팔로잉</div>
              </div>
            </div>
            
            <p class="profile-bio">서울로봇고등학교 2학년 | 로봇공학 전공 | 아두이노, 라즈베리파이 좋아함 | 로봇대회 준비중</p>
            
            <div class="profile-actions">
              <button class="btn btn-primary">
                <i class="ri-user-add-line"></i> 팔로우
              </button>
              <button class="btn btn-outline">
                <i class="ri-message-3-line"></i> 메시지
              </button>
            </div>
          </div>
          
          <div class="profile-content">
            <div class="profile-tabs">
              <div class="profile-tab active" data-tab="posts">게시글</div>
              <div class="profile-tab" data-tab="projects">프로젝트</div>
              <div class="profile-tab" data-tab="achievements">업적</div>
              <div class="profile-tab" data-tab="saved">저장됨</div>
            </div>
            
            <div class="tab-content active" id="posts-tab">
              <div class="post-list">
                <!-- Posts will be loaded here -->
              </div>
            </div>
            
            <div class="tab-content" id="projects-tab" style="display: none;">
              <div class="empty-state">
                <i class="ri-code-s-slash-line"></i>
                <h3>프로젝트가 없습니다</h3>
                <p>아직 등록된 프로젝트가 없습니다. 첫 프로젝트를 등록해보세요!</p>
                <button class="btn btn-primary">프로젝트 등록하기</button>
              </div>
            </div>
            
            <div class="tab-content" id="achievements-tab" style="display: none;">
              <h3>획득한 업적</h3>
              <div class="achievement-list">
                <div class="achievement">
                  <div class="achievement-icon">
                    <i class="ri-user-star-line"></i>
                  </div>
                  <div class="achievement-info">
                    <div class="achievement-name">신입생</div>
                    <div class="achievement-desc">커뮤니티에 처음 가입함</div>
                  </div>
                </div>
                
                <div class="achievement">
                  <div class="achievement-icon">
                    <i class="ri-quill-pen-line"></i>
                  </div>
                  <div class="achievement-info">
                    <div class="achievement-name">작가</div>
                    <div class="achievement-desc">첫 게시글 작성</div>
                  </div>
                </div>
                
                <div class="achievement">
                  <div class="achievement-icon">
                    <i class="ri-heart-line"></i>
                  </div>
                  <div class="achievement-info">
                    <div class="achievement-name">인기인</div>
                    <div class="achievement-desc">게시글 50개 좋아요 받음</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="tab-content" id="saved-tab" style="display: none;">
              <div class="empty-state">
                <i class="ri-bookmark-line"></i>
                <h3>저장된 항목이 없습니다</h3>
                <p>관심있는 게시글이나 지식창고 글을 저장해보세요!</p>
              </div>
            </div>
          </div>
          
          <div class="profile-sidebar">
            <div class="card">
              <div class="card-header">
                <h3>관심 분야</h3>
              </div>
              <div class="card-body">
                <div class="popular-tags">
                  <span class="tag">#로봇공학</span>
                  <span class="tag">#아두이노</span>
                  <span class="tag">#프로그래밍</span>
                  <span class="tag">#3D프린팅</span>
                  <span class="tag">#인공지능</span>
                  <span class="tag">#로봇대회</span>
                </div>
              </div>
            </div>
            
            <div class="card">
              <div class="card-header">
                <h3>활동 통계</h3>
              </div>
              <div class="card-body">
                <p>가입일: 2023년 3월 15일</p>
                <p>최근 접속: 오늘</p>
                <p>활동 점수: 78</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Cache the HTML
    pageCache['profile'] = html;
  }
  
  // Set the HTML
  container.innerHTML = pageCache['profile'];
  
  // Initialize page-specific scripts
  initProfilePage();
}