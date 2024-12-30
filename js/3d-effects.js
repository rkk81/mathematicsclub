// 3D Effects and Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all effects
    initializeEffects();
});

function initializeEffects() {
    // Add smooth scroll behavior
    initSmoothScroll();
    
    // Initialize hero section parallax
    initHeroParallax();
    
    // Initialize card hover effects
    initCardEffects();
}

function initSmoothScroll() {
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
}

function initHeroParallax() {
    const hero = document.querySelector('.hero-3d');
    if (!hero) return;

    let ticking = false;
    
    document.addEventListener('mousemove', function(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                // Calculate movement (reduced intensity for subtlety)
                const moveX = (clientX - innerWidth / 2) / innerWidth * 5;
                const moveY = (clientY - innerHeight / 2) / innerHeight * 5;
                
                // Apply transform
                hero.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

function initCardEffects() {
    const cards = document.querySelectorAll('.subject-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply fade-in animation to cards and sections
document.querySelectorAll('.card-3d, .subject-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeInObserver.observe(el);
});

// Handle loading state
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    const loader = document.querySelector('.loader-3d');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});
