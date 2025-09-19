// Enhanced Analytics & Conversion Tracking

class AdvancedAnalytics {
    constructor() {
        this.sessionStart = Date.now();
        this.interactions = [];
        this.init();
    }

    init() {
        this.setupEventTracking();
        this.setupHeatmapTracking();
        this.setupConversionFunnels();
        this.setupABTesting();
    }

    // Track all user interactions
    setupEventTracking() {
        // Button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('button, .btn, a[href*="register"], a[href*="enroll"]')) {
                this.trackEvent('button_click', {
                    element: e.target.textContent.trim(),
                    location: this.getElementLocation(e.target),
                    timestamp: Date.now()
                });
            }
        });

        // Form interactions
        document.addEventListener('focus', (e) => {
            if (e.target.matches('input, select, textarea')) {
                this.trackEvent('form_field_focus', {
                    field_name: e.target.name || e.target.id,
                    field_type: e.target.type,
                    form_id: e.target.closest('form')?.id
                });
            }
        });

        // Course card interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.course-card')) {
                const courseCard = e.target.closest('.course-card');
                const courseName = courseCard.querySelector('h3')?.textContent;
                this.trackEvent('course_interest', {
                    course_name: courseName,
                    action: 'card_click'
                });
            }
        });

        // Navigation tracking
        document.addEventListener('click', (e) => {
            if (e.target.matches('nav a, .nav-link')) {
                this.trackEvent('navigation', {
                    link_text: e.target.textContent.trim(),
                    destination: e.target.href
                });
            }
        });
    }

    // Heatmap and user behavior tracking
    setupHeatmapTracking() {
        let mouseMovements = [];
        let clicks = [];
        let scrollEvents = [];

        // Mouse movement tracking (sampled)
        let mouseSampleRate = 0;
        document.addEventListener('mousemove', (e) => {
            mouseSampleRate++;
            if (mouseSampleRate % 10 === 0) { // Sample every 10th movement
                mouseMovements.push({
                    x: e.clientX,
                    y: e.clientY,
                    timestamp: Date.now()
                });
            }
        });

        // Click heatmap
        document.addEventListener('click', (e) => {
            clicks.push({
                x: e.clientX,
                y: e.clientY,
                element: e.target.tagName,
                timestamp: Date.now()
            });
        });

        // Scroll tracking
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                scrollEvents.push({
                    scrollY: window.scrollY,
                    scrollPercent: Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100),
                    timestamp: Date.now()
                });
            }, 100);
        });

        // Send heatmap data periodically
        setInterval(() => {
            if (mouseMovements.length > 0 || clicks.length > 0 || scrollEvents.length > 0) {
                this.sendHeatmapData({
                    mouseMovements: mouseMovements.slice(-50), // Last 50 movements
                    clicks: clicks.slice(-20), // Last 20 clicks
                    scrollEvents: scrollEvents.slice(-10) // Last 10 scroll events
                });
                
                // Clear old data
                mouseMovements = mouseMovements.slice(-50);
                clicks = clicks.slice(-20);
                scrollEvents = scrollEvents.slice(-10);
            }
        }, 30000); // Every 30 seconds
    }

    // Conversion funnel tracking
    setupConversionFunnels() {
        const funnelSteps = [
            { step: 'landing', selector: 'body', event: 'page_view' },
            { step: 'course_view', selector: '#courses', event: 'scroll_to_courses' },
            { step: 'course_interest', selector: '.course-card', event: 'course_click' },
            { step: 'registration_view', selector: '#registration', event: 'scroll_to_registration' },
            { step: 'form_start', selector: '#registration input', event: 'form_interaction' },
            { step: 'form_submit', selector: '#registration form', event: 'form_submission' }
        ];

        // Track funnel progression
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = funnelSteps.find(s => entry.target.matches(s.selector));
                    if (step) {
                        this.trackFunnelStep(step.step);
                    }
                }
            });
        }, { threshold: 0.5 });

        // Observe funnel elements
        funnelSteps.forEach(step => {
            const elements = document.querySelectorAll(step.selector);
            elements.forEach(el => observer.observe(el));
        });
    }

    // A/B Testing framework
    setupABTesting() {
        const tests = [
            {
                name: 'hero_cta_text',
                variants: ['Register Now', 'Start Learning', 'Join Today'],
                element: 'a[href="#registration"]'
            }
            // Removed course_card_layout test that was causing swiper issues
        ];

        tests.forEach(test => {
            const variant = this.getABTestVariant(test.name, test.variants);
            this.applyABTestVariant(test, variant);
            this.trackEvent('ab_test_exposure', {
                test_name: test.name,
                variant: variant
            });
        });
    }

    getABTestVariant(testName, variants) {
        // Use user ID or session ID for consistent assignment
        const userId = this.getUserId();
        const hash = this.simpleHash(testName + userId);
        return variants[hash % variants.length];
    }

    applyABTestVariant(test, variant) {
        const elements = document.querySelectorAll(test.element);
        elements.forEach(el => {
            el.setAttribute('data-ab-test', test.name);
            el.setAttribute('data-ab-variant', variant);
            
            // Apply variant-specific changes
            if (test.name === 'hero_cta_text') {
                el.textContent = variant;
            }
            // Removed course_card_layout logic that was breaking swiper
        });
    }

    // Utility methods
    trackEvent(eventName, parameters = {}) {
        const eventData = {
            event: eventName,
            timestamp: Date.now(),
            session_id: this.getSessionId(),
            user_id: this.getUserId(),
            page_url: window.location.href,
            ...parameters
        };

        // Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }

        // Send to custom analytics endpoint
        this.sendToAnalytics(eventData);

        // Store for batch sending
        this.interactions.push(eventData);
    }

    trackFunnelStep(step) {
        this.trackEvent('funnel_step', {
            step: step,
            funnel: 'course_registration'
        });
    }

    getElementLocation(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
            section: this.getPageSection(rect.top + window.scrollY)
        };
    }

    getPageSection(y) {
        const sections = ['hero', 'features', 'courses', 'registration', 'footer'];
        const sectionHeight = document.body.scrollHeight / sections.length;
        const sectionIndex = Math.floor(y / sectionHeight);
        return sections[sectionIndex] || 'unknown';
    }

    getUserId() {
        let userId = localStorage.getItem('bytecore_user_id');
        if (!userId) {
            userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('bytecore_user_id', userId);
        }
        return userId;
    }

    getSessionId() {
        let sessionId = sessionStorage.getItem('bytecore_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('bytecore_session_id', sessionId);
        }
        return sessionId;
    }

    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash);
    }

    async sendToAnalytics(data) {
        try {
            // Store in localStorage for client-side analytics
            const analyticsData = JSON.parse(localStorage.getItem('bytecore_analytics') || '[]');
            analyticsData.push(data);
            
            // Keep only last 100 events
            if (analyticsData.length > 100) {
                analyticsData.splice(0, analyticsData.length - 100);
            }
            
            localStorage.setItem('bytecore_analytics', JSON.stringify(analyticsData));
            
            // Send to Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', data.event, data);
            }
        } catch (error) {
            console.log('Analytics tracking failed:', error);
        }
    }

    async sendHeatmapData(data) {
        try {
            // Store heatmap data locally
            const heatmapData = JSON.parse(localStorage.getItem('bytecore_heatmap') || '[]');
            heatmapData.push({
                session_id: this.getSessionId(),
                user_id: this.getUserId(),
                page_url: window.location.href,
                timestamp: Date.now(),
                ...data
            });
            
            // Keep only last 50 heatmap entries
            if (heatmapData.length > 50) {
                heatmapData.splice(0, heatmapData.length - 50);
            }
            
            localStorage.setItem('bytecore_heatmap', JSON.stringify(heatmapData));
        } catch (error) {
            console.log('Heatmap tracking failed:', error);
        }
    }

    // Send batch data before page unload
    sendBatchData() {
        if (this.interactions.length > 0) {
            // Store final session data
            const sessionData = {
                session_duration: Date.now() - this.sessionStart,
                interactions: this.interactions,
                timestamp: Date.now()
            };
            
            localStorage.setItem('bytecore_last_session', JSON.stringify(sessionData));
            
            // Send to Google Analytics if available
            if (typeof gtag !== 'undefined') {
                gtag('event', 'session_end', {
                    session_duration: sessionData.session_duration,
                    total_interactions: this.interactions.length
                });
            }
        }
    }
}

