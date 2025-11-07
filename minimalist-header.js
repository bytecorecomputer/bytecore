// Minimalist Universal Header System (Like Essential.io)
(function() {
    'use strict';
    
    // Minimalist Header HTML
    const headerHTML = `
        <header class="minimal-header">
            <div class="header-wrap">
                <div class="logo" onclick="smartNavigate('index.html')">
                    <img src="logo.png" alt="Bytecore">
                    <span>ByteCore</span>
                </div>
                
                <!-- Desktop Navigation -->
                <nav class="desktop-nav">
                    <a href="#" onclick="smartNavigate('Courses.html')" data-page="courses">Courses</a>
                    <a href="#" onclick="smartNavigate('quiz.html')" data-page="quiz">Quiz</a>
                    <a href="#" onclick="smartNavigate('scholarship.html')" class="highlight" data-page="scholarship">Scholarship</a>
                    <a href="#" onclick="smartNavigate('About.html')" data-page="about">About</a>
                    <a href="#" onclick="smartNavigate('contact.html')" data-page="contact">Contact</a>
                </nav>
                
                <!-- Right Side Actions -->
                <div class="header-actions">
                    <a href="#" onclick="smartNavigate('scholarship.html')" class="register-btn">Register Now</a>
                    <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle Theme">
                        <svg id="theme-icon-svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>
                    <button class="menu-btn" id="menu-btn" aria-label="Menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            <div class="nav-overlay" id="nav-overlay">
                <button class="close-btn" id="close-btn">✕</button>
                
                <nav class="nav-menu">
                    <a href="#" onclick="smartNavigate('index.html')" data-page="home">
                        <span class="num">01</span>
                        <span>Home</span>
                    </a>
                    <a href="#" onclick="smartNavigate('Courses.html')" data-page="courses">
                        <span class="num">02</span>
                        <span>Courses</span>
                    </a>
                    <a href="#" onclick="smartNavigate('quiz.html')" data-page="quiz">
                        <span class="num">03</span>
                        <span>Quiz</span>
                    </a>
                    <a href="#" onclick="smartNavigate('scholarship.html')" class="highlight" data-page="scholarship">
                        <span class="num">04</span>
                        <span>Scholarship</span>
                        <span class="badge">New</span>
                    </a>
                    <a href="#" onclick="smartNavigate('diploma.html')" data-page="diploma">
                        <span class="num">05</span>
                        <span>Certificates</span>
                    </a>
                    <a href="#" onclick="smartNavigate('Fee.html')" data-page="fees">
                        <span class="num">06</span>
                        <span>Fees</span>
                    </a>
                    <a href="#" onclick="smartNavigate('About.html')" data-page="about">
                        <span class="num">07</span>
                        <span>About</span>
                    </a>
                    <a href="#" onclick="smartNavigate('contact.html')" data-page="contact">
                        <span class="num">08</span>
                        <span>Contact</span>
                    </a>
                </nav>

            </div>
        </header>
        
        <style>
        /* Minimalist Header */
        .minimal-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .header-wrap {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 32px;
            height: 70px;
            display: grid;
            grid-template-columns: 200px 1fr 200px;
            align-items: center;
            gap: 32px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            transition: opacity 0.2s;
        }

        .logo:hover {
            opacity: 0.7;
        }

        .logo img {
            width: 40px;
            height: 40px;
            border-radius: 8px;
        }

        .logo span {
            font-size: 20px;
            font-weight: 700;
            color: #000;
            letter-spacing: -0.5px;
        }

        /* Desktop Navigation - CENTER */
        .desktop-nav {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 40px;
        }

        .desktop-nav a {
            font-size: 15px;
            font-weight: 500;
            color: #475569;
            text-decoration: none;
            transition: all 0.15s ease;
            position: relative;
            padding: 8px 0;
        }

        .desktop-nav a::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%) scaleX(0);
            width: 100%;
            height: 2px;
            background: #6366f1;
            transition: transform 0.2s ease;
        }

        .desktop-nav a:hover {
            color: #000;
        }

        .desktop-nav a:hover::before {
            transform: translateX(-50%) scaleX(1);
        }

        .desktop-nav a.highlight {
            color: #f59e0b;
            font-weight: 600;
        }

        .desktop-nav a.active {
            color: #6366f1;
            font-weight: 600;
        }

        .desktop-nav a.active::before {
            transform: translateX(-50%) scaleX(1);
        }

        /* Header Actions - RIGHT */
        .header-actions {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 12px;
        }

        .register-btn {
            padding: 10px 20px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.15s ease;
            white-space: nowrap;
        }

        .register-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }

        /* Theme Toggle Button */
        .theme-toggle-btn {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: none;
            background: transparent;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #475569;
            transition: all 0.15s ease;
        }

        .theme-toggle-btn:hover {
            background: #f1f5f9;
            color: #000;
        }

        .theme-toggle-btn svg {
            transition: transform 0.3s ease;
        }

        .theme-toggle-btn:hover svg {
            transform: rotate(20deg);
        }

        /* Hamburger Menu */
        .menu-btn {
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            cursor: pointer;
            display: none;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 6px;
            padding: 0;
            transition: opacity 0.2s;
        }

        .menu-btn:hover {
            opacity: 0.7;
        }

        .menu-btn span {
            width: 24px;
            height: 2px;
            background: #000;
            border-radius: 2px;
            transition: all 0.3s ease;
        }

        .menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(7px, 7px);
        }

        .menu-btn.active span:nth-child(2) {
            opacity: 0;
        }

        .menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }

        /* Navigation Overlay */
        .nav-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 999;
        }

        .nav-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .close-btn {
            position: absolute;
            top: 20px;
            right: 32px;
            width: 48px;
            height: 48px;
            background: rgba(0, 0, 0, 0.05);
            border: none;
            border-radius: 12px;
            font-size: 24px;
            cursor: pointer;
            color: #000;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .close-btn:hover {
            background: rgba(0, 0, 0, 0.1);
            transform: rotate(90deg);
        }

        /* Navigation Menu - Modern Mobile */
        .nav-menu {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
            height: 100vh;
            gap: 4px;
            padding: 80px 40px;
            max-width: 600px;
            margin: 0 auto;
        }

        .nav-menu a {
            display: flex;
            align-items: center;
            gap: 20px;
            font-size: 36px;
            font-weight: 700;
            color: #000;
            text-decoration: none;
            padding: 12px 20px;
            transition: all 0.2s ease;
            position: relative;
            letter-spacing: -0.5px;
            width: 100%;
            border-radius: 12px;
        }

        .nav-menu a:hover {
            color: #6366f1;
            background: rgba(99, 102, 241, 0.05);
            transform: translateX(8px);
        }

        .nav-menu a .num {
            font-size: 14px;
            font-weight: 600;
            color: #94a3b8;
            min-width: 32px;
        }

        .nav-menu a.highlight {
            color: #f59e0b;
        }

        .nav-menu a .badge {
            font-size: 11px;
            font-weight: 700;
            background: #ef4444;
            color: white;
            padding: 4px 10px;
            border-radius: 10px;
            margin-left: auto;
        }



        /* Dark Mode */
        .dark .minimal-header {
            background: rgba(15, 23, 42, 0.98);
            border-color: rgba(255, 255, 255, 0.1);
        }

        .dark .logo span {
            color: #fff;
        }

        .dark .menu-btn span {
            background: #fff;
        }

        .dark .nav-overlay {
            background: rgba(15, 23, 42, 0.98);
        }

        .dark .close-btn {
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
        }

        .dark .close-btn:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        .dark .nav-menu a {
            color: #fff;
        }

        .dark .nav-menu a:hover {
            color: #818cf8;
        }

        .dark .theme-btn {
            background: #1e293b;
            color: #fff;
        }

        .dark .theme-btn:hover {
            background: #334155;
        }

        /* Dark Mode */
        .dark .desktop-nav a {
            color: #94a3b8;
        }

        .dark .desktop-nav a:hover {
            color: #fff;
        }

        .dark .desktop-nav a.active {
            color: #818cf8;
        }

        .dark .desktop-nav a.active::before,
        .dark .desktop-nav a:hover::before {
            background: #818cf8;
        }

        .dark .theme-toggle-btn {
            color: #94a3b8;
        }

        .dark .theme-toggle-btn:hover {
            background: #1e293b;
            color: #fff;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
            .header-wrap {
                grid-template-columns: 1fr auto;
                gap: 16px;
            }

            .desktop-nav {
                display: none;
            }

            .register-btn {
                display: none;
            }

            .desktop-theme-toggle {
                display: none;
            }

            .menu-btn {
                display: flex;
            }
        }

        @media (max-width: 768px) {
            .header-wrap {
                padding: 0 20px;
                height: 60px;
            }

            .logo img {
                width: 32px;
                height: 32px;
            }

            .logo span {
                font-size: 18px;
            }

            .nav-menu {
                padding: 80px 24px;
                gap: 2px;
            }

            .nav-menu a {
                font-size: 28px;
                padding: 10px 16px;
                gap: 16px;
            }

            .nav-menu a .num {
                font-size: 12px;
                min-width: 28px;
            }

            .nav-menu a .badge {
                font-size: 10px;
                padding: 3px 8px;
            }

            .close-btn {
                top: 16px;
                right: 20px;
                width: 44px;
                height: 44px;
                font-size: 20px;
            }
        }

        @media (max-width: 480px) {
            .nav-menu a {
                font-size: 24px;
                padding: 8px 12px;
            }

            .nav-menu a .num {
                font-size: 11px;
                min-width: 24px;
            }
        }

        /* Body Margin */
        body {
            margin-top: 70px !important;
        }

        @media (max-width: 768px) {
            body {
                margin-top: 60px !important;
            }
        }
        </style>
    `;

    // Initialize Header
    function init() {
        // Remove old headers
        const oldHeaders = document.querySelectorAll('header:not(.minimal-header)');
        oldHeaders.forEach(h => {
            if (h.querySelector('nav') || h.querySelector('.logo')) {
                h.remove();
            }
        });

        // Insert header
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        
        // Setup functionality
        setupMenu();
        setupTheme();
        setActivePage();
    }

    // Menu Toggle
    function setupMenu() {
        const menuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('close-btn');
        const overlay = document.getElementById('nav-overlay');
        
        if (menuBtn && overlay) {
            menuBtn.addEventListener('click', () => {
                overlay.classList.add('active');
                menuBtn.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        if (closeBtn && overlay) {
            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close on link click
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                overlay.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Theme Toggle
    function setupTheme() {
        const themeToggle = document.getElementById('theme-toggle-btn');
        const themeIcon = document.getElementById('theme-icon-svg');
        
        // Moon icon (for light mode)
        const moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
        // Sun icon (for dark mode)
        const sunIcon = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeIcon) themeIcon.innerHTML = sunIcon;
        }
        
        // Toggle theme function
        function toggleTheme() {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            
            if (themeIcon) {
                themeIcon.innerHTML = isDark ? sunIcon : moonIcon;
            }
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
        
        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
    }

    // Set Active Page
    function setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Set active for both desktop nav and overlay menu
        const allLinks = document.querySelectorAll('.desktop-nav a, .nav-menu a');
        
        allLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            if (
                (page === 'home' && (currentPage === 'index.html' || currentPage === '')) ||
                (page === 'courses' && currentPage === 'Courses.html') ||
                (page === 'quiz' && currentPage === 'quiz.html') ||
                (page === 'scholarship' && currentPage === 'scholarship.html') ||
                (page === 'diploma' && currentPage === 'diploma.html') ||
                (page === 'fees' && currentPage === 'Fee.html') ||
                (page === 'about' && currentPage === 'About.html') ||
                (page === 'contact' && currentPage === 'contact.html')
            ) {
                link.classList.add('active');
                if (link.closest('.nav-menu')) {
                    link.style.color = '#6366f1';
                }
            }
        });
    }

    // Smart Navigation with Page Transition
    window.smartNavigate = function(url) {
        if (url.startsWith('#')) {
            const el = document.querySelector(url);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Add fade effect for smooth transition
            document.body.style.opacity = '0.7';
            document.body.style.transition = 'opacity 0.15s ease';
            
            // Navigate after brief fade
            setTimeout(() => {
                window.location.href = url;
            }, 150);
        }
    };

    // Prevent multiple tabs
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href$=".html"]');
        if (link && !link.hasAttribute('target')) {
            e.preventDefault();
            const href = link.getAttribute('href');
            if (href && href !== '#') window.location.href = href;
        }
    });

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();