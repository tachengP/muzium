/**
 * PJAX Implementation for Virtual Singer Showcase
 * Enables seamless page navigation without full page reloads
 * Keeps music player and header persistent across page transitions
 */

class PJAX {
    constructor(options = {}) {
        this.containerSelector = options.container || '#pjax-container';
        this.linkSelector = options.links || 'a[data-pjax], a:not([target="_blank"]):not([href^="http"]):not([href^="mailto"]):not([href^="#"]):not([download])';
        this.timeout = options.timeout || 10000;
        this.cache = new Map();
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        // Bind navigation handlers
        this.bindLinks();
        this.bindPopState();
        
        // Store initial state
        if (window.history.state === null) {
            window.history.replaceState(
                { url: window.location.href, title: document.title },
                document.title,
                window.location.href
            );
        }
        
        console.log('[PJAX] Initialized');
    }
    
    bindLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest(this.linkSelector);
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Skip if modifier keys are pressed
            if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
            
            // Skip if href is empty, same page anchor, or potentially dangerous schemes
            if (!href || href === '#') return;
            
            // Block dangerous URL schemes (security check)
            const dangerousSchemes = ['javascript:', 'data:', 'vbscript:', 'file:'];
            const lowerHref = href.toLowerCase().trim();
            if (dangerousSchemes.some(scheme => lowerHref.startsWith(scheme))) return;
            
            // Use current page URL as base for relative path resolution
            // This ensures that relative paths work correctly on GitHub Pages (e.g., /muzium/)
            const targetUrl = new URL(href, window.location.href);
            if (targetUrl.href === window.location.href) return;
            
            // Skip external links
            if (targetUrl.origin !== window.location.origin) return;
            
