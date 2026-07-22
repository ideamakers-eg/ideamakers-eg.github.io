/**
 * Theme Management Module
 * Handles Light/Dark mode switching
 */

const themeToggle = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize theme
setTheme(currentTheme);

function toggleTheme() {
  if (currentTheme === 'light') {
    setTheme('dark');
  } else {
    setTheme('light');
  }
}

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  
  if (theme === 'dark') {
    document.body.classList.add('bg-slate-900', 'text-slate-100');
    document.body.classList.remove('bg-slate-50', 'text-slate-900');
  } else {
    document.body.classList.remove('bg-slate-900', 'text-slate-100');
    document.body.classList.add('bg-slate-50', 'text-slate-900');
  }
  
  localStorage.setItem('theme', theme);
  console.log(`Theme set to: ${theme}`);
}

// Optional: System preference listener
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});