// Lead scoring system
class LeadScoring {
    constructor() {
        this.score = 0;
        this.actions = {
            'page_view': 1,
            'course_interest': 5,
            'form_field_focus': 3,
            'form_submission': 20,
            'phone_click': 10,
            'email_click': 8,
            'brochure_download': 15,
            'video_watch': 7
        };
        this.init();
    }

    init() {
        // Load existing score
        this.score = parseInt(localStorage.getItem('bytecore_lead_score') || '0');
        
        // Listen for scoring events
        document.addEventListener('analytics_event', (e) => {
            this.updateScore(e.detail.event, e.detail.parameters);
        });

        // Update score display
        this.updateScoreDisplay();
    }

    updateScore(eventName, parameters = {}) {
        const points = this.actions[eventName] || 0;
        this.score += points;
        
        // Save score
        localStorage.setItem('bytecore_lead_score', this.score.toString());
        
        // Trigger personalization
        this.triggerPersonalization();
        
        // Update display
        this.updateScoreDisplay();
    }

    triggerPersonalization() {
        if (this.score >= 50) {
            this.showHighIntentPopup();
        } else if (this.score >= 20) {
            this.showMediumIntentBanner();
        }
    }

    showHighIntentPopup() {
        if (!document.getElementById('high-intent-popup')) {
            const popup = document.createElement('div');
            popup.id = 'high-intent-popup';
            popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
            popup.innerHTML = `
                <div class="bg-white dark:bg-slate-800 rounded-xl p-8 max-w-md mx-4">
                    <h3 class="text-2xl font-bold mb-4">🎉 Special Offer for You!</h3>
                    <p class="mb-6">We noticed you're really interested in our courses. Get 20% off your first course!</p>
                    <div class="flex space-x-4">
                        <button onclick="this.closest('#high-intent-popup').remove()" class="flex-1 px-4 py-2 bg-primary text-white rounded-lg">Claim Offer</button>
                        <button onclick="this.closest('#high-intent-popup').remove()" class="px-4 py-2 border border-slate-300 rounded-lg">Maybe Later</button>
                    </div>
                </div>
            `;
            document.body.appendChild(popup);
        }
    }

