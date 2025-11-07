// Universal Header System - Complete Solution
(function() {
    'use strict';
    
    // Minimalist Header HTML Template (Like Essential.io)
    const headerHTML = `
        <!-- Minimalist Professional Header -->
        <header class="universal-header">
            <div class="header-container">
                <!-- Logo Only -->
                <div class="logo-section" onclick="smartNavigate('index.html')">
                    <img src="logo.png" alt="Bytecore" class="logo-img">
                    <span class="brand-name">ByteCore</span>
                </div>

                <!-- Hamburger Menu (Always Visible) -->
                <button class="hamburger-menu" id="hamburger-trigger" aria-label="Menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <!-- Full Screen Navigation Overlay -->
            <div class="nav-overlay" id="nav-overlay">
                <div class="nav-overlay-content">
                    <button class="nav-close" id="nav-close">✕</button>
                    
                    <nav class="main-navigation">
                        <a href="#" onclick="smartNavigate('index.html')" class="nav-link" data-page="home">
                            <span class="nav-number">01</span>
                            <span class="nav-text">Home</span>
                        </a>
                        
                        <a href="#" onclick="smartNavigate('Courses.html')" class="nav-link" data-page="courses">
                            <span class="nav-number">02</span>
                            <span class="nav-text">Courses</span>
                        </a>
                        
                        <a href="#" onclick="smartNavigate('quiz.html')" class="nav-link" data-page="quiz">
                            <span class="nav-number">03</span>
                            <span class="nav-text">Quiz</span>
                        </a>
                        
                        <a href="#" onclick="smartNavigate('scholarship.html')" class="nav-link special" data-page="scholarship">
                            <span class="nav-number">04</span>
                            <span class="nav-text">Scholarship</span>
                            <span class="nav-badge">New</span>
                        </a>
                        
                        <a href="#" onclick="smartNavigate('diploma.html')" class="nav-link" data-page="diploma">
                            <span class="nav-number">05</span>
                            <span class="nav-text">Certificates</span>
                        </a>
                        
                        <a href="#" onclick="smartNavigate('Fee.html')" class="nav-link" data-page="fees">
                            <span class="nav-number">06</span>
                            <span class="nav-text">Fees</span>
                        </a>
                        
                        <a href="#" onclick="smartNavigate('About.html')" class="nav-link" data-page="about">
                            <span class="nav-number">07</span>
                            <span class="nav-text">About</span>
                        </a>
                        
                        <a href="#" onclick="smartNavigate('contact.html')" class="nav-link" data-page="contact">
                            <span class="nav-number">08</span>
                            <span class="nav-text">Contact</span>
                        </a>
                    </nav>
                    
                    <div class="nav-footer">
                        <button class="theme-toggle-btn" id="theme-toggle-overlay">
                            <span class="theme-icon">🌙</span>
                            <span class="theme-text">Dark Mode</span>
                        </button>
                        
                        <div class="nav-contact-info">
                            <p>📞 +91-6396835709</p>
                            <p>📧 bytecore.info@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `;

    // Universal Header CSS Styles
    const headerCSS = `
        <style>
        /* Minimalist Header Styles */
        .universal-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .header-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 32px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 70px;
        }

        /* Minimalist Logo */
        .logo-section {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            transition: opacity 0.2s ease;
        }

        .logo-section:hover {
            opacity: 0.7;
        }

        .logo-img {
            width: 40px;
            height: 40px;
            border-radius: 8px;
        }

        .brand-name {
            font-size: 20px;
            font-weight: 700;
            color: #000;
            letter-spacing: -0.5px;
        }

        .dark .brand-name {
            color: #fff;
        }

        /* Navigation Hub */
        .nav-hub {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(248, 250, 252, 0.8);
            padding: 8px;
            border-radius: 16px;
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
            background: transparent;
            border: none;
            font-size: 14px;
            font-weight: 500;
            color: #475569;
        }

        .nav-item:hover {
            background: white;
            color: #6366f1;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.15);
        }

        .nav-item.active {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }

        .nav-icon {
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 20px;
        }

        .nav-label {
            font-weight: 600;
            white-space: nowrap;
        }

        .dropdown-arrow {
            font-size: 10px;
            margin-left: 4px;
            transition: transform 0.2s ease;
        }

        .dropdown-trigger:hover .dropdown-arrow {
            transform: rotate(180deg);
        }

        /* Special Highlight for Scholarship */
        .special-highlight {
            background: linear-gradient(135deg, #f59e0b, #f97316) !important;
            color: white !important;
            animation: pulse-glow 2s infinite;
        }

        .pulse-dot {
            position: absolute;
            top: 8px;
            right: 12px;
            width: 8px;
            height: 8px;
            background: #ef4444;
            border-radius: 50%;
            animation: bounce 1s infinite;
        }

        @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
            50% { box-shadow: 0 0 0 8px rgba(245, 158, 11, 0); }
        }

        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
            40%, 43% { transform: translate3d(0,-4px,0); }
            70% { transform: translate3d(0,-2px,0); }
        }

        /* Mega Dropdown */
        .mega-dropdown {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.05);
            opacity: 0;
            visibility: hidden;
            transform: translateX(-50%) translateY(-10px);
            transition: all 0.3s ease;
            min-width: 600px;
            margin-top: 12px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            padding: 24px;
        }

        .dropdown-trigger:hover .mega-dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateX(-50%) translateY(0);
        }

        .dropdown-section h4 {
            font-size: 14px;
            font-weight: 700;
            color: #1e293b;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e2e8f0;
        }

        .dropdown-section a {
            display: block;
            padding: 8px 12px;
            color: #64748b;
            text-decoration: none;
            font-size: 13px;
            border-radius: 8px;
            transition: all 0.2s ease;
            margin-bottom: 4px;
        }

        .dropdown-section a:hover {
            color: #6366f1;
            background: rgba(99, 102, 241, 0.05);
            transform: translateX(4px);
        }

        /* Action Zone */
        .action-zone {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .theme-switcher {
            position: relative;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            border: none;
            background: rgba(248, 250, 252, 0.8);
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
        }

        .theme-switcher:hover {
            background: white;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 20px;
            transition: all 0.3s ease;
        }

        .sun-icon {
            opacity: 1;
        }

        .moon-icon {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(180deg);
        }

        .dark .sun-icon {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(-180deg);
        }

        .dark .moon-icon {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(0deg);
        }

        .cta-button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 20px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        }

        .cta-arrow {
            transition: transform 0.2s ease;
        }

        .cta-button:hover .cta-arrow {
            transform: translateX(4px);
        }

        .mobile-menu-trigger {
            display: none;
            width: 48px;
            height: 48px;
            border-radius: 12px;
            border: none;
            background: rgba(248, 250, 252, 0.8);
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .hamburger {
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: center;
            justify-content: center;
        }

        .hamburger span {
            width: 20px;
            height: 2px;
            background: #475569;
            border-radius: 1px;
            transition: all 0.3s ease;
        }

        /* Mobile Navigation */
        .mobile-nav-panel {
            position: fixed;
            top: 0;
            right: 0;
            width: 320px;
            height: 100vh;
            background: white;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            z-index: 1001;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
        }

        .mobile-nav-panel.active {
            transform: translateX(0);
        }

        .mobile-nav-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 24px;
            border-bottom: 1px solid #e2e8f0;
        }

        .mobile-logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .mobile-logo img {
            width: 32px;
            height: 32px;
            border-radius: 8px;
        }

        .mobile-close {
            width: 32px;
            height: 32px;
            border-radius: 8px;
            border: none;
            background: #f1f5f9;
            cursor: pointer;
            font-size: 16px;
        }

        .mobile-nav-content {
            padding: 24px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .mobile-nav-item {
            display: flex;
            align-items: center;
            gap: 16px;
            padding: 16px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
        }

        .mobile-nav-item:hover {
            background: #f8fafc;
            transform: translateX(4px);
        }

        .mobile-nav-item.special {
            background: linear-gradient(135deg, #f59e0b, #f97316);
            color: white;
        }

        .mobile-nav-icon {
            font-size: 20px;
            width: 24px;
            text-align: center;
        }

        .mobile-pulse-dot {
            position: absolute;
            top: 12px;
            right: 16px;
            width: 8px;
            height: 8px;
            background: #ef4444;
            border-radius: 50%;
            animation: bounce 1s infinite;
        }

        .mobile-nav-footer {
            padding: 24px;
            border-top: 1px solid #e2e8f0;
            margin-top: auto;
        }

        .mobile-cta {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
        }

        /* Dark Mode */
        .dark .universal-header {
            background: rgba(15, 23, 42, 0.95);
            border-color: rgba(255, 255, 255, 0.1);
        }

        .dark .nav-hub {
            background: rgba(30, 41, 59, 0.8);
            border-color: rgba(255, 255, 255, 0.1);
        }

        .dark .nav-item {
            color: #94a3b8;
        }

        .dark .nav-item:hover {
            background: rgba(51, 65, 85, 0.8);
            color: #c7d2fe;
        }

        .dark .brand-tagline {
            color: #94a3b8;
        }

        .dark .theme-switcher,
        .dark .mobile-menu-trigger {
            background: rgba(30, 41, 59, 0.8);
        }

        .dark .mega-dropdown {
            background: #1e293b;
            border-color: rgba(255, 255, 255, 0.1);
        }

        .dark .dropdown-section h4 {
            color: #f1f5f9;
            border-color: #334155;
        }

        .dark .dropdown-section a {
            color: #94a3b8;
        }

        .dark .dropdown-section a:hover {
            color: #c7d2fe;
            background: rgba(99, 102, 241, 0.1);
        }

        .dark .mobile-nav-panel {
            background: #0f172a;
        }

        .dark .mobile-nav-header {
            border-color: #334155;
        }

        .dark .mobile-close {
            background: #334155;
            color: #94a3b8;
        }

        .dark .mobile-nav-item:hover {
            background: #1e293b;
        }

        .dark .mobile-nav-footer {
            border-color: #334155;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
            .nav-hub {
                display: none;
            }
            
            .mobile-menu-trigger {
                display: flex;
            }
        }

        @media (max-width: 768px) {
            .header-container {
                padding: 0 16px;
                height: 70px;
            }
            
            .logo-img {
                width: 40px;
                height: 40px;
            }
            
            .brand-name {
                font-size: 20px;
            }
            
            .brand-tagline {
                font-size: 10px;
            }
            
            .cta-button {
                display: none;
            }
            
            .mobile-nav-panel {
                width: 100%;
            }
        }

        /* Add top margin to body to account for fixed header */
        body {
            margin-top: 80px !important;
        }

        @media (max-width: 768px) {
            body {
                margin-top: 70px !important;
            }
        }
        </style>
    `;

    // Initialize Universal Header
    function initUniversalHeader() {
        // Remove existing headers to avoid conflicts
        const existingHeaders = document.querySelectorAll('header:not(.universal-header)');
        existingHeaders.forEach(header => {
            if (header.querySelector('nav') || header.querySelector('.logo') || header.querySelector('a[href*=".html"]')) {
                header.remove();
            }
        });

        // Add CSS styles to head
        document.head.insertAdjacentHTML('beforeend', headerCSS);
        
        // Insert header at beginning of body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // Set active navigation based on current page
        setActiveNavigation();
        
        // Initialize header functionality
        initializeHeaderFunctionality();
    }

    // Set active navigation item based on current page
    function setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const section = item.getAttribute('data-section');
            
            if (
                (section === 'home' && (currentPage === 'index.html' || currentPage === '')) ||
                (section === 'learn' && currentPage === 'Courses.html') ||
                (section === 'quiz' && currentPage === 'quiz.html') ||
                (section === 'scholarship' && currentPage === 'scholarship.html') ||
                (section === 'fees' && currentPage === 'Fee.html') ||
                (section === 'about' && currentPage === 'About.html') ||
                (section === 'contact' && currentPage === 'contact.html')
            ) {
                item.classList.add('active');
            }
        });
    }

    // Initialize header functionality
    function initializeHeaderFunctionality() {
        // Theme Toggle
        const themeToggle = document.getElementById('universal-theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                document.documentElement.classList.toggle('dark');
                const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                localStorage.setItem('theme', theme);
            });
        }
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
        
        // Mobile Menu Toggle
        const mobileTrigger = document.getElementById('mobile-trigger');
        const mobilePanel = document.getElementById('mobile-panel');
        const mobileClose = document.getElementById('mobile-close');
        
        if (mobileTrigger && mobilePanel) {
            mobileTrigger.addEventListener('click', function() {
                mobilePanel.classList.add('active');
            });
        }
        
        if (mobileClose && mobilePanel) {
            mobileClose.addEventListener('click', function() {
                mobilePanel.classList.remove('active');
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobilePanel && mobilePanel.classList.contains('active')) {
                if (!mobilePanel.contains(e.target) && !mobileTrigger.contains(e.target)) {
                    mobilePanel.classList.remove('active');
                }
            }
        });
    }

    // Smart Navigation Function
    window.smartNavigate = function(url) {
        const mobilePanel = document.getElementById('mobile-panel');
        if (mobilePanel) {
            mobilePanel.classList.remove('active');
        }
        
        if (url.startsWith('#')) {
            const element = document.querySelector(url);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = url;
        }
    };

    // Prevent multiple tabs - intercept all external links
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

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUniversalHeader);
    } else {
        initUniversalHeader();
    }

})();