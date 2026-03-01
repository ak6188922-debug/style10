
document.querySelectorAll('.copyable').forEach(element => {
    element.style.cursor = 'pointer';
    element.style.transition = 'all 0.3s ease';
    
    element.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-copy');
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalContent = this.innerHTML;
            this.innerHTML = '<span style="color: #4CAF50; font-weight: bold;">✓ تم النسخ!</span>';
            
            setTimeout(() => {
                this.innerHTML = originalContent;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('فشل النسخ، حاول مرة أخرى');
        });
    });
    
    element.addEventListener('mouseenter', function() {
        this.style.color = '#111';
        this.style.fontWeight = 'bold';
        this.style.backgroundColor = '#f0f0f0';
        this.style.padding = '5px 10px';
        this.style.borderRadius = '4px';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.color = 'inherit';
        this.style.fontWeight = 'normal';
        this.style.backgroundColor = 'transparent';
        this.style.padding = '0';
    });
});
const logoTrigger = document.getElementById('logo-trigger');
const logoModal = document.getElementById('logo-modal');
const modalClose = document.getElementById('modal-close');
const modalOverlay = document.getElementById('modal-overlay');

if (logoTrigger && logoModal) {
    logoTrigger.addEventListener('click', () => {
        logoModal.classList.add('show');
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            logoModal.classList.remove('show');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', () => {
            logoModal.classList.remove('show');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            logoModal.classList.remove('show');
        }
    });
}


const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('show');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('show');
        }
    });
}


const carousel = document.getElementById('testimonial-carousel');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');

let currentIndex = 0;
const testimonialItems = carousel.querySelectorAll('.testimonial-item');
const totalItems = testimonialItems.length;

function showTestimonial(index) {
    testimonialItems.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) {
            item.classList.add('active');
        }
    });
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % totalItems;
    showTestimonial(currentIndex);
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    showTestimonial(currentIndex);
}

if (prevBtn && nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
    prevBtn.addEventListener('click', prevTestimonial);
}

showTestimonial(0);

setInterval(nextTestimonial, 5000);



// Single Page App - Navigation and Section Management
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Handle Contact Form
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً على رسالتك! سنعود إليك قريباً.');
        contactForm.reset();
    });
}

// Handle Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('شكراً على الاشتراك!');
        newsletterForm.reset();
    });
}



const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .blog-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

console.log('✅ All scripts loaded successfully!');
