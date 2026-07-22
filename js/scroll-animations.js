class ScrollAnimationManager {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    // Once revealed, we can stop observing
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        this.revealElements.forEach(el => observer.observe(el));
    }
}

window.scrollAnimationManager = new ScrollAnimationManager();
