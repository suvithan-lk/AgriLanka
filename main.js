// AgriLanka JavaScript - Modern Agricultural Platform

class AgriLanka {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.isAutoSliding = true;
        this.slideInterval = null;
        this.mobileMenuOpen = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeSlider();
        this.setupAnimations();
        this.setupLoadingScreen();
        this.initializeWeatherUpdates();
        this.setupResponsiveHandlers();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileMenuToggle');
        const sidebar = document.getElementById('sidebar');
        
        if (mobileToggle && sidebar) {
            mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.mobileMenuOpen && !sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Service buttons
        const serviceButtons = document.querySelectorAll('.service-btn');
        serviceButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleServiceClick(e));
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e));
            searchInput.addEventListener('focus', () => this.handleSearchFocus());
            searchInput.addEventListener('blur', () => this.handleSearchBlur());
        }

        // Auth buttons
        const registerBtn = document.querySelector('.btn-register');
        const loginBtn = document.querySelector('.btn-login');
        
        if (registerBtn) registerBtn.addEventListener('click', () => this.handleRegister());
        if (loginBtn) loginBtn.addEventListener('click', () => this.handleLogin());

        // Window resize handler
        window.addEventListener('resize', () => this.handleResize());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    initializeSlider() {
        this.slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        if (this.slides.length === 0) return;

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Arrow navigation
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());

        // Auto slide
        this.startAutoSlide();

        // Pause auto slide on hover
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.pauseAutoSlide());
            sliderContainer.addEventListener('mouseleave', () => this.resumeAutoSlide());
        }
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;

        // Remove active class from current slide and dot
        this.slides[this.currentSlide].classList.remove('active');
        document.querySelectorAll('.dot')[this.currentSlide].classList.remove('active');

        // Add active class to new slide and dot
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        document.querySelectorAll('.dot')[this.currentSlide].classList.add('active');

        // Add slide transition animation
        this.slides[this.currentSlide].style.animation = 'slideInFromRight 0.5s ease-out';
        setTimeout(() => {
            this.slides[this.currentSlide].style.animation = '';
        }, 500);
    }

    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }

    previousSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }

    startAutoSlide() {
        if (this.slideInterval) clearInterval(this.slideInterval);
        this.slideInterval = setInterval(() => {
            if (this.isAutoSliding) this.nextSlide();
        }, 5000);
    }

    pauseAutoSlide() {
        this.isAutoSliding = false;
    }

    resumeAutoSlide() {
        this.isAutoSliding = true;
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach(el => observer.observe(el));

        // Add stagger animation to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        // Simulate loading
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500);
        });

        // Add loading progress animation
        const loaderIcon = document.querySelector('.loader-icon');
        if (loaderIcon) {
            let rotation = 0;
            const rotateIcon = setInterval(() => {
                rotation += 10;
                loaderIcon.style.transform = `rotate(${rotation}deg)`;
                if (loadingScreen.classList.contains('hidden')) {
                    clearInterval(rotateIcon);
                }
            }, 50);
        }
    }

    initializeWeatherUpdates() {
        // Simulate real-time weather updates
        this.updateWeatherAnimation();
        
        // Update weather every 30 seconds (simulate real-time)
        setInterval(() => {
            this.updateWeatherAnimation();
        }, 30000);
    }

    updateWeatherAnimation() {
        const weatherIcon = document.querySelector('.weather-main-icon');
        const temperature = document.querySelector('.temp-value');
        
        if (weatherIcon && temperature) {
            // Add pulse animation on update
            weatherIcon.style.animation = 'pulse 1s ease-in-out';
            temperature.style.animation = 'pulse 1s ease-in-out';
            
            setTimeout(() => {
                weatherIcon.style.animation = 'bounce 2s infinite';
                temperature.style.animation = '';
            }, 1000);
        }

        // Animate detail items
        const detailItems = document.querySelectorAll('.detail-item');
        detailItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    item.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const mobileToggle = document.getElementById('mobileMenuToggle');
        
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const mobileToggle = document.getElementById('mobileMenuToggle');
        
        sidebar.classList.add('mobile-open');
        mobileToggle.style.transform = 'rotate(90deg)';
        this.mobileMenuOpen = true;
        
        // Add overlay
        this.createOverlay();
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const mobileToggle = document.getElementById('mobileMenuToggle');
        
        sidebar.classList.remove('mobile-open');
        mobileToggle.style.transform = 'rotate(0deg)';
        this.mobileMenuOpen = false;
        
        // Remove overlay
        this.removeOverlay();
    }

    createOverlay() {
        if (document.querySelector('.mobile-overlay')) return;
        
        const overlay = document.createElement('div');
        overlay.className = 'mobile-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 998;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(overlay);
        
        // Fade in
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // Close menu when clicking overlay
        overlay.addEventListener('click', () => this.closeMobileMenu());
    }

    removeOverlay() {
        const overlay = document.querySelector('.mobile-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    }

    handleNavigation(e) {
        e.preventDefault();
        const link = e.currentTarget;
        
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Add click animation
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = '';
        }, 150);
        
        // Close mobile menu if open
        if (this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Simulate page navigation
        this.showNotification(`Navigating to ${link.textContent.trim()}...`);
    }

    handleServiceClick(e) {
        const button = e.currentTarget;
        const card = button.closest('.service-card');
        
        // Add click animation
        card.style.transform = 'scale(0.98)';
        button.style.background = 'var(--accent-green)';
        
        setTimeout(() => {
            card.style.transform = '';
            button.style.background = '';
        }, 200);
        
        // Show service details
        const serviceName = card.querySelector('h3').textContent;
        this.showNotification(`Opening ${serviceName} section...`);
    }

    handleSearch(e) {
        const query = e.target.value;
        const searchIcon = document.querySelector('.search-icon');
        
        if (query.length > 0) {
            searchIcon.style.color = 'var(--accent-green)';
            searchIcon.className = 'fas fa-times search-icon';
            searchIcon.style.cursor = 'pointer';
            
            // Add search functionality here
            this.performSearch(query);
        } else {
            searchIcon.style.color = '';
            searchIcon.className = 'fas fa-search search-icon';
            searchIcon.style.cursor = '';
        }
    }

    handleSearchFocus() {
        const searchContainer = document.querySelector('.search-container');
        searchContainer.style.transform = 'scale(1.02)';
    }

    handleSearchBlur() {
        const searchContainer = document.querySelector('.search-container');
        searchContainer.style.transform = '';
    }

    performSearch(query) {
        // Simulate search functionality
        console.log(`Searching for: ${query}`);
        
        // In a real application, this would perform actual search
        if (query.length > 2) {
            this.showNotification(`Searching for "${query}"...`);
        }
    }

    handleRegister() {
        this.showNotification('Opening registration form...');
        // Add registration modal/page logic here
    }

    handleLogin() {
        this.showNotification('Opening login form...');
        // Add login modal/page logic here
    }

    handleKeyboard(e) {
        // Keyboard navigation for slider
        if (e.key === 'ArrowLeft' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            this.previousSlide();
        } else if (e.key === 'ArrowRight' && e.target.tagName !== 'INPUT') {
            e.preventDefault();
            this.nextSlide();
        } else if (e.key === 'Escape') {
            if (this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        }
    }

    handleResize() {
        // Handle responsive changes
        if (window.innerWidth > 968 && this.mobileMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Recalculate animations if needed
        this.updateResponsiveAnimations();
    }

    updateResponsiveAnimations() {
        const isMobile = window.innerWidth <= 768;
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            if (isMobile) {
                card.style.animationDelay = `${index * 0.1}s`;
            } else {
                card.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }

    setupResponsiveHandlers() {
        // Handle orientation change on mobile
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.handleResize();
            }, 100);
        });
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoSlide();
            } else {
                this.resumeAutoSlide();
            }
        });
    }

    showNotification(message, type = 'info', duration = 3000) {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-green);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: 500;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        // Slide in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }

    // Weather data simulation (in real app, this would fetch from API)
    simulateWeatherData() {
        const temperatures = [26, 27, 28, 29, 30];
        const conditions = ['sunny', 'cloudy', 'rainy', 'stormy'];
        const humidity = [60, 65, 70, 75, 80];
        
        return {
            temperature: temperatures[Math.floor(Math.random() * temperatures.length)],
            condition: conditions[Math.floor(Math.random() * conditions.length)],
            humidity: humidity[Math.floor(Math.random() * humidity.length)]
        };
    }

    // Tips rotation
    rotateTips() {
        const tips = [
            "Check soil moisture before watering crops",
            "Monitor for pest activity during warm weather",
            "Apply organic fertilizer to vegetable plots",
            "Harvest paddy when grains are golden yellow",
            "Prune tea bushes for better leaf quality",
            "Plant cover crops to improve soil health",
            "Use drip irrigation for water conservation",
            "Monitor weather forecasts for farming decisions"
        ];
        
        const tipItems = document.querySelectorAll('.tip-item p');
        
        tipItems.forEach((item, index) => {
            if (tips[index]) {
                setTimeout(() => {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.textContent = tips[index];
                        item.style.opacity = '1';
                    }, 200);
                }, index * 100);
            }
        });
    }

    // Smooth scrolling utility
    smoothScrollTo(target, duration = 800) {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    }

    // Easing function for smooth scrolling
    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // Lazy loading for images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Performance monitoring
    monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    
                    if (loadTime > 3000) {
                        console.warn('Page load time is slow:', loadTime + 'ms');
                    }
                }, 0);
            });
        }
    }

    // Error handling
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            this.showNotification('An error occurred. Please refresh the page.', 'error');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.showNotification('Connection error. Please check your internet.', 'error');
        });
    }

    // Local storage utilities
    saveToStorage(key, value) {
        try {
            localStorage.setItem(`agrilanka_${key}`, JSON.stringify(value));
        } catch (e) {
            console.warn('Local storage not available:', e);
        }
    }

    loadFromStorage(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(`agrilanka_${key}`);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('Error loading from storage:', e);
            return defaultValue;
        }
    }

    // Theme management
    setupThemeToggle() {
        const savedTheme = this.loadFromStorage('theme', 'light');
        this.applyTheme(savedTheme);

        // Create theme toggle button (if needed)
        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: var(--primary-green);
            color: white;
            cursor: pointer;
            z-index: 1000;
            box-shadow: var(--shadow-medium);
            transition: var(--transition);
        `;

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.dataset.theme || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.applyTheme(newTheme);
            this.saveToStorage('theme', newTheme);
        });

        document.body.appendChild(themeToggle);
    }

    applyTheme(theme) {
        document.body.dataset.theme = theme;
        const themeToggle = document.querySelector('.theme-toggle i');
        
        if (theme === 'dark') {
            document.documentElement.style.setProperty('--background', '#1a202c');
            document.documentElement.style.setProperty('--surface', '#2d3748');
            document.documentElement.style.setProperty('--text-primary', '#ffffff');
            document.documentElement.style.setProperty('--text-secondary', '#a0aec0');
            if (themeToggle) themeToggle.className = 'fas fa-sun';
        } else {
            document.documentElement.style.setProperty('--background', '#f8fbf6');
            document.documentElement.style.setProperty('--surface', '#ffffff');
            document.documentElement.style.setProperty('--text-primary', '#1a2e05');
            document.documentElement.style.setProperty('--text-secondary', '#4a5568');
            if (themeToggle) themeToggle.className = 'fas fa-moon';
        }
    }

    // Analytics tracking (placeholder)
    trackEvent(eventName, eventData = {}) {
        // In a real application, this would send data to analytics service
        console.log('Event tracked:', eventName, eventData);
    }

    // Accessibility improvements
    setupAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-green);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('button');
        buttons.forEach((btn, index) => {
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', `Button ${index + 1}`);
            }
        });

        // Announce live regions
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        document.body.appendChild(liveRegion);
        this.liveRegion = liveRegion;
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
        }
    }

    // Initialize everything when DOM is ready
    static initialize() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                new AgriLanka();
            });
        } else {
            new AgriLanka();
        }
    }
}

// Additional utility functions
const utils = {
    // Debounce function for performance
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Format currency for market prices
    formatCurrency(amount, currency = 'LKR') {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2
        }).format(amount);
    },

    // Format date for weather and tips
    formatDate(date, options = {}) {
        const defaultOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return new Intl.DateTimeFormat('en-LK', { ...defaultOptions, ...options }).format(date);
    },

    // Validate email for registration
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Device detection
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    },

    // Connection status
    getConnectionStatus() {
        return navigator.onLine ? 'online' : 'offline';
    }
};

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Initialize the application
AgriLanka.initialize();

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AgriLanka, utils };
}
