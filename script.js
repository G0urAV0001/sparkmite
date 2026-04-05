// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // offset for fixed navbar
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(5, 7, 10, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 191, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(11, 15, 26, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

// Mobile menu toggle (simple version)
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // In a real implementation with mobile menu styles, we would toggle an 'active' class
        // Since mobile menu styles weren't fully defined in CSS, we'll just toggle display
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(5, 7, 10, 0.95)';
            navLinks.style.padding = '20px';
            navLinks.style.borderBottom = '1px solid rgba(0, 191, 255, 0.2)';
        }
    });
}

// Ensure nav links display correctly on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.width = 'auto';
        navLinks.style.background = 'transparent';
        navLinks.style.padding = '0';
        navLinks.style.borderBottom = 'none';
    } else {
        navLinks.style.display = 'none';
    }
});

// Optional: Add simple scroll animation for elements
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply initial styles and observe elements
document.querySelectorAll('.card, .facility-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
