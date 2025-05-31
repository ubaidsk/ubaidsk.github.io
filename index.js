// Portfolio JavaScript - Ubaid Shaikh

// Suppress browser extension related errors
window.addEventListener('error', function(e) {
    // Suppress common browser extension errors
    if (e.message && e.message.includes('message channel closed')) {
        e.preventDefault();
        return true;
    }
});

// Suppress unhandled promise rejections from extensions
window.addEventListener('unhandledrejection', function(e) {
    // Suppress browser extension related promise rejections
    if (e.reason && e.reason.message &&
        (e.reason.message.includes('message channel closed') ||
         e.reason.message.includes('listener indicated an asynchronous response'))) {
        e.preventDefault();
        return true;
    }
});

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    if (html.getAttribute('data-bs-theme') === 'dark') {
        html.setAttribute('data-bs-theme', 'light');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-bs-theme', 'dark');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    html.setAttribute('data-bs-theme', savedTheme);
    if (savedTheme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Typing effect - optimized for performance
const typingTexts = [
    'Software Engineer',
    'Open Source Contributor', 
    'Cloud Infrastructure Expert',
    'Compiler & WebAssembly Developer',
    'Observability & Monitoring Specialist'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeWriter() {
    if (!typingElement) return; // Safety check
    
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 150;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Defer animations until after page load for better LCP
window.addEventListener('load', () => {
    // Start typing effect after page loads
    setTimeout(typeWriter, 1000);
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Animate skill progress bars
            const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 500);
            });
        }
    });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Particles removed for better performance

// Contact form functions
function showSuccessMessage() {
    // Hide the form container and show the success message
    setTimeout(() => {
        document.getElementById('contact-form-container').style.display = 'none';
        document.getElementById('success-container').style.display = 'block';

        // Scroll to the success message
        document.getElementById('success-container').scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 500); // Small delay to ensure form submission starts
}

function resetForm() {
    // Show the form container and hide the success message
    document.getElementById('contact-form-container').style.display = 'block';
    document.getElementById('success-container').style.display = 'none';

    // Reset the form
    const form = document.querySelector('form[target="hidden-iframe"]');
    if (form) {
        form.reset();
        // Remove validation classes
        form.querySelectorAll('.is-valid, .is-invalid').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });
        form.classList.remove('was-validated');
    }

    // Scroll back to the form
    document.getElementById('contact-form-container').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
}

// Add form validation feedback
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form[target="hidden-iframe"]');
    if (form) {
        // Add real-time validation feedback
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });

            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                }
            });
        });
    }
});
