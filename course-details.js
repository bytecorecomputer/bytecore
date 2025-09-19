// Course Details Functionality for Bytecore Website

class CourseDetailsManager {
    constructor() {
        this.courses = {
            'adca': {
                id: 'adca',
                name: 'ADCA (Advanced Diploma in Computer Applications)',
                price: 7999,
                duration: '6 Months',
                image: 'images/courseimg/adca.jpg',
                description: 'Advanced Diploma in Computer Applications is a comprehensive course covering fundamental computer skills, office applications, and basic programming concepts.',
                highlights: [
                    'Complete MS Office Suite (Word, Excel, PowerPoint)',
                    'Internet & Email Management',
                    'Basic Programming Concepts',
                    'Database Management (MS Access)',
                    'Computer Hardware & Networking Basics',
                    'Digital Marketing Fundamentals'
                ],
                syllabus: [
                    { module: 'Computer Fundamentals', topics: ['Hardware & Software', 'Operating Systems', 'File Management'] },
                    { module: 'MS Office Suite', topics: ['MS Word', 'MS Excel', 'MS PowerPoint', 'MS Access'] },
                    { module: 'Internet & Email', topics: ['Web Browsing', 'Email Management', 'Online Safety'] },
                    { module: 'Programming Basics', topics: ['Introduction to Programming', 'Basic Algorithms', 'Problem Solving'] }
                ],
                eligibility: '10+2 or equivalent',
                certification: 'Bytecore Certified + Government Recognized',
                placement: '85% placement rate in data entry, office administration roles',
                nextBatch: '25th January 2025',
                timing: 'Morning: 9:00 AM - 11:00 AM | Evening: 5:00 PM - 7:00 PM'
            },
            'mdca': {
                id: 'mdca',
                name: 'MDCA (Master Diploma in Computer Applications)',
                price: 10999,
                duration: '7 Months',
                image: 'images/courseimg/mdca.jpg',
                description: 'Master Diploma in Computer Applications is an advanced course covering programming, web development, and database management for career advancement.',
                highlights: [
                    'Advanced Programming (C, C++, Java)',
                    'Web Development (HTML, CSS, JavaScript)',
                    'Database Management (MySQL, Oracle)',
                    'Software Engineering Principles',
                    'Project Management',
                    'Industry Internship'
                ],
                syllabus: [
                    { module: 'Programming Languages', topics: ['C Programming', 'C++ Programming', 'Java Basics'] },
                    { module: 'Web Technologies', topics: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap'] },
                    { module: 'Database Management', topics: ['MySQL', 'Oracle', 'Database Design', 'SQL Queries'] },
                    { module: 'Software Engineering', topics: ['SDLC', 'Testing', 'Documentation', 'Project Management'] }
                ],
                eligibility: 'Graduate or ADCA completed',
                certification: 'Bytecore Master Certificate + Industry Recognition',
                placement: '92% placement rate in software companies',
                nextBatch: '1st February 2025',
                timing: 'Morning: 10:00 AM - 12:00 PM | Evening: 6:00 PM - 8:00 PM'
            },
            'fullstack': {
                id: 'fullstack',
                name: 'Full Stack Web Development',
                price: 25999,
                duration: '10 Months',
                image: 'images/courseimg/web dev.jpg',
                description: 'Complete Full Stack Web Development course covering modern frontend and backend technologies with hands-on projects and industry mentorship.',
                highlights: [
                    'Frontend: React.js, Vue.js, Angular',
                    'Backend: Node.js, Express.js, Python Django',
                    'Database: MongoDB, PostgreSQL, MySQL',
                    'DevOps: Git, Docker, AWS Deployment',
                    '15+ Real Projects',
                    '100% Placement Guarantee'
                ],
                syllabus: [
                    { module: 'Frontend Development', topics: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Vue.js'] },
                    { module: 'Backend Development', topics: ['Node.js', 'Express.js', 'Python', 'Django', 'REST APIs'] },
                    { module: 'Database Management', topics: ['MongoDB', 'PostgreSQL', 'MySQL', 'Database Design'] },
                    { module: 'DevOps & Deployment', topics: ['Git/GitHub', 'Docker', 'AWS', 'CI/CD', 'Linux'] }
                ],
                eligibility: 'Graduate or equivalent (Technical background preferred)',
                certification: 'Industry Recognized Full Stack Developer Certificate',
                placement: '100% placement guarantee with 500+ hiring partners',
                nextBatch: '15th February 2025',
                timing: 'Full Time: 10:00 AM - 5:00 PM | Part Time: 6:00 PM - 9:00 PM'
            },
            'olevel': {
                id: 'olevel',
                name: 'O Level (NIELIT Certified)',
                price: 20999,
                duration: '1 Year',
                image: 'images/courseimg/o level.jpg',
                description: 'NIELIT O Level is equivalent to Foundation Level Course in Computer Science & IT. Government recognized certification for IT professionals.',
                highlights: [
                    'Government Recognized Certification',
                    'IT Tools & Business Systems',
                    'Programming & Problem Solving',
                    'Web Designing & Publishing',
                    'Database Management Systems',
                    'Eligible for Government Jobs'
                ],
                syllabus: [
                    { module: 'IT Tools & Business Systems', topics: ['Computer Basics', 'MS Office', 'Internet Applications'] },
                    { module: 'Programming & Problem Solving', topics: ['C Programming', 'Algorithms', 'Data Structures'] },
                    { module: 'Web Designing', topics: ['HTML', 'CSS', 'JavaScript', 'Web Publishing'] },
                    { module: 'Database Management', topics: ['DBMS Concepts', 'SQL', 'Database Design'] }
                ],
                eligibility: '10+2 with Mathematics or equivalent',
                certification: 'NIELIT O Level Certificate (Government Recognized)',
                placement: '90% placement in government & private sectors',
                nextBatch: '1st March 2025',
                timing: 'Morning: 9:00 AM - 12:00 PM | Evening: 2:00 PM - 5:00 PM'
            },
            'graphic-design': {
                id: 'graphic-design',
                name: 'Graphic Design Professional',
                price: 10000,
                duration: '6 Months',
                image: 'images/courseimg/gd.jpg',
                description: 'Professional Graphic Design course covering industry-standard tools and creative techniques for visual communication and branding.',
                highlights: [
                    'Adobe Creative Suite (Photoshop, Illustrator, InDesign)',
                    'Logo Design & Branding',
                    'Print & Digital Media Design',
                    'UI/UX Design Basics',
                    'Portfolio Development',
                    'Freelancing Guidance'
                ],
                syllabus: [
                    { module: 'Design Fundamentals', topics: ['Color Theory', 'Typography', 'Layout Principles', 'Composition'] },
                    { module: 'Adobe Photoshop', topics: ['Photo Editing', 'Digital Art', 'Web Graphics', 'Print Design'] },
                    { module: 'Adobe Illustrator', topics: ['Vector Graphics', 'Logo Design', 'Illustrations', 'Icons'] },
                    { module: 'Adobe InDesign', topics: ['Layout Design', 'Brochures', 'Magazines', 'Books'] }
                ],
                eligibility: '10+2 or equivalent (Creative aptitude preferred)',
                certification: 'Professional Graphic Designer Certificate',
                placement: '80% placement in design agencies, marketing companies',
                nextBatch: '10th February 2025',
                timing: 'Morning: 10:00 AM - 1:00 PM | Evening: 3:00 PM - 6:00 PM'
            }
        };
        
        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.id = 'course-details-modal';
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden';
        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div class="sticky top-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-6 flex justify-between items-center">
                    <h2 id="modal-title" class="text-2xl font-bold"></h2>
                    <button id="close-modal" class="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <div id="modal-content" class="p-6">
                    <!-- Content will be dynamically loaded -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    bindEvents() {
        // Bind click events to all View Details buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('course-details-btn') || 
                e.target.textContent.trim() === 'View Details' || 
                e.target.closest('button')?.textContent.trim() === 'View Details') {
                e.preventDefault();
                const courseCard = e.target.closest('.course-card');
                if (courseCard) {
                    // First try to get course ID from data attribute
                    let courseId = courseCard.dataset.course;
                    
                    // If not found, try to get from course name
                    if (!courseId) {
                        const courseName = courseCard.querySelector('h3').textContent.trim().toLowerCase();
                        courseId = this.getCourseId(courseName);
                    }
                    
                    this.showCourseDetails(courseId);
                }
            }
        });

        // Close modal events
        document.getElementById('close-modal').addEventListener('click', () => {
            this.hideModal();
        });

        document.getElementById('course-details-modal').addEventListener('click', (e) => {
            if (e.target.id === 'course-details-modal') {
                this.hideModal();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideModal();
            }
        });
    }

