// Import project data
import { projectDetails } from './data.js';

// Render projects dynamically with featured + grid layout
function renderProjects() {
    const featuredContainer = document.getElementById('featured-project');
    const gridContainer = document.getElementById('projects-grid');
    
    if (!featuredContainer || !gridContainer) return;

    featuredContainer.innerHTML = '';
    gridContainer.innerHTML = '';

    projectDetails.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Convert relative path to absolute path from root
        const imagePath = project.img.startsWith('./') ? project.img.substring(2) : project.img;
        
        projectCard.innerHTML = `
            <img src="${imagePath}" alt="${project.name} Image" onerror="this.src='https://picsum.photos/600/400?random=${Math.floor(Math.random() * 1000)}'">
            <div class="project-overlay">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    <strong>Tech Stack:</strong> ${project.tech.join(', ')}
                </div>
                <div class="project-links">
                    <a href="${project.url}" target="_blank" rel="noopener noreferrer" class="btn">
                        <i class="fas fa-globe"></i> Live Demo
                    </a>
                    <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn">
                        <i class="fab fa-github"></i> GitHub Repo
                    </a>
                </div>
            </div>
        `;
        
        // First project goes to featured section, rest to grid
        if (index === 0) {
            featuredContainer.appendChild(projectCard);
        } else {
            gridContainer.appendChild(projectCard);
        }
    });
}

// Smooth scroll effect for anchor links
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

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe sections and project cards
document.addEventListener('DOMContentLoaded', () => {
    // Render projects first
    renderProjects();
    
    const elementsToAnimate = document.querySelectorAll('section, .project-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Re-observe project cards after they're rendered
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            observer.observe(card);
        });
    }, 100);
});

// Custom Cursor
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.querySelector('.custom-cursor');

    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, .btn, button').forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.style.transform = 'translate(-50%, -50%) scale(2)';
                customCursor.style.backgroundColor = 'var(--primary-alpha-50)';
                customCursor.style.borderColor = 'var(--primary-light)';
            });
            el.addEventListener('mouseleave', () => {
                customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
                customCursor.style.backgroundColor = 'transparent';
                customCursor.style.borderColor = 'var(--primary-color)';
            });
        });
    }

    const burger = document.querySelector('.burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu ul li a');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');

    if (burger && mobileMenu && navLinks) {
        burger.addEventListener('click', () => {
            mobileMenu.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });

        // Close button functionality
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                mobileMenu.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }

    // Modern form submission with email functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Add loading state
            submitBtn.classList.add('loading');
            
            try {
                // Send actual email using EmailJS
                await sendEmailNotification(data);
                
                // Success feedback
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
                
                // Remove focus from form elements
                document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
                    el.blur();
                });
                
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
            }
        });
    }
});

// Theme Switching Functionality
class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'dark-orange';
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.setupEventListeners();
        this.updateActiveThemeIndicator();
        this.updateSliderPosition();
    }
    
    getStoredTheme() {
        return localStorage.getItem('portfolio-theme');
    }
    
    setStoredTheme(theme) {
        localStorage.setItem('portfolio-theme', theme);
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        this.setStoredTheme(theme);
    }
    
    setupEventListeners() {
        const themeOptions = document.querySelectorAll('.theme-option');
        
        themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedTheme = option.getAttribute('data-theme');
                this.applyTheme(selectedTheme);
                this.updateActiveThemeIndicator();
                this.updateSliderPosition();
                
                // Close mobile menu if open
                if (option.closest('.mobile')) {
                    const mobileMenu = document.querySelector('.mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('nav-active')) {
                        mobileMenu.classList.remove('nav-active');
                        document.querySelector('.burger').classList.remove('toggle');
                    }
                }
            });
        });
    }
    
    updateActiveThemeIndicator() {
        const themeOptions = document.querySelectorAll('.theme-option');
        
        themeOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-theme') === this.currentTheme) {
                option.classList.add('active');
            }
        });
    }
    
    updateSliderPosition() {
        const sliders = document.querySelectorAll('.theme-slider');
        
        sliders.forEach(slider => {
            slider.setAttribute('data-active', this.currentTheme);
        });
    }
}

// Initialize EmailJS
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme manager
    new ThemeManager();
    
    // Check if EmailJS is loaded and configuration exists
    if (typeof emailjs !== 'undefined' && typeof EMAIL_CONFIG !== 'undefined') {
        // Initialize EmailJS with your User ID
        emailjs.init(EMAIL_CONFIG.USER_ID);
    }
});

// Real email sending function using EmailJS
async function sendEmailNotification(data) {
    // Check if EmailJS is properly configured
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS is not loaded');
    }
    
    if (typeof EMAIL_CONFIG === 'undefined') {
        throw new Error('Email configuration not found');
    }
    
    // Check if configuration is properly set
    if (EMAIL_CONFIG.USER_ID === 'YOUR_USER_ID_HERE' || 
        EMAIL_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID_HERE' || 
        EMAIL_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE') {
        throw new Error('Please configure your EmailJS credentials in email-config.js');
    }
    
    // Prepare template parameters
    const now = new Date();
    const templateParams = {
        to_name: 'Gabriel',
        user_email: 'fgabriel.mihailescu@gmail.com',
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        reply_to: data.email,
        submission_date: now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }),
        submission_time: now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        }),
        user_agent: navigator.userAgent,
        website_url: window.location.href
    };
    
    try {
        // Send email using EmailJS
        const response = await emailjs.send(
            EMAIL_CONFIG.SERVICE_ID,
            EMAIL_CONFIG.TEMPLATE_ID,
            templateParams
        );
        
        console.log('Email sent successfully:', response);
        return response;
        
    } catch (error) {
        console.error('Email sending failed:', error);
        throw error;
    }
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
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}