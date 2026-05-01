/**
 * ISAAC OGUNWALE - INTERACTION ENGINE v2.1
 * Optimized for local file loading and mobile touch.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mark body as loaded to trigger fallback visibility if needed
    document.body.classList.add('loaded');

    // 2. Custom Cursor (Desktop Only)
    if (window.innerWidth > 768) {
        const cursor = document.getElementById('cursor');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.display = 'block';
        });

        // Hover effects
        const interactiveElements = document.querySelectorAll('a, button, .bento-item, .glass');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(3)';
                cursor.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.backgroundColor = 'var(--primary)';
            });
        });
    }

    // 3. Reveal on Scroll
    const reveals = document.querySelectorAll('.reveal');
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
        // Instant show for elements already in view
        const rect = reveal.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            reveal.classList.add('active');
        }
    });

    // 4. Smooth Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
