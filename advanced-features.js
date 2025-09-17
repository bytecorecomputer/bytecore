// Advanced Interactive Features for Bytecore Website

// 1. Advanced Search Functionality
class CourseSearch {
    constructor() {
        this.courses = [
            { name: 'Full Stack Development', category: 'Programming', price: 25999, duration: '10 months' },
            { name: 'Python Programming', category: 'Programming', price: 15999, duration: '6 months' },
            { name: 'O Level', category: 'Certification', price: 20999, duration: '1 year' },
            { name: 'CCC', category: 'Certification', price: 5999, duration: '3 months' },
            { name: 'ADCA', category: 'Diploma', price: 7999, duration: '6 months' },
            { name: 'MDCA', category: 'Diploma', price: 10999, duration: '7 months' },
            { name: 'Graphic Design', category: 'Design', price: 10000, duration: '6 months' }
        ];
        this.initSearch();
    }

    initSearch() {
        const searchInput = document.getElementById('course-search');
        const searchResults = document.getElementById('search-results');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                if (query.length > 2) {
                    const results = this.searchCourses(query);
                    this.displayResults(results, searchResults);
                } else {
                    searchResults.innerHTML = '';
                }
            });
        }
    }

    searchCourses(query) {
        return this.courses.filter(course => 
            course.name.toLowerCase().includes(query) ||
            course.category.toLowerCase().includes(query)
        );
    }

    displayResults(results, container) {
        if (!container) return;
        
        container.innerHTML = results.map(course => `
            <div class="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <h3 class="font-bold text-lg">${course.name}</h3>
                <p class="text-slate-600 dark:text-slate-300">${course.category}</p>
                <div class="flex justify-between mt-2">
                    <span class="text-primary font-bold">₹${course.price.toLocaleString()}</span>
                    <span class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">${course.duration}</span>
                </div>
            </div>
        `).join('');
    }
}

// 2. Advanced Form Validation & Analytics
class FormHandler {
    constructor() {
        this.initForms();
    }

    initForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Validate form
        if (this.validateForm(form)) {
            // Track conversion
            this.trackConversion('form_submission', {
                form_name: form.id || 'registration_form',
                course: formData.get('course') || 'unknown'
            });
            
            // Submit form
            this.submitForm(form, formData);
        }
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'This field is required');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });
        
        return isValid;
    }

    showError(input, message) {
        input.classList.add('border-red-500');
        let errorDiv = input.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-500 text-sm mt-1';
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
        errorDiv.textContent = message;
    }

    clearError(input) {
        input.classList.remove('border-red-500');
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }

    async submitForm(form, formData) {
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                this.showSuccess('Registration successful! We will contact you soon.');
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            this.showError(form, 'Something went wrong. Please try again.');
        }
    }

    showSuccess(message) {
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => alert.remove(), 5000);
    }

    trackConversion(eventName, parameters) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }
        
        // Facebook Pixel tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', parameters);
        }
    }
}

// 3. Advanced Chat Widget
class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createWidget();
        this.bindEvents();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.innerHTML = `
            <div id="chat-widget" class="fixed bottom-4 right-4 z-50">
                <div id="chat-button" class="w-16 h-16 bg-primary rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow">
                    <i class="fas fa-comments text-white text-xl"></i>
                </div>
                <div id="chat-window" class="hidden absolute bottom-20 right-0 w-80 h-96 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-slate-200 dark:border-slate-700">
                    <div class="p-4 bg-primary text-white rounded-t-lg">
                        <h3 class="font-bold">Need Help?</h3>
                        <p class="text-sm opacity-90">We're here to assist you!</p>
                    </div>
                    <div id="chat-messages" class="h-64 p-4 overflow-y-auto">
                        <div class="bg-slate-100 dark:bg-slate-700 p-3 rounded-lg mb-2">
                            <p class="text-sm">Hi! How can I help you today?</p>
                        </div>
                    </div>
                    <div class="p-4 border-t border-slate-200 dark:border-slate-700">
                        <div class="flex space-x-2">
                            <input type="text" id="chat-input" placeholder="Type your message..." class="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm">
                            <button id="chat-send" class="px-4 py-2 bg-primary text-white rounded-lg text-sm">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(widget);
    }

    bindEvents() {
        const chatButton = document.getElementById('chat-button');
        const chatWindow = document.getElementById('chat-window');
        const chatInput = document.getElementById('chat-input');
        const chatSend = document.getElementById('chat-send');

        chatButton.addEventListener('click', () => this.toggleChat());
        chatSend.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chat-window');
        this.isOpen = !this.isOpen;
        chatWindow.classList.toggle('hidden', !this.isOpen);
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            input.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                this.addBotResponse(message);
            }, 1000);
        }
    }

    addMessage(message, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `p-3 rounded-lg mb-2 ${sender === 'user' ? 'bg-primary text-white ml-8' : 'bg-slate-100 dark:bg-slate-700 mr-8'}`;
        messageDiv.innerHTML = `<p class="text-sm">${message}</p>`;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addBotResponse(userMessage) {
        const responses = {
            'course': 'We offer various courses including Full Stack Development, Python, O Level, CCC, ADCA, MDCA, and Graphic Design. Which one interests you?',
            'fee': 'Our course fees range from ₹5,999 to ₹25,999. Would you like specific pricing for any course?',
            'placement': 'We provide 100% placement assistance with our dedicated placement cell and 500+ hiring partners.',
            'duration': 'Course durations vary from 3 months to 1 year depending on the program you choose.',
            'default': 'Thank you for your message! Our team will get back to you shortly. You can also call us for immediate assistance.'
        };

        let response = responses.default;
        const lowerMessage = userMessage.toLowerCase();

        for (const [key, value] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                response = value;
                break;
            }
        }

        this.addMessage(response, 'bot');
    }
}

// 4. Advanced Performance Monitoring
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            this.trackPageLoad();
        });

        // Monitor user interactions
        this.trackUserEngagement();
    }

    trackPageLoad() {
        const navigation = performance.getEntriesByType('navigation')[0];
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
        
        // Track to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                value: Math.round(loadTime),
                custom_parameter: 'load_performance'
            });
        }
    }

    trackUserEngagement() {
        let startTime = Date.now();
        let isActive = true;

        // Track time on page
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                isActive = false;
                const timeSpent = Date.now() - startTime;
                this.trackTimeSpent(timeSpent);
            } else {
                isActive = true;
                startTime = Date.now();
            }
        });

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll % 25 === 0) { // Track at 25%, 50%, 75%, 100%
                    this.trackScrollDepth(maxScroll);
                }
            }
        });
    }

    trackTimeSpent(timeSpent) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'time_on_page', {
                value: Math.round(timeSpent / 1000), // Convert to seconds
                custom_parameter: 'engagement'
            });
        }
    }

    trackScrollDepth(depth) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
                value: depth,
                custom_parameter: 'engagement'
            });
        }
    }
}

// 5. Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CourseSearch();
    new FormHandler();
    new ChatWidget();
    new PerformanceMonitor();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});