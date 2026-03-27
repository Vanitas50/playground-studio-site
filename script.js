const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const progressItems = Array.from(document.querySelectorAll("[data-progress-item]"));
const progressValue = document.getElementById("progressValue");
const progressCount = document.getElementById("progressCount");
const progressTotal = document.getElementById("progressTotal");
const progressBar = document.getElementById("progressBar");
const quizCards = Array.from(document.querySelectorAll("[data-quiz-card]"));
const quizScore = document.getElementById("quizScore");
const quizTotal = document.getElementById("quizTotal");
const quizMessage = document.getElementById("quizMessage");

const themeKey = "erlang-campus-theme";
const progressKey = "erlang-campus-progress";
const quizKey = "erlang-campus-quiz";

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

  if (progressTotal) {
    progressTotal.textContent = String(total);
  }

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }
}

function saveProgress() {
  localStorage.setItem(
    progressKey,
    JSON.stringify(progressItems.map((item) => item.checked)),
  );
}

function loadProgress() {
  const stored = localStorage.getItem(progressKey);

  if (stored) {
    try {
      const states = JSON.parse(stored);
      progressItems.forEach((item, index) => {
        item.checked = Boolean(states[index]);
      });
    } catch (error) {
      console.error("Fortschritt konnte nicht geladen werden.", error);
    }
  }

  updateProgress();
}

function updateQuizScore() {
  const solved = quizCards.filter((card) => card.dataset.solved === "true").length;

  if (quizScore) {
    quizScore.textContent = String(solved);
  }

  if (quizTotal) {
    quizTotal.textContent = String(quizCards.length);
  }

  if (!quizMessage) {
    return;
  }

  if (solved === 0) {
    quizMessage.textContent = "Starte mit der ersten Frage und arbeite dich durch.";
  } else if (solved < quizCards.length) {
    quizMessage.textContent = "Gut. Halte das Tempo. Aktives Erinnern ist genau der richtige Weg.";
  } else {
    quizMessage.textContent = "Stark. Alle Fragen geloest. Wiederhole sie morgen noch einmal fuer Langzeiteffekt.";
  }
}

function saveQuizState() {
  const state = quizCards.map((card) => ({
    solved: card.dataset.solved === "true",
    choice: card.dataset.choice || "",
  }));

  localStorage.setItem(quizKey, JSON.stringify(state));
}

function applyQuizState() {
  const stored = localStorage.getItem(quizKey);
  if (!stored) {
    updateQuizScore();
    return;
  }

  try {
    const state = JSON.parse(stored);
    quizCards.forEach((card, cardIndex) => {
      const cardState = state[cardIndex];
      if (!cardState) {
        return;
      }

      const options = Array.from(card.querySelectorAll(".quiz-option"));
      const feedback = card.querySelector(".quiz-feedback");

      if (cardState.choice) {
        options.forEach((option) => {
          if (option.textContent === cardState.choice) {
            const isCorrect = option.dataset.correct === "true";
            option.classList.add(isCorrect ? "is-correct" : "is-wrong");
            if (isCorrect) {
              card.dataset.solved = "true";
              if (feedback) {
                feedback.textContent = "Richtig. Du hast das Kernprinzip erkannt.";
              }
            } else if (feedback) {
              feedback.textContent = "Noch nicht. Denk an das Grundmodell dieser Lektion.";
            }
          }
        });
      }
    });
  } catch (error) {
    console.error("Quiz-Status konnte nicht geladen werden.", error);
  }

  updateQuizScore();
}

loadTheme();
loadProgress();
applyQuizState();

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

quizCards.forEach((card) => {
  const options = Array.from(card.querySelectorAll(".quiz-option"));
  const feedback = card.querySelector(".quiz-feedback");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((entry) => {
        entry.classList.remove("is-correct", "is-wrong");
      });

      const isCorrect = option.dataset.correct === "true";
      option.classList.add(isCorrect ? "is-correct" : "is-wrong");
      card.dataset.choice = option.textContent || "";
      card.dataset.solved = isCorrect ? "true" : "false";

      if (feedback) {
        feedback.textContent = isCorrect
          ? "Richtig. Du hast das Kernprinzip erkannt."
          : "Noch nicht. Lies den Merksatz der passenden Lektion erneut und versuche es dann nochmal.";
      }

      saveQuizState();
      updateQuizScore();
    });
  });
});
