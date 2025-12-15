// Footer Loader - Automatically loads footer on all pages
(function() {
    'use strict';
    
    // Load footer when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadFooter);
    } else {
        loadFooter();
    }
    
    function loadFooter() {
        // Check if footer already exists
        if (document.querySelector('footer')) {
            return;
        }
        
        // Create footer placeholder
        const footerPlaceholder = document.createElement('div');
        footerPlaceholder.id = 'footer-placeholder';
        
        // Insert before closing body tag
        document.body.appendChild(footerPlaceholder);
        
        // Fetch and insert footer
        fetch('components/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Footer not found');
                }
                return response.text();
            })
            .then(html => {
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => {
                console.warn('Could not load footer:', error);
                // Fallback: Create minimal footer
                footerPlaceholder.innerHTML = createFallbackFooter();
            });
    }
    
    function createFallbackFooter() {
        return `
            <footer class="bg-slate-900 text-slate-300 py-8">
                <div class="container mx-auto px-4 text-center">
                    <p>&copy; 2010-2025 ByteCore Computer Centre. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
})();
