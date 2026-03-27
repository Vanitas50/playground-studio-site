const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const progressItems = Array.from(document.querySelectorAll("[data-progress-item]"));
const progressValue = document.getElementById("progressValue");
const progressCount = document.getElementById("progressCount");
const progressBar = document.getElementById("progressBar");

const themeKey = "erlang-campus-theme";
const progressKey = "erlang-campus-progress";

function applyTheme(theme) {
  body.classList.toggle("dark", theme === "dark");
}

function loadTheme() {
  const storedTheme = localStorage.getItem(themeKey);
  if (storedTheme) {
    applyTheme(storedTheme);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

function saveProgress() {
  const checkedStates = progressItems.map((item) => item.checked);
  localStorage.setItem(progressKey, JSON.stringify(checkedStates));
}

function updateProgress() {
  const completed = progressItems.filter((item) => item.checked).length;
  const total = progressItems.length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  if (progressValue) {
    progressValue.textContent = `${percentage}%`;
  }

  if (progressCount) {
    progressCount.textContent = String(completed);
  }

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
}

function loadProgress() {
  const stored = localStorage.getItem(progressKey);
  if (!stored) {
    updateProgress();
    return;
  }

  try {
    const states = JSON.parse(stored);
    progressItems.forEach((item, index) => {
      item.checked = Boolean(states[index]);
    });
  } catch (error) {
    console.error("Fortschritt konnte nicht geladen werden.", error);
  }

  updateProgress();
}

loadTheme();
loadProgress();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
  });
}

progressItems.forEach((item) => {
  item.addEventListener("change", () => {
    saveProgress();
    updateProgress();
  });
});
