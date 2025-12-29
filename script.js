// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Sending your message...', 'info');
        
        // In a real implementation, you would send this data to a server
        setTimeout(() => {
            // Success notification
            showNotification(`Thank you, ${name}! Your message has been sent. I'll get back to you at ${email} as soon as possible.`, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Log form data to console (for demonstration)
            console.log('Form submitted:', { name, email, subject, message });
        }, 1500);
    });
}

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles for notification
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        }
        
        .notification-info {
            background-color: #3498db;
        }
        
        .notification-success {
            background-color: #2ecc71;
        }
        
        .notification-error {
            background-color: #e74c3c;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: 15px;
            font-size: 16px;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    // Append styles and notification to body
    document.head.appendChild(notificationStyles);
    document.body.appendChild(notification);
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Calculate scroll position (accounting for fixed header)
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Set current year in footer
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }
});

// Skill bars animation on scroll
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class to skill categories
            const skillCategories = document.querySelectorAll('.skill-category');
            skillCategories.forEach((category, index) => {
                setTimeout(() => {
                    category.classList.add('animate');
                }, index * 200);
            });
            
            // Add animation class to project cards
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 200);
            });
        }
    });
}, observerOptions);

// Observe skills and projects sections
const skillsSection = document.getElementById('skills');
const projectsSection = document.getElementById('projects');

if (skillsSection) observer.observe(skillsSection);
if (projectsSection) observer.observe(projectsSection);

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .skill-category, .project-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .skill-category.animate, .project-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);

// Initialize with header scroll effect on page load
window.dispatchEvent(new Event('scroll'));
