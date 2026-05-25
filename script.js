// Theme toggle
const toggle = document.getElementById('theme-toggle');
function setTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark');
    toggle.textContent = '☀️';
  } else {
    document.documentElement.classList.remove('dark');
    toggle.textContent = '🌙';
  }
  localStorage.setItem('prefers-dark', dark ? '1' : '0');
}

toggle.addEventListener('click', () => {
  const isDark = document.documentElement.classList.contains('dark');
  setTheme(!isDark);
});

// Initialize theme
const savedTheme = localStorage.getItem('prefers-dark');
const prefersDark = savedTheme !== null ? savedTheme === '1' : window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(prefersDark);

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Simple fade-in animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
