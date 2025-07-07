 document.addEventListener('DOMContentLoaded', function() {
      // Mobile Menu Toggle
      const menuToggle = document.getElementById('menu-toggle');
      const sidebar = document.getElementById('sidebar');
      const overlay = document.getElementById('overlay');
      
      menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
      });
      
      overlay.addEventListener('click', function() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
      
      // Close sidebar when clicking a link
      const sidebarLinks = document.querySelectorAll('.sidebar a');
      sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
          sidebar.classList.remove('active');
          overlay.classList.remove('active');
          document.body.classList.remove('no-scroll');
        });
      });
      
      // Scroll header effect
      const header = document.querySelector('.header');
      window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
      
      // Active nav link based on scroll position
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('nav a, .sidebar a');
      
      window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
          }
        });
      });
      
      // Initialize Swiper for student gallery
      const swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        }
      });
      
      // Typewriter effect
      const typewriter = document.getElementById('typewriter');
      const texts = [
        "Tech Mastery Starts Here",
        "Build Your Dream Career",
        "Join Our Tech Community",
        "Start Your Coding Journey"
      ];
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 100;
      
      function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
          typewriter.textContent = currentText.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 50;
        } else {
          typewriter.textContent = currentText.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
          isDeleting = true;
          typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
          typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
      }
      
      // Start typing effect
      setTimeout(type, 1000);
      
      // Initialize particles.js
      if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
          "particles": {
            "number": {
              "value": 80,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              }
            },
            "opacity": {
              "value": 0.5,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": true,
              "distance": 150,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": 2,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "canvas",
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        });
      }
      
      // Card reveal animation on scroll
      const revealElements = document.querySelectorAll('.course-card, .about-container, .info-box, .contact-box');
      
      function checkReveal() {
        revealElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementTop < windowHeight - 100) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
          }
        });
      }
      
      // Set initial state
      revealElements.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      });
      
      window.addEventListener('scroll', checkReveal);
      window.addEventListener('load', checkReveal);
    });