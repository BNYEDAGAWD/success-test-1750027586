// Universal Web App Template - JavaScript
class WebApp {
    constructor() {
        this.version = '1.0.0';
        this.init();
    }
    
    init() {
        console.log('🚀 Web App Initialized - Version:', this.version);
        document.addEventListener('DOMContentLoaded', () => {
            console.log('✅ Template loaded successfully');
            this.initContactForm();
            this.initDiscussionForm();
        });
    }
    
    initContactForm() {
        const form = document.getElementById('contactForm');
        const feedback = document.getElementById('formFeedback');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmission(form, feedback);
            });
        }
    }
    
    async handleContactSubmission(form, feedback) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            this.showFeedback(feedback, 'Sending message...', 'info');
            
            // Simulate API call
            await this.simulateApiCall(data);
            
            this.showFeedback(feedback, '✅ Message sent successfully! We\'ll get back to you soon.', 'success');
            form.reset();
        } catch (error) {
            this.showFeedback(feedback, `❌ Error sending message: ${error.message}`, 'error');
        }
    }
    
    simulateApiCall(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve({ success: true, data });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }
    
    showFeedback(element, message, type) {
        element.innerHTML = `<div class="form-feedback ${type}">${message}</div>`;
        
        if (type === 'success') {
            setTimeout(() => {
                element.innerHTML = '';
            }, 5000);
        }
    }
    
    initDiscussionForm() {
        const form = document.getElementById('discussionForm');
        const feedback = document.getElementById('discussionFeedback');
        const thread = document.getElementById('discussionThread');
        
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleDiscussionSubmission(form, feedback, thread);
            });
        }
    }
    
    async handleDiscussionSubmission(form, feedback, thread) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            this.showFeedback(feedback, 'Posting message...', 'info');
            
            await this.simulateDiscussionPost(data);
            
            this.addMessageToThread(thread, data);
            this.showFeedback(feedback, '✅ Message posted successfully!', 'success');
            
            document.getElementById('discussionMessage').value = '';
            
            setTimeout(() => {
                this.addSystemResponse(thread, data);
            }, 2000);
            
        } catch (error) {
            this.showFeedback(feedback, `❌ Error posting message: ${error.message}`, 'error');
        }
    }
    
    simulateDiscussionPost(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.05) {
                    resolve({ success: true, data });
                } else {
                    reject(new Error('Connection error'));
                }
            }, 1000);
        });
    }
    
    addMessageToThread(thread, data) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'discussion-message user-message';
        messageDiv.innerHTML = `
            <div class="message-header">
                <i class="fas fa-user me-2"></i>
                <strong>${data.name}</strong>
                <span class="role-badge role-${data.role}">${this.formatRole(data.role)}</span>
                <span class="topic-badge topic-${data.topic}">${this.formatTopic(data.topic)}</span>
                <span class="message-time">${this.formatTime(new Date())}</span>
            </div>
            <div class="message-content">${data.message}</div>
        `;
        
        thread.appendChild(messageDiv);
        thread.scrollTop = thread.scrollHeight;
    }
    
    addSystemResponse(thread, originalData) {
        const responses = {
            feature: "Thanks for the feature request! We'll add this to our backlog and consider it for the next release.",
            bug: "Thank you for reporting this bug. Our development team will investigate and work on a fix.",
            improvement: "Great suggestion! We appreciate your feedback on how to improve the project.",
            question: "Thanks for your question! Someone from the team will respond with more details soon.",
            feedback: "We value your feedback! It helps us make the project better for everyone."
        };
        
        const response = responses[originalData.topic] || "Thanks for your contribution to the discussion!";
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'discussion-message system-message';
        messageDiv.innerHTML = `
            <div class="message-header">
                <i class="fas fa-robot me-2"></i>
                <strong>Project Bot</strong>
                <span class="message-time">${this.formatTime(new Date())}</span>
            </div>
            <div class="message-content">${response}</div>
        `;
        
        thread.appendChild(messageDiv);
        thread.scrollTop = thread.scrollHeight;
    }
    
    formatRole(role) {
        const roles = {
            developer: 'Developer',
            tester: 'Tester',
            designer: 'Designer',
            pm: 'PM',
            user: 'User'
        };
        return roles[role] || role;
    }
    
    formatTopic(topic) {
        const topics = {
            feature: 'Feature',
            bug: 'Bug',
            improvement: 'Improvement',
            question: 'Question',
            feedback: 'Feedback'
        };
        return topics[topic] || topic;
    }
    
    formatTime(date) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
}

new WebApp();
