// ===================================
// Theme Management
// ===================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ===================================
// Logo Image Handler
// ===================================

// Check if logo image exists and show it
const logoImage = document.getElementById('logoImage');
const brandIcon = document.getElementById('brandIcon');
const footerLogoImage = document.getElementById('footerLogoImage');

function checkLogoImage() {
    const img = new Image();
    img.onload = function() {
        if (logoImage) {
            logoImage.style.display = 'block';
        }
        if (brandIcon) {
            brandIcon.style.display = 'none';
        }
        if (footerLogoImage) {
            footerLogoImage.style.display = 'block';
            const footerIcon = footerLogoImage.nextElementSibling;
            if (footerIcon && footerIcon.classList.contains('brand-icon')) {
                footerIcon.style.display = 'none';
            }
        }
    };
    img.onerror = function() {
        if (logoImage) {
            logoImage.style.display = 'none';
        }
        if (brandIcon) {
            brandIcon.style.display = 'flex';
        }
    };
    img.src = 'Assets/Images/logo.png';
}

checkLogoImage();

// ===================================
// Navigation Scroll Effect
// ===================================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-md)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Mobile Menu Toggle
// ===================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link Highlighting
// ===================================

const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink();

// ===================================
// Hire Modal Functionality
// ===================================

const modal = document.getElementById('hireModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const hireBtns = document.querySelectorAll('.hire-btn, .hire-btn-nav, #hireBtnContact');

// Open modal
hireBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ===================================
// Form Validation
// ===================================

const hireForm = document.getElementById('hireForm');
const submitBtn = document.getElementById('submitBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

// Character counter for description
const projectDescription = document.getElementById('projectDescription');
const charCount = document.getElementById('charCount');

if (projectDescription && charCount) {
    projectDescription.addEventListener('input', () => {
        const count = projectDescription.value.length;
        charCount.textContent = count;
        
        if (count > 1000) {
            charCount.style.color = 'var(--secondary-color)';
        } else {
            charCount.style.color = 'var(--text-muted)';
        }
    });
}

// ===================================
// PHONE INPUT - ENHANCED VERSION
// ===================================

const clientPhone = document.getElementById('clientPhone');

if (clientPhone) {
    console.log('✅ Phone Input Element Found:', clientPhone);
    
    // Prevent any non-numeric characters
    clientPhone.addEventListener('input', (e) => {
        // Remove any non-digit characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Limit to 11 digits
        if (value.length > 11) {
            value = value.substring(0, 11);
        }
        
        e.target.value = value;
        console.log('📱 Phone value after input:', value, '| Length:', value.length);
        
        // Auto-validate on typing
        if (value.length > 0) {
            const error = validatePhone(value);
            if (error) {
                showError('clientPhone', 'phoneError', error);
            } else {
                clearError('clientPhone', 'phoneError');
            }
        }
    });
    
    // Prevent pasting more than 11 digits
    clientPhone.addEventListener('paste', (e) => {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const digits = pastedText.replace(/\D/g, '').substring(0, 11);
        clientPhone.value = digits;
        console.log('📋 Pasted phone value:', digits, '| Length:', digits.length);
        
        // Validate after paste
        const error = validatePhone(digits);
        if (error) {
            showError('clientPhone', 'phoneError', error);
        } else {
            clearError('clientPhone', 'phoneError');
        }
    });
    
    // Prevent typing non-numeric characters
    clientPhone.addEventListener('keypress', (e) => {
        const char = String.fromCharCode(e.which);
        if (!/[0-9]/.test(char)) {
            e.preventDefault();
            console.log('❌ Non-numeric character blocked:', char);
        }
    });
} else {
    console.error('❌ Phone input element not found!');
}

// ===================================
// Validation functions
// ===================================

function validateName(name) {
    const trimmed = name.trim();
    if (trimmed.length < 3) {
        return 'Name must be at least 3 characters';
    }
    if (trimmed.length > 50) {
        return 'Name must be less than 50 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
        return 'Name can only contain letters and spaces';
    }
    return null;
}

function validateEmail(email) {
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!trimmed) {
        return 'Email is required';
    }
    if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid email address';
    }
    return null;
}

