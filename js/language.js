/**
 * Language Management Module
 * Handles RTL/LTR switching and translation logic
 */

const langToggle = document.getElementById('lang-toggle');
let currentLang = document.documentElement.lang || 'ar';

langToggle.addEventListener('click', () => {
  toggleLanguage();
});

function toggleLanguage() {
  if (currentLang === 'ar') {
    setLanguage('en');
  } else {
    setLanguage('ar');
  }
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
  
  // Update UI text (simple implementation for base structure)
  updateUIText(lang);
  
  // Store preference
  localStorage.setItem('preferred-lang', lang);
}

function updateUIText(lang) {
  // In a real app, this would use a translation map
  console.log(`Switching UI to: ${lang}`);
  
  // Example: Update specific elements if needed
  // This is a placeholder for the architect's structure
}

// Initialize from storage
const savedLang = localStorage.getItem('preferred-lang');
if (savedLang && savedLang !== currentLang) {
  setLanguage(savedLang);
}
