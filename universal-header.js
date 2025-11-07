// Universal Header Loader
(function() {
    'use strict';
    
    // Load header component
    function loadUniversalHeader() {
        fetch('header-component.html')
            .then(response => response.text())
            .then(html => {
                // Insert header at the beginning of body
                document.body.insertAdjacentHTML('afterbegin', html);
                
                // Initialize header functionality
                initializeHeader();
            })
            .catch(error => {
                console.error('Error loading header:', error);
                // Fallback: create basic header
                createFallbackHeader();
            });
    }
    
    // Initialize header functionality
    function initializeHeader() {
        // All functionality is already in the header-component.html script tag
        console.log('Universal header loaded successfully');
    }
    
    // Fallback header if component fails to load
    function createFallbackHeader() {
        const fallbackHeader = `
            <header style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: white; padding: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <img src="logo.png" alt="Bytecore" style="width: 40px; height: 40px; border-radius: 8px;">
                        <span style="font-size: 24px; font-weight: bold; color: #6366f1;">ByteCore</span>
                    </div>
                    <nav style="display: flex; gap: 24px;">
                        <a href="index.html" style="text-decoration: none; color: #475569; font-weight: 500;">Home</a>
                        <a href="Courses.html" style="text-decoration: none; color: #475569; font-weight: 500;">Courses</a>
                        <a href="quiz.html" style="text-decoration: none; color: #475569; font-weight: 500;">Quiz</a>
                        <a href="scholarship.html" style="text-decoration: none; color: #f59e0b; font-weight: 600;">🏆 Scholarship</a>
                        <a href="Fee.html" style="text-decoration: none; color: #475569; font-weight: 500;">Fees</a>
                        <a href="About.html" style="text-decoration: none; color: #475569; font-weight: 500;">About</a>
                        <a href="contact.html" style="text-decoration: none; color: #475569; font-weight: 500;">Contact</a>
                    </nav>
                </div>
            </header>
            <style>
                body { margin-top: 80px !important; }
                @media (max-width: 768px) {
                    body { margin-top: 70px !important; }
                    header nav { display: none; }
                }
            </style>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', fallbackHeader);
    }
    
    // Remove existing headers to avoid conflicts
    function removeExistingHeaders() {
        const existingHeaders = document.querySelectorAll('header:not(.universal-header)');
        existingHeaders.forEach(header => {
            // Only remove if it looks like a navigation header
            if (header.querySelector('nav') || header.querySelector('.logo') || header.querySelector('a[href*=".html"]')) {
                header.remove();
            }
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            removeExistingHeaders();
            loadUniversalHeader();
        });
    } else {
        removeExistingHeaders();
        loadUniversalHeader();
    }
    
    // Prevent multiple tab opening
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href$=".html"]');
        if (link && !link.hasAttribute('target')) {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        }
    });
    
})();

// Global smart navigation function
window.smartNavigate = function(url) {
    if (url.startsWith('#')) {
        const element = document.querySelector(url);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        window.location.href = url;
    }
};