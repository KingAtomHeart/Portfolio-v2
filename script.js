/* =========================================================
   Luis Bamba — Portfolio scripts
   ========================================================= */
(function () {
    'use strict';

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Theme toggle (persisted) ----------
       Initial theme is applied by the inline <head> script to avoid a flash.
       Here we just wire the button and keep the icon in sync. */
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;

    function syncThemeIcon() {
        const icon = themeToggle && themeToggle.querySelector('i');
        if (!icon) return;
        const isLight = root.classList.contains('light-mode');
        icon.classList.toggle('fa-sun', isLight);
        icon.classList.toggle('fa-moon', !isLight);
    }

    if (themeToggle) {
        syncThemeIcon();
        themeToggle.addEventListener('click', () => {
            const isLight = root.classList.toggle('light-mode');
            try {
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            } catch (e) { /* storage unavailable — ignore */ }
            syncThemeIcon();
        });
    }

    /* ---------- Mobile menu ---------- */
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const navLinks = nav ? nav.querySelectorAll('.nav-link') : [];

    function setMenu(open) {
        if (!nav || !menuToggle) return;
        nav.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars', !open);
            icon.classList.toggle('fa-times', open);
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            setMenu(!nav.classList.contains('active'));
        });
    }

    navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setMenu(false);
    });

    /* ---------- Header state + scroll progress ---------- */
    const header = document.getElementById('header');
    const progress = document.getElementById('scrollProgress');

    function onScroll() {
        const y = window.scrollY;
        if (header) header.classList.toggle('scrolled', y > 20);

        if (progress) {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
            progress.style.width = pct + '%';
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                onScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    /* ---------- Active nav link (scroll spy) ---------- */
    const sections = document.querySelectorAll('main section[id]');
    const linkFor = {};
    navLinks.forEach(l => { linkFor[l.getAttribute('href')] = l; });

    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const link = linkFor['#' + entry.target.id];
                if (!link) return;
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        sections.forEach(s => spy.observe(s));
    }

    /* ---------- Reveal on scroll ---------- */
    const revealSelector =
        '.section-head, .about-text, .about-facts, .project-card, ' +
        '.service-card, .skill-group, .timeline-item, .education-card, ' +
        '.cert-card, .contact-info, .contact-form';
    const revealEls = document.querySelectorAll(revealSelector);

    // Stagger siblings that share a parent for a subtle cascade.
    const groups = new Map();
    revealEls.forEach(el => {
        const parent = el.parentElement;
        const list = groups.get(parent) || [];
        list.push(el);
        groups.set(parent, list);
    });
    groups.forEach(list => {
        list.forEach((el, i) => { el.style.transitionDelay = (i * 70) + 'ms'; });
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in-view'));
    }

    /* ---------- Typing effect ---------- */
    const typingEl = document.getElementById('typingSpan');
    const roles = [
        'Full-Stack Developer',
        'MERN Stack Developer',
        'React Developer',
        'Back-End Developer',
        'Web Developer'
    ];

    if (typingEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        const type = () => {
            const current = roles[roleIndex];
            typingEl.textContent = current.substring(0, charIndex);

            if (!deleting && charIndex < current.length) {
                charIndex++;
                setTimeout(type, 90);
            } else if (!deleting && charIndex === current.length) {
                deleting = true;
                setTimeout(type, 2200);
            } else if (deleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 40);
            } else {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(type, 400);
            }
        };
        setTimeout(type, 800);
    }

    /* ---------- Toast ---------- */
    let toastTimer;
    function showToast(message, type = 'success') {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        clearTimeout(toastTimer);

        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        const iconClass = type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation';
        toast.innerHTML = '<i class="fas ' + iconClass + '" aria-hidden="true"></i><span></span>';
        toast.querySelector('span').textContent = message;
        toast.setAttribute('role', 'status');
        document.body.appendChild(toast);

        requestAnimationFrame(() => toast.classList.add('show'));
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 350);
        }, 5000);
    }

    /* ---------- Contact form (EmailJS) ---------- */
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const EMAILJS_PUBLIC_KEY = '5HzEOolObhPNTIq1h';
    const EMAILJS_SERVICE = 'service_7k7n4bk';
    const EMAILJS_TEMPLATE = 'template_vo40ohm';

    if (window.emailjs) {
        try { emailjs.init(EMAILJS_PUBLIC_KEY); } catch (e) { /* ignore */ }
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = form.from_name.value.trim();
            const email = form.from_email.value.trim();
            const subject = form.subject.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !subject || !message) {
                showToast('Please fill in all fields.', 'error');
                return;
            }
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }
            if (message.length < 10) {
                showToast('Please add a little more detail to your message.', 'error');
                return;
            }
            if (!window.emailjs) {
                showToast('Email service is unavailable right now. Please email me directly.', 'error');
                return;
            }

            const original = submitBtn ? submitBtn.textContent : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending…';
            }

            emailjs.sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, form)
                .then(() => {
                    showToast("Thanks! Your message is on its way — I'll reply soon.", 'success');
                    form.reset();
                })
                .catch((err) => {
                    console.error('EmailJS error:', err);
                    showToast('Something went wrong. Please try again or email me directly.', 'error');
                })
                .finally(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = original;
                    }
                });
        });
    }
})();
