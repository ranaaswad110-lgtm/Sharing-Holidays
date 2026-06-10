/**
 * ===== SHARING HOLIDAYS - RESPONSIVE JAVASCRIPT =====
 * 
 * Complete JavaScript for mobile-first responsive design
 * Handles all interactive functionality and optimizations
 * 
 * Features:
 * 1. Hamburger menu toggle for mobile navigation
 * 2. Auto-close menu on link click
 * 3. Keyboard accessibility (Escape key)
 * 4. Smooth scrolling for anchor links
 * 5. Floating WhatsApp integration
 * 6. Focus management for accessibility
 * 7. Viewport size detection
 */

// ===== DOM READY CHECK =====
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeWhatsApp();
    initializeAccessibility();
});

/**
 * ===== 1. MOBILE MENU TOGGLE =====
 * Handles hamburger menu open/close functionality
 */

function initializeMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const toggleBar = document.getElementById('toggleBar');

    if (!hamburger || !navMenu) return;

    // Helper function to update menu states (hamburger + toggle bar)
    function updateMenuStates(isOpen) {
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        navMenu.classList.toggle('active', isOpen);
        
        // Update toggle bar if it exists (only shows on 360px and below)
        if (toggleBar) {
            toggleBar.classList.toggle('menu-open', isOpen);
        }
    }

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = !navMenu.classList.contains('active');
        updateMenuStates(isActive);
    });

    // Toggle menu on toggle bar click (if visible)
    if (toggleBar) {
        toggleBar.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = !navMenu.classList.contains('active');
            updateMenuStates(isActive);
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            updateMenuStates(false);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('header') && !e.target.closest('.toggle-bar')) {
            updateMenuStates(false);
        }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            updateMenuStates(false);
        }
    });
}

/**
 * ===== 2. WHATSAPP INTEGRATION =====
 * Configures floating WhatsApp button with proper link
 */

function initializeWhatsApp() {
    const whatsappNumber = '923331234567';
    const whatsappMessage = 'Hello! I\'m interested in your travel packages. Please share more information.';
    
    const floatingWhatsapp = document.getElementById('floatingWhatsapp');
    if (!floatingWhatsapp) return;

    const whatsappLink = floatingWhatsapp.querySelector('a');
    if (whatsappLink) {
        whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Track WhatsApp clicks (optional)
        whatsappLink.addEventListener('click', function() {
            console.log('WhatsApp button clicked');
        });
    }
}

/**
 * ===== 3. ACCESSIBILITY ENHANCEMENTS =====
 * Focus management and keyboard navigation
 */

function initializeAccessibility() {
    const loginBtn = document.getElementById('loginBtn');
    const hamburger = document.getElementById('hamburger');

    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Login button clicked');
            // Redirect to login page or open modal
            // window.location.href = '/login';
        });
    }

    // Manage focus visibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-focus');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-focus');
    });
}

/**
 * ===== 4. UTILITY FUNCTIONS =====
 */

// Smooth scroll behavior for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Detect if device is mobile
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Get current viewport width
function getViewportWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth);
}

// Detect current breakpoint
function getCurrentBreakpoint() {
    const width = getViewportWidth();
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

/**
 * ===== 5. PERFORMANCE OPTIMIZATIONS =====
 */

// Lazy load images (if using image tags)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * ===== 6. DEBUG & CONSOLE LOGGING =====
 */

// Log device information
console.log('Device Type:', isMobileDevice() ? 'Mobile' : 'Desktop');
console.log('Current Breakpoint:', getCurrentBreakpoint());
console.log('Viewport Width:', getViewportWidth() + 'px');

/**
 * ===== 7. KEYBOARD SHORTCUTS (Optional) =====
 */

document.addEventListener('keydown', function(e) {
    // Alt + / to open search (example)
    if (e.altKey && e.key === '/') {
        e.preventDefault();
        console.log('Search shortcut triggered');
    }

    // Alt + H for home
    if (e.altKey && e.key === 'h') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

/**
 * ===== 8. SCROLL TO TOP BUTTON (Optional) =====
 */

window.addEventListener('scroll', function() {
    // Could add scroll-to-top button logic here
    const scrolled = window.scrollY > 300;
    if (scrolled) {
        // Show scroll-to-top button
    }
});

/**
 * ===== 9. TOUCH OPTIMIZATION =====
 * Improve touch targets on mobile devices
 */

if (isMobileDevice()) {
    document.querySelectorAll('a, button').forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.height < 48 || rect.width < 48) {
            // Ensure touch target is at least 48x48px
            element.style.padding = Math.max(
                parseFloat(window.getComputedStyle(element).paddingTop),
                24 - rect.height / 2
            ) + 'px ' + Math.max(
                parseFloat(window.getComputedStyle(element).paddingLeft),
                24 - rect.width / 2
            ) + 'px';
        }
    });
}

/**
 * ===== 10. FEATURE DETECTION =====
 */

const features = {
    touchEvents: 'ontouchstart' in window,
    flexbox: CSS.supports('display', 'flex'),
    grid: CSS.supports('display', 'grid'),
    localStorage: typeof(Storage) !== 'undefined',
    serviceWorker: 'serviceWorker' in navigator
};

console.log('Browser Features:', features);
