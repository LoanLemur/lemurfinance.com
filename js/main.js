document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveals
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.classList.contains('reveal')) {
                    el.classList.add('reveal--visible');
                }
                if (el.classList.contains('reveal-stagger')) {
                    el.classList.add('reveal-stagger--visible');
                }
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        observer.observe(el);
    });

    // Header compact on scroll
    const header = document.querySelector('.header');
    if (header) {
        let scrolled = false;
        window.addEventListener('scroll', () => {
            const past = window.scrollY > 80;
            if (past !== scrolled) {
                scrolled = past;
                header.classList.toggle('header--scrolled', past);
            }
        }, { passive: true });
    }
});
