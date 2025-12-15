// Page Wrapper Fix - Ensures footer stays at bottom without white space
(function() {
    'use strict';
    
    function fixFooterPosition() {
        // Ensure body has proper flex layout
        document.body.style.minHeight = '100vh';
        document.body.style.display = 'flex';
        document.body.style.flexDirection = 'column';
        
        // Find footer element
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.marginTop = 'auto';
            footer.style.flexShrink = '0';
        }
        
        // Wrap all content before footer in a flex container
        const allElements = Array.from(document.body.children);
        const footerIndex = allElements.indexOf(footer);
        
        if (footerIndex > 0) {
            // Add flex-grow to all elements before footer
            for (let i = 0; i < footerIndex; i++) {
                const element = allElements[i];
                if (element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
                    element.style.flexGrow = '1';
                }
            }
        }
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixFooterPosition);
    } else {
        fixFooterPosition();
    }
    
    // Also run after a short delay to catch dynamically loaded content
    setTimeout(fixFooterPosition, 100);
})();