function validatePhone(phone) {
    const trimmed = phone.trim();
    const phoneRegex = /^\d+$/;
    
    console.log('🔍 Validating phone:', trimmed, '| Length:', trimmed.length);
    
    if (!trimmed) {
        return 'Phone number is required';
    }
    if (!phoneRegex.test(trimmed)) {
        return 'Please enter numbers only';
    }
    const digits = trimmed.replace(/\D/g, '');
    if (digits.length !== 11) {
        return `Phone number must be exactly 11 digits (current: ${digits.length})`;
    }
    return null;
}

function validateSelect(value, fieldName) {
    if (!value || value === '') {
        return `Please select a ${fieldName}`;
    }
    return null;
}

function validateDescription(description) {
    const trimmed = description.trim();
    if (trimmed.length < 50) {
        return 'Description must be at least 50 characters';
    }
    if (trimmed.length > 1000) {
        return 'Description must be less than 1000 characters';
    }
    return null;
}

function validateURL(url) {
    if (!url || url.trim() === '') {
        return null; // URL is optional
    }
    
    try {
        new URL(url);
        return null;
    } catch (e) {
        return 'Please enter a valid URL (e.g., https://example.com)';
    }
}

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input && error) {
        input.classList.add('error');
        error.textContent = message;
        error.classList.add('active');
        console.log(`❌ Error shown for ${inputId}:`, message);
    }
}

function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    
    if (input && error) {
        input.classList.remove('error');
        error.classList.remove('active');
        console.log(`✅ Error cleared for ${inputId}`);
    }
}

// Real-time validation
const validationRules = {
    clientName: { validate: validateName, errorId: 'nameError' },
    clientEmail: { validate: validateEmail, errorId: 'emailError' },
    clientPhone: { validate: validatePhone, errorId: 'phoneError' },
    projectType: { validate: (val) => validateSelect(val, 'project type'), errorId: 'projectTypeError' },
    budget: { validate: (val) => validateSelect(val, 'budget range'), errorId: 'budgetError' },
    timeline: { validate: (val) => validateSelect(val, 'timeline'), errorId: 'timelineError' },
    projectDescription: { validate: validateDescription, errorId: 'descriptionError' },
    referenceLink: { validate: validateURL, errorId: 'linkError' }
};

Object.keys(validationRules).forEach(fieldId => {
    const field = document.getElementById(fieldId);
    const rule = validationRules[fieldId];
    
    if (field) {
        field.addEventListener('blur', () => {
            const error = rule.validate(field.value);
            if (error) {
                showError(fieldId, rule.errorId, error);
            } else {
                clearError(fieldId, rule.errorId);
            }
        });
        
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                const error = rule.validate(field.value);
                if (!error) {
                    clearError(fieldId, rule.errorId);
                }
            }
        });
    }
});

// ===================================
// Google Sheets Integration - FIXED ✅
// ===================================

// ⚠️ مهم جداً: استبدل هذا الرابط برابط Google Apps Script الخاص بك
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_QnLZ7m7JNyPGGKQn1IIKIXQRjUC06W5x3GbPQXygcGxxE64Kocpeo5XWeugi-5eDQA/exec';

async function submitToGoogleSheets(formData) {
    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify(formData)
        });

        // طالما وصل هنا يبقى الإرسال تم
        return { status: "success" };

    } catch (error) {
        console.error("❌ Error submitting to Google Sheets:", error);
        throw error;
    }
}


// ===================================
// Form Submission - UPDATED ✅
// ===================================

hireForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    console.log('📝 Form submitted - Starting validation...');
    
    // Validate all fields
    let hasErrors = false;
    const formData = {};
    
    Object.keys(validationRules).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const rule = validationRules[fieldId];
        const error = rule.validate(field.value);
        
        if (error) {
            showError(fieldId, rule.errorId, error);
            hasErrors = true;
            console.log(`❌ Validation failed for ${fieldId}:`, error);
        } else {
            clearError(fieldId, rule.errorId);
            formData[fieldId] = field.value.trim();
            console.log(`✅ Validation passed for ${fieldId}`);
        }
    });
    
    // Add country code to phone number
    const countryCode = document.getElementById('countryCode').value;
    const fullPhone = countryCode + formData.clientPhone;
    formData.clientPhone = fullPhone;
    
    console.log('📞 Full phone number:', fullPhone);
    
    if (hasErrors) {
        console.log('❌ Form has errors - submission blocked');
        showNotification('Please fix all errors before submitting', 'error');
        return;
    }
    
    console.log('✅ All validations passed - proceeding with submission');
    console.log('📦 Final form data:', formData);
    
    // Show loading overlay
    loadingOverlay.classList.add('active');
    submitBtn.disabled = true;
    
    try {
        console.log('🚀 Submitting to Google Sheets...');
        
        // Submit to Google Sheets
        const result = await submitToGoogleSheets(formData);
        
        console.log('✅ Submission successful:', result);
        
        // Show success message
        showSuccessMessage();
         
        // Reset form and close modal
        setTimeout(() => {
            hireForm.reset();
            charCount.textContent = '0';
            closeModal();
            loadingOverlay.classList.remove('active');
            submitBtn.disabled = false;
        }, 2000);
        
    } catch (error) {
        console.error('❌ Submission error:', error);
        loadingOverlay.classList.remove('active');
        submitBtn.disabled = false;
        
        showNotification(
            'There was an error submitting your request. Please try the WhatsApp button or contact us directly.', 
            'error'
        );
    }
});

// ===================================
// WhatsApp Integration
// ===================================

const whatsappBtn = document.getElementById('whatsappBtn');

whatsappBtn.addEventListener('click', () => {
    console.log('💬 WhatsApp button clicked');
    
    const formData = new FormData(hireForm);
    const data = {};
    
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Validate required fields
    let hasErrors = false;
    
    Object.keys(validationRules).forEach(fieldId => {
        if (fieldId === 'referenceLink') return;
        
        const field = document.getElementById(fieldId);
        const rule = validationRules[fieldId];
        const error = rule.validate(field.value);
        
        if (error) {
            showError(fieldId, rule.errorId, error);
            hasErrors = true;
        }
    });
    
    if (hasErrors) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }
    
    // Add country code to phone number
    const countryCode = document.getElementById('countryCode').value;
    data.clientPhone = countryCode + data.clientPhone;
    
    sendWhatsAppMessage(data);
});

