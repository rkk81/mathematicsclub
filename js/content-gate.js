// Content Gating and Authentication Management
class ContentGate {
    static init() {
        // Check authentication status on page load
        document.addEventListener('DOMContentLoaded', () => {
            this.checkAuthentication();
            this.setupLockIcons();
            this.setupPersistentErrorMessage();
        });
    }

    static setupPersistentErrorMessage() {
        // Create a persistent error message container
        const errorContainer = document.createElement('div');
        errorContainer.id = 'persistent-error-container';
        errorContainer.classList.add('persistent-error-container');
        document.body.appendChild(errorContainer);
    }

    static showPersistentError(message, duration = null) {
        const errorContainer = document.getElementById('persistent-error-container');
        if (!errorContainer) return;

        // Clear previous errors
        errorContainer.innerHTML = '';

        // Create error message element
        const errorMessage = document.createElement('div');
        errorMessage.classList.add('persistent-error-message', 'animate-error');
        errorMessage.innerHTML = `
            <div class="error-icon">⚠️</div>
            <div class="error-content">
                <p>${message}</p>
                ${duration ? `<div class="error-timer">Disappearing in <span id="error-countdown">${duration}</span> seconds</div>` : ''}
            </div>
            <button class="error-close">×</button>
        `;

        // Add close button functionality
        const closeButton = errorMessage.querySelector('.error-close');
        closeButton.addEventListener('click', () => {
            errorMessage.classList.add('fade-out');
            setTimeout(() => {
                errorContainer.removeChild(errorMessage);
            }, 300);
        });

        // Add countdown if duration is specified
        if (duration) {
            let countdown = duration;
            const countdownSpan = errorMessage.querySelector('#error-countdown');
            const countdownInterval = setInterval(() => {
                countdown--;
                countdownSpan.textContent = countdown;
                
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    errorMessage.classList.add('fade-out');
                    setTimeout(() => {
                        errorContainer.removeChild(errorMessage);
                    }, 300);
                }
            }, 1000);
        }

        errorContainer.appendChild(errorMessage);
    }

    static checkAuthentication() {
        const currentUser = JSON.parse(
            sessionStorage.getItem('currentUser') || 
            localStorage.getItem('currentUser') || 
            'null'
        );

        if (!currentUser || !currentUser.isLoggedIn) {
            this.showLoginRequiredOverlay();
            this.showPersistentError('You must be logged in to access this content.', 10);
        }
    }

    static setupLockIcons() {
        const lockIcons = document.querySelectorAll('.lock-icon');
        lockIcons.forEach(icon => {
            const parentSection = icon.closest('section');
            if (parentSection) {
                parentSection.classList.add('locked');
                parentSection.querySelectorAll('.folder').forEach(folder => {
                    folder.classList.add('locked-content');
                    folder.addEventListener('click', this.handleLockedContentClick);
                });
            }
        });
    }

    static handleLockedContentClick(event) {
        const currentUser = JSON.parse(
            sessionStorage.getItem('currentUser') || 
            localStorage.getItem('currentUser') || 
            'null'
        );

        if (!currentUser || !currentUser.isLoggedIn) {
            event.preventDefault();
            event.stopPropagation();
            ContentGate.showLoginRequiredOverlay();
            ContentGate.showPersistentError('Please log in to access this content.', 10);
        }
    }

    static showLoginRequiredOverlay() {
        // Remove blur effect
        // this.createBlurEffect(); // Commented out to remove blur

        // Create login required overlay
        const overlay = document.createElement('div');
        overlay.classList.add('login-required-overlay', 'animate-popup', 'full-screen-overlay');
        overlay.innerHTML = `
            <div class="login-message login-message-full">
                <div class="lock-icon-large">🔒</div>
                <h2>Access Restricted</h2>
                <p>Please log in to access this content.</p>
                <p class="redirect-timer">Redirecting to login in <span id="countdown">5</span> seconds...</p>
                <div class="login-actions">
                    <a href="../pages/login.html" class="btn btn-primary">Login Now</a>
                    <a href="../index.html" class="btn btn-secondary">Back to Home</a>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);

        // Countdown and redirect
        let countdown = 5;
        const countdownSpan = overlay.querySelector('#countdown');
        const redirectInterval = setInterval(() => {
            countdown--;
            countdownSpan.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(redirectInterval);
                window.location.href = '../pages/login.html';
            }
        }, 1000);

        // Add event listeners to buttons
        const loginButton = overlay.querySelector('.btn-primary');
        const homeButton = overlay.querySelector('.btn-secondary');
        
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.removeBlurEffect();
            window.location.href = '../pages/login.html';
        });

        homeButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.removeBlurEffect();
            window.location.href = '../index.html';
        });
    }

    // Modify removeBlurEffect to handle the overlay
    static removeBlurEffect() {
        // Remove blur from body
        const mainContent = document.body;
        mainContent.classList.remove('blur-effect');
        document.body.style.overflow = '';

        // Remove dim overlay and login overlay
        const dimOverlay = document.querySelector('.dim-overlay');
        const loginOverlay = document.querySelector('.login-required-overlay');
        
        if (dimOverlay) {
            dimOverlay.remove();
        }
        
        if (loginOverlay) {
            loginOverlay.remove();
        }
    }

    static createBlurEffect() {
        // Blur the main content
        const mainContent = document.body;
        mainContent.classList.add('blur-effect');

        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Create a dim overlay
        const dimOverlay = document.createElement('div');
        dimOverlay.classList.add('dim-overlay');
        document.body.appendChild(dimOverlay);
    }

    static loadScript(url, callback) {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.onerror = () => {
            console.error(`Failed to load script: ${url}`);
            if (callback) callback(new Error('Script load error'));
        };
        if (callback) {
            script.onload = () => callback(null);
        }
        document.head.appendChild(script);
    }

    // Lazy load MathJax with fallback
    static loadMathJax() {
        if (typeof MathJax === 'undefined') {
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML', (err) => {
                if (err) {
                    console.warn('MathJax failed to load. Mathematical notation may not render correctly.');
                }
            });
        }
    }
}

// Initialize content gate
ContentGate.init();
ContentGate.loadMathJax();
