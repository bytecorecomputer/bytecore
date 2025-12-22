/**
 * ByteCore Unified Site Components System
 * Handles Header, Footer, and Layout consistency site-wide.
 */
(function() {
    'use strict';

    // --- Configuration & Content ---
    
    const HEADER_HTML = `
        <header class="minimal-header">
            <div class="header-wrap">
                <div class="logo" onclick="window.location.href='index.html'">
                    <img src="logo.png" alt="Bytecore">
                    <span>ByteCore</span>
                </div>
                
                <nav class="desktop-nav">
                    <a href="index.html" data-page="home">Home</a>
                    <a href="Courses.html" data-page="courses">Courses</a>
                    <a href="quiz.html" data-page="quiz">Quiz</a>
                    <a href="scholarship.html" class="highlight" data-page="scholarship">Scholarship</a>
                    <a href="About.html" data-page="about">About</a>
                    <a href="contact.html" data-page="contact">Contact</a>
                </nav>
                
                <div class="header-actions">
                    <a href="scholarship.html" class="register-btn">Register Now</a>
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
                    <a href="index.html" data-page="home"><span class="num">01</span><span>Home</span></a>
                    <a href="Courses.html" data-page="courses"><span class="num">02</span><span>Courses</span></a>
                    <a href="quiz.html" data-page="quiz"><span class="num">03</span><span>Quiz</span></a>
                    <a href="scholarship.html" class="highlight" data-page="scholarship"><span class="num">04</span><span>Scholarship</span><span class="badge">New</span></a>
                    <a href="diploma.html" data-page="diploma"><span class="num">05</span><span>Certificates</span></a>
                    <a href="Fee.html" data-page="fees"><span class="num">06</span><span>Fees</span></a>
                    <a href="About.html" data-page="about"><span class="num">07</span><span>About</span></a>
                    <a href="contact.html" data-page="contact"><span class="num">08</span><span>Contact</span></a>
                </nav>
            </div>
        </header>
    `;

    const FOOTER_HTML = `
        <footer class="bg-slate-900 text-slate-300 py-16 mt-auto">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <!-- Brand Section -->
                    <div class="space-y-6">
                        <div class="flex items-center space-x-3">
                            <img src="logo.png" alt="Logo" class="w-12 h-12 rounded-xl bg-white p-1">
                            <span class="text-2xl font-bold text-white tracking-tight">ByteCore</span>
                        </div>
                        <p class="text-slate-400 leading-relaxed">
                            Empowering the next generation of tech leaders with industry-standard computer education since 2010.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"><i class="fab fa-twitter"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"><i class="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-white font-bold text-lg mb-6">Quick Links</h4>
                        <ul class="space-y-3">
                            <li><a href="About.html" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>About Us</a></li>
                            <li><a href="Courses.html" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>Courses</a></li>
                            <li><a href="scholarship.html" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>Scholarship</a></li>
                            <li><a href="diploma.html" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>Certificates</a></li>
                            <li><a href="contact.html" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>Contact</a></li>
                        </ul>
                    </div>

                    <!-- Popular Courses -->
                    <div>
                        <h4 class="text-white font-bold text-lg mb-6">Popular Courses</h4>
                        <ul class="space-y-3">
                            <li><a href="Courses.html#python" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>Python Programming</a></li>
                            <li><a href="Courses.html#fullstack" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>Full Stack Development</a></li>
                            <li><a href="Courses.html#olevel" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>O Level</a></li>
                            <li><a href="Courses.html#adca" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>ADCA</a></li>
                            <li><a href="quiz.html" class="hover:text-primary transition-colors flex items-center group"><i class="fas fa-chevron-right text-xs mr-2 group-hover:translate-x-1 transition-transform"></i>Practice Quiz</a></li>
                        </ul>
                    </div>

                    <!-- Contact Info -->
                    <div>
                        <h4 class="text-white font-bold text-lg mb-6">Contact Us</h4>
                        <ul class="space-y-4">
                            <li class="flex items-start">
                                <i class="fas fa-map-marker-alt text-primary mt-1 mr-3"></i>
                                <span class="text-sm">Bithri Road, Opposite Sheetala Mata Mandir, Nariyawal BLY, 243123</span>
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-phone text-primary mr-3"></i>
                                <a href="tel:+916396835709" class="hover:text-primary transition-colors">+91-6396835709</a>
                            </li>
                            <li class="flex items-center">
                                <i class="fas fa-envelope text-primary mr-3"></i>
                                <a href="mailto:bytecore.info@gmail.com" class="hover:text-primary transition-colors">bytecore.info@gmail.com</a>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-clock text-primary mt-1 mr-3"></i>
                                <span class="text-sm">Mon - Sat: 9:00 AM - 6:00 PM<br>Sunday: Closed</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Bottom Bar -->
                <div class="border-t border-slate-800 pt-8">
                    <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 px-2">
                        <p class="text-slate-400 text-sm text-center md:text-left">
                            &copy; 2010-2025 ByteCore Computer Centre. All rights reserved.
                        </p>
                        <div class="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
                            <a href="#" class="hover:text-primary transition-colors whitespace-nowrap">Privacy Policy</a>
                            <a href="#" class="hover:text-primary transition-colors whitespace-nowrap">Terms of Service</a>
                            <a href="Fee.html" class="hover:text-primary transition-colors whitespace-nowrap">Fee Structure</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    `;

    const COMPONENT_STYLES = `
        /* ByteCore Component Overrides & Sticky Layout */
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }

        body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* Minimalist Header */
        .minimal-header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
        }

        .dark .minimal-header {
            background: rgba(15, 23, 42, 0.9);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .header-wrap {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 24px;
            height: 72px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            z-index: 1001;
        }

        .logo img {
            width: 40px;
            height: 40px;
            border-radius: 10px;
        }

        .logo span {
            font-size: 20px;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.5px;
        }

        .dark .logo span { color: #f8fafc; }

        /* Desktop Nav */
        .desktop-nav {
            display: flex;
            align-items: center;
            gap: 32px;
        }

        .desktop-nav a {
            font-size: 15px;
            font-weight: 500;
            color: #64748b;
            text-decoration: none;
            transition: all 0.2s ease;
            position: relative;
            padding: 8px 0;
        }

        .desktop-nav a:hover, .desktop-nav a.active {
            color: #6366f1;
        }

        .desktop-nav a.highlight {
            color: #f59e0b;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .register-btn {
            padding: 10px 20px;
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            color: white !important;
            text-decoration: none;
            border-radius: 10px;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
        }

        .register-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(99, 102, 241, 0.3);
        }

        .theme-toggle-btn {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            border: none;
            background: rgba(0,0,0,0.03);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #64748b;
            transition: all 0.2s ease;
        }

        .dark .theme-toggle-btn { background: rgba(255,255,255,0.05); color: #94a3b8; }

        .theme-toggle-btn:hover {
            background: rgba(99, 102, 241, 0.1);
            color: #6366f1;
        }

        /* Mobile Menu Btn */
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
            gap: 5px;
            z-index: 1001;
        }

        .menu-btn span {
            width: 24px;
            height: 2px;
            background: #0f172a;
            border-radius: 2px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .dark .menu-btn span { background: #f8fafc; }

        .menu-btn.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .menu-btn.active span:nth-child(2) { opacity: 0; }
        .menu-btn.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* Overlay */
        .nav-overlay {
            position: fixed;
            inset: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .dark .nav-overlay { background: rgba(15, 23, 42, 0.98); }

        .nav-overlay.active { opacity: 1; visibility: visible; }

        .nav-menu {
            display: flex;
            flex-direction: column;
            gap: 16px;
            text-align: center;
        }

        .nav-menu a {
            font-size: 32px;
            font-weight: 700;
            color: #0f172a;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .dark .nav-menu a { color: #f8fafc; }

        .nav-menu a:hover, .nav-menu a.active { color: #6366f1; transform: scale(1.1); }

        .nav-menu a .num { font-size: 14px; opacity: 0.5; margin-right: 12px; }

        /* Helpers */
        body { padding-top: 72px; }

        @media (max-width: 1024px) {
            .desktop-nav, .register-btn { display: none; }
            .menu-btn { display: flex; }
        }

        .close-btn {
            position: absolute;
            top: 24px;
            right: 24px;
            font-size: 32px;
            background: none;
            border: none;
            cursor: pointer;
            color: #0f172a;
        }
        .dark .close-btn { color: #f8fafc; }
    `;

    // --- Core Logic ---

    function init() {
        injectStyles();
        injectHeader();
        injectFooter();
        setupFunctionality();
    }

    function injectStyles() {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = COMPONENT_STYLES;
        document.head.appendChild(styleSheet);
    }

    function injectHeader() {
        // Remove existing headers to prevent duplicates
        const existing = document.querySelectorAll('header');
        existing.forEach(el => el.remove());
        
        document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
    }

    function injectFooter() {
        // Remove existing footers
        const existing = document.querySelectorAll('footer');
        existing.forEach(el => el.remove());
        
        document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
    }

    function setupFunctionality() {
        const menuBtn = document.getElementById('menu-btn');
        const closeBtn = document.getElementById('close-btn');
        const overlay = document.getElementById('nav-overlay');
        const themeBtn = document.getElementById('theme-toggle-btn');
        const themeIcon = document.getElementById('theme-icon-svg');

        // Menu
        if (menuBtn && overlay) {
            menuBtn.addEventListener('click', () => {
                const isActive = overlay.classList.toggle('active');
                menuBtn.classList.toggle('active');
                document.body.style.overflow = isActive ? 'hidden' : '';
            });
        }

        if (closeBtn && overlay) {
            closeBtn.addEventListener('click', () => {
                overlay.classList.remove('active');
                menuBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Active link highlighting
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('nav a').forEach(link => {
            const page = link.getAttribute('href');
            if (page === currentPath) {
                link.classList.add('active');
            }
        });

        // Theme Toggle
        const sunIcon = `<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>`;
        const moonIcon = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;

        function updateThemeIcon(isDark) {
            if (themeIcon) themeIcon.innerHTML = isDark ? sunIcon : moonIcon;
        }

        // Initialize theme
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
            updateThemeIcon(true);
        }

        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                updateThemeIcon(isDark);
                
                // Dispatch event for other listeners if needed
                window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: isDark ? 'dark' : 'light' } }));
            });
        }
    }

    // Run on DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
