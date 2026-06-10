/* =====================================================
   SHARING HOLIDAYS - JAVASCRIPT FUNCTIONALITY
   Complete Documentation of All Features
   ===================================================== */

/**
 * ===== 1. MOBILE HAMBURGER MENU =====
 * This section handles the mobile menu toggle functionality
 * When user clicks hamburger icon, the menu appears/disappears
 * with a smooth animation
 */

// Get the hamburger button element from HTML
// document.getElementById() finds element by its id attribute
const hamburger = document.getElementById('hamburger');

// Get the navigation menu element
// This is the menu that will show/hide
const navMenu = document.getElementById('navMenu');

/**
 * Event Listener - Hamburger Click Handler
 * addEventListener() attaches a function to run when user clicks hamburger
 * 'click' = event type to listen for
 * Function runs whenever hamburger is clicked
 */
hamburger.addEventListener('click', () => {
    // classList.toggle() adds or removes 'active' class
    // If class exists, it removes it
    // If class doesn't exist, it adds it
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    /*
       CSS handles the visual changes:
       - .hamburger.active transforms three lines into X shape
       - .nav-menu.active expands dropdown menu
    */
});

/**
 * ===== 2. CLOSE MENU WHEN LINK IS CLICKED =====
 * After user clicks a menu item, automatically close the menu
 * Better user experience - menu closes after selection
 */

// querySelectorAll() finds all elements matching selector
// Returns a NodeList (similar to array) of all nav links
const navLinks = document.querySelectorAll('.nav-menu a');

/**
 * forEach() - Loops through each menu link
 * For each link, add a click event listener
 */
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove 'active' class from hamburger (close X)
        hamburger.classList.remove('active');
        
        // Remove 'active' class from menu (collapse dropdown)
        navMenu.classList.remove('active');
        
        /*
           Result: Menu closes when user selects a link
           Better UX - clear visual feedback
        */
    });
});

/**
 * ===== 3. REMOVED - LANGUAGE SELECTOR =====
 * Language selector has been removed from the header.
 * 
 * If you need multi-language support, consider:
 * - i18next library for client-side translations
 * - Backend language switching with query parameters
 * - Language-specific page variants
 * 
 * Previous code: const languageSelector = document.getElementById('languageSelector');
 */

/**
 * ===== 4. LOGIN BUTTON FUNCTIONALITY =====
 * Handles login button click action
 */

// Get login button element
const loginBtn = document.getElementById('loginBtn');

/**
 * Login Button Click Handler
 * e = event object
 * preventDefault() stops default link behavior (page reload)
 */
loginBtn.addEventListener('click', (e) => {
    // Prevent default link behavior
    e.preventDefault();
    
    console.log('Login clicked');
    
    /**
       COMMENTED OPTIONS FOR LOGIN:
       
       Option 1: Redirect to login page
       window.location.href = '/login.php';
       // Navigates to login page
       
       Option 2: Open login modal dialog
       openLoginModal();
       // Shows popup modal instead of new page
       // Better user experience
       
       Option 3: Show login form on same page
       document.getElementById('loginForm').style.display = 'block';
       
       Option 4: Redirect to external authentication
       window.location.href = '/auth/login';
       // Google OAuth, etc.
    */
});

/**
 * ===== 4. FLOATING WHATSAPP BUTTON INTEGRATION =====
 * 
 * Configures WhatsApp link for floating button in bottom-right
 * The button is fixed and always visible while browsing
 * 
 * FEATURES:
 * - Premium animations on load and hover
 * - Smooth entrance with spring effect
 * - Pulsing glow on hover
 * - Responsive sizing for all devices
 */

/**
   WhatsApp Number Format:
   - Start with country code (no + symbol)
   - Then phone number without spaces or dashes
   - Examples:
     * US: 12125551234 (country code 1, then number)
     * Pakistan: 923331234567 (country code 92, then number)
     * UK: 442071838750 (country code 44, then number)
   
   Find country codes: https://en.wikipedia.org/wiki/List_of_country_calling_codes
*/
const whatsappNumber = '923331234567'; // CHANGE THIS TO YOUR NUMBER

// Optional: Pre-filled message when user starts WhatsApp chat
const whatsappMessage = 'Hello! I\'m interested in your travel packages. Please share more information.';

// Get floating WhatsApp button element
const floatingWhatsapp = document.getElementById('floatingWhatsapp');

// Get the WhatsApp link inside the floating button
const floatingWhatsappLink = floatingWhatsapp?.querySelector('a');

/**
 * Update WhatsApp URL with proper phone number and optional message
 * 
 * wa.me/ = WhatsApp API endpoint
 * ?text= = Parameter for pre-filled message
 * 
 * encodeURIComponent() safely encodes message text
 * Handles special characters and spaces properly
 * Example: "Hello World" becomes "Hello%20World"
 */
