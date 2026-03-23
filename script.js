const body = document.body;
const toggle = document.querySelector('.theme-toggle');
const yearEl = document.getElementById('year');

const prefersLight = window.matchMedia('(prefers-color-scheme: light)');
const storedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  if (theme === 'light') {
    body.classList.add('light');
  } else {
    body.classList.remove('light');
  }
}

const initialTheme = storedTheme || (prefersLight.matches ? 'light' : 'dark');
applyTheme(initialTheme);

if (toggle) {
  toggle.addEventListener('click', () => {
    const nextTheme = body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
