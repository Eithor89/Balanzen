document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animations (Fade In Up) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-up');
    animatedElements.forEach(el => observer.observe(el));

    // --- Parallax Background Effect ---
    const parallaxBg = document.getElementById('parallax-bg');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Move the background slightly based on scroll position
        // We translate Y a fraction of the scroll amount to create depth
        parallaxBg.style.transform = `translateY(${scrollY * 0.2}px)`;
    });

    // --- Form Handling ---
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simulate form submission
        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerText;

        btn.innerText = 'Enviando...';
        btn.disabled = true;

        setTimeout(() => {
            alert('¡Gracias! Hemos recibido tu solicitud. Nos pondremos en contacto contigo pronto.');
            form.reset();
            btn.innerText = originalText;
            btn.disabled = false;
        }, 1500);
    });

    // --- Carousel Logic ---
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    // --- Smooth Scroll for Anchor Links (Optional enhancement) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
