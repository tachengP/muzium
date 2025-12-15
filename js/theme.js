/**
 * Theme Toggle Script
 * Handles day/night mode switching with localStorage persistence
 */

(function() {
    'use strict';
    
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
    
    // Initialize theme toggle after DOM is ready
    function initThemeToggle() {
        const toggleBtn = document.getElementById('theme-toggle');
        if (!toggleBtn) return;
        
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            // Save preference
            if (document.body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
            } else {
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
    
    // Also reinitialize on PJAX navigation
    document.addEventListener('pjax:reinit', initThemeToggle);
    document.addEventListener('pjax:success', function() {
        // Reapply theme after PJAX navigation
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }
        initThemeToggle();
    });
})();
