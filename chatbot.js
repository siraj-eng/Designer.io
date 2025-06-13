// Chatbot functionality
class DesignChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.responses = {
            greeting: [
                "Hello! Welcome to Designers.io! How can I help you create something amazing today?",
                "Hi there! I'm excited to help you with your design needs. What can I do for you?",
                "Welcome! Ready to bring your creative vision to life?"
            ],
            services: [
                "We offer comprehensive design services including:\n\n• Brand Identity & Logo Design\n• Web Design & Development\n• UI/UX Design\n• E-commerce Solutions\n• Content Marketing\n• Digital Strategy\n\nWhich service interests you most?"
            ],
            pricing: [
                "Our pricing is tailored to each project's unique needs. We offer:\n\n• Logo Design: Starting at $500\n• Website Design: Starting at $2,000\n• Complete Brand Package: Starting at $3,000\n• Custom quotes for larger projects\n\nWould you like to discuss your specific project?"
            ],
            project: [
                "Fantastic! I'd love to help you start your project. To get started, I'll need to know:\n\n• What type of project are you planning?\n• What's your timeline?\n• Do you have a budget in mind?\n\nFeel free to share any details about your vision!"
            ],
            contact: [
                "You can reach our team at:\n\n📧 bloombyte\n📞 +254 7 16160370\n📍 80100 Mvita, Oldtown\n\nOr use the contact form on our website. We typically respond within 2-4 hours!"
            ],
            default: [
                "That's a great question! Let me connect you with one of our design experts who can provide detailed information.",
                "I'd be happy to help! Could you tell me more about what you're looking for?",
                "Interesting! Our team specializes in creative solutions. What specific challenge are you facing?"
            ]
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.showWelcomeMessage();
    }

    bindEvents() {
        const toggleBtn = document.getElementById('chatbot-toggle');
        const closeBtn = document.getElementById('chatbot-close');
        const chatForm = document.getElementById('chat-form');
        const quickReplies = document.querySelectorAll('.quick-reply');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        quickReplies.forEach(reply => {
            reply.addEventListener('click', () => {
                const message = reply.dataset.message;
                this.sendMessage(message);
                this.hideQuickReplies();
            });
        });
    }

    toggleChat() {
        const container = document.getElementById('chatbot-container');
        const notification = document.querySelector('.chat-notification');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            container.classList.add('active');
            this.isOpen = true;
            document.getElementById('chat-input').focus();
            
            // Hide notification
            if (notification) {
                notification.style.display = 'none';
            }
        }
    }

    closeChat() {
        const container = document.getElementById('chatbot-container');
        container.classList.remove('active');
        this.isOpen = false;
    }

    handleSubmit(e) {
        e.preventDefault();
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.sendMessage(message);
            input.value = '';
        }
    }

    sendMessage(message) {
        this.addMessage(message, 'user');
        this.showTypingIndicator();
        
        // Simulate response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        
        const icon = document.createElement('i');
        if (sender === 'bot') {
            icon.className = 'fas fa-robot';
        } else {
            icon.className = 'fas fa-user';
        }
        avatar.appendChild(icon);
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        
        messageContent.appendChild(messageParagraph);
        messageContent.appendChild(messageTime);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ content, sender, timestamp: new Date() });
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return this.getRandomResponse('greeting');
        } else if (lowerMessage.includes('service') || lowerMessage.includes('what do you do') || lowerMessage.includes('offer')) {
            return this.getRandomResponse('services');
        } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
            return this.getRandomResponse('pricing');
        } else if (lowerMessage.includes('project') || lowerMessage.includes('start') || lowerMessage.includes('begin')) {
            return this.getRandomResponse('project');
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('phone') || lowerMessage.includes('email')) {
            return this.getRandomResponse('contact');
        } else {
            return this.getRandomResponse('default');
        }
    }

    getRandomResponse(type) {
        const responses = this.responses[type];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    showTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        indicator.classList.add('active');
    }

    hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        indicator.classList.remove('active');
    }

    hideQuickReplies() {
        const quickReplies = document.querySelector('.quick-replies');
        if (quickReplies) {
            quickReplies.style.display = 'none';
        }
    }

    showWelcomeMessage() {
        // Show notification after 3 seconds
        setTimeout(() => {
            const notification = document.querySelector('.chat-notification');
            if (notification && !this.isOpen) {
                notification.style.display = 'block';
            }
        }, 3000);
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DesignChatbot();
});