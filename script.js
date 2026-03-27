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
      console.error("Could not load saved progress.", error);
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
    quizMessage.textContent = "Start with the first question and work your way through.";
  } else if (solved < quizCards.length) {
    quizMessage.textContent = "Good. Keep going. Active recall is exactly the right move.";
  } else {
    quizMessage.textContent = "Strong work. You solved every question. Repeat them tomorrow for long-term retention.";
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
                feedback.textContent = "Correct. You recognized the core idea.";
              }
            } else if (feedback) {
              feedback.textContent = "Not yet. Think back to the core model from this lesson.";
            }
          }
        });
      }
    });
  } catch (error) {
    console.error("Could not load saved quiz state.", error);
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
          ? "Correct. You recognized the core idea."
          : "Not yet. Read the memory line from the matching lesson again and try once more.";
      }

      saveQuizState();
      updateQuizScore();
    });
  });
});