function sendWhatsAppMessage(data) {
    const phoneNumber = '201229131503';
    
    let message = `*New Project Request from Portfolio*\n\n`;
    message += `👤 *Name:* ${data.clientName}\n`;
    message += `📧 *Email:* ${data.clientEmail}\n`;
    message += `📱 *Phone:* ${data.clientPhone}\n\n`;
    message += `💼 *Project Type:* ${getProjectTypeLabel(data.projectType)}\n`;
    message += `💰 *Budget:* ${getBudgetLabel(data.budget)}\n`;
    message += `📅 *Timeline:* ${getTimelineLabel(data.timeline)}\n\n`;
    message += `📝 *Project Description:*\n${data.projectDescription}\n`;
    
    if (data.referenceLink && data.referenceLink.trim() !== '') {
        message += `\n🔗 *Reference Link:* ${data.referenceLink}`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log('📱 Opening WhatsApp with message');
    window.open(whatsappURL, '_blank');
}

// ===================================
// Helper Functions for Form Labels
// ===================================

function getProjectTypeLabel(value) {
    const labels = {
        'website': 'Full Website',
        'landing': 'Landing Page',
        'webapp': 'Web Application',
        'redesign': 'Website Redesign',
        'maintenance': 'Maintenance & Updates',
        'other': 'Other'
    };
    return labels[value] || value;
}

function getBudgetLabel(value) {
    const labels = {
        'small': '$300 - $800',
        'medium': '$800 - $2000',
        'large': '$2000 - $5000',
        'enterprise': '$5000+'
    };
    return labels[value] || value;
}

function getTimelineLabel(value) {
    const labels = {
        'urgent': '1-2 Weeks (Urgent)',
        'normal': '1 Month',
        'flexible': '2-3 Months',
        'longterm': '3+ Months'
    };
    return labels[value] || value;
}

// ===================================
// Notification System
// ===================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? 'var(--secondary-color)' : 'var(--primary-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 3001;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}" style="font-size: 1.5rem;"></i>
            <p style="margin: 0; font-size: 0.95rem;">${message}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, #25D366 0%, #1EBE56 100%);
        color: white;
        padding: 2.5rem 3.5rem;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        z-index: 3002;
        text-align: center;
        animation: slideUp 0.3s ease;
    `;
    successDiv.innerHTML = `
        <i class="fas fa-check-circle" style="font-size: 4rem; margin-bottom: 1rem; display: block;"></i>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Request Sent Successfully! ✨</h3>
        <p style="font-size: 1rem; opacity: 0.95; margin: 0;">I'll get back to you within 24 hours</p>
    `;
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translate(-50%, -50%) scale(0.9)';
        successDiv.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 3000);
}

// ===================================
// Intersection Observer for Animations
// ===================================

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

const animatedElements = document.querySelectorAll('.skill-category, .project-card, .detail-item');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===================================
// Profile Image Handler
// ===================================

const profileImage = document.getElementById('profileImage');
const profileImagePlaceholder = document.getElementById('profileImagePlaceholder');

if (profileImage && profileImage.src && !profileImage.src.includes('Meeeeeeeeeee.jpeg')) {
    const img = new Image();
    img.onload = function() {
        profileImage.style.display = 'block';
        profileImagePlaceholder.style.display = 'none';
    };
    img.onerror = function() {
        profileImage.style.display = 'none';
        profileImagePlaceholder.style.display = 'flex';
    };
    img.src = profileImage.src;
} else if (profileImage && profileImage.src.includes('Meeeeeeeeeee.jpeg')) {
    const img = new Image();
    img.onload = function() {
        profileImage.style.display = 'block';
        profileImagePlaceholder.style.display = 'none';
    };
    img.onerror = function() {
        profileImage.style.display = 'none';
        profileImagePlaceholder.style.display = 'flex';
    };
    img.src = 'Assets/Images/Meeeeeeeeeee.jpeg';
}

// ===================================
// Parallax Effect for Hero Orbs
// ===================================

const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        const yPos = -(scrolled * speed);
        orb.style.transform = `translateY(${yPos}px)`;
    });
});

// ===================================
// Dynamic Year in Footer
// ===================================

const currentYear = new Date().getFullYear();
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = currentYear;
}

// ===================================
// Counter Animation for Stats
// ===================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const isPercentage = element.textContent.includes('%');
    const hasPlus = element.textContent.includes('+');
    const targetNum = parseInt(target);
    const increment = targetNum / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= targetNum) {
            element.textContent = targetNum + (hasPlus ? '+' : '') + (isPercentage ? '%' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (isPercentage ? '%' : '');
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const target = parseInt(text);
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// Add slide animations for notifications
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Console Message
// ===================================

console.log('%c👋 Welcome to my Portfolio!', 'font-size: 24px; font-weight: bold; color: #4A90E2;');
console.log('%c💼 Looking for a talented Front-End Developer?', 'font-size: 16px; color: #6B7280;');
console.log('%c📧 Contact: otaher237@gmail.com', 'font-size: 14px; color: #FF6B6B;');
console.log('%c🚀 Built with passion and modern web technologies', 'font-size: 12px; color: #4ECDC4;');

// ===================================
// IMPORTANT NOTE للمطور
// ===================================
console.log(`
%c⚠️ تعليمات مهمة للمطور ⚠️
`, 'color: #FF6B6B; font-size: 16px; font-weight: bold;');

console.log(`
%c1. استبدل GOOGLE_SCRIPT_URL برابط Google Apps Script الخاص بك (السطر 344)
%c2. تأكد من نشر السكريبت كـ "Web app" مع:
   - Execute as: Me
   - Who has access: Anyone
%c3. انسخ رابط الـ deployment واستبدله
%c4. اختبر الفورم بعد التعديل
`, 
'color: #4A90E2; font-size: 12px;',
'color: #4ECDC4; font-size: 12px;',
'color: #FF8787; font-size: 12px;',
'color: #25D366; font-size: 12px;'
);

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
});