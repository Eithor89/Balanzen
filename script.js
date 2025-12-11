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

    // --- Strategy Map Arrows Logic ---
    function drawArrows() {
        const svg = document.getElementById('bsc-arrows');
        if (!svg) return;

        // Clear existing arrows
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        const connections = [
            // Learning -> Internal
            { start: 'obj-capacitar', end: 'obj-talento' },
            { start: 'obj-capacitar', end: 'obj-seguridad' },
            { start: 'obj-talento', end: 'obj-marca' },
            { start: 'obj-talento', end: 'obj-experiencia' },

            // Internal -> Customer
            { start: 'obj-espera', end: 'obj-experiencia' },
            { start: 'obj-digital', end: 'obj-espera' },
            { start: 'obj-digital', end: 'obj-seguridad' },
            { start: 'obj-tech', end: 'obj-experiencia' },
            { start: 'obj-tech', end: 'obj-digital' },
            { start: 'obj-tech', end: 'obj-espera' },
            { start: 'obj-seguridad', end: 'obj-experiencia' },

            // Customer -> Financial
            { start: 'obj-experiencia', end: 'obj-clientes' },
            { start: 'obj-experiencia', end: 'obj-marca' },
            { start: 'obj-marca', end: 'obj-clientes' },
            { start: 'obj-clientes', end: 'obj-ingresos' },

            // Financial
            { start: 'obj-ingresos', end: 'obj-rentabilidad' },
            { start: 'obj-rentabilidad', end: 'obj-centros' }
        ];

        const containerRect = document.querySelector('.bsc-container').getBoundingClientRect();

        // Create marker definition
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', 'arrowhead');
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '7');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '3.5');
        marker.setAttribute('orient', 'auto');
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
        polygon.setAttribute('fill', '#0e4b5a');
        marker.appendChild(polygon);
        defs.appendChild(marker);
        svg.appendChild(defs);

        connections.forEach(conn => {
            const startEl = document.getElementById(conn.start);
            const endEl = document.getElementById(conn.end);

            if (startEl && endEl) {
                const startRect = startEl.getBoundingClientRect();
                const endRect = endEl.getBoundingClientRect();

                // Logic: Arrows go from Bottom Cards (Start) UP to Top Cards (End)
                // Start Point: Top Center of Start Card
                // End Point: Bottom Center of End Card

                const startX = startRect.left + startRect.width / 2 - containerRect.left;
                const startY = startRect.top - containerRect.top;

                const endX = endRect.left + endRect.width / 2 - containerRect.left;
                const endY = endRect.bottom - containerRect.top;

                const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                // Curvy lines Bezier
                const diffY = endY - startY;
                const controlY1 = startY + diffY * 0.5;
                const controlY2 = endY - diffY * 0.5;

                const d = `M ${startX} ${startY} C ${startX} ${controlY1}, ${endX} ${controlY2}, ${endX} ${endY}`;

                path.setAttribute('d', d);
                path.setAttribute('stroke', '#0e4b5a');
                path.setAttribute('stroke-width', '2');
                path.setAttribute('fill', 'none');
                path.setAttribute('marker-end', 'url(#arrowhead)');
                path.setAttribute('opacity', '0.5');

                svg.appendChild(path);
            }
        });
    }

    // Run drawArrows if container exists
    if (document.getElementById('bsc-arrows')) {
        // Initial draw
        setTimeout(drawArrows, 100);

        // Resize listener
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(drawArrows, 100);
        });
    }
});
