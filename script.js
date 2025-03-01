// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle mobile menu when burger icon is clicked
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate nav links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animate burger icon
        burger.classList.toggle('toggle');
    });

    // Slideshow functionality
    const slides = document.querySelectorAll('.slideshow-slide');
    const prevButton = document.querySelector('.slideshow-prev');
    const nextButton = document.querySelector('.slideshow-next');
    const dotsContainer = document.querySelector('.slideshow-dots');
    let currentSlide = 0;
    let slideInterval;

    // Create dots for each slide
    if (slides.length > 0 && dotsContainer) {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('slideshow-dot');
            dot.addEventListener('click', () => showSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slideshow-dot');

        // Function to show a specific slide
        function showSlide(n) {
            slides[currentSlide].style.display = 'none';
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].style.display = 'block';
            dots[currentSlide].classList.add('active');
        }

        // Function to show the next slide
        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // Function to show the previous slide
        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // Event listeners for prev and next buttons
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }

        // Start the slideshow
        function startSlideshow() {
            showSlide(0);
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        // Stop the slideshow
        function stopSlideshow() {
            clearInterval(slideInterval);
        }

        // Initialize the slideshow if there are slides
        startSlideshow();

        // Pause slideshow when hovering over it
        const slideshowContainer = document.querySelector('.slideshow-container');
        if (slideshowContainer) {
            slideshowContainer.addEventListener('mouseenter', stopSlideshow);
            slideshowContainer.addEventListener('mouseleave', startSlideshow);
        }
    }

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Form submission with Formspree
    const bookingForm = document.getElementById('booking-form');
    const contactForm = document.getElementById('contact-form');

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formAction = form.getAttribute('action');
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<div class="loading"></div>';
        submitButton.disabled = true;
        
        try {
            const response = await fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            const data = await response.json();
            
            // Remove any existing messages
            const existingMessage = form.querySelector('.form-success, .form-error');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            // Create message element
            const messageElement = document.createElement('div');
            
            if (response.ok) {
                messageElement.className = 'form-success';
                messageElement.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your form has been submitted successfully.';
                form.reset();
            } else {
                messageElement.className = 'form-error';
                messageElement.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! There was a problem submitting your form.';
            }
            
            // Insert message at the top of the form
            form.insertBefore(messageElement, form.firstChild);
            
            // Scroll to the message
            messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
        } catch (error) {
            console.error('Error:', error);
            
            // Create error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'form-error';
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> An error occurred. Please try again later.';
            
            // Insert error at the top of the form
            form.insertBefore(errorMessage, form.firstChild);
        } finally {
            // Restore button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    };

    // Add form submission event listeners
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Price calculator functionality
    const calculatePriceButton = document.getElementById('calculate-price');
    
    if (calculatePriceButton) {
        // Event type change handler
        const eventTypeSelect = document.getElementById('event-type');
        const tablesSection = document.getElementById('tables-section');
        const guestsPerTableSection = document.getElementById('guests-per-table-section');
        const funeralGuestsSection = document.getElementById('funeral-guests-section');
        
        if (eventTypeSelect) {
            eventTypeSelect.addEventListener('change', () => {
                const selectedEvent = eventTypeSelect.value;
                
                if (selectedEvent === 'funeral') {
                    tablesSection.classList.add('hidden');
                    guestsPerTableSection.classList.add('hidden');
                    funeralGuestsSection.classList.remove('hidden');
                } else {
                    tablesSection.classList.remove('hidden');
                    guestsPerTableSection.classList.remove('hidden');
                    funeralGuestsSection.classList.add('hidden');
                }
            });
        }
        
        // Calculate price
        calculatePriceButton.addEventListener('click', () => {
            const eventType = document.getElementById('event-type').value;
            const serviceType = document.getElementById('service-type').value;
            let totalPrice = 0;
            
            // Base prices
            const basePrices = {
                wedding: {
                    basic: 5000,
                    standard: 8000,
                    premium: 12000,
                    luxury: 20000
                },
                graduation: {
                    basic: 3000,
                    standard: 5000,
                    premium: 8000,
                    luxury: 12000
                },
                funeral: {
                    basic: 2500,
                    standard: 4000,
                    premium: 6000,
                    luxury: 9000
                },
                corporate: {
                    basic: 4000,
                    standard: 7000,
                    premium: 10000,
                    luxury: 15000
                },
                birthday: {
                    basic: 2000,
                    standard: 3500,
                    premium: 5500,
                    luxury: 8000
                },
                other: {
                    basic: 3000,
                    standard: 5000,
                    premium: 8000,
                    luxury: 12000
                }
            };
            
            if (!eventType || !serviceType) {
                alert('Please select an event type and service package.');
                return;
            }
            
            // Get base price
            if (basePrices[eventType] && basePrices[eventType][serviceType]) {
                totalPrice = basePrices[eventType][serviceType];
            }
            
            // Calculate based on tables or guests
            if (eventType === 'funeral') {
                const funeralGuests = parseInt(document.getElementById('funeral-guests').value) || 0;
                // Add P50 per guest for funeral
                totalPrice += funeralGuests * 50;
            } else {
                const tables = parseInt(document.getElementById('tables').value) || 0;
                const guestsPerTable = parseInt(document.getElementById('guests-per-table').value) || 0;
                
                // Add P300 per table
                totalPrice += tables * 300;
                
                // Add P30 per guest
                totalPrice += tables * guestsPerTable * 30;
            }
            
            // Display the result
            const priceResult = document.getElementById('price-result');
            const priceAmount = document.getElementById('price-amount');
            
            if (priceResult && priceAmount) {
                priceAmount.textContent = `P${totalPrice.toLocaleString()}`;
                priceResult.classList.remove('hidden');
                
                // Scroll to the result
                priceResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Add animation
                priceAmount.style.animation = 'none';
                setTimeout(() => {
                    priceAmount.style.animation = 'pulse 2s';
                }, 10);
            }
        });
    }

    // URL parameter handling for pre-selecting event type
    const getUrlParameter = (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    };
    
    // Pre-select event type on booking page
    const eventTypeParam = getUrlParameter('service');
    const eventTypeSelect = document.getElementById('event-type');
    
    if (eventTypeParam && eventTypeSelect) {
        const option = Array.from(eventTypeSelect.options).find(opt => opt.value === eventTypeParam);
        if (option) {
            eventTypeSelect.value = eventTypeParam;
            
            // Trigger change event to update form
            const event = new Event('change');
            eventTypeSelect.dispatchEvent(event);
        }
    }
});
