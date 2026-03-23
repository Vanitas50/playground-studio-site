const body = document.body;
const toggle = document.querySelector('.theme-toggle');
const yearEl = document.getElementById('year');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

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

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (formStatus) {
      formStatus.textContent = 'Nachricht wird gesendet …';
      formStatus.className = 'form-status';
    }

    const formData = new FormData(contactForm);
    formData.append('_subject', 'Neue Projektanfrage über playground.studio');
    formData.append('_captcha', 'false');

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || result.success === 'false') {
        throw new Error(result.message || 'Failed to send');
      }

      if (formStatus) {
        formStatus.textContent = result.message || 'Danke! Wir melden uns in Kürze.';
        formStatus.classList.add('is-success');
      }

      contactForm.reset();
    } catch (error) {
      if (formStatus) {
        formStatus.textContent =
          error.message || 'Ups, das hat nicht geklappt. Bitte versuche es später erneut.';
        formStatus.classList.add('is-error');
      }
      console.error(error);
    }
  });
}
