/**
 * FUNDRAISING WEBSITE - JavaScript
 * ================================
 * 
 * This script handles:
 * 1. Donation progress tracking and display
 * 2. Wallet address copy-to-clipboard functionality
 * 3. Smooth scrolling navigation
 * 4. FAQ accordion functionality
 * 5. Scroll-based fade-in animations
 */

// ============================================
// CONFIGURATION - EDIT THESE VALUES
// ============================================

/**
 * DONATION PROGRESS
 * -----------------
 * Update 'raisedUSD' whenever you receive donations.
 * The progress bar and text will update automatically.
 */
const goalUSD = 20000;  // Your fundraising goal in USD
let raisedUSD = 0;      // <-- EDIT THIS VALUE when you receive donations

/**
 * WALLET ADDRESS
 * --------------
 * Your MetaMask/ETH wallet address for donations.
 * Also update this in the HTML file's #wallet-address element.
 */
const walletAddress = "0xYOURADDRESSHERE"; // <-- EDIT THIS with your real address

// ============================================
// DO NOT EDIT BELOW THIS LINE
// (unless you know what you're doing)
// ============================================

/**
 * Initialize all functionality when DOM is ready
 */
document.addEventListener('DOMContentLoaded', function() {
    initDonationProgress();
    initCopyWallet();
    initSmoothScroll();
    initFAQ();
    initScrollAnimations();
});

/**
 * DONATION PROGRESS
 * Updates the progress bar and text display
 */
function initDonationProgress() {
    const progressFill = document.getElementById('progress-fill');
    const raisedText = document.getElementById('raised-text');
    const percentageText = document.getElementById('percentage-text');
    
    if (!progressFill || !raisedText || !percentageText) {
        console.warn('Progress elements not found');
        return;
    }
    
    // Calculate percentage (cap at 100%)
    const percentage = Math.min((raisedUSD / goalUSD) * 100, 100);
    
    // Format currency
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    
    // Update DOM elements
    raisedText.textContent = `Raised: ${formatter.format(raisedUSD)} of ${formatter.format(goalUSD)}`;
    percentageText.textContent = `${percentage.toFixed(1)}%`;
    
    // Animate progress bar after a short delay
    setTimeout(() => {
        progressFill.style.width = `${percentage}%`;
    }, 300);
}

/**
 * COPY WALLET ADDRESS TO CLIPBOARD
 * Provides visual feedback via toast notification
 */
function initCopyWallet() {
    const copyBtn = document.getElementById('copy-wallet-btn');
    const walletElement = document.getElementById('wallet-address');
    
    if (!copyBtn || !walletElement) {
        console.warn('Wallet elements not found');
        return;
    }
    
    copyBtn.addEventListener('click', async function() {
        const addressToCopy = walletElement.textContent.trim();
        
        try {
            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(addressToCopy);
                showToast('✓ Wallet address copied!');
            } else {
                // Fallback for older browsers
                fallbackCopyToClipboard(addressToCopy);
                showToast('✓ Wallet address copied!');
            }
        } catch (error) {
            console.error('Failed to copy:', error);
            showToast('❌ Failed to copy. Please copy manually.', 'error');
        }
    });
}

/**
 * Fallback clipboard function for older browsers
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed:', err);
        throw err;
    }
    
    document.body.removeChild(textArea);
}

/**
 * TOAST NOTIFICATION
 * Shows a temporary message at the bottom of the screen
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) {
        console.warn('Toast elements not found');
        alert(message); // Fallback to alert
        return;
    }
    
    // Set message
    toastMessage.textContent = message;
    
    // Update color based on type
    if (type === 'error') {
        toast.style.background = '#ef4444';
    } else {
        toast.style.background = '#10b981';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * SMOOTH SCROLLING
 * Enables smooth scroll for all anchor links
 */
function initSmoothScroll() {
    // Get all links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calculate offset (account for fixed navbar)
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * FAQ ACCORDION
 * Toggles FAQ items open/closed
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Check if this item is already active
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                });
                
                // Open clicked item if it wasn't already active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/**
 * SCROLL ANIMATIONS
 * Fades in elements as they enter the viewport
 */
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    if (fadeElements.length === 0) return;
    
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Stop observing once visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all fade elements
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * UTILITY: Update raised amount dynamically
 * Call this function if you want to update the amount via console or other means
 * 
 * Usage: updateRaisedAmount(500);
 */
function updateRaisedAmount(newAmount) {
    raisedUSD = newAmount;
    initDonationProgress();
    console.log(`Raised amount updated to: $${newAmount}`);
}

// Expose updateRaisedAmount globally for easy updates
window.updateRaisedAmount = updateRaisedAmount;
