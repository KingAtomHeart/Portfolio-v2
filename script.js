// Typing Animation
const typingElement = document.getElementById('typingSpan');
const roles = ['Web Developer', 'UI/UX Designer', 'Full Stack Developer', 'Mobile Developer', 'Problem Solver'];
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
            setTimeout(typeEffect, 2000);
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
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random horizontal position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        // Random animation duration
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        bgAnimation.appendChild(particle);
    }
}

// Scroll Animations for Elements
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .skill-category, .timeline-item');
    
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
    const elements = document.querySelectorAll('.service-card, .skill-category, .timeline-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form fields
        const nameField = contactForm.querySelector('input[placeholder="Your Name"]');
        const emailField = contactForm.querySelector('input[placeholder="Your Email"]');
        const subjectField = contactForm.querySelector('input[placeholder="Subject"]');
        const messageField = contactForm.querySelector('textarea[placeholder="Your Message"]');
        
        if (!nameField || !emailField || !subjectField || !messageField) {
            showNotification('Form fields not found', 'error');
            return;
        }
        
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const subject = subjectField.value.trim();
        const message = messageField.value.trim();
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('.btn, button[type="submit"]');
        if (!submitButton) {
            showNotification('Submit button not found', 'error');
            return;
        }
        
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    // Add styles
    const backgroundColor = type === 'success' ? '#4CAF50' : 
                           type === 'error' ? '#f44336' : '#2196F3';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 1.4rem;
        z-index: 1002;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Skill hover effects
function initSkillEffects() {
    const skillItems = document.querySelectorAll('.skill-list li');
    
    skillItems.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    
    if (!themeToggle) return;
    
    // Check for saved theme preference or default to 'dark'
    // Note: localStorage is not available in Claude.ai artifacts
    // For production use, uncomment the localStorage lines
    // const currentTheme = localStorage.getItem('theme') || 'dark';
    const currentTheme = 'dark'; // Default theme for artifact
    
    if (currentTheme === 'light') {
        root.classList.add('light-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        root.classList.toggle('light-mode');
        
        // Save theme preference (disabled for artifact)
        // const theme = root.classList.contains('light-mode') ? 'light' : 'dark';
        // localStorage.setItem('theme', theme);
        
        // Add click animation
        themeToggle.style.transform = 'translateY(-50%) scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
    });
}

// Add floating shapes to sections
function addFloatingShapes() {
    const sections = document.querySelectorAll('.services, .skills, .experience');
    
    sections.forEach(section => {
        // Check if shapes already exist
        if (section.querySelector('.floating-shapes')) return;
        
        const shapesContainer = document.createElement('div');
        shapesContainer.classList.add('floating-shapes');
        
        for (let i = 0; i < 3; i++) {
            const shape = document.createElement('div');
            shape.classList.add('shape');
            shapesContainer.appendChild(shape);
        }
        
        section.appendChild(shapesContainer);
    });
}

// Preloader handling
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// Intersection Observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            const icon = menuToggle?.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Initialize page load styles
function initPageLoadStyles() {
    document.body.style.cssText += `
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    `;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize page load styles
    initPageLoadStyles();
    
    // Start typing animation
    setTimeout(typeEffect, 1000);
    
    // Create background particles
    createParticles();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize skill effects
    initSkillEffects();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize theme toggle
    initThemeToggle();
    
    // Add floating shapes
    addFloatingShapes();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Set up intersection observer
    const animatedElements = document.querySelectorAll('.service-card, .skill-category, .timeline-item');
    animatedElements.forEach(el => observer.observe(el));
    
    // Add scroll listeners
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateHeaderOnScroll();
        updateActiveNavLink();
        animateOnScroll();
    });
    
    // Trigger initial scroll functions
    updateScrollProgress();
    updateHeaderOnScroll();
    updateActiveNavLink();
    animateOnScroll();
});

// Handle page load completion
window.addEventListener('load', () => {
    // Smooth page load animation
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
    
    // Hide preloader
    hidePreloader();
});

// EmailJS Integration (commented out for artifact compatibility)
/*
// Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your public key

// Enhanced contact form with EmailJS
function initEmailJS() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"], .btn');
        
        if (!submitBtn) return;
        
        // Show loading state
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Send email
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
            .then(() => {
                showNotification('Message sent successfully!', 'success');
                form.reset();
            })
            .catch((error) => {
                showNotification('Failed to send message. Please try again.', 'error');
                console.error('EmailJS error:', error);
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
    });
}
*/