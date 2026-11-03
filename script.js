// ============================================
// Scroll Progress Indicator
// ============================================
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

function updateScrollProgress() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
}

window.addEventListener('scroll', updateScrollProgress);
updateScrollProgress();

// ============================================
// Dark Mode Toggle
// ============================================
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeIcon = document.getElementById('darkModeIcon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateDarkModeIcon(currentTheme);

darkModeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateDarkModeIcon(newTheme);
});

function updateDarkModeIcon(theme) {
    if (theme === 'dark') {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    } else {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    }
}

// ============================================
// Mobile Navigation Menu
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('.section, .hero');
const navLinksArray = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Typing Animation for Hero Name
// ============================================
const typingText = document.getElementById('typingText');
const name = 'Manish Baviskar';
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentText = typingText.textContent;
    
    if (!isDeleting && charIndex < name.length) {
        typingText.textContent = name.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    } else if (isDeleting && charIndex > 0) {
        typingText.textContent = name.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else if (charIndex === name.length) {
        isDeleting = true;
        typingSpeed = 2000; // Wait before deleting
    } else if (charIndex === 0 && isDeleting) {
        isDeleting = false;
        typingSpeed = 500; // Wait before typing again
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(() => {
        typeWriter();
    }, 1000);
});

// ============================================
// Initialize AOS (Animate On Scroll)
// ============================================
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ============================================
// Skills Progress Bar Animation
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkillBars() {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = width + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Initialize skill bar animations
animateSkillBars();

// ============================================
// Publications/Patents Tabs
// ============================================
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        const targetContent = document.getElementById(`${targetTab}-tab`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ============================================
// Visiting Card QR Code
// ============================================
const siteUrl = 'https://manish-baviskar.com/';
const siteDomain = siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
const vcardQr = document.getElementById('vcardQr');
const vcardQrUrl = document.getElementById('vcardQrUrl');
const vcardQrBlock = document.getElementById('vcardQrBlock');
let cardQr = null;

if (vcardQr && typeof qrcode === 'function') {
    cardQr = qrcode(0, 'M');
    cardQr.addData(siteUrl);
    cardQr.make();

    vcardQr.innerHTML = cardQr.createSvgTag({
        cellSize: 4,
        margin: 16,
        scalable: true,
        title: 'QR code for ' + siteUrl
    });
    vcardQrUrl.textContent = siteDomain;
} else if (vcardQrBlock) {
    // QR library failed to load - hide the empty QR box
    vcardQrBlock.style.display = 'none';
}

// ============================================
// Visiting Card Download (PNG / PDF) & Share
// ============================================
const cardFileName = 'Manish_Baviskar_Visiting_Card';
const jsPdfSrc = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/4.2.1/jspdf.umd.min.js';
const jsPdfIntegrity = 'sha384-qovJwSBbRDPP5cEjCp8S0UP66wrvnjaa60XMOGzTNanrThcrGfXfnZkvgY8N1KT3';
const downloadCardPngBtn = document.getElementById('downloadCardPng');
const downloadCardPdfBtn = document.getElementById('downloadCardPdf');
const shareCardBtn = document.getElementById('shareCard');
let cardCanvasPromise = null;
let jsPdfPromise = null;
let cardShareFile = null;

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('Failed to load ' + src));
        img.src = src;
    });
}

// Shrinks the font size until the text fits within maxWidth
function setFittedFont(ctx, text, weight, size, family, maxWidth) {
    do {
        ctx.font = `${weight} ${size}px ${family}`;
        size -= 1;
    } while (ctx.measureText(text).width > maxWidth && size > 10);
}

