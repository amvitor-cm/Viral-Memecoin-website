// Main JavaScript for MEME Coin Website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Connect Wallet Modal
    const connectWalletBtn = document.getElementById('connect-wallet-btn');
    const walletModal = document.getElementById('wallet-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (connectWalletBtn && walletModal) {
        connectWalletBtn.addEventListener('click', function() {
            walletModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
        
        closeModal.addEventListener('click', function() {
            walletModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        walletModal.addEventListener('click', function(e) {
            if (e.target === walletModal) {
                walletModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Wallet option buttons
        const walletOptions = document.querySelectorAll('.wallet-option');
        walletOptions.forEach(option => {
            option.addEventListener('click', function() {
                // In a real implementation, this would connect to the wallet
                alert('Wallet connection functionality would be implemented here!');
                walletModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form handling
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // In a real implementation, this would submit the form
                alert('Form submitted successfully! (This is a demo)');
                this.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                this.reset();
            }
        });
    }
    
    // Copy contract address functionality
    const copyBtn = document.getElementById('copy-address');
    const contractAddress = document.getElementById('contract-address');
    
    if (copyBtn && contractAddress) {
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(contractAddress.textContent)
                .then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    copyBtn.style.background = 'var(--secondary-color)';
                    
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                        copyBtn.style.background = 'var(--primary-color)';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    }
    
    // Animation JavaScript
    // Animated counters
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    };
    
    // Animated tokenomics charts
    const animateCharts = () => {
        const charts = document.querySelectorAll('.chart');
        
        charts.forEach(chart => {
            const percent = chart.getAttribute('data-percent');
            
            // Start animation when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        chart.style.background = `conic-gradient(var(--primary-color) 0% ${percent}%, #e9ecef ${percent}% 100%)`;
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(chart);
        });
    };
    
    // Initialize animations
    animateCounters();
    animateCharts();
    
    // Add scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.tokenomic-item, .roadmap-phase, .gallery-item, .feature, .exchange-link');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    };
    
    animateOnScroll();
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add glow effect to buttons on hover
    const buttons = document.querySelectorAll('.btn, .connect-wallet-btn, .wallet-option');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(255, 107, 107, 0.7)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
});