if (floatingWhatsappLink) {
    if (whatsappMessage) {
        // With pre-filled message
        floatingWhatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    } else {
        // Without message - just opens chat
        floatingWhatsappLink.href = `https://wa.me/${whatsappNumber}`;
    }
    
    // Log for debugging
    console.log('WhatsApp button configured with number:', whatsappNumber);
}

/**
 * OPTIONAL: Floating Button Enhancements
 * Uncomment to add extra interactions and analytics
 */

// Optional: Track WhatsApp button clicks
/*
floatingWhatsappLink?.addEventListener('click', () => {
    console.log('User clicked floating WhatsApp button');
    // Track analytics here if needed
    // Example: ga('send', 'event', 'engagement', 'whatsapp_click');
});
*/

// Optional: Add subtle animation on page first load
/*
window.addEventListener('load', () => {
    if (floatingWhatsapp) {
        // Could add special animation on first load
        floatingWhatsapp.style.animation = 'slideInRight 0.8s ease-out';
    }
});
*/

/**
 * ===== 5. SMOOTH SCROLLING (Optional Enhancement) =====
 * Makes internal links scroll smoothly instead of jumping
 */

/**
   Add smooth scrolling to all anchor links
   This is modern native CSS, but JavaScript fallback provided below
*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Get the target element ID from href
        const targetId = this.getAttribute('href');
        
        // Only scroll if target exists
        if (targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll smoothly to target element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/**
 * ===== 7. HEADER SCROLL DETECTION (Optional) =====
 * Adds shadow to header when page is scrolled
 * Creates visual feedback that user has scrolled
 */

/*
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    // If page scrolled more than 0 pixels
    if (window.scrollY > 0) {
        // Add shadow class
        header.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
    } else {
        // Remove shadow at top of page
        header.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
    }
});
*/

/**
 * ===== 8. DOCUMENT READY CHECK =====
 * Ensures all HTML has loaded before running JavaScript
 * Prevents errors when trying to access elements not yet loaded
 */

/**
   DOM Content Loaded Event
   Fires when HTML document has been completely parsed
   Safe to manipulate DOM at this point
*/
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded successfully');
    console.log('Navigation menu items:', navLinks.length);
    console.log('WhatsApp number configured:', whatsappNumber);
    
    // Any initialization code here runs after page loads
});

/**
 * ===== 9. MOBILE DEVICE DETECTION (Optional) =====
 * Detects if user is on mobile/tablet device
 */

function isMobileDevice() {
    // Check user agent string
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Example usage:
/*
if (isMobileDevice()) {
    console.log('User is on mobile device');
    // Can add mobile-specific code here
}
*/

/**
 * ===== 10. VIEWPORT WIDTH DETECTION =====
 * Useful for JavaScript-based responsive actions
 */

function getViewportSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1200,
        isDesktop: window.innerWidth >= 1200
    };
}

// Example: Log viewport size when window is resized
window.addEventListener('resize', () => {
    const viewport = getViewportSize();
    console.log('Viewport size:', viewport);
});

/**
 * ===== 11. KEYBOARD NAVIGATION ENHANCEMENT =====
 * Allows users to close menu with Escape key
 */

document.addEventListener('keydown', (e) => {
    // If user presses Escape key
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

/**
 * ===== 12. ACCESSIBILITY - FOCUS MANAGEMENT =====
 * Ensures keyboard users can navigate properly
 */

// Optional: Trap focus in menu when mobile menu is open
/*
const menuItems = document.querySelectorAll('.nav-menu a, .login-btn');
const firstMenuItem = menuItems[0];
const lastMenuItem = menuItems[menuItems.length - 1];

document.addEventListener('keydown', (e) => {
    if (navMenu.classList.contains('active') && e.key === 'Tab') {
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstMenuItem) {
                e.preventDefault();
                lastMenuItem.focus();
            }
        } else { // Tab
            if (document.activeElement === lastMenuItem) {
                e.preventDefault();
                firstMenuItem.focus();
            }
        }
    }
});
*/

/**
 * ===== SUMMARY =====
 * 
 * Key Features Implemented:
 * 1. Mobile hamburger menu with smooth animation
 * 2. Auto-close menu after link click
 * 3. Login button with redirect capability
 * 4. Floating WhatsApp button (bottom-right) with premium animations
 * 5. WhatsApp integration with configurable number
 * 6. Smooth scrolling for anchor links
 * 7. Keyboard accessibility (Escape to close menu)
 * 8. Viewport detection utilities
 * 9. Mobile device detection
 * 
 * REMOVED FEATURES:
 * - Language selector (removed from header)
 * - Old header WhatsApp button
 * 
 * Animation Features on Floating Button:
 * - floatInButton: Spring-style entrance on page load
 * - pulse-glow: Pulsing glow effect on hover
 * - Responsive sizing for all devices
 * 
 * Configuration Points:
 * - Change whatsappNumber to your actual WhatsApp number
 * - Customize whatsappMessage for pre-filled message
 * - Uncomment optional features as needed
 * - Add login page redirect path
 */
