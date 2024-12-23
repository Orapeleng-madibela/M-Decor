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
        slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    // Stop the slideshow
    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    // Initialize the slideshow if there are slides
    if (slides.length > 0) {
        startSlideshow();

        // Pause slideshow when hovering over it
        const slideshowContainer = document.querySelector('.slideshow-container');
        slideshowContainer.addEventListener('mouseenter', stopSlideshow);
        slideshowContainer.addEventListener('mouseleave', startSlideshow);
    }

    // Form submission
    const bookingForm = document.getElementById('booking-form');
    const contactForm = document.getElementById('contact-form');

    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        // Send form data to the server
        fetch('process.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                form.reset();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        });
    }

    // Add form submission event listeners
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});