    getCourseId(courseName) {
        const nameMap = {
            'adca': 'adca',
            'mdca': 'mdca',
            'full stack web dev': 'fullstack',
            'o level': 'olevel',
            'graphic designing': 'graphic-design'
        };
        return nameMap[courseName] || 'adca';
    }

    showCourseDetails(courseId) {
        const course = this.courses[courseId];
        if (!course) return;

        const modal = document.getElementById('course-details-modal');
        const title = document.getElementById('modal-title');
        const content = document.getElementById('modal-content');

        title.textContent = course.name;
        content.innerHTML = this.generateCourseContent(course);

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Track course interest
        if (typeof gtag !== 'undefined') {
            gtag('event', 'course_details_view', {
                course_name: course.name,
                course_id: courseId
            });
        }
    }

    hideModal() {
        const modal = document.getElementById('course-details-modal');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    generateCourseContent(course) {
        return `
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Course Image & Basic Info -->
                <div class="lg:col-span-1">
                    <img src="${course.image}" alt="${course.name}" class="w-full h-48 object-cover rounded-lg mb-4">
                    <div class="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 space-y-3">
                        <div class="flex justify-between">
                            <span class="font-semibold">Price:</span>
                            <span class="text-primary font-bold text-xl">₹${course.price.toLocaleString()}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-semibold">Duration:</span>
                            <span class="text-green-600 font-bold">${course.duration}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="font-semibold">Next Batch:</span>
                            <span class="text-blue-600 font-bold">${course.nextBatch}</span>
                        </div>
                        <div class="pt-3 border-t border-slate-200 dark:border-slate-600">
                            <p class="font-semibold mb-2">Timing Options:</p>
                            <p class="text-sm text-slate-600 dark:text-slate-300">${course.timing}</p>
                        </div>
                    </div>
                    
                    <!-- Action Buttons -->
                    <div class="mt-4 space-y-2">
                        <button onclick="this.enrollNow('${course.id}')" class="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors">
                            Enroll Now
                        </button>
                        <button onclick="this.downloadBrochure('${course.id}')" class="w-full py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                            Download Brochure
                        </button>
                        <button onclick="this.bookDemo('${course.id}')" class="w-full py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                            Book Free Demo
                        </button>
                    </div>
                </div>

                <!-- Course Details -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Description -->
                    <div>
                        <h3 class="text-xl font-bold mb-3">Course Description</h3>
                        <p class="text-slate-600 dark:text-slate-300 leading-relaxed">${course.description}</p>
                    </div>

                    <!-- Highlights -->
                    <div>
                        <h3 class="text-xl font-bold mb-3">Course Highlights</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                            ${course.highlights.map(highlight => `
                                <div class="flex items-start">
                                    <i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                                    <span class="text-slate-600 dark:text-slate-300">${highlight}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Syllabus -->
                    <div>
                        <h3 class="text-xl font-bold mb-3">Course Syllabus</h3>
                        <div class="space-y-4">
                            ${course.syllabus.map((module, index) => `
                                <div class="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                                    <h4 class="font-semibold text-lg mb-2">Module ${index + 1}: ${module.module}</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        ${module.topics.map(topic => `
                                            <div class="flex items-center">
                                                <i class="fas fa-play text-primary text-xs mr-2"></i>
                                                <span class="text-sm text-slate-600 dark:text-slate-300">${topic}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Additional Info -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-2">Eligibility</h4>
                            <p class="text-slate-600 dark:text-slate-300">${course.eligibility}</p>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-2">Certification</h4>
                            <p class="text-slate-600 dark:text-slate-300">${course.certification}</p>
                        </div>
                        <div class="md:col-span-2">
                            <h4 class="font-semibold mb-2">Placement Assistance</h4>
                            <p class="text-slate-600 dark:text-slate-300">${course.placement}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Action methods
    enrollNow(courseId) {
        // Track enrollment interest
        if (typeof gtag !== 'undefined') {
            gtag('event', 'enroll_now_click', {
                course_id: courseId,
                course_name: this.courses[courseId].name
            });
        }
        
        // Show enrollment form instead of redirect
        this.showEnrollmentForm(courseId);
    }

    downloadBrochure(courseId) {
        // Track brochure download
        if (typeof gtag !== 'undefined') {
            gtag('event', 'brochure_download', {
                course_id: courseId,
                course_name: this.courses[courseId].name
            });
        }
        
        // Generate and download brochure (placeholder)
        alert(`Brochure for ${this.courses[courseId].name} will be downloaded shortly!`);
    }

    bookDemo(courseId) {
        // Track demo booking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'demo_booking', {
                course_id: courseId,
                course_name: this.courses[courseId].name
            });
        }
        
        // Show demo booking form or redirect
        this.showDemoBookingForm(courseId);
    }

    showEnrollmentForm(courseId) {
        const course = this.courses[courseId];
        const formHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
                <div class="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full mx-4 p-6">
                    <h3 class="text-xl font-bold mb-4">Enroll Now - ${course.name}</h3>
                    <form id="enrollment-form" class="space-y-4">
                        <input type="hidden" name="course_id" value="${courseId}">
                        <div>
                            <label class="block text-sm font-medium mb-1">Full Name</label>
                            <input type="text" name="name" required class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Phone Number</label>
                            <input type="tel" name="phone" required class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Email</label>
                            <input type="email" name="email" required class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Education Background</label>
                            <select name="education" required class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                                <option value="">Select Education</option>
                                <option value="10th">10th Pass</option>
                                <option value="12th">12th Pass</option>
                                <option value="graduate">Graduate</option>
                                <option value="postgraduate">Post Graduate</option>
                            </select>
                        </div>
                        <div class="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                            <div class="flex justify-between">
                                <span>Course Fee:</span>
                                <span class="font-bold text-primary">₹${course.price.toLocaleString()}</span>
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <button type="submit" class="flex-1 py-2 bg-primary text-white rounded-lg font-semibold">Enroll Now</button>
                            <button type="button" onclick="this.closest('.fixed').remove()" class="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', formHtml);
        
        // Handle enrollment form submission
        document.getElementById('enrollment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            // Store enrollment data locally
            const enrollments = JSON.parse(localStorage.getItem('bytecore_enrollments') || '[]');
            const enrollmentData = {
                course_id: formData.get('course_id'),
                course_name: course.name,
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                education: formData.get('education'),
                fee: course.price,
                timestamp: new Date().toISOString(),
                status: 'pending'
            };
            
            enrollments.push(enrollmentData);
            localStorage.setItem('bytecore_enrollments', JSON.stringify(enrollments));
            
            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'enrollment_submitted', enrollmentData);
            }
            
            alert('Enrollment successful! We will contact you within 24 hours with payment details.');
            e.target.closest('.fixed').remove();
        });
    }

    showDemoBookingForm(courseId) {
        const course = this.courses[courseId];
        const formHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
                <div class="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full mx-4 p-6">
                    <h3 class="text-xl font-bold mb-4">Book Free Demo - ${course.name}</h3>
                    <form id="demo-booking-form" class="space-y-4">
                        <input type="hidden" name="course_id" value="${courseId}">
                        <div>
                            <label class="block text-sm font-medium mb-1">Full Name</label>
                            <input type="text" name="name" required class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Phone Number</label>
                            <input type="tel" name="phone" required class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Email</label>
                            <input type="email" name="email" required class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Preferred Time</label>
                            <select name="time" required class="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg">
                                <option value="">Select Time</option>
                                <option value="morning">Morning (10:00 AM - 12:00 PM)</option>
                                <option value="afternoon">Afternoon (2:00 PM - 4:00 PM)</option>
                                <option value="evening">Evening (6:00 PM - 8:00 PM)</option>
                            </select>
                        </div>
                        <div class="flex space-x-3">
                            <button type="submit" class="flex-1 py-2 bg-primary text-white rounded-lg font-semibold">Book Demo</button>
                            <button type="button" onclick="this.closest('.fixed').remove()" class="px-4 py-2 border border-slate-300 rounded-lg">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', formHtml);
        
        // Handle form submission
        document.getElementById('demo-booking-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            // Store form data locally
            const demoBookings = JSON.parse(localStorage.getItem('bytecore_demo_bookings') || '[]');
            const bookingData = {
                course_id: formData.get('course_id'),
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                time: formData.get('time'),
                timestamp: new Date().toISOString()
            };
            
            demoBookings.push(bookingData);
            localStorage.setItem('bytecore_demo_bookings', JSON.stringify(demoBookings));
            
            // Track in analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'demo_booking_submitted', bookingData);
            }
            
            alert('Demo booked successfully! We will contact you soon.');
            e.target.closest('.fixed').remove();
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CourseDetailsManager();
});