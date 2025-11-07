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
                
                <div class="nav-footer">
                    <button class="theme-btn" id="theme-btn">
                        <span id="theme-icon">🌙</span>
                        <span id="theme-text">Dark Mode</span>
                    </button>
                    <div class="contact-info">
                        <p>📞 +91-6396835709</p>
                        <p>📧 bytecore.info@gmail.com</p>
                    </div>
                </div>
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
            display: flex;
            align-items: center;
            justify-content: space-between;
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

        /* Desktop Navigation */
        .desktop-nav {
            display: flex;
            align-items: center;
            gap: 32px;
            margin-left: auto;
            margin-right: 32px;
        }

        .desktop-nav a {
            font-size: 15px;
            font-weight: 500;
            color: #475569;
            text-decoration: none;
            transition: color 0.2s;
            position: relative;
        }

        .desktop-nav a:hover {
            color: #000;
        }

        .desktop-nav a.highlight {
            color: #f59e0b;
            font-weight: 600;
        }

        .desktop-nav a.active {
            color: #6366f1;
        }

        .desktop-nav a.active::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            right: 0;
            height: 2px;
            background: #6366f1;
        }

        /* Header Actions */
        .header-actions {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .register-btn {
            padding: 10px 24px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s;
            white-space: nowrap;
        }

        .register-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
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
            width: 40px;
            height: 40px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #000;
            transition: opacity 0.2s;
        }

        .close-btn:hover {
            opacity: 0.7;
        }

        /* Navigation Menu */
        .nav-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            gap: 8px;
            padding: 80px 32px;
        }

        .nav-menu a {
            display: flex;
            align-items: center;
            gap: 24px;
            font-size: 48px;
            font-weight: 700;
            color: #000;
            text-decoration: none;
            padding: 16px 32px;
            transition: all 0.3s ease;
            position: relative;
            letter-spacing: -1px;
        }

        .nav-menu a:hover {
            color: #6366f1;
            transform: translateX(10px);
        }

        .nav-menu a .num {
            font-size: 16px;
            font-weight: 500;
            color: #94a3b8;
            min-width: 40px;
        }

        .nav-menu a.highlight {
            color: #f59e0b;
        }

        .nav-menu a .badge {
            font-size: 12px;
            font-weight: 600;
            background: #ef4444;
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            margin-left: 12px;
        }

        /* Navigation Footer */
        .nav-footer {
            position: absolute;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
        }

        .theme-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            background: #f1f5f9;
            border: none;
            border-radius: 24px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 24px;
            transition: all 0.2s;
        }

        .theme-btn:hover {
            background: #e2e8f0;
        }

        .contact-info {
            font-size: 14px;
            color: #64748b;
            line-height: 1.8;
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

        /* Dark Mode for Desktop Nav */
        .dark .desktop-nav a {
            color: #94a3b8;
        }

        .dark .desktop-nav a:hover {
            color: #fff;
        }

        .dark .desktop-nav a.active {
            color: #818cf8;
        }

        .dark .desktop-nav a.active::after {
            background: #818cf8;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
            .desktop-nav {
                display: none;
            }

            .register-btn {
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

            .nav-menu a {
                font-size: 32px;
                padding: 12px 20px;
            }

            .nav-menu a .num {
                font-size: 14px;
                min-width: 30px;
            }

            .nav-footer {
                bottom: 20px;
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
        const themeBtn = document.getElementById('theme-btn');
        const themeIcon = document.getElementById('theme-icon');
        const themeText = document.getElementById('theme-text');
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeText) themeText.textContent = 'Light Mode';
        }
        
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                const isDark = document.documentElement.classList.contains('dark');
                
                if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
                if (themeText) themeText.textContent = isDark ? 'Light Mode' : 'Dark Mode';
                
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
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

    // Smart Navigation
    window.smartNavigate = function(url) {
        if (url.startsWith('#')) {
            const el = document.querySelector(url);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.location.href = url;
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