// Business Analyst & Developer Portfolio JavaScript

// Typing Animation - Focused on BA & Dev roles
const typingElement = document.getElementById('typingSpan');
const roles = [
    'Business Analyst', 
    'Full Stack Developer', 
    'Systems Analyst',
    'Solution Developer',
    'Data Analyst',
    'Software Engineer'
];
let currentRole = 0;
let currentChar = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingElement) return;
    
    const currentText = roles[currentRole];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, currentChar - 1);
        currentChar--;
        
        if (currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            setTimeout(typeEffect, 500);
        } else {
            setTimeout(typeEffect, 50);
        }
    } else {
        typingElement.textContent = currentText.substring(0, currentChar + 1);
        currentChar++;
        
        if (currentChar === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2500); // Longer pause to read the role
        } else {
            setTimeout(typeEffect, 100);
        }
    }
}

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        
        if (icon) {
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav) {
            nav.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const header = document.getElementById('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
    if (!scrollProgress) return;
    
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrollPercent + '%';
}

// Header Scroll Effect
const header = document.getElementById('header');

function updateHeaderOnScroll() {
    if (!header) return;
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Active Navigation Link Based on Scroll Position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Animated Background Particles
function createParticles() {
    const bgAnimation = document.getElementById('bgAnimation');
    if (!bgAnimation) return;
    
    const particleCount = 40; // Reduced for better performance
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 5px
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
        
        bgAnimation.appendChild(particle);
    }
}

// Professional Skills Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress, .progress-bar');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress') || '0';
        const progressNum = parseInt(progress);
        
        if (progressNum > 0) {
            let currentProgress = 0;
            const increment = progressNum / 50; // Animate over 50 frames
            
            const animate = () => {
                if (currentProgress < progressNum) {
                    currentProgress += increment;
                    bar.style.width = Math.min(currentProgress, progressNum) + '%';
                    requestAnimationFrame(animate);
                } else {
                    bar.style.width = progressNum + '%';
                }
            };
            
            // Start animation when element is visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animate();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(bar.parentElement);
        }
    });
}

// Scroll Animations for Elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .skill-category, .timeline-item, .project-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll('.service-card, .skill-category, .timeline-item, .project-card');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Enhanced Contact Form for Business Inquiries
function initContactForm() {
    const contactForm = document.querySelector('.contact-form, #contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form fields
        const nameField = contactForm.querySelector('input[name="name"], input[placeholder*="Name"]');
        const emailField = contactForm.querySelector('input[name="email"], input[placeholder*="Email"]');
        const subjectField = contactForm.querySelector('input[name="subject"], input[placeholder*="Subject"]');
        const messageField = contactForm.querySelector('textarea[name="message"], textarea[placeholder*="Message"]');
        const serviceField = contactForm.querySelector('select[name="service"]'); // For service selection
        
        if (!nameField || !emailField || !messageField) {
            showNotification('Required form fields not found', 'error');
            return;
        }
        
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const subject = subjectField ? subjectField.value.trim() : 'Business Inquiry';
        const message = messageField.value.trim();
        const service = serviceField ? serviceField.value : '';
        
        // Enhanced validation for business context
        if (!name || !email || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (name.length < 2) {
            showNotification('Please enter a valid name', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid business email address', 'error');
            return;
        }
        
        if (message.length < 10) {
            showNotification('Please provide a more detailed message', 'error');
            return;
        }
        
        // Submit button handling
        const submitButton = contactForm.querySelector('.btn, button[type="submit"], .submit-btn');
        if (!submitButton) {
            showNotification('Submit button not found', 'error');
            return;
        }
        
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate professional response time
        setTimeout(() => {
            showNotification('Thank you for your inquiry! I\'ll respond within 24 hours.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Log inquiry type for analytics (in real implementation)
            console.log('Business inquiry submitted:', {
                type: service || 'General',
                timestamp: new Date().toISOString()
            });
        }, 2500);
    });
}

// Enhanced email validation for business context
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Professional notification system
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    // Professional color scheme
    const backgroundColor = type === 'success' ? '#2E7D32' : 
                           type === 'error' ? '#C62828' : 
                           type === 'warning' ? '#F57C00' : '#1976D2';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1002;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        max-width: 350px;
        line-height: 1.4;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 6000);
}

// Professional skill hover effects
function initSkillEffects() {
    const skillItems = document.querySelectorAll('.skill-item, .skill-list li, .tech-skill');
    
    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'translateY(-3px) scale(1.02)';
            skill.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'translateY(0) scale(1)';
            skill.style.boxShadow = '';
        });
    });
}

