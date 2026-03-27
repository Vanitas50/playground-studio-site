const body = document.body;
const html = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const langToggles = Array.from(document.querySelectorAll(".lang-toggle"));
const progressItems = Array.from(document.querySelectorAll("[data-progress-item]"));
const progressValue = document.getElementById("progressValue");
const progressCount = document.getElementById("progressCount");
const progressTotal = document.getElementById("progressTotal");
const progressBar = document.getElementById("progressBar");
const quizCards = Array.from(document.querySelectorAll("[data-quiz-card]"));
const quizScore = document.getElementById("quizScore");
const quizTotal = document.getElementById("quizTotal");
const quizMessage = document.getElementById("quizMessage");
const descriptionMeta = document.querySelector('meta[name="description"]');
const ogTitleMeta = document.querySelector('meta[property="og:title"]');
const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');

const themeKey = "erlang-campus-theme";
const languageKey = "erlang-campus-language";
const progressKey = "erlang-campus-progress";
const quizKey = "erlang-campus-quiz";

const translations = {
  en: {
    meta: {
      title: "Erlang Campus | Complete Erlang Course",
      description:
        "A complete Erlang course with lessons, quizzes, mini challenges, a guided roadmap, and motivating progress tracking.",
      ogTitle: "Erlang Campus | Complete Erlang Course",
      ogDescription:
        "Learn Erlang step by step with syntax, recursion, processes, OTP, and distributed systems.",
      locale: "en_US",
    },
    quiz: {
      start: "Start with the first question and work your way through.",
      progress: "Good. Keep going. Active recall is exactly the right move.",
      complete:
        "Strong work. You solved every question. Repeat them tomorrow for long-term retention.",
      correct: "Correct. You recognized the core idea.",
      wrong: "Not yet. Read the memory line from the matching lesson again and try once more.",
      wrongShort: "Not yet. Think back to the core model from this lesson.",
    },
    text: {
      "nav.aria": "Main navigation",
      "nav.start": "Start",
      "nav.roadmap": "Roadmap",
      "nav.lessons": "Lessons",
      "nav.quiz": "Quiz",
      "nav.projects": "Projects",
      "lang.aria": "Language switcher",
      "theme.mode": "Mode",
      "theme.aria": "Switch color theme",
      "hero.eyebrow": "A complete Erlang course built for real learning",
      "hero.title": "Learn Erlang in a way that makes it stick and makes it fun.",
      "hero.lead":
        "This course takes you from the basics to OTP and distributed systems in small, clear stages. Every stage combines understanding, repetition, application, and visible progress.",
      "hero.start": "Start the course",
      "hero.today": "Today's mission",
      "hero.metricsAria": "Course metrics",
      "hero.modules": "Modules",
      "hero.lessons": "Lessons",
      "hero.checks": "Checks",
      "hero.projects": "Mini projects",
      "hero.why": "Why this course works",
      "hero.card1Title": "1. Understand",
      "hero.card1Body": "Each lesson begins with a clear mental model instead of dry theory.",
      "hero.card2Title": "2. Recall",
      "hero.card2Body": "Memory lines and quiz questions reinforce what you just learned.",
      "hero.card3Title": "3. Apply",
      "hero.card3Body": "Mini challenges push you to think like an Erlang engineer.",
      "today.eyebrow": "Today's mission",
      "today.title": "Twenty focused minutes beat two chaotic hours.",
      "today.body":
        "Follow this order today: read one lesson, solve one mini challenge, then answer the quiz. That sequence creates much stronger retention.",
      "today.step1": "Read today's lesson",
      "today.step2": "Walk through one code example actively",
      "today.step3": "Solve one challenge",
      "today.step4": "Finish the quick quiz",
      "roadmap.eyebrow": "Roadmap",
      "roadmap.title": "The course is divided into six learnable stages.",
      "roadmap.progress": "Overall progress",
      "roadmap.of": "of",
      "roadmap.steps": "learning steps completed",
      "roadmap.card1Title": "Think in values",
      "roadmap.card1Body":
        "Atoms, tuples, lists, pattern matching, and the mindset behind immutable data.",
      "roadmap.card2Title": "Think in functions",
      "roadmap.card2Body":
        "Guards, recursion, and case-based logic instead of classic loops.",
      "roadmap.card3Title": "Think in processes",
      "roadmap.card3Body":
        "Lightweight processes, mailboxes, messages, and asynchronous collaboration.",
      "roadmap.card4Title": "Think in resilience",
      "roadmap.card4Body":
        "Links, monitors, supervisors, and the logic behind let it crash.",
      "roadmap.card5Title": "Think in patterns",
      "roadmap.card5Body":
        "Workers, pipelines, state isolation, and common Erlang architecture patterns.",
      "roadmap.card6Title": "Think in systems",
      "roadmap.card6Body":
        "Nodes, distribution, deployment, and why BEAM is so strong in production.",
      "roadmap.checklistAria": "Course progress",
      "roadmap.check1": "Module 1 completed",
      "roadmap.check2": "Module 2 completed",
      "roadmap.check3": "Module 3 completed",
      "roadmap.check4": "Module 4 completed",
      "roadmap.check5": "Module 5 completed",
      "roadmap.check6": "Module 6 completed",
      "roadmap.check7": "Mini project 1 completed",
      "roadmap.check8": "Mini project 2 completed",
      "roadmap.check9": "Mini project 3 completed",
      "roadmap.check10": "Syntax quiz passed",
      "roadmap.check11": "Recursion quiz passed",
      "roadmap.check12": "Process quiz passed",
      "roadmap.check13": "OTP quiz passed",
      "roadmap.check14": "Review round 1 completed",
      "roadmap.check15": "Review round 2 completed",
      "roadmap.check16": "Course fully completed",
      "lessons.eyebrow": "Lessons",
      "lessons.title": "Every module combines a model, a rule, an example, and a challenge.",
      "lessons.body": "That is how understanding replaces memorization.",
      "common.challenge": "Mini challenge",
      "m1.label": "Module 1",
      "m1.title": "Syntax and data types",
      "m1.l1t": "Lesson 1: Atoms, numbers, strings",
      "m1.l1b":
        "Erlang clearly separates atoms like ok, numbers like 42, and binaries like <<\"hi\">>.",
      "m1.l1m":
        "Memory line: An atom often describes meaning, a binary often carries actual data.",
      "m1.l2t": "Lesson 2: Pattern matching",
      "m1.l2b":
        "Pattern matching is not just comparison. It is structured unpacking of values.",
      "m1.l2m": "Memory line: Erlang always asks, Does the shape fit?",
      "m1.challenge":
        "Which parts of {error, timeout} can you extract directly with pattern matching?",
      "m2.label": "Module 2",
      "m2.title": "Functions, guards, and recursion",
      "m2.l1t": "Lesson 3: Multiple function heads",
      "m2.l1b":
        "A function can have multiple shapes. Erlang checks them from top to bottom.",
      "m2.l1m": "Memory line: First pattern, then guard, then function body.",
      "m2.l2t": "Lesson 4: Guards",
      "m2.l2b":
        "Guards make rules readable and keep logic out of the body when possible.",
      "m2.l2m": "Memory line: Guards clarify cases before work begins.",
      "m2.l3t": "Lesson 5: Recursion instead of loops",
      "m2.l3b": "In Erlang, recursion is the normal way to move through data.",
      "m2.l3m": "Memory line: Every recursion needs a start, a step, and an end.",
      "m2.challenge":
        "Mentally design a function all_even/1 that returns true only if every element is even.",
      "m3.label": "Module 3",
      "m3.title": "Processes and message passing",
      "m3.l1t": "Lesson 6: Starting processes",
      "m3.l1b":
        "An Erlang process is extremely lightweight and owns its own state.",
      "m3.l1m": "Memory line: Do not share state, send messages.",
      "m3.l2t": "Lesson 7: Sending messages",
      "m3.l2b": "With !, you send messages asynchronously into a process mailbox.",
      "m3.l2m": "Memory line: Sending is immediate, processing comes later.",
      "m3.l3t": "Lesson 8: Receive loops",
      "m3.l3b":
        "A process is often modeled as a loop: receive a message, react, continue.",
      "m3.l3m": "Memory line: Behavior emerges from receiving plus the next loop.",
      "m3.challenge":
        "How would you design a counter process that reacts to increment and get?",
      "m4.label": "Module 4",
      "m4.title": "OTP and fault tolerance",
      "m4.l1t": "Lesson 9: Let it crash",
      "m4.l1b":
        "In Erlang, error handling is often structural: one process may crash while another restores it.",
      "m4.l1m": "Memory line: Not every error should be fixed inside the same process.",
      "m4.l2t": "Lesson 10: GenServer thinking",
      "m4.l2b": "GenServer encapsulates state and standardizes the message flow.",
      "m4.l2m": "Memory line: OTP gives you structure for repeating process patterns.",
      "m4.l3t": "Lesson 11: Supervisors",
      "m4.l3b":
        "Supervisors decide whether a single worker or an entire group should restart.",
      "m4.l3m": "Memory line: Resilience is a tree structure, not an accident.",
      "m4.challenge":
        "When would a one_for_one strategy make more sense than one_for_all?",
      "m5.label": "Module 5",
      "m5.title": "Concurrency patterns",
      "m5.l1t": "Lesson 12: Worker pools",
      "m5.l1b":
        "Multiple processes can handle the same kind of task in parallel without blocking one another.",
      "m5.l1m": "Memory line: Parallelism needs work distribution, not just more CPU.",
      "m5.l2t": "Lesson 13: Isolating state",
      "m5.l2b":
        "State should ideally live inside a single process and never be shared directly.",
      "m5.l2m": "Memory line: Isolation reduces side effects.",
      "m5.challenge":
        "Sketch a three-step pipeline with one process for receiving, one for validating, and one for storing.",
      "m6.label": "Module 6",
      "m6.title": "Distributed Erlang",
      "m6.l1t": "Lesson 14: Nodes",
      "m6.l1b":
        "A node is a running Erlang instance that can cooperate with other nodes.",
      "m6.l1m": "Memory line: Distribution starts with explicit connection, not magic.",
      "m6.l2t": "Lesson 15: Remote messaging",
      "m6.l2b":
        "Messages can cross nodes as long as naming and connectivity are correct.",
      "m6.l2m":
        "Memory line: A distributed system is only as good as its failure assumptions.",
      "m6.l3t": "Lesson 16: Production thinking",
      "m6.l3b":
        "In distributed systems, timeouts, retries, monitoring, and ownership matter.",
      "m6.l3m": "Memory line: Strong systems plan for network failure from the start.",
      "m6.challenge":
        "What kinds of failures can happen when a remote node is temporarily unreachable?",
      "quiz.eyebrow": "Quiz arena",
      "quiz.title": "Short questions turn passive reading into active recall.",
      "quiz.body":
        "Answer every question immediately. This is one of the strongest learning levers you have.",
      "quiz.q1.topic": "Syntax",
      "quiz.q1.question": "What does pattern matching mainly do in Erlang?",
      "quiz.q1.a1": "It checks structure and binds matching values.",
      "quiz.q1.a2": "It changes variables repeatedly inside a loop.",
      "quiz.q1.a3": "It replaces functions with macros.",
      "quiz.q2.topic": "Recursion",
      "quiz.q2.question": "Why is recursion so central in Erlang?",
      "quiz.q2.a1": "Because OTP loops run faster than data traversal.",
      "quiz.q2.a2":
        "Because data is usually processed by repeatedly breaking it into smaller parts.",
      "quiz.q2.a3": "Because guards cannot check conditions.",
      "quiz.q3.topic": "Processes",
      "quiz.q3.question":
        "What is the key difference between threads and Erlang processes in the Erlang mental model?",
      "quiz.q3.a1": "Erlang processes directly access shared memory.",
      "quiz.q3.a2":
        "Erlang processes do not share state and communicate through messages.",
      "quiz.q3.a3": "Erlang processes cannot run in parallel.",
      "quiz.q4.topic": "OTP",
      "quiz.q4.question": "What is a supervisor for?",
      "quiz.q4.a1": "It compiles modules faster.",
      "quiz.q4.a2": "It stores logs inside an ETS table.",
      "quiz.q4.a3":
        "It watches processes and restarts them according to defined rules.",
      "quiz.score": "Quiz score",
      "projects.eyebrow": "Mini projects",
      "projects.title": "This is where knowledge starts turning into skill.",
      "projects.p1label": "Project 1",
      "projects.p1title": "Todo store as a process",
      "projects.p1body":
        "Build a process that accepts tasks, stores them, and returns them on request.",
      "projects.p1a": "Keep state only inside the process",
      "projects.p1b": "Support add, list, and clear",
      "projects.p1c": "Use messages instead of direct access",
      "projects.p2label": "Project 2",
      "projects.p2title": "Multi-client echo chat",
      "projects.p2body":
        "Connect multiple processes to one central hub that distributes messages.",
      "projects.p2a": "Use registered processes",
      "projects.p2b": "Define clean message formats",
      "projects.p2c": "Handle stop signals correctly",
      "projects.p3label": "Project 3",
      "projects.p3title": "OTP counter service",
      "projects.p3body":
        "Use an OTP behavior for a stateful service with a restart strategy.",
      "projects.p3a": "Model the counter as a GenServer",
      "projects.p3b": "Plan the supervisor structure",
      "projects.p3c": "Simulate a crash and observe the restart",
      "faq.title": "The key questions for steady progress.",
      "faq.q1": "How should I use this course most effectively?",
      "faq.a1":
        "Do not just read passively. Always go in this order: lesson, repeat the memory line, think through the challenge, answer the quiz.",
      "faq.q2": "What if recursion still feels unfamiliar?",
      "faq.a2":
        "Draw the input, the next step, and the end case on paper. Recursion becomes easier when you can see the data flow.",
      "faq.q3": "When am I ready for OTP?",
      "faq.a3":
        "Once you can confidently model processes, messages, and stateful loops in your head, OTP starts to feel natural.",
      "faq.q4": "Is this course for beginners or more advanced developers?",
      "faq.a4":
        "Both. The progression is beginner-friendly, but the later modules move toward production-level concepts.",
      "footer.body":
        "From the first atoms to OTP and distributed systems. Clear, motivating, and directly usable.",
      "footer.repo": "Repository on GitHub",
    },
  },
  de: {
    meta: {
      title: "Erlang Campus | Vollstaendiger Erlang-Kurs",
      description:
        "Ein vollstaendiger Erlang-Kurs mit Lektionen, Quiz, Mini-Challenges, Lernpfad und motivierendem Fortschritt.",
      ogTitle: "Erlang Campus | Vollstaendiger Erlang-Kurs",
      ogDescription:
        "Lerne Erlang systematisch mit Syntax, Rekursion, Prozessen, OTP und verteilten Systemen.",
      locale: "de_DE",
    },
    quiz: {
      start: "Starte mit der ersten Frage und arbeite dich durch.",
      progress: "Gut. Bleib dran. Aktives Erinnern ist genau der richtige Weg.",
      complete:
        "Stark. Du hast alle Fragen geloest. Wiederhole sie morgen noch einmal fuer Langzeiteffekt.",
      correct: "Richtig. Du hast das Kernprinzip erkannt.",
      wrong:
        "Noch nicht. Lies die Merkhilfe der passenden Lektion noch einmal und versuche es erneut.",
      wrongShort: "Noch nicht. Denk an das Grundmodell dieser Lektion.",
    },
    text: {
      "nav.aria": "Hauptnavigation",
      "nav.start": "Start",
      "nav.roadmap": "Roadmap",
      "nav.lessons": "Lektionen",
      "nav.quiz": "Quiz",
      "nav.projects": "Projekte",
      "lang.aria": "Sprachauswahl",
      "theme.mode": "Modus",
      "theme.aria": "Farbschema wechseln",
      "hero.eyebrow": "Ein vollstaendiger Erlang-Kurs fuer echten Lernerfolg",
      "hero.title": "Lerne Erlang so, dass es haengen bleibt und auch Spass macht.",
      "hero.lead":
        "Dieser Kurs fuehrt dich in kleinen, klaren Etappen von den Grundlagen bis zu OTP und verteilten Systemen. Jede Etappe verbindet Verstehen, Wiederholen, Anwenden und sichtbaren Fortschritt.",
      "hero.start": "Kurs starten",
      "hero.today": "Heutige Mission",
      "hero.metricsAria": "Kurs-Metriken",
      "hero.modules": "Module",
      "hero.lessons": "Lektionen",
      "hero.checks": "Checks",
      "hero.projects": "Mini-Projekte",
      "hero.why": "Warum dieser Kurs funktioniert",
      "hero.card1Title": "1. Verstehen",
      "hero.card1Body": "Jede Lektion startet mit einem klaren Denkmodell statt trockener Theorie.",
      "hero.card2Title": "2. Wiederholen",
      "hero.card2Body": "Merksaetze und Quizfragen verankern das Gelernte sofort.",
      "hero.card3Title": "3. Anwenden",
      "hero.card3Body": "Mini-Challenges bringen dich dazu, wie ein Erlang-Entwickler zu denken.",
      "today.eyebrow": "Heutige Mission",
      "today.title": "Zwanzig fokussierte Minuten schlagen zwei chaotische Stunden.",
      "today.body":
        "Arbeite heute in genau dieser Reihenfolge: eine Lektion lesen, eine Mini-Challenge loesen, dann das Quiz beantworten. So bleibt Wissen deutlich besser haengen.",
      "today.step1": "Die heutige Lektion lesen",
      "today.step2": "Ein Code-Beispiel aktiv nachvollziehen",
      "today.step3": "Eine Challenge loesen",
      "today.step4": "Das Kurzquiz abschliessen",
      "roadmap.eyebrow": "Roadmap",
      "roadmap.title": "Der Kurs ist in sechs lernbare Stufen aufgeteilt.",
      "roadmap.progress": "Gesamtfortschritt",
      "roadmap.of": "von",
      "roadmap.steps": "Lernschritten erledigt",
      "roadmap.card1Title": "In Werten denken",
      "roadmap.card1Body":
        "Atome, Tupel, Listen, Pattern Matching und die Denkweise hinter immutablen Daten.",
      "roadmap.card2Title": "In Funktionen denken",
      "roadmap.card2Body":
        "Guards, Rekursion und Fallunterscheidungen statt klassischer Schleifen.",
      "roadmap.card3Title": "In Prozessen denken",
      "roadmap.card3Body":
        "Leichte Prozesse, Mailboxen, Nachrichten und asynchrone Zusammenarbeit.",
      "roadmap.card4Title": "In Robustheit denken",
      "roadmap.card4Body":
        "Links, Monitore, Supervisoren und die Logik hinter let it crash.",
      "roadmap.card5Title": "In Mustern denken",
      "roadmap.card5Body":
        "Worker, Pipelines, Zustandsisolation und typische Erlang-Architekturen.",
      "roadmap.card6Title": "In Systemen denken",
      "roadmap.card6Body":
        "Nodes, Verteilung, Deployments und warum die BEAM in Produktion so stark ist.",
      "roadmap.checklistAria": "Kursfortschritt",
      "roadmap.check1": "Modul 1 abgeschlossen",
      "roadmap.check2": "Modul 2 abgeschlossen",
      "roadmap.check3": "Modul 3 abgeschlossen",
      "roadmap.check4": "Modul 4 abgeschlossen",
      "roadmap.check5": "Modul 5 abgeschlossen",
      "roadmap.check6": "Modul 6 abgeschlossen",
      "roadmap.check7": "Mini-Projekt 1 abgeschlossen",
      "roadmap.check8": "Mini-Projekt 2 abgeschlossen",
      "roadmap.check9": "Mini-Projekt 3 abgeschlossen",
      "roadmap.check10": "Syntax-Quiz bestanden",
      "roadmap.check11": "Rekursions-Quiz bestanden",
      "roadmap.check12": "Prozess-Quiz bestanden",
      "roadmap.check13": "OTP-Quiz bestanden",
      "roadmap.check14": "Wiederholungsrunde 1 erledigt",
      "roadmap.check15": "Wiederholungsrunde 2 erledigt",
      "roadmap.check16": "Kurs komplett abgeschlossen",
      "lessons.eyebrow": "Lektionen",
      "lessons.title": "Jedes Modul kombiniert Denkmodell, Regel, Beispiel und Challenge.",
      "lessons.body": "So entsteht Verstaendnis statt Auswendiglernen.",
      "common.challenge": "Mini-Challenge",
      "m1.label": "Modul 1",
      "m1.title": "Syntax und Datentypen",
      "m1.l1t": "Lektion 1: Atome, Zahlen, Strings",
      "m1.l1b":
        "Erlang trennt klar zwischen Atomen wie ok, Zahlen wie 42 und Binaries wie <<\"hi\">>.",
      "m1.l1m":
        "Merksatz: Ein Atom beschreibt oft Bedeutung, ein Binary traegt oft echte Daten.",
      "m1.l2t": "Lektion 2: Pattern Matching",
      "m1.l2b":
        "Pattern Matching ist nicht nur Vergleich, sondern strukturiertes Entpacken von Werten.",
      "m1.l2m": "Merksatz: Erlang fragt immer, passt die Form?",
      "m1.challenge":
        "Welche Teile von {error, timeout} kannst du direkt mit Pattern Matching extrahieren?",
      "m2.label": "Modul 2",
      "m2.title": "Funktionen, Guards und Rekursion",
      "m2.l1t": "Lektion 3: Mehrere Funktionskoepfe",
      "m2.l1b":
        "Eine Funktion kann mehrere Formen haben. Erlang prueft sie von oben nach unten.",
      "m2.l1m": "Merksatz: Erst Pattern, dann Guard, dann Funktionskoerper.",
      "m2.l2t": "Lektion 4: Guards",
      "m2.l2b":
        "Guards machen Regeln lesbar und halten Logik moeglichst aus dem Body heraus.",
      "m2.l2m": "Merksatz: Guards klaeren Faelle, bevor Arbeit beginnt.",
      "m2.l3t": "Lektion 5: Rekursion statt Schleife",
      "m2.l3b":
        "In Erlang ist Rekursion der normale Weg, um durch Daten zu laufen.",
      "m2.l3m": "Merksatz: Jede Rekursion braucht Start, Schritt und Ende.",
      "m2.challenge":
        "Entwirf gedanklich eine Funktion all_even/1, die nur dann true liefert, wenn alle Elemente gerade sind.",
      "m3.label": "Modul 3",
      "m3.title": "Prozesse und Message Passing",
      "m3.l1t": "Lektion 6: Prozesse starten",
      "m3.l1b":
        "Ein Erlang-Prozess ist extrem leichtgewichtig und besitzt seinen eigenen Zustand.",
      "m3.l1m": "Merksatz: Teile keinen Zustand, sende Nachrichten.",
      "m3.l2t": "Lektion 7: Nachrichten senden",
      "m3.l2b":
        "Mit ! sendest du Nachrichten asynchron in die Mailbox eines Prozesses.",
      "m3.l2m": "Merksatz: Senden ist sofort, Verarbeiten kommt spaeter.",
      "m3.l3t": "Lektion 8: Receive-Loops",
      "m3.l3b":
        "Ein Prozess wird oft als Schleife modelliert: Nachricht empfangen, reagieren, weitermachen.",
      "m3.l3m": "Merksatz: Verhalten entsteht aus Empfang plus naechstem Loop.",
      "m3.challenge":
        "Wie wuerdest du einen Counter-Prozess bauen, der auf increment und get reagiert?",
      "m4.label": "Modul 4",
      "m4.title": "OTP und Fehlertoleranz",
      "m4.l1t": "Lektion 9: Let it crash",
      "m4.l1b":
        "In Erlang ist Fehlerbehandlung oft strukturell: Ein Prozess darf crashen, waehrend ein anderer ihn wiederherstellt.",
      "m4.l1m": "Merksatz: Nicht jeder Fehler sollte im selben Prozess geloest werden.",
      "m4.l2t": "Lektion 10: GenServer-Denken",
      "m4.l2b":
        "GenServer kapselt Zustand und standardisiert den Nachrichtenfluss.",
      "m4.l2m": "Merksatz: OTP gibt dir Struktur fuer wiederkehrende Prozessmuster.",
      "m4.l3t": "Lektion 11: Supervisoren",
      "m4.l3b":
        "Supervisoren entscheiden, ob ein einzelner Worker oder eine ganze Gruppe neu startet.",
      "m4.l3m": "Merksatz: Robustheit ist eine Baumstruktur, kein Zufall.",
      "m4.challenge":
        "Wann ist eine one_for_one-Strategie sinnvoller als one_for_all?",
      "m5.label": "Modul 5",
      "m5.title": "Concurrency Patterns",
      "m5.l1t": "Lektion 12: Worker Pools",
      "m5.l1b":
        "Mehrere Prozesse koennen dieselbe Aufgabentype parallel bearbeiten, ohne sich zu blockieren.",
      "m5.l1m": "Merksatz: Parallelitaet braucht Aufgabenteilung, nicht nur mehr CPU.",
      "m5.l2t": "Lektion 13: Zustand isolieren",
      "m5.l2b":
        "Zustand sollte idealerweise in genau einem Prozess leben und nie direkt geteilt werden.",
      "m5.l2m": "Merksatz: Isolation reduziert Nebenwirkungen.",
      "m5.challenge":
        "Skizziere eine Pipeline mit drei Prozessen: empfangen, pruefen, speichern.",
      "m6.label": "Modul 6",
      "m6.title": "Distributed Erlang",
      "m6.l1t": "Lektion 14: Nodes",
      "m6.l1b":
        "Ein Node ist eine laufende Erlang-Instanz, die mit anderen Nodes zusammenarbeiten kann.",
      "m6.l1m": "Merksatz: Verteilung beginnt mit expliziter Verbindung, nicht mit Magie.",
      "m6.l2t": "Lektion 15: Remote Messaging",
      "m6.l2b":
        "Nachrichten koennen ueber Nodes hinweg laufen, wenn Benennung und Verbindung stimmen.",
      "m6.l2m":
        "Merksatz: Ein verteiltes System ist nur so gut wie seine Fehlerannahmen.",
      "m6.l3t": "Lektion 16: Praxisdenken",
      "m6.l3b":
        "In verteilten Systemen zaehlen Timeouts, Retries, Monitoring und klare Verantwortlichkeiten.",
      "m6.l3m": "Merksatz: Starke Systeme planen Netzwerkfehler von Anfang an ein.",
      "m6.challenge":
        "Welche Fehler koennen auftreten, wenn ein Remote-Node kurzzeitig nicht erreichbar ist?",
      "quiz.eyebrow": "Quiz Arena",
      "quiz.title": "Kurze Fragen machen aus passivem Lesen aktives Erinnern.",
      "quiz.body":
        "Beantworte jede Frage direkt. Das ist einer der staerksten Hebel fuer Lernerfolg.",
      "quiz.q1.topic": "Syntax",
      "quiz.q1.question": "Was macht Pattern Matching in Erlang hauptsaechlich?",
      "quiz.q1.a1": "Es prueft die Struktur und bindet passende Werte.",
      "quiz.q1.a2": "Es aendert Variablen mehrfach innerhalb einer Schleife.",
      "quiz.q1.a3": "Es ersetzt Funktionen durch Makros.",
      "quiz.q2.topic": "Rekursion",
      "quiz.q2.question": "Warum ist Rekursion in Erlang so zentral?",
      "quiz.q2.a1": "Weil OTP-Loops schneller sind als Datenverarbeitung.",
      "quiz.q2.a2":
        "Weil Daten meist verarbeitet werden, indem man sie in kleinere Teile zerlegt.",
      "quiz.q2.a3": "Weil Guards keine Bedingungen pruefen koennen.",
      "quiz.q3.topic": "Prozesse",
      "quiz.q3.question":
        "Was ist der wichtigste Unterschied zwischen Threads und Erlang-Prozessen im Denkmodell?",
      "quiz.q3.a1": "Erlang-Prozesse greifen direkt auf gemeinsamen Speicher zu.",
      "quiz.q3.a2":
        "Erlang-Prozesse teilen keinen Zustand und kommunizieren ueber Nachrichten.",
      "quiz.q3.a3": "Erlang-Prozesse koennen nicht parallel laufen.",
      "quiz.q4.topic": "OTP",
      "quiz.q4.question": "Wofuer ist ein Supervisor da?",
      "quiz.q4.a1": "Er kompiliert Module schneller.",
      "quiz.q4.a2": "Er speichert Logs in einer ETS-Tabelle.",
      "quiz.q4.a3":
        "Er ueberwacht Prozesse und startet sie nach definierten Regeln neu.",
      "quiz.score": "Quiz-Score",
      "projects.eyebrow": "Mini-Projekte",
      "projects.title": "Hier wird aus Wissen langsam Koennen.",
      "projects.p1label": "Projekt 1",
      "projects.p1title": "Todo-Store als Prozess",
      "projects.p1body":
        "Baue einen Prozess, der Aufgaben annimmt, speichert und auf Anfrage zurueckgibt.",
      "projects.p1a": "Zustand nur im Prozess halten",
      "projects.p1b": "add, list und clear unterstuetzen",
      "projects.p1c": "Nachrichten statt direktem Zugriff nutzen",
      "projects.p2label": "Projekt 2",
      "projects.p2title": "Echo-Chat mit mehreren Clients",
      "projects.p2body":
        "Verbinde mehrere Prozesse mit einem zentralen Hub, der Nachrichten verteilt.",
      "projects.p2a": "Registrierte Prozesse verwenden",
      "projects.p2b": "Saubere Nachrichtenformate definieren",
      "projects.p2c": "Stop-Signale korrekt behandeln",
      "projects.p3label": "Projekt 3",
      "projects.p3title": "OTP Counter Service",
      "projects.p3body":
        "Nutze ein OTP-Verhalten fuer einen zustandsbehafteten Service mit Neustartstrategie.",
      "projects.p3a": "Den Counter als GenServer modellieren",
      "projects.p3b": "Die Supervisor-Struktur planen",
      "projects.p3c": "Einen Crash simulieren und den Neustart beobachten",
      "faq.title": "Die wichtigsten Fragen fuer konstante Fortschritte.",
      "faq.q1": "Wie nutze ich diesen Kurs am effektivsten?",
      "faq.a1":
        "Lies nie nur passiv. Arbeite immer in dieser Reihenfolge: Lektion, Merksatz wiederholen, Challenge durchdenken, Quiz beantworten.",
      "faq.q2": "Was, wenn sich Rekursion noch fremd anfuehlt?",
      "faq.a2":
        "Zeichne Eingabe, naechsten Schritt und Endfall auf Papier. Rekursion wird leichter, wenn du den Datenfluss siehst.",
      "faq.q3": "Wann bin ich bereit fuer OTP?",
      "faq.a3":
        "Sobald du Prozesse, Nachrichten und zustandsbehaftete Loops im Kopf sicher modellieren kannst, fuehlt sich OTP ploetzlich natuerlich an.",
      "faq.q4": "Ist der Kurs fuer Einsteiger oder fuer Fortgeschrittene?",
      "faq.a4":
        "Beides. Der Einstieg ist anfangerfreundlich, aber die spaeteren Module fuehren bereits an produktionsnahe Konzepte heran.",
      "footer.body":
        "Von den ersten Atomen bis zu OTP und verteilten Systemen. Klar, motivierend und direkt nutzbar.",
      "footer.repo": "Repository auf GitHub",
    },
  },
};

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

