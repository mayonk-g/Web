// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeCustomizer = document.getElementById('themeCustomizer');
const closeCustomizer = document.getElementById('closeCustomizer');
const colorOptions = document.querySelectorAll('.color-option');
const darkModeToggle = document.getElementById('darkModeToggle');
const animatedBgToggle = document.getElementById('animatedBgToggle');
const resetThemeBtn = document.getElementById('resetTheme');
const changePhotoBtn = document.getElementById('changePhotoBtn');
const profileUpload = document.getElementById('profileUpload');
const profileImage = document.getElementById('profileImage');
const profileImageContainer = document.getElementById('profileImageContainer');

// Initialize current year
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

// Load saved theme from localStorage
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'blue';
    const darkMode = localStorage.getItem('darkMode') === 'true';
    const animatedBg = localStorage.getItem('animatedBg') !== 'false'; // Default to true
    
    // Apply theme
    document.body.setAttribute('data-theme', savedTheme);
    
    // Apply dark mode
    if (darkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
    
    // Apply animated background
    if (animatedBgToggle) {
        animatedBgToggle.checked = animatedBg;
        toggleAnimatedBackground(animatedBg);
    }
    
    // Highlight selected color option
    colorOptions.forEach(option => {
        if (option.dataset.theme === savedTheme) {
            option.style.borderColor = 'white';
            option.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.5)';
        }
    });
    
    // Animate skill bars
    setTimeout(animateSkillBars, 500);
}

// Save theme to localStorage
function saveTheme(theme, darkMode, animatedBg) {
    localStorage.setItem('theme', theme);
    localStorage.setItem('darkMode', darkMode);
    localStorage.setItem('animatedBg', animatedBg);
}

// Animate skill bars
function animateSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    skillProgressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = `${level}%`;
    });
}

// Toggle animated background
function toggleAnimatedBackground(enabled) {
    const heroSection = document.querySelector('.hero');
    if (enabled) {
        heroSection.style.animation = 'gradientShift 15s ease infinite';
        // Add CSS for gradient animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientShift {
                0% { background: linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%); }
                50% { background: linear-gradient(135deg, var(--dark) 0%, var(--primary) 100%); }
                100% { background: linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%); }
            }
        `;
        document.head.appendChild(style);
    } else {
        heroSection.style.animation = 'none';
    }
}

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

// Theme Customizer Toggle
themeToggleBtn.addEventListener('click', () => {
    themeCustomizer.classList.toggle('active');
});

closeCustomizer.addEventListener('click', () => {
    themeCustomizer.classList.remove('active');
});

// Color theme selection
colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        document.body.setAttribute('data-theme', theme);
        
        // Update selection style
        colorOptions.forEach(opt => {
            opt.style.borderColor = 'transparent';
            opt.style.boxShadow = 'none';
        });
        option.style.borderColor = 'white';
        option.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.5)';
        
        // Save theme
        const darkMode = document.body.classList.contains('dark-mode');
        const animatedBg = animatedBgToggle ? animatedBgToggle.checked : true;
        saveTheme(theme, darkMode, animatedBg);
        
        // Show notification
        showNotification(`Theme changed to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`, 'success');
    });
});

// Dark mode toggle
if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        
        // Save theme
        const theme = document.body.getAttribute('data-theme');
        const animatedBg = animatedBgToggle ? animatedBgToggle.checked : true;
        saveTheme(theme, darkModeToggle.checked, animatedBg);
        
        // Show notification
        const mode = darkModeToggle.checked ? 'Dark Mode' : 'Light Mode';
        showNotification(`${mode} activated`, 'info');
    });
}

// Animated background toggle
if (animatedBgToggle) {
    animatedBgToggle.addEventListener('change', () => {
        toggleAnimatedBackground(animatedBgToggle.checked);
        
        // Save theme
        const theme = document.body.getAttribute('data-theme');
        const darkMode = document.body.classList.contains('dark-mode');
        saveTheme(theme, darkMode, animatedBgToggle.checked);
        
        // Show notification
        const status = animatedBgToggle.checked ? 'enabled' : 'disabled';
        showNotification(`Animated background ${status}`, 'info');
    });
}

// Reset theme
resetThemeBtn.addEventListener('click', () => {
    // Reset to default theme
    document.body.setAttribute('data-theme', 'blue');
    document.body.classList.remove('dark-mode');
    
    // Reset toggles
    if (darkModeToggle) darkModeToggle.checked = false;
    if (animatedBgToggle) {
        animatedBgToggle.checked = true;
        toggleAnimatedBackground(true);
    }
    
    // Reset selection style
    colorOptions.forEach(option => {
        option.style.borderColor = 'transparent';
        option.style.boxShadow = 'none';
        if (option.dataset.theme === 'blue') {
            option.style.borderColor = 'white';
            option.style.boxShadow = '0 0 0 3px rgba(255,255,255,0.5)';
        }
    });
    
    // Save theme
    saveTheme('blue', false, true);
    
    // Show notification
    showNotification('Theme reset to default', 'success');
    
    // Close customizer
    themeCustomizer.classList.remove('active');
});

// Profile picture change
changePhotoBtn.addEventListener('click', () => {
    profileUpload.click();
});

profileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
            
            // Save to localStorage
            localStorage.setItem('profileImage', e.target.result);
            
            // Show notification
            showNotification('Profile picture updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }
});

// Load saved profile picture from localStorage
function loadProfilePicture() {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImage.src = savedImage;
    }
}

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
            box-shadow: var(--shadow);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        }
        
        .notification-info {
            background-color: var(--secondary);
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

// Close theme customizer when clicking outside
document.addEventListener('click', (e) => {
    if (!themeCustomizer.contains(e.target) && 
        !themeToggleBtn.contains(e.target) && 
        themeCustomizer.classList.contains('active')) {
        themeCustomizer.classList.remove('active');
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadProfilePicture();
    animateSkillBars();
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // Initialize header scroll effect
    window.dispatchEvent(new Event('scroll'));
});
