// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Blog card click handlers
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        card.addEventListener('click', function() {
            // In a real blog, this would navigate to the full post
            const title = this.querySelector('.blog-title').textContent;
            alert(`点击了文章: "${title}"\n\n在实际博客中，这里会跳转到完整的文章页面。`);
        });
    });

    // Contact link handlers
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        if (link.href === '#' || link.href.endsWith('#')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const linkText = this.querySelector('span:last-child').textContent;
                alert(`${linkText}功能开发中...\n\n感谢您的关注！`);
            });
        }
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animation
    const animateElements = document.querySelectorAll('.blog-card, .stat, .contact-link');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add some interactive hover effects
    const blogImages = document.querySelectorAll('.blog-image');
    blogImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Add a simple particle effect to the hero section
function createParticle() {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255, 255, 255, 0.6)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    particle.style.animation = `floatUp ${3 + Math.random() * 4}s linear infinite`;
    
    hero.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 7000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex !important;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.98);
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

document.head.appendChild(style);

// Start particle effect
setInterval(createParticle, 500);