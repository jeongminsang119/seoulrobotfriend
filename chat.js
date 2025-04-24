// Chat page functionality

// Initialize the chat page
function initChatPage() {
    // Set up chat item selection
    const chatItems = document.querySelectorAll('.chat-item');
    
    chatItems.forEach(item => {
      item.addEventListener('click', function() {
        // Remove active class from all chat items
        chatItems.forEach(chat => chat.classList.remove('active'));
        
        // Add active class to clicked chat
        this.classList.add('active');
        
        // In a real application, this would load the chat messages
        // For this demo, we'll just update the chat header
        const avatar = this.querySelector('.chat-avatar img').src;
        const name = this.querySelector('.chat-info .chat-name').textContent;
        
        const chatHeader = document.querySelector('.chat-header');
        if (chatHeader) {
          chatHeader.querySelector('.chat-avatar img').src = avatar;
          chatHeader.querySelector('.chat-name').textContent = name;
        }
      });
    });
    
    // Set up chat message sending
    const chatInput = document.querySelector('.chat-input');
    const chatSendBtn = document.querySelector('.chat-send-btn');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (chatInput && chatSendBtn && chatMessages) {
      // Function to send message
      const sendMessage = () => {
        const messageText = chatInput.value.trim();
        
        if (messageText) {
          // Get current time
          const now = new Date();
          const hours = now.getHours().toString().padStart(2, '0');
          const minutes = now.getMinutes().toString().padStart(2, '0');
          const timeString = `${hours}:${minutes}`;
          
          // Create new message HTML
          const messageHTML = `
            <div class="message message-outgoing">
              <div class="message-content">${messageText}</div>
              <div class="message-time">${timeString}</div>
              <div class="message-status">전송됨</div>
            </div>
          `;
          
          // Add message to chat
          chatMessages.insertAdjacentHTML('beforeend', messageHTML);
          
          // Clear input
          chatInput.value = '';
          
          // Scroll to bottom
          chatMessages.scrollTop = chatMessages.scrollHeight;
          
          // Simulate response after delay
          setTimeout(() => {
            // Get chat recipient name
            const recipientName = document.querySelector('.chat-header .chat-name').textContent;
            
            // Sample responses
            const responses = [
              '알겠습니다!',
              '네, 확인했어요.',
              '자세한 설명 고마워요.',
              '내일 다시 얘기해요!',
              '좋은 정보 감사합니다.'
            ];
            
            // Pick random response
            const responseText = responses[Math.floor(Math.random() * responses.length)];
            
            // Create response message HTML
            const responseHTML = `
              <div class="message message-incoming">
                <div class="message-content">${responseText}</div>
                <div class="message-time">${timeString}</div>
              </div>
            `;
            
            // Add response to chat
            chatMessages.insertAdjacentHTML('beforeend', responseHTML);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Update sent message status to read
            const sentMessage = chatMessages.querySelector('.message-outgoing:last-of-type .message-status');
            sentMessage.className = 'message-status message-read';
            sentMessage.textContent = '읽음';
          }, 2000);
        }
      };
      
      // Send on button click
      chatSendBtn.addEventListener('click', sendMessage);
      
      // Send on Enter key
      chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }
  }