    showMediumIntentBanner() {
        if (!document.getElementById('medium-intent-banner')) {
            const banner = document.createElement('div');
            banner.id = 'medium-intent-banner';
            banner.className = 'fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-purple-600 text-white p-4 z-40';
            banner.innerHTML = `
                <div class="container mx-auto flex items-center justify-between">
                    <div>
                        <strong>Still deciding?</strong> Download our free course brochure!
                    </div>
                    <div class="flex space-x-2">
                        <button class="px-4 py-2 bg-white text-primary rounded-lg text-sm">Download</button>
                        <button onclick="this.closest('#medium-intent-banner').remove()" class="px-4 py-2 border border-white rounded-lg text-sm">×</button>
                    </div>
                </div>
            `;
            document.body.appendChild(banner);
        }
    }

    updateScoreDisplay() {
        // For debugging - remove in production
        if (window.location.search.includes('debug=true')) {
            let scoreDisplay = document.getElementById('lead-score-debug');
            if (!scoreDisplay) {
                scoreDisplay = document.createElement('div');
                scoreDisplay.id = 'lead-score-debug';
                scoreDisplay.className = 'fixed top-4 left-4 bg-black text-white p-2 rounded text-sm z-50';
                document.body.appendChild(scoreDisplay);
            }
            scoreDisplay.textContent = `Lead Score: ${this.score}`;
        }
    }
}

// Initialize enhanced analytics
document.addEventListener('DOMContentLoaded', () => {
    const analytics = new AdvancedAnalytics();
    const leadScoring = new LeadScoring();
    
    // Send batch data before page unload
    window.addEventListener('beforeunload', () => {
        analytics.sendBatchData();
    });
});