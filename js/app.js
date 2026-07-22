/**
 * Main Application Entry Point
 * IDEA Makers PlayStation POS Landing Page
 */

document.addEventListener('DOMContentLoaded', () => {
  console.log('IDEA Makers Landing Page Initialized');
  
  // Initialize all modules
  initNavbar();
  initAnimations();
});

function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('bg-white/95', 'shadow-sm');
      navbar.classList.remove('bg-white/80');
    } else {
      navbar.classList.remove('bg-white/95', 'shadow-sm');
      navbar.classList.add('bg-white/80');
    }
  });
}

function initAnimations() {
  // Simple entry animation trigger
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0');
    observer.observe(section);
  });
}