            e.preventDefault();
            this.navigate(targetUrl.href);
        });
    }
    
    bindPopState() {
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.url) {
                this.navigate(e.state.url, false);
            }
        });
    }
    
    async navigate(url, pushState = true) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        // Dispatch before event
        document.dispatchEvent(new CustomEvent('pjax:start', { detail: { url } }));
        
        try {
            // Check cache first
            let html = this.cache.get(url);
            
            if (!html) {
                // Fetch new page
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);
                
                const response = await fetch(url, {
                    signal: controller.signal,
                    headers: {
                        'X-PJAX': 'true',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                html = await response.text();
                
                // Cache the response
                this.cache.set(url, html);
            }
            
            // Parse the new HTML
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            
            // Get the new container content
            const newContainer = newDoc.querySelector(this.containerSelector);
            const currentContainer = document.querySelector(this.containerSelector);
            
            if (newContainer && currentContainer) {
                // Update the main content
                currentContainer.innerHTML = newContainer.innerHTML;
                
                // Update page title
                const newTitle = newDoc.querySelector('title');
                if (newTitle) {
                    document.title = newTitle.textContent;
                }
                
                // Update active nav states
                this.updateActiveNav(url);
                
                // Push state if needed
                if (pushState) {
                    window.history.pushState(
                        { url, title: document.title },
                        document.title,
                        url
                    );
                }
                
                // Scroll to top
                window.scrollTo(0, 0);
                
                // Reinitialize page-specific scripts
                this.reinitialize(newDoc);
                
                // Dispatch success event
                document.dispatchEvent(new CustomEvent('pjax:success', { detail: { url } }));
            } else {
                // Fallback: full page load if container not found
                console.warn('[PJAX] Container not found, falling back to full page load');
                window.location.href = url;
            }
            
        } catch (error) {
            console.error('[PJAX] Navigation failed:', error);
            
            // Dispatch error event
            document.dispatchEvent(new CustomEvent('pjax:error', { detail: { url, error } }));
            
            // Fallback to full page load
            window.location.href = url;
        } finally {
            this.isTransitioning = false;
            document.dispatchEvent(new CustomEvent('pjax:end', { detail: { url } }));
        }
    }
    
    updateActiveNav(url) {
        // Update navigation active states based on current URL
        const navLinks = document.querySelectorAll('.nav-character');
        const currentPath = new URL(url).pathname;
        
        navLinks.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (currentPath === linkPath || currentPath.endsWith(linkPath.split('/').pop())) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    reinitialize(newDoc) {
        // Update TOC (Table of Contents) menu from new document
        const newTocMenu = newDoc.querySelector('.toc-menu');
        const currentTocMenu = document.querySelector('.toc-menu');
        if (newTocMenu && currentTocMenu) {
            currentTocMenu.innerHTML = newTocMenu.innerHTML;
        }
        
        // Reinitialize sample audio players
        document.querySelectorAll('.sample-player').forEach(container => {
            const audioUrl = container.dataset.src;
            if (audioUrl && window.SampleAudioPlayer) {
                new SampleAudioPlayer(container, audioUrl);
            }
        });
        
        // Reinitialize illustration selectors
        const iconSelector = document.querySelector('.icon-selector');
        if (iconSelector) {
            iconSelector.querySelectorAll('img').forEach(icon => {
                icon.addEventListener('click', function() {
                    const illustUrl = this.dataset.illust;
                    const designer = this.dataset.designer;
                    const artist = this.dataset.artist;
                    
                    const mainIllust = document.getElementById('main-illust');
                    const illustDesigner = document.getElementById('illust-designer');
                    const illustArtist = document.getElementById('illust-artist');
                    const container = document.querySelector('.illust-container');
                    
                    if (mainIllust && illustUrl) {
                        iconSelector.querySelectorAll('img').forEach(i => i.classList.remove('active'));
                        this.classList.add('active');
                        
                        if (container) {
                            container.classList.add('slide-left');
                            setTimeout(() => {
                                mainIllust.src = illustUrl;
                                if (illustDesigner) illustDesigner.textContent = designer;
                                if (illustArtist) illustArtist.textContent = artist;
                                container.classList.remove('slide-left');
                                container.classList.add('slide-right');
                                setTimeout(() => container.classList.remove('slide-right'), 50);
                            }, 200);
                        }
                    }
                });
            });
        }
        
        // Reinitialize scroll-to-top button - use global scroll handler to avoid duplicates
        const scrollBtn = document.getElementById('scroll-to-top');
        if (scrollBtn && !window._pjaxScrollHandlerSet) {
            window._pjaxScrollHandlerSet = true;
            window.addEventListener('scroll', () => {
                const btn = document.getElementById('scroll-to-top');
                if (btn) {
                    if (window.scrollY > 300) {
                        btn.classList.add('visible');
                    } else {
                        btn.classList.remove('visible');
                    }
                }
            });
        }
        if (scrollBtn && !scrollBtn._pjaxClickBound) {
            scrollBtn._pjaxClickBound = true;
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
        
        // Reinitialize download modal - only set global functions once
        const modal = document.getElementById('download-modal');
        const agreeCheckbox = document.getElementById('eula-agree');
        const confirmBtn = document.getElementById('modal-confirm');
        const cancelBtn = document.getElementById('modal-cancel');
        
        if (modal) {
            modal.classList.remove('active');
            
            // Only define global functions if not already defined
            if (!window.openDownloadModal) {
                window.openDownloadModal = function(downloadUrl) {
                    const m = document.getElementById('download-modal');
                    const cb = document.getElementById('eula-agree');
                    const btn = document.getElementById('modal-confirm');
                    window.pendingDownloadUrl = downloadUrl;
                    if (cb) cb.checked = false;
                    if (btn) btn.disabled = true;
                    if (m) m.classList.add('active');
                };
            }
            
            if (!window.closeDownloadModal) {
                window.closeDownloadModal = function() {
                    const m = document.getElementById('download-modal');
                    if (m) m.classList.remove('active');
                    window.pendingDownloadUrl = null;
                };
            }
            
            if (agreeCheckbox && confirmBtn && !agreeCheckbox._pjaxChangeBound) {
                agreeCheckbox._pjaxChangeBound = true;
                agreeCheckbox.addEventListener('change', () => {
                    const btn = document.getElementById('modal-confirm');
                    const cb = document.getElementById('eula-agree');
                    if (btn && cb) btn.disabled = !cb.checked;
                });
            }
            
            if (confirmBtn && !confirmBtn._pjaxClickBound) {
                confirmBtn._pjaxClickBound = true;
                confirmBtn.addEventListener('click', () => {
                    if (window.pendingDownloadUrl) {
                        const a = document.createElement('a');
                        a.href = window.pendingDownloadUrl;
                        a.download = '';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                    window.closeDownloadModal();
                });
            }
            
            if (cancelBtn && !cancelBtn._pjaxClickBound) {
                cancelBtn._pjaxClickBound = true;
                cancelBtn.addEventListener('click', window.closeDownloadModal);
            }
            
            if (!modal._pjaxClickBound) {
                modal._pjaxClickBound = true;
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) window.closeDownloadModal();
                });
            }
        }
        
        // Dispatch reinit event for custom handlers
        document.dispatchEvent(new CustomEvent('pjax:reinit'));
    }
    
    clearCache() {
        this.cache.clear();
    }
    
    prefetch(url) {
        if (this.cache.has(url)) return;
        
        fetch(url, {
            headers: {
                'X-PJAX': 'true',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.text())
        .then(html => this.cache.set(url, html))
        .catch(() => {}); // Silently fail prefetch
    }
}

// Initialize PJAX when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if PJAX container exists
    if (document.querySelector('#pjax-container')) {
        window.pjax = new PJAX({
            container: '#pjax-container',
            timeout: 10000
        });
        
        // Add loading indicator
        document.addEventListener('pjax:start', () => {
            document.body.classList.add('pjax-loading');
        });
        
        document.addEventListener('pjax:end', () => {
            document.body.classList.remove('pjax-loading');
        });
    }
});