// Portfolio project filtering (for showcasing different types of work)
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn, .project-filter');
    const projectCards = document.querySelectorAll('.project-card, .portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter') || button.textContent.toLowerCase();
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        if (card.style.opacity === '0') {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// Theme Toggle with Professional Styling
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    
    if (!themeToggle) return;
    
    // Default to professional dark theme
    const currentTheme = 'dark';
    
    if (currentTheme === 'light') {
        root.classList.add('light-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('light-mode');
        
        // Smooth transition animation
        themeToggle.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
        
        // Update theme-dependent elements
        updateThemeElements();
    });
}

// Update elements based on theme
function updateThemeElements() {
    const isDark = !document.documentElement.classList.contains('light-mode');
    const particles = document.querySelectorAll('.particle');
    
    particles.forEach(particle => {
        particle.style.background = isDark ? 
            'rgba(64, 224, 208, 0.3)' : 
            'rgba(25, 118, 210, 0.3)';
    });
}

// Add professional floating shapes
function addFloatingShapes() {
    const sections = document.querySelectorAll('.services, .skills, .experience, .about');
    
    sections.forEach(section => {
        if (section.querySelector('.floating-shapes')) return;
        
        const shapesContainer = document.createElement('div');
        shapesContainer.classList.add('floating-shapes');
        shapesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
            z-index: 1;
        `;
        
        // Create geometric shapes for BA/Dev theme
        const shapeTypes = ['circle', 'square', 'triangle'];
        
        for (let i = 0; i < 3; i++) {
            const shape = document.createElement('div');
            shape.classList.add('shape', shapeTypes[i % shapeTypes.length]);
            
            // Random positioning and animation
            shape.style.cssText = `
                position: absolute;
                width: ${30 + Math.random() * 40}px;
                height: ${30 + Math.random() * 40}px;
                left: ${Math.random() * 90}%;
                top: ${Math.random() * 90}%;
                opacity: 0.1;
                border-radius: ${shapeTypes[i % shapeTypes.length] === 'circle' ? '50%' : '0'};
                background: linear-gradient(45deg, #40E0D0, #1976D2);
                animation: float ${15 + Math.random() * 10}s infinite linear;
            `;
            
            shapesContainer.appendChild(shape);
        }
        
        section.style.position = 'relative';
        section.appendChild(shapesContainer);
    });
}

// Analytics tracking for portfolio interactions
function trackInteraction(action, category = 'Portfolio') {
    // In production, integrate with Google Analytics or similar
    console.log('Analytics:', {
        action,
        category,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent.substring(0, 50)
    });
}

// Enhanced keyboard navigation for accessibility
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key functionality
        if (e.key === 'Escape') {
            // Close mobile menu
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            
            // Close any open modals or overlays
            const modals = document.querySelectorAll('.modal.active, .overlay.active');
            modals.forEach(modal => modal.classList.remove('active'));
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Preloader with professional loading animation
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            // Trigger entrance animations
            document.body.classList.add('loaded');
        }, 500);
    }
}

// Performance optimized intersection observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Track section views
            const sectionId = entry.target.id;
            if (sectionId) {
                trackInteraction(`Section View: ${sectionId}`, 'Navigation');
            }
        }
    });
}, observerOptions);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core functionality
    setTimeout(typeEffect, 1000);
    createParticles();
    initScrollAnimations();
    initSkillEffects();
    initContactForm();
    initThemeToggle();
    initProjectFiltering();
    addFloatingShapes();
    initKeyboardNavigation();
    animateSkillBars();
    
    // Set up intersection observer
    const animatedElements = document.querySelectorAll(
        '.service-card, .skill-category, .timeline-item, .project-card, section'
    );
    animatedElements.forEach(el => observer.observe(el));
    
    // Add optimized scroll listeners
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScrollProgress();
                updateHeaderOnScroll();
                updateActiveNavLink();
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial calls
    updateScrollProgress();
    updateHeaderOnScroll();
    updateActiveNavLink();
    updateThemeElements();
    
    // Track page load
    trackInteraction('Page Load', 'Engagement');
});

// Handle page load completion
window.addEventListener('load', () => {
    // Smooth page entrance
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
    
    hidePreloader();
    
    // Track full page load
    trackInteraction('Page Fully Loaded', 'Performance');
});

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(90deg); }
        50% { transform: translateY(0px) rotate(180deg); }
        75% { transform: translateY(-5px) rotate(270deg); }
    }
    
    .keyboard-navigation *:focus {
        outline: 2px solid #40E0D0 !important;
        outline-offset: 2px;
    }
    
    .loaded .service-card,
    .loaded .skill-category,
    .loaded .timeline-item {
        animation: slideInUp 0.6s ease forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(style);