/* 
   HOTEL GRAND 81 - INTERACTIVE SCRIPT
   - Top Header Auto-Sliding Ticker (Instant Load & Smooth Fade)
   - Continuous Hero Image Auto-Slider
   - Mobile Nav Toggle
   - Lightbox Gallery Modal
   - Direct WhatsApp Booking Integration
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. TOP HEADER AUTO-SLIDING TICKER (GUARANTEED IMMEDIATE DISPLAY)
    const tickerItems = document.querySelectorAll('.ticker-item');
    let currentTicker = 0;
    const tickerDuration = 3200; // Advance every 3.2 seconds

    if (tickerItems.length > 0) {
        // Ensure first item is active on load
        tickerItems.forEach((item, index) => {
            if (index === 0) item.classList.add('active');
            else item.classList.remove('active');
        });

        setInterval(() => {
            tickerItems[currentTicker].classList.remove('active');
            currentTicker = (currentTicker + 1) % tickerItems.length;
            tickerItems[currentTicker].classList.add('active');
        }, tickerDuration);
    }

    // 2. HERO CONTINUOUS AUTO-SLIDER
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 4500; // 4.5 seconds auto advance

    if (slides.length > 0) {
        if (dotsContainer) dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            if (dotsContainer) dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.slider-dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

            currentSlide = (index + slides.length) % slides.length;

            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

        function startTimer() {
            slideInterval = setInterval(nextSlide, slideDuration);
        }

        function resetTimer() {
            clearInterval(slideInterval);
            startTimer();
        }

        const heroSection = document.querySelector('.hero-slider-section');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
            heroSection.addEventListener('mouseleave', () => startTimer());
        }

        startTimer();
    }

    // 3. DATES INITIALIZATION FOR BOOKING STRIP
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput && checkoutInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        checkinInput.valueAsDate = today;
        checkoutInput.valueAsDate = tomorrow;
        checkinInput.min = today.toISOString().split('T')[0];

        checkinInput.addEventListener('change', () => {
            const minCheckout = new Date(checkinInput.value);
            minCheckout.setDate(minCheckout.getDate() + 1);
            checkoutInput.min = minCheckout.toISOString().split('T')[0];
            if (new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
                checkoutInput.valueAsDate = minCheckout;
            }
        });
    }

    // 4. MOBILE NAV TOGGLE
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                if (mobileMenuBtn.querySelector('i')) {
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }

    // 5. WHATSAPP INQUIRY BUILDER
    const quickBookingForm = document.getElementById('quickBookingForm');
    if (quickBookingForm) {
        quickBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkin = document.getElementById('checkin').value;
            const checkout = document.getElementById('checkout').value;
            const guests = document.getElementById('guests').value;
            const roomType = document.getElementById('roomType').value;

            const message = `Hello Hotel Grand 81, I would like to inquire about booking at *Hotel Grand 81*, Faridabad.%0A%0A` +
                `*Check-in:* ${checkin}%0A` +
                `*Check-out:* ${checkout}%0A` +
                `*Guests:* ${guests}%0A` +
                `*Room/Requirement:* ${roomType}%0A%0A` +
                `Please share room availability and best rates.`;

            window.open(`https://wa.me/919953035222?text=${message}`, '_blank');
        });
    }

    const fullInquiryForm = document.getElementById('fullInquiryForm');
    if (fullInquiryForm) {
        fullInquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('inqName').value;
            const phone = document.getElementById('inqPhone').value;
            const eventType = document.getElementById('inqEventType').value;
            const date = document.getElementById('inqDate').value;
            const messageText = document.getElementById('inqMessage').value;

            const message = `Hello Hotel Grand 81,%0A%0A` +
                `My name is *${name}* (${phone}).%0A` +
                `*Requirement:* ${eventType}%0A` +
                `*Target Date:* ${date}%0A` +
                `*Details:* ${messageText}%0A%0A` +
                `Sent via Hotel Grand 81 Website.`;

            window.open(`https://wa.me/919953035222?text=${message}`, '_blank');
        });
    }

    // 6. LIGHTBOX MODAL
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.getElementById('closeModal');

    document.querySelectorAll('.gallery-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const imgSrc = trigger.getAttribute('data-img');
            const caption = trigger.getAttribute('data-caption') || 'Hotel Grand 81, Sector 81 Faridabad';
            if (modal && modalImg) {
                modalImg.src = imgSrc;
                if (modalCaption) modalCaption.textContent = caption;
                modal.classList.add('active');
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // 7. ACTIVE LINK HIGHLIGHT FOR MULTI-PAGE & HASH
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const pageNavLinks = document.querySelectorAll('.nav-links a');
    
    pageNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    const hashSections = document.querySelectorAll('section[id]');
    if (hashSections.length > 0 && currentPath === 'index.html') {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            hashSections.forEach(current => {
                const sectionHeight = current.offsetHeight;
                const sectionTop = current.offsetTop - 120;
                const sectionId = current.getAttribute('id');
                const navLink = document.querySelector(`.nav-links a[href*="#${sectionId}"]`);

                if (navLink) {
                    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                        navLink.classList.add('active');
                    }
                }
            });
        });
    }
});