// Draws a 3.5in x 2in business card (1050 x 600 at 300 dpi, rendered at 2x).
// Always uses the light theme so the image looks the same wherever it is shared or printed.
async function drawVisitingCard() {
    const width = 1050;
    const height = 600;
    const scale = 2;

    const [photo] = await Promise.all([
        loadImage('manish-profile-photo.jpeg'),
        document.fonts.load('600 44px Poppins'),
        document.fonts.load('400 24px "Open Sans"'),
        document.fonts.load('900 22px "Font Awesome 6 Free"')
    ]);

    const canvas = document.createElement('canvas');
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    // Background, border and top accent bar
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#dee2e6';
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, width - 2, height - 2);
    const accent = ctx.createLinearGradient(0, 0, width, 0);
    accent.addColorStop(0, '#007bff');
    accent.addColorStop(1, '#0056b3');
    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, width, 14);

    // Round profile photo with a blue ring
    const photoX = 135;
    const photoY = 165;
    const photoR = 70;
    ctx.beginPath();
    ctx.arc(photoX, photoY, photoR + 6, 0, Math.PI * 2);
    ctx.fillStyle = '#007bff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(photoX, photoY, photoR + 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.save();
    ctx.beginPath();
    ctx.arc(photoX, photoY, photoR, 0, Math.PI * 2);
    ctx.clip();
    const crop = Math.min(photo.naturalWidth, photo.naturalHeight);
    ctx.drawImage(
        photo,
        (photo.naturalWidth - crop) / 2, (photo.naturalHeight - crop) / 2, crop, crop,
        photoX - photoR, photoY - photoR, photoR * 2, photoR * 2
    );
    ctx.restore();

    // Name and title
    const textX = 235;
    const textMaxWidth = 650 - textX;
    ctx.fillStyle = '#212529';
    setFittedFont(ctx, 'Manish Baviskar', 600, 44, 'Poppins', textMaxWidth);
    ctx.fillText('Manish Baviskar', textX, 160);
    ctx.fillStyle = '#007bff';
    setFittedFont(ctx, 'Pharmaceutical Validation Engineer', 600, 22, 'Poppins', textMaxWidth);
    ctx.fillText('Pharmaceutical Validation Engineer', textX, 198);

    ctx.fillStyle = '#dee2e6';
    ctx.fillRect(65, 270, 585, 2);

    // Contact rows: Font Awesome icon + text
    const contactRows = [
        ['', '409-433-7961'],
        ['', 'manishdbaviskar@gmail.com'],
        ['', siteDomain],
        ['', 'South Bend, IN 46628']
    ];
    ctx.textBaseline = 'middle';
    contactRows.forEach(([icon, text], index) => {
        const y = 325 + index * 62;
        ctx.textAlign = 'center';
        ctx.fillStyle = '#007bff';
        ctx.font = '900 22px "Font Awesome 6 Free"';
        ctx.fillText(icon, 80, y);
        ctx.textAlign = 'left';
        ctx.fillStyle = '#495057';
        ctx.font = '400 24px "Open Sans"';
        ctx.fillText(text, 115, y);
    });

    // QR code column
    if (cardQr) {
        ctx.fillStyle = '#dee2e6';
        ctx.fillRect(700, 70, 2, 460);

        const centerX = 875;
        const boxSize = 250;
        const boxX = centerX - boxSize / 2;
        const boxY = 120;
        ctx.beginPath();
        if (ctx.roundRect) {
            ctx.roundRect(boxX, boxY, boxSize, boxSize, 12);
        } else {
            ctx.rect(boxX, boxY, boxSize, boxSize);
        }
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();

        // Whole-pixel modules keep the code sharp and scannable
        const moduleCount = cardQr.getModuleCount();
        const cell = Math.floor((boxSize - 30) / moduleCount);
        const qrOffset = Math.floor((boxSize - cell * moduleCount) / 2);
        ctx.fillStyle = '#000000';
        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (cardQr.isDark(row, col)) {
                    ctx.fillRect(boxX + qrOffset + col * cell, boxY + qrOffset + row * cell, cell, cell);
                }
            }
        }

        ctx.textAlign = 'center';
        ctx.fillStyle = '#212529';
        ctx.font = '600 22px Poppins';
        ctx.fillText('Scan to visit my website', centerX, 415);
        ctx.fillStyle = '#6c757d';
        ctx.font = '400 18px "Open Sans"';
        ctx.fillText(siteDomain, centerX, 450);
    }

    return canvas;
}

function getCardCanvas() {
    if (!cardCanvasPromise) {
        cardCanvasPromise = drawVisitingCard().catch(error => {
            cardCanvasPromise = null; // allow a retry on the next click
            throw error;
        });
    }
    return cardCanvasPromise;
}

function canvasToBlob(canvas, type) {
    return new Promise((resolve, reject) => {
        canvas.toBlob(blob => (blob ? resolve(blob) : reject(new Error('Could not create image'))), type);
    });
}

function downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// jsPDF is only loaded the first time someone downloads the PDF
function loadJsPdf() {
    if (!jsPdfPromise) {
        jsPdfPromise = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = jsPdfSrc;
            script.integrity = jsPdfIntegrity;
            script.crossOrigin = 'anonymous';
            script.onload = () => resolve(window.jspdf.jsPDF);
            script.onerror = () => {
                jsPdfPromise = null;
                reject(new Error('Failed to load PDF library'));
            };
            document.head.appendChild(script);
        });
    }
    return jsPdfPromise;
}

function flashButtonLabel(button, text) {
    const label = button.querySelector('span');
    label.dataset.label = label.dataset.label || label.textContent;
    label.textContent = text;
    setTimeout(() => {
        label.textContent = label.dataset.label;
    }, 2500);
}

// Disables the button while working and shows a short message if something fails
async function runCardAction(button, action) {
    button.disabled = true;
    try {
        await action();
    } catch (error) {
        // AbortError means the visitor closed the share sheet
        if (error.name !== 'AbortError') {
            console.error(error);
            flashButtonLabel(button, 'Please try again');
        }
    } finally {
        button.disabled = false;
    }
}

downloadCardPngBtn.addEventListener('click', () => runCardAction(downloadCardPngBtn, async () => {
    const canvas = await getCardCanvas();
    downloadBlob(await canvasToBlob(canvas, 'image/png'), cardFileName + '.png');
}));

downloadCardPdfBtn.addEventListener('click', () => runCardAction(downloadCardPdfBtn, async () => {
    const [canvas, jsPDF] = await Promise.all([getCardCanvas(), loadJsPdf()]);
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'in', format: [3.5, 2] });
    pdf.setProperties({ title: 'Manish Baviskar - Visiting Card' });
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, 3.5, 2);
    pdf.save(cardFileName + '.pdf');
}));

// Pre-render the card image so the share sheet opens instantly -
// browsers refuse to open it if the click handler first waits on slow work
window.addEventListener('load', () => {
    getCardCanvas()
        .then(canvas => canvasToBlob(canvas, 'image/png'))
        .then(blob => {
            cardShareFile = new File([blob], cardFileName + '.png', { type: 'image/png' });
        })
        .catch(() => {}); // Share falls back to sending just the link
});

shareCardBtn.addEventListener('click', () => runCardAction(shareCardBtn, async () => {
    const shareData = {
        title: 'Manish Baviskar | Pharmaceutical Validation Engineer',
        text: 'Manish Baviskar - Pharmaceutical Validation Engineer',
        url: siteUrl
    };

    if (cardShareFile && navigator.canShare && navigator.canShare({ files: [cardShareFile] })) {
        await navigator.share({ ...shareData, files: [cardShareFile] });
    } else if (navigator.share) {
        await navigator.share(shareData);
    } else {
        await navigator.clipboard.writeText(siteUrl);
        flashButtonLabel(shareCardBtn, 'Link copied!');
    }
}));

// ============================================
// Contact Form Validation and Submission
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
        showAlert('Please fill in all fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    console.log('Form submitted:', { name, email, message });
    
    // Show success message
    showAlert('Thank you for your message! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

function showAlert(message, type) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `form-alert ${type}`;
    alert.textContent = message;
    alert.style.cssText = `
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 5px;
        background-color: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
    `;
    
    // Insert alert before form
    contactForm.insertBefore(alert, contactForm.firstChild);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        alert.remove();
    }, 5000);
}

// ============================================
// Scroll to Top Button (Optional Enhancement)
// ============================================
let scrollToTopBtn = null;

function createScrollToTopButton() {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px var(--shadow);
        transition: var(--transition);
        z-index: 999;
    `;
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 6px 20px var(--shadow-hover)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px var(--shadow)';
    });
    
    document.body.appendChild(scrollToTopBtn);
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (!scrollToTopBtn) {
        createScrollToTopButton();
    }
    
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// ============================================
// Update Copyright Year
// ============================================
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = currentYear;
}

// ============================================
// Lazy Loading Images (if any images are added later)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Performance: Debounce scroll events
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy functions if needed
const debouncedScrollHandler = debounce(() => {
    // Any scroll-based calculations can go here
}, 10);

// ============================================
// Add smooth fade-in on page load
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Console welcome message
// ============================================
console.log('%cWelcome to Manish Baviskar\'s Portfolio!', 'color: #007bff; font-size: 20px; font-weight: bold;');
console.log('%cPharmaceutical Validation Engineer | South Bend, IN', 'color: #6c757d; font-size: 14px;');
