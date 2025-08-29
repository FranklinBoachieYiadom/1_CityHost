document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Hero Swiper
    if (typeof Swiper !== 'undefined') {
        const heroSwiper = new Swiper('.hero-swiper', {
            loop: true,
            autoplay: {
                delay: 2000,//
                disableOnInteraction: false,
            },
            effect: 'slide',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('hidden');
            
            // Toggle between hamburger and X icon if they exist
            if (menuIcon && closeIcon) {
                if (mobileMenu.classList.contains('hidden')) {
                    menuIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                } else {
                    menuIcon.classList.add('hidden');
                    closeIcon.classList.remove('hidden');
                }
            }
        });
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            const mobileMenu = document.getElementById('mobile-menu');
            
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('nav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-md');
                navbar.classList.add('bg-white');
                navbar.classList.remove('bg-opacity-95');
            } else {
                navbar.classList.remove('shadow-md');
                navbar.classList.add('bg-opacity-95');
            }
        });
    }

    // Show/Hide Events Videos Section on Button Click and toggle button text
    const viewEventsVideosBtn = document.getElementById('view-events-videos-btn');
    const eventsVideosSection = document.getElementById('events-videos-section');

    if (viewEventsVideosBtn && eventsVideosSection) {
        viewEventsVideosBtn.addEventListener('click', function() {
            const isHidden = eventsVideosSection.classList.contains('hidden');
            if (isHidden) {
                eventsVideosSection.classList.remove('hidden');
                viewEventsVideosBtn.textContent = 'Show less';
            } else {
                eventsVideosSection.classList.add('hidden');
                viewEventsVideosBtn.textContent = 'View Events Videos';
            }
        });
    }

    // Form validation
    const newsletterForm = document.getElementById('newsletter-form');
    const volunteerForm = document.getElementById('volunteer-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = document.getElementById('newsletter-email');
            
            if (emailInput && validateEmail(emailInput.value)) {
                // Success - would normally submit to server
                showFormMessage(newsletterForm, 'Thank you for subscribing!', 'success');
                emailInput.value = '';
            } else {
                // Error
                showFormMessage(newsletterForm, 'Please enter a valid email address.', 'error');
            }
        });
    }
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = document.getElementById('volunteer-name');
            const emailInput = document.getElementById('volunteer-email');
            const interestInput = document.getElementById('volunteer-interest');
            
            let isValid = true;
            let errorMessage = '';
            
            if (!nameInput || !nameInput.value.trim()) {
                isValid = false;
                errorMessage = 'Please enter your name.';
            } else if (!emailInput || !validateEmail(emailInput.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            } else if (!interestInput || !interestInput.value) {
                isValid = false;
                errorMessage = 'Please select an area of interest.';
            }
            
            if (isValid) {
                // Success - would normally submit to server
                showFormMessage(volunteerForm, 'Thank you for your interest! We\'ll be in touch soon.', 'success');
                volunteerForm.reset();
            } else {
                // Error
                showFormMessage(volunteerForm, errorMessage, 'error');
            }
        });
    }
    
    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    function showFormMessage(form, message, type) {
        // Remove any existing message
        const existingMessage = form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.classList.add('form-message', 'mt-4', 'py-2', 'px-4', 'rounded');
        
        if (type === 'success') {
            messageElement.classList.add('bg-green-100', 'text-green-800');
        } else {
            messageElement.classList.add('bg-red-100', 'text-red-800');
        }
        
        messageElement.textContent = message;
        
        // Add to form
        form.appendChild(messageElement);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }


    // Gallery filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (categoryButtons.length > 0 && galleryItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-primary-600', 'text-white');
                    btn.classList.add('bg-gray-200', 'text-gray-800');
                });
                
                // Add active class to clicked button
                this.classList.add('active', 'bg-primary-600', 'text-white');
                this.classList.remove('bg-gray-200', 'text-gray-800');
                
                const selectedCategory = this.getAttribute('data-category');
                
                // Show/hide gallery items based on category
                galleryItems.forEach(item => {
                    if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Initialize Lightbox if it exists on the page
        if (typeof lightbox !== 'undefined') {
            lightbox.option({
                'resizeDuration': 200,
                'wrapAround': true,
                'albumLabel': 'Image %1 of %2'
            });
        }
    }
});