// Nataloé Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
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

    // Scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Product filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-sage', 'text-white');
                btn.classList.add('bg-beige', 'text-forest');
            });
            this.classList.add('active', 'bg-sage', 'text-white');
            this.classList.remove('bg-beige', 'text-forest');
            
            // Filter products
            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 500,
                        easing: 'easeOutQuad'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: 0,
                        translateY: -20,
                        duration: 300,
                        easing: 'easeInQuad',
                        complete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation feedback
            anime({
                targets: this,
                scale: [1, 0.95, 1],
                duration: 200,
                easing: 'easeInOutQuad'
            });
            
            // Change text temporarily
            const originalText = this.textContent;
            this.textContent = 'Ajouté !';
            this.style.backgroundColor = '#2D5016';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 1500);
            
            // Show notification (you can expand this)
            showNotification('Produit ajouté au panier !');
        });
    });

    // FAQ accordion (if needed for future expansion)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            // Add any accordion functionality here if needed
            anime({
                targets: this,
                scale: [1, 1.02, 1],
                duration: 300,
                easing: 'easeInOutQuad'
            });
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Merci pour votre inscription !');
                this.querySelector('input[type="email"]').value = '';
            }
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('#accueil');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Particle system for hero background
    let particles = [];
    let canvas, ctx;

    function initParticles() {
        canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        
        ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        animateParticles();
    }

    function animateParticles() {
        if (!ctx || !canvas) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(135, 169, 107, ${particle.opacity})`;
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    // Initialize particles when page loads
    setTimeout(initParticles, 1000);

    // Resize handler for canvas
    window.addEventListener('resize', () => {
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });

    // Utility function for notifications
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-sage text-white px-6 py-3 rounded-full shadow-lg z-50 transform translate-x-full';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        anime({
            targets: notification,
            translateX: [100, 0],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });

        // Animate out after delay
        setTimeout(() => {
            anime({
                targets: notification,
                translateX: [0, 100],
                opacity: [1, 0],
                duration: 300,
                easing: 'easeInQuad',
                complete: () => {
                    document.body.removeChild(notification);
                }
            });
        }, 3000);
    }

    // Ingredient icon hover effects
    const ingredientIcons = document.querySelectorAll('.ingredient-icon');
    ingredientIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            anime({
                targets: this.querySelector('.organic-shape'),
                scale: 1.1,
                rotate: '5deg',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        icon.addEventListener('mouseleave', function() {
            anime({
                targets: this.querySelector('.organic-shape'),
                scale: 1,
                rotate: '0deg',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Testimonial cards animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -5,
                boxShadow: '0 20px 40px rgba(135, 169, 107, 0.2)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Blog cards animation
    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -8,
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });

        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });

    // Mobile menu toggle (if needed)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scroll to top when logo is clicked
    const logo = document.querySelector('img[alt="Nataloé"]');
    if (logo) {
        logo.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            anime({
                targets: this,
                opacity: [0, 1],
                duration: 500,
                easing: 'easeOutQuad'
            });
        });
    });

    // Initialize scroll position
    window.addEventListener('load', function() {
        // Reveal elements that are already in view
        const revealedElements = document.querySelectorAll('.scroll-reveal');
        revealedElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('revealed');
            }
        });
    });

    console.log('Nataloé website initialized successfully! 🌿');
});