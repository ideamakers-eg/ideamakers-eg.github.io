/**
 * Scroll Management Module
 * Handles smooth scrolling and scroll-to-top logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initScrollToTop();
});

function initSmoothScroll() {
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = 80; // Standard navbar height
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }
    });
  });
}

function initScrollToTop() {
  // Add scroll to top button dynamically
  const btn = document.createElement('button');
  btn.id = 'scroll-to-top';
  btn.innerHTML = '↑';
  btn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 z-40 flex items-center justify-center font-bold text-xl';
  document.body.appendChild(btn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('opacity-100', 'pointer-events-auto');
      btn.classList.remove('opacity-0', 'pointer-events-none');
    } else {
      btn.classList.remove('opacity-100', 'pointer-events-auto');
      btn.classList.add('opacity-0', 'pointer-events-none');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