function setLanguage(language) {
  const current = translations[language] ? language : "en";
  const dictionary = translations[current];

  html.lang = current;
  document.title = dictionary.meta.title;

  if (descriptionMeta) {
    descriptionMeta.content = dictionary.meta.description;
  }

  if (ogTitleMeta) {
    ogTitleMeta.content = dictionary.meta.ogTitle;
  }

  if (ogDescriptionMeta) {
    ogDescriptionMeta.content = dictionary.meta.ogDescription;
  }

  if (ogLocaleMeta) {
    ogLocaleMeta.content = dictionary.meta.locale;
  }

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (key && dictionary.text[key]) {
      element.textContent = dictionary.text[key];
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (key && dictionary.text[key]) {
      element.setAttribute("aria-label", dictionary.text[key]);
    }
  });

  langToggles.forEach((toggle) => {
    toggle.classList.toggle("is-active", toggle.dataset.lang === current);
  });

  localStorage.setItem(languageKey, current);
  updateQuizScore();
  applyStoredQuizFeedback();
}

function loadLanguage() {
  const storedLanguage = localStorage.getItem(languageKey) || "en";
  setLanguage(storedLanguage);
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
  localStorage.setItem(progressKey, JSON.stringify(progressItems.map((item) => item.checked)));
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

function getCurrentLanguage() {
  return localStorage.getItem(languageKey) || "en";
}

function getQuizCopy() {
  return translations[getCurrentLanguage()].quiz;
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

  const quizCopy = getQuizCopy();

  if (solved === 0) {
    quizMessage.textContent = quizCopy.start;
  } else if (solved < quizCards.length) {
    quizMessage.textContent = quizCopy.progress;
  } else {
    quizMessage.textContent = quizCopy.complete;
  }
}

function saveQuizState() {
  const state = quizCards.map((card) => ({
    solved: card.dataset.solved === "true",
    choiceIndex: card.dataset.choiceIndex || "",
  }));

  localStorage.setItem(quizKey, JSON.stringify(state));
}

function applyStoredQuizFeedback() {
  const quizCopy = getQuizCopy();

  quizCards.forEach((card) => {
    const feedback = card.querySelector(".quiz-feedback");
    const choiceIndex = card.dataset.choiceIndex;
    if (!feedback || !choiceIndex) {
      return;
    }

    feedback.textContent =
      card.dataset.solved === "true" ? quizCopy.correct : quizCopy.wrongShort;
  });
}

function loadQuizState() {
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
      const choiceIndex = Number(cardState.choiceIndex);

      if (Number.isInteger(choiceIndex) && options[choiceIndex]) {
        const selected = options[choiceIndex];
        const isCorrect = selected.dataset.correct === "true";
        selected.classList.add(isCorrect ? "is-correct" : "is-wrong");
        card.dataset.choiceIndex = String(choiceIndex);
        card.dataset.solved = cardState.solved ? "true" : "false";

        if (feedback) {
          feedback.textContent = isCorrect ? getQuizCopy().correct : getQuizCopy().wrongShort;
        }
      }
    });
  } catch (error) {
    console.error("Could not load saved quiz state.", error);
  }

  updateQuizScore();
}

loadTheme();
loadProgress();
loadLanguage();
loadQuizState();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
  });
}

langToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    setLanguage(toggle.dataset.lang || "en");
  });
});

progressItems.forEach((item) => {
  item.addEventListener("change", () => {
    saveProgress();
    updateProgress();
  });
});

quizCards.forEach((card) => {
  const options = Array.from(card.querySelectorAll(".quiz-option"));
  const feedback = card.querySelector(".quiz-feedback");

  options.forEach((option, optionIndex) => {
    option.addEventListener("click", () => {
      options.forEach((entry) => {
        entry.classList.remove("is-correct", "is-wrong");
      });

      const isCorrect = option.dataset.correct === "true";
      option.classList.add(isCorrect ? "is-correct" : "is-wrong");
      card.dataset.choiceIndex = String(optionIndex);
      card.dataset.solved = isCorrect ? "true" : "false";

      if (feedback) {
        feedback.textContent = isCorrect ? getQuizCopy().correct : getQuizCopy().wrong;
      }

      saveQuizState();
      updateQuizScore();
    });
  });
});
