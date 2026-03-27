const body = document.body;
const html = document.documentElement;
const titleEl = document.querySelector("title");
const descriptionMeta = document.querySelector('meta[name="description"]');
const ogTitleMeta = document.querySelector('meta[property="og:title"]');
const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
const ogLocaleMeta = document.querySelector('meta[property="og:locale"]');
const themeToggle = document.querySelector(".theme-toggle");
const langToggles = Array.from(document.querySelectorAll(".lang-toggle"));
const authJumpButtons = Array.from(document.querySelectorAll("[data-auth-jump]"));
const authTabs = Array.from(document.querySelectorAll(".auth-tab"));
const authPanels = Array.from(document.querySelectorAll("[data-auth-panel]"));
const authModalStatus = document.getElementById("authModalStatus");
const authAccessSection = document.getElementById("auth-access");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const resetForm = document.getElementById("resetForm");
const logoutButton = document.getElementById("logoutButton");
const authStatusPill = document.getElementById("authStatusPill");
const authHeadline = document.getElementById("authHeadline");
const authSubline = document.getElementById("authSubline");
const authGuestActions = document.getElementById("authGuestActions");
const authUserActions = document.getElementById("authUserActions");
const authUserEmail = document.getElementById("authUserEmail");
const syncStatus = document.getElementById("syncStatus");
const progressItems = Array.from(document.querySelectorAll("[data-progress-item]"));
const progressValue = document.getElementById("progressValue");
const progressCount = document.getElementById("progressCount");
const progressTotal = document.getElementById("progressTotal");
const progressBar = document.getElementById("progressBar");
const quizCards = Array.from(document.querySelectorAll("[data-quiz-card]"));
const userInputs = Array.from(document.querySelectorAll("[data-user-input]"));
const quizScore = document.getElementById("quizScore");
const quizTotal = document.getElementById("quizTotal");
const quizMessage = document.getElementById("quizMessage");

const themeKey = "erlang-campus-theme";
const languageKey = "erlang-campus-language";
const progressKey = "erlang-campus-progress";
const quizKey = "erlang-campus-quiz";
const inputKey = "erlang-campus-inputs";
const authTabKey = "erlang-campus-auth-tab";

const defaultText = new Map(
  Array.from(document.querySelectorAll("[data-i18n]")).map((element) => [
    element.dataset.i18n,
    element.textContent.trim(),
  ]),
);

const defaultAria = new Map(
  Array.from(document.querySelectorAll("[data-i18n-aria-label]")).map((element) => [
    element.dataset.i18nAriaLabel,
    element.getAttribute("aria-label") || "",
  ]),
);

const defaultPlaceholders = new Map(
  Array.from(document.querySelectorAll("[data-i18n-placeholder]")).map((element) => [
    element.dataset.i18nPlaceholder,
    element.getAttribute("placeholder") || "",
  ]),
);

const defaultMeta = {
  title: titleEl?.textContent || "",
  description: descriptionMeta?.content || "",
  ogTitle: ogTitleMeta?.content || "",
  ogDescription: ogDescriptionMeta?.content || "",
  locale: ogLocaleMeta?.content || "en_US",
};

const germanText = {
  "nav.aria": "Hauptnavigation",
  "nav.lessons": "Lektionen",
  "nav.projects": "Projekte",
  "lang.aria": "Sprachauswahl",
  "theme.mode": "Modus",
  "theme.aria": "Farbschema wechseln",
  "auth.open": "Login",
  "auth.login": "Login",
  "auth.register": "Registrieren",
  "auth.reset": "Passwort zuruecksetzen",
  "auth.logout": "Logout",
  "auth.email": "E-Mail",
  "auth.password": "Passwort",
  "auth.passwordRepeat": "Passwort wiederholen",
  "auth.panelLabel": "Account",
  "auth.modalEyebrow": "Account",
  "auth.modalTitle": "Login, Registrierung und gespeicherter Lernfortschritt.",
  "auth.notConnected":
    "Backend noch nicht verbunden. Trage zuerst deine Supabase-Keys in config.js ein.",
  "donation.eyebrow": "Support",
  "donation.optional": "Freiwillig",
  "donation.title": "Gib dem Programmierer einen 1-Dollar-Kaffee aus.",
  "donation.body":
    "Wenn dir der Kurs hilft, kannst du mit einer kleinen 1-Dollar-Spende neue Lektionen und Verbesserungen unterstuetzen.",
  "donation.cta": "1 $ spenden",
  "donation.note": "Komplett freiwillig. Der Kurs bleibt kostenlos.",
  "hero.eyebrow": "Ein vollstaendiger Erlang-Kurs fuer echten Lernerfolg",
  "hero.title": "Lerne Erlang so, dass es haengen bleibt und auch Spass macht.",
  "hero.lead":
    "Dieser Kurs fuehrt dich in kleinen, klaren Etappen von den Grundlagen bis zu OTP und verteilten Systemen. Jede Etappe verbindet Verstehen, Wiederholen, Anwenden und sichtbaren Fortschritt.",
  "hero.start": "Kurs starten",
  "hero.today": "Heutige Mission",
  "hero.metricsAria": "Kurs-Metriken",
  "hero.modules": "Module",
  "hero.lessons": "Lektionen",
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
  "roadmap.progress": "Gesamtfortschritt",
  "roadmap.title": "Der Kurs ist in sechs lernbare Stufen aufgeteilt.",
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
  "common.practiceLab": "Praxis-Labor",
  "common.yourNotes": "Deine Notizen",
  "common.yourAnswer": "Dein Loesungsansatz",
  "common.confidence": "Selbsteinschaetzung",
  "common.confidenceSelect": "Bitte waehlen",
  "common.confidenceLow": "Noch unsicher",
  "common.confidenceMedium": "Ich komme rein",
  "common.confidenceHigh": "Ich kann es erklaeren",
  "m1.label": "Modul 1",
  "m1.title": "Syntax und Datentypen",
  "m1.l1t": "Lektion 1: Atome, Zahlen, Strings",
  "m1.l1b":
    "Erlang trennt klar zwischen Atomen wie ok, Zahlen wie 42 und Binaries wie <<\"hi\">>.",
  "m1.l1m": "Merksatz: Ein Atom beschreibt oft Bedeutung, ein Binary traegt oft echte Daten.",
  "m1.l2t": "Lektion 2: Pattern Matching",
  "m1.l2b":
    "Pattern Matching ist nicht nur Vergleich, sondern strukturiertes Entpacken von Werten.",
  "m1.l2m": "Merksatz: Erlang fragt immer, passt die Form?",
  "m1.challenge":
    "Welche Teile von {error, timeout} kannst du direkt mit Pattern Matching extrahieren?",
  "m1.notesPlaceholder":
    "Erklaere mit deinen eigenen Worten Atome, Tupel und Pattern Matching.",
  "m1.answerPlaceholder":
    "Beschreibe, wie du {error, timeout} matchen und welche Variablen du binden wuerdest.",
  "m2.label": "Modul 2",
  "m2.title": "Funktionen, Guards und Rekursion",
  "m2.l1t": "Lektion 3: Mehrere Funktionskoepfe",
  "m2.l1b": "Eine Funktion kann mehrere Formen haben. Erlang prueft sie von oben nach unten.",
  "m2.l1m": "Merksatz: Erst Pattern, dann Guard, dann Funktionskoerper.",
  "m2.l2t": "Lektion 4: Guards",
  "m2.l2b": "Guards machen Regeln lesbar und halten Logik moeglichst aus dem Body heraus.",
  "m2.l2m": "Merksatz: Guards klaeren Faelle, bevor Arbeit beginnt.",
  "m2.l3t": "Lektion 5: Rekursion statt Schleife",
  "m2.l3b": "In Erlang ist Rekursion der normale Weg, um durch Daten zu laufen.",
  "m2.l3m": "Merksatz: Jede Rekursion braucht Start, Schritt und Ende.",
  "m2.challenge":
    "Entwirf gedanklich eine Funktion all_even/1, die nur dann true liefert, wenn alle Elemente gerade sind.",
  "m2.notesPlaceholder":
    "Erklaere mit deinen eigenen Worten, warum Rekursion in Erlang Schleifen ersetzt.",
  "m2.answerPlaceholder":
    "Skizziere Startfall, Rekursionsschritt und Endfall fuer all_even/1.",
  "m3.label": "Modul 3",
  "m3.title": "Prozesse und Message Passing",
  "m3.l1t": "Lektion 6: Prozesse starten",
  "m3.l1b": "Ein Erlang-Prozess ist extrem leichtgewichtig und besitzt seinen eigenen Zustand.",
  "m3.l1m": "Merksatz: Teile keinen Zustand, sende Nachrichten.",
  "m3.l2t": "Lektion 7: Nachrichten senden",
  "m3.l2b": "Mit ! sendest du Nachrichten asynchron in die Mailbox eines Prozesses.",
  "m3.l2m": "Merksatz: Senden ist sofort, Verarbeiten kommt spaeter.",
  "m3.l3t": "Lektion 8: Receive-Loops",
  "m3.l3b":
    "Ein Prozess wird oft als Schleife modelliert: Nachricht empfangen, reagieren, weitermachen.",
  "m3.l3m": "Merksatz: Verhalten entsteht aus Empfang plus naechstem Loop.",
  "m3.challenge":
    "Wie wuerdest du einen Counter-Prozess bauen, der auf increment und get reagiert?",
  "m3.notesPlaceholder":
    "Fasse die Beziehung zwischen Prozessen, Mailboxen und Nachrichten zusammen.",
  "m3.answerPlaceholder":
    "Schreibe den Nachrichtenfluss fuer einen Counter-Prozess mit increment und get auf.",
  "m4.label": "Modul 4",
  "m4.title": "OTP und Fehlertoleranz",
  "m4.l1t": "Lektion 9: Let it crash",
  "m4.l1b":
    "In Erlang ist Fehlerbehandlung oft strukturell: Ein Prozess darf crashen, waehrend ein anderer ihn wiederherstellt.",
  "m4.l1m": "Merksatz: Nicht jeder Fehler sollte im selben Prozess geloest werden.",
  "m4.l2t": "Lektion 10: GenServer-Denken",
  "m4.l2b": "GenServer kapselt Zustand und standardisiert den Nachrichtenfluss.",
  "m4.l2m": "Merksatz: OTP gibt dir Struktur fuer wiederkehrende Prozessmuster.",
  "m4.l3t": "Lektion 11: Supervisoren",
  "m4.l3b":
    "Supervisoren entscheiden, ob ein einzelner Worker oder eine ganze Gruppe neu startet.",
  "m4.l3m": "Merksatz: Robustheit ist eine Baumstruktur, kein Zufall.",
  "m4.challenge": "Wann ist eine one_for_one-Strategie sinnvoller als one_for_all?",
  "m4.notesPlaceholder":
    "Erklaere let it crash mit deinen eigenen Worten und wann es hilft.",
  "m4.answerPlaceholder":
    "Beschreibe einen kleinen Service, bei dem one_for_one die bessere Strategie ist.",
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
  "m5.challenge": "Skizziere eine Pipeline mit drei Prozessen: empfangen, pruefen, speichern.",
  "m5.notesPlaceholder":
    "Erklaere, warum isolierter Zustand parallele Systeme leichter verstaendlich macht.",
  "m5.answerPlaceholder":
    "Skizziere die drei Prozesse deiner Pipeline und was jeder einzelne besitzt.",
  "m6.label": "Modul 6",
  "m6.l1t": "Lektion 14: Nodes",
  "m6.l1b":
    "Ein Node ist eine laufende Erlang-Instanz, die mit anderen Nodes zusammenarbeiten kann.",
  "m6.l1m": "Merksatz: Verteilung beginnt mit expliziter Verbindung, nicht mit Magie.",
  "m6.l2t": "Lektion 15: Remote Messaging",
  "m6.l2b":
    "Nachrichten koennen ueber Nodes hinweg laufen, wenn Benennung und Verbindung stimmen.",
  "m6.l2m": "Merksatz: Ein verteiltes System ist nur so gut wie seine Fehlerannahmen.",
  "m6.l3t": "Lektion 16: Praxisdenken",
  "m6.l3b":
    "In verteilten Systemen zaehlen Timeouts, Retries, Monitoring und klare Verantwortlichkeiten.",
  "m6.l3m": "Merksatz: Starke Systeme planen Netzwerkfehler von Anfang an ein.",
  "m6.challenge":
    "Welche Fehler koennen auftreten, wenn ein Remote-Node kurzzeitig nicht erreichbar ist?",
  "m6.notesPlaceholder":
    "Fasse die wichtigsten Risiken zusammen, die auftreten, sobald ein System verteilt wird.",
  "m6.answerPlaceholder":
    "Liste die Fehlerfaelle auf, fuer die du designen wuerdest, wenn ein Remote-Node ausfaellt.",
  "quiz.eyebrow": "Quiz Arena",
  "quiz.title": "Kurze Fragen machen aus passivem Lesen aktives Erinnern.",
  "quiz.body":
    "Beantworte jede Frage direkt. Das ist einer der staerksten Hebel fuer Lernerfolg.",
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
  "quiz.q4.question": "Wofuer ist ein Supervisor da?",
  "quiz.q4.a1": "Er kompiliert Module schneller.",
  "quiz.q4.a2": "Er speichert Logs in einer ETS-Tabelle.",
  "quiz.q4.a3": "Er ueberwacht Prozesse und startet sie nach definierten Regeln neu.",
  "quiz.score": "Quiz-Score",
  "retention.eyebrow": "Wiederholungslabor",
  "retention.title": "Komm so oft zu den Kernideen zurueck, bis sie sich selbstverstaendlich anfuehlen.",
  "retention.body":
    "Echter Lernerfolg entsteht dann, wenn du die Idee ohne Nachschauen abrufen kannst. Nutze diese Karten fuer schnelle Wiederholungsrunden.",
  "retention.card1q": "Warum ist unveraenderlicher Zustand in Erlang so hilfreich?",
  "retention.card1a":
    "Weil Prozesse nicht um gemeinsam veraenderbaren Zustand kaempfen und Concurrency dadurch deutlich einfacher wird.",
  "retention.card2q": "Was ist das Denkmodell hinter Rekursion?",
  "retention.card2a":
    "Verkleinere das Problem, halte die Regel klar und stoppe bei einem einfachen Endfall.",
  "retention.card3q": "Warum ist Message Passing so zentral?",
  "retention.card3a":
    "Weil isolierte Prozesse ueber Nachrichten koordinieren statt ueber versteckte Aenderungen in gemeinsamem Speicher.",
  "retention.card4q": "Was liefert dir OTP eigentlich?",
  "retention.card4a":
    "Eine standardisierte Struktur fuer zustandsbehaftete Prozesse, Supervision und wiederherstellbare Systeme.",
  "pitfalls.eyebrow": "Fehler-Radar",
  "pitfalls.title": "Das sind die Fallen, die Erlang schwieriger wirken lassen, als es ist.",
  "pitfalls.p1t": "Zuerst in Schleifen denken",
  "pitfalls.p1b":
    "Viele suchen zuerst nach Loop-Syntax. In Erlang solltest du in rekursiven Formveraenderungen denken.",
  "pitfalls.p2t": "Prozesse wie Objekte behandeln",
  "pitfalls.p2b":
    "Ein Prozess ist nicht einfach nur eine Klasseninstanz, sondern ein isolierter Actor mit Mailbox und Protokoll.",
  "pitfalls.p3t": "Crashes um jeden Preis vermeiden",
  "pitfalls.p3b":
    "In BEAM-Systemen sollten manche Fehler bewusst schnell crashen, damit Supervision sauberen Zustand wiederherstellen kann.",
  "pitfalls.p4t": "Zu frueh verteilt denken",
  "pitfalls.p4b":
    "Erst einen Node sauber bauen, dann Verteilung, Timeouts, Retries und Monitoring dazunehmen.",
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
  "capstone.eyebrow": "Capstone",
  "capstone.title": "Baue eine Sache, die wirklich zeigt, dass du Erlang benutzen kannst.",
  "capstone.body":
    "Der staerkste Selbstbewusstseins-Booster ist ein kleines, aber echtes System. Nutze dieses Panel fuer dein Abschlussprojekt.",
  "capstone.check1": "Ich habe eine konkrete Service-Idee gewaehlt",
  "capstone.check2": "Ich habe das Nachrichtenprotokoll definiert",
  "capstone.check3": "Ich habe Worker und State-Besitz getrennt",
  "capstone.check4": "Ich habe eine Supervisionsstrategie geplant",
  "capstone.planTitle": "Dein Abschlussprojekt-Plan",
  "capstone.idea": "Projektidee",
  "capstone.protocol": "Protokoll-Design",
  "capstone.supervision": "Supervisions-Idee",
  "capstone.ideaPlaceholder":
    "Beispiel: eine kleine Job-Queue, ein Chat-Hub, ein Telemetrie-Sammler oder ein Todo-Service.",
  "capstone.protocolPlaceholder":
    "Schreibe die wichtigsten Nachrichten auf, z. B. {add, Job}, {get, From}, {stop}.",
  "capstone.supervisionPlaceholder":
    "Erklaere, welche Prozesse crashen duerfen, welcher Prozess sie neu startet und warum diese Strategie sinnvoll ist.",
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
    "Beides. Der Einstieg ist anfaengerfreundlich, aber die spaeteren Module fuehren bereits an produktionsnahe Konzepte heran.",
  "footer.body":
    "Von den ersten Atomen bis zu OTP und verteilten Systemen. Klar, motivierend und direkt nutzbar.",
  "footer.repo": "Repository auf GitHub",
};

const copy = {
  en: {
    meta: defaultMeta,
    status: {
      notConnected: "Backend not connected yet. Add your Supabase keys in config.js.",
      connectedGuest: "Backend connected. Sign in to save progress to your account.",
      connectedUser: "Progress sync is active for your account.",
      syncing: "Syncing progress...",
      synced: "Progress synced.",
      syncError: "Sync failed. Changes remain stored on this device.",
      loginSuccess: "You are logged in. Your saved progress has been loaded.",
      registerSuccess: "Registration worked. Check your email if confirmation is enabled.",
      resetSuccess: "Password reset email sent.",
      logoutSuccess: "You have been logged out.",
      authConfigMissing: "Auth is not active yet. Configure Supabase in config.js first.",
      loadError: "Could not load your saved course state.",
    },
    auth: {
      guestPill: "Guest",
      userPill: "Signed in",
      headlineGuest: "Save your course progress to your own account.",
      headlineUser: "Your learning state is linked to your account.",
      sublineGuest:
        "Register or sign in to sync your roadmap, quiz state, and course progress across devices.",
      sublineUser:
        "Your progress, checklist state, and quiz answers are now stored per user.",
      passwordMismatch: "The repeated password does not match.",
      unknownError: "Something went wrong. Please try again.",
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
    status: {
      notConnected:
        "Backend noch nicht verbunden. Trage zuerst deine Supabase-Keys in config.js ein.",
      connectedGuest:
        "Backend verbunden. Melde dich an, um deinen Fortschritt mit deinem Account zu speichern.",
      connectedUser: "Dein Lernfortschritt wird jetzt mit deinem Account synchronisiert.",
      syncing: "Fortschritt wird synchronisiert...",
      synced: "Fortschritt synchronisiert.",
      syncError: "Synchronisierung fehlgeschlagen. Aenderungen bleiben lokal gespeichert.",
      loginSuccess: "Du bist eingeloggt. Dein gespeicherter Fortschritt wurde geladen.",
      registerSuccess:
        "Registrierung erfolgreich. Falls E-Mail-Bestaetigung aktiv ist, pruefe jetzt dein Postfach.",
      resetSuccess: "Die E-Mail zum Zuruecksetzen des Passworts wurde gesendet.",
      logoutSuccess: "Du wurdest ausgeloggt.",
      authConfigMissing:
        "Auth ist noch nicht aktiv. Konfiguriere zuerst Supabase in config.js.",
      loadError: "Dein gespeicherter Kursstatus konnte nicht geladen werden.",
    },
    auth: {
      guestPill: "Gast",
      userPill: "Eingeloggt",
      headlineGuest: "Speichere deinen Kursfortschritt in deinem eigenen Account.",
      headlineUser: "Dein Lernstatus ist jetzt mit deinem Account verknuepft.",
      sublineGuest:
        "Registriere dich oder logge dich ein, um Roadmap, Quizstatus und Kursfortschritt auf allen Geraeten zu synchronisieren.",
      sublineUser:
        "Dein Fortschritt, deine Checklisten und deine Quizantworten werden jetzt pro User gespeichert.",
      passwordMismatch: "Die Passwort-Wiederholung stimmt nicht ueberein.",
      unknownError: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
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
  },
};

const supabaseConfig = window.ERLANG_CAMPUS_SUPABASE || {};
const supabaseEnabled = Boolean(
  supabaseConfig.url &&
  supabaseConfig.anonKey &&
  !String(supabaseConfig.url).includes("YOUR_") &&
  !String(supabaseConfig.anonKey).includes("YOUR_"),
);

let supabase = null;
let supabaseReady = false;

if (supabaseEnabled && window.supabase?.createClient) {
  try {
    supabase = window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    });
    supabaseReady = true;
  } catch (error) {
    console.error("Failed to initialize Supabase client.", error);
  }
}

let currentUser = null;
let syncTimer = null;

function getLanguage() {
  return localStorage.getItem(languageKey) || "en";
}

function readStoredJson(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) return fallback;
    return JSON.parse(rawValue);
  } catch (error) {
    console.warn(`Ignoring invalid localStorage value for ${key}.`, error);
    localStorage.removeItem(key);
    return fallback;
  }
}

function getLangCopy() {
  return copy[getLanguage()] || copy.en;
}

function applyTheme(theme) {
  body.classList.toggle("dark", theme === "dark");
}

function loadTheme() {
  const storedTheme = localStorage.getItem(themeKey);
  if (storedTheme) {
    applyTheme(storedTheme);
    return;
  }

  applyTheme(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
}

function setLanguage(language) {
  const lang = language === "de" ? "de" : "en";
  localStorage.setItem(languageKey, lang);
  html.lang = lang;

  const meta = copy[lang].meta;
  if (titleEl) titleEl.textContent = meta.title;
  if (descriptionMeta) descriptionMeta.content = meta.description;
  if (ogTitleMeta) ogTitleMeta.content = meta.ogTitle;
  if (ogDescriptionMeta) ogDescriptionMeta.content = meta.ogDescription;
  if (ogLocaleMeta) ogLocaleMeta.content = meta.locale;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (!key) return;
    element.textContent = lang === "de" ? germanText[key] || defaultText.get(key) || "" : defaultText.get(key) || "";
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (!key) return;
    const value = lang === "de" ? germanText[key] || defaultAria.get(key) || "" : defaultAria.get(key) || "";
    element.setAttribute("aria-label", value);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (!key) return;
    const value =
      lang === "de"
        ? germanText[key] || ""
        : defaultPlaceholders.get(key) || element.getAttribute("placeholder") || "";
    if (value) {
      element.setAttribute("placeholder", value);
    }
  });

  langToggles.forEach((toggle) => {
    toggle.classList.toggle("is-active", toggle.dataset.lang === lang);
  });

  updateAuthUI();
  refreshQuizFeedbackTexts();
  updateQuizScore();
}

function setAuthModalStatus(message = "") {
  if (authModalStatus) {
    authModalStatus.textContent = message;
  }
}

function setSyncStatus(message) {
  if (syncStatus) {
    syncStatus.textContent = message;
  }
}

function updateAuthUI() {
  const langCopy = getLangCopy();
  const isLoggedIn = Boolean(currentUser);

  if (authStatusPill) {
    authStatusPill.textContent = isLoggedIn ? langCopy.auth.userPill : langCopy.auth.guestPill;
  }

  if (authHeadline) {
    authHeadline.textContent = isLoggedIn
      ? langCopy.auth.headlineUser
      : langCopy.auth.headlineGuest;
  }

  if (authSubline) {
    authSubline.textContent = isLoggedIn
      ? langCopy.auth.sublineUser
      : langCopy.auth.sublineGuest;
  }

  if (authGuestActions) {
    authGuestActions.classList.toggle("account-actions--hidden", isLoggedIn);
  }

  if (authUserActions) {
    authUserActions.classList.toggle("account-actions--hidden", !isLoggedIn);
  }

  if (authUserEmail) {
    authUserEmail.textContent = currentUser?.email || "";
  }

  if (!supabaseEnabled) {
    setSyncStatus(langCopy.status.notConnected);
  } else if (!supabaseReady) {
    setSyncStatus("Sync is temporarily unavailable in this browser session.");
  } else if (isLoggedIn) {
    setSyncStatus(langCopy.status.connectedUser);
  } else {
    setSyncStatus(langCopy.status.connectedGuest);
  }
}

function setAuthTab(tab) {
  const nextTab = ["login", "register", "reset"].includes(tab) ? tab : "login";
  localStorage.setItem(authTabKey, nextTab);

  authTabs.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.authTab === nextTab);
  });

  authPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.authPanel === nextTab);
  });

  setAuthModalStatus("");
}

function getLocalState() {
  return {
    progress_state: progressItems.map((item) => item.checked),
    quiz_state: quizCards.map((card) => ({
      solved: card.dataset.solved === "true",
      choice_index: card.dataset.choiceIndex ? Number(card.dataset.choiceIndex) : null,
    })),
    input_state: Object.fromEntries(
      userInputs.map((input) => [input.dataset.userInput, input.value]),
    ),
    language: getLanguage(),
  };
}

function saveLocalState() {
  const state = getLocalState();
  localStorage.setItem(progressKey, JSON.stringify(state.progress_state));
  localStorage.setItem(quizKey, JSON.stringify(state.quiz_state));
  localStorage.setItem(inputKey, JSON.stringify(state.input_state));
}

function applyProgressState(states = []) {
  progressItems.forEach((item, index) => {
    item.checked = Boolean(states[index]);
  });
  updateProgress();
}

function clearQuizVisuals() {
  quizCards.forEach((card) => {
    card.dataset.solved = "false";
    delete card.dataset.choiceIndex;
    const feedback = card.querySelector(".quiz-feedback");
    if (feedback) {
      feedback.textContent = "";
    }
    card.querySelectorAll(".quiz-option").forEach((option) => {
      option.classList.remove("is-correct", "is-wrong");
    });
  });
}

function applyQuizState(state = []) {
  clearQuizVisuals();
  state.forEach((entry, cardIndex) => {
    const card = quizCards[cardIndex];
    if (!card) return;
    const options = Array.from(card.querySelectorAll(".quiz-option"));
    const feedback = card.querySelector(".quiz-feedback");
    if (entry?.choice_index == null || !options[entry.choice_index]) {
      return;
    }

    const selected = options[entry.choice_index];
    const isCorrect = selected.dataset.correct === "true";
    selected.classList.add(isCorrect ? "is-correct" : "is-wrong");
    card.dataset.choiceIndex = String(entry.choice_index);
    card.dataset.solved = entry.solved ? "true" : "false";
    if (feedback) {
      feedback.textContent = isCorrect ? getLangCopy().quiz.correct : getLangCopy().quiz.wrongShort;
    }
  });
  updateQuizScore();
}

function loadLocalState() {
  const progress = readStoredJson(progressKey, []);
  const quiz = readStoredJson(quizKey, []);
  const inputState = readStoredJson(inputKey, {});
  applyProgressState(progress);
  applyQuizState(quiz);
  userInputs.forEach((input) => {
    input.value = inputState[input.dataset.userInput] || "";
  });
}

function updateProgress() {
  const completed = progressItems.filter((item) => item.checked).length;
  const total = progressItems.length;
  const percentage = total ? Math.round((completed / total) * 100) : 0;

  if (progressValue) progressValue.textContent = `${percentage}%`;
  if (progressCount) progressCount.textContent = String(completed);
  if (progressTotal) progressTotal.textContent = String(total);
  if (progressBar) progressBar.style.width = `${percentage}%`;
}

function updateQuizScore() {
  const solved = quizCards.filter((card) => card.dataset.solved === "true").length;
  if (quizScore) quizScore.textContent = String(solved);
  if (quizTotal) quizTotal.textContent = String(quizCards.length);
  if (!quizMessage) return;

  const langQuiz = getLangCopy().quiz;
  if (solved === 0) {
    quizMessage.textContent = langQuiz.start;
  } else if (solved < quizCards.length) {
    quizMessage.textContent = langQuiz.progress;
  } else {
    quizMessage.textContent = langQuiz.complete;
  }
}

function refreshQuizFeedbackTexts() {
  quizCards.forEach((card) => {
    const feedback = card.querySelector(".quiz-feedback");
    if (!feedback || !card.dataset.choiceIndex) return;
    feedback.textContent =
      card.dataset.solved === "true" ? getLangCopy().quiz.correct : getLangCopy().quiz.wrongShort;
  });
}

async function saveRemoteState() {
  if (!supabase || !currentUser) return;

  setSyncStatus(getLangCopy().status.syncing);
  const payload = {
    user_id: currentUser.id,
    progress_state: getLocalState().progress_state,
    quiz_state: getLocalState().quiz_state,
    input_state: getLocalState().input_state,
    language: getLanguage(),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("user_progress").upsert(payload);
  if (error) {
    console.error(error);
    setSyncStatus(getLangCopy().status.syncError);
    return;
  }

  setSyncStatus(getLangCopy().status.synced);
}

function queueRemoteSave() {
  saveLocalState();
  if (!currentUser || !supabase) return;
  clearTimeout(syncTimer);
  syncTimer = window.setTimeout(() => {
    void saveRemoteState();
  }, 400);
}

async function loadRemoteState() {
  if (!supabase || !currentUser) return;
  const { data, error } = await supabase
    .from("user_progress")
    .select("progress_state, quiz_state, input_state, language")
    .eq("user_id", currentUser.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    setSyncStatus(getLangCopy().status.loadError);
    return;
  }

  if (!data) {
    await saveRemoteState();
    return;
  }

  applyProgressState(data.progress_state || []);
  applyQuizState(data.quiz_state || []);
  userInputs.forEach((input) => {
    input.value = data.input_state?.[input.dataset.userInput] || "";
  });
  if (data.language) {
    setLanguage(data.language);
  }
  saveLocalState();
}

async function handleRegister(event) {
  event.preventDefault();
  if (!supabase) {
    setAuthModalStatus(getLangCopy().status.authConfigMissing);
    return;
  }

  const formData = new FormData(registerForm);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const repeat = String(formData.get("password_repeat") || "");

  if (password !== repeat) {
    setAuthModalStatus(getLangCopy().auth.passwordMismatch);
    return;
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: window.location.href },
  });

  if (error) {
    setAuthModalStatus(error.message || getLangCopy().auth.unknownError);
    return;
  }

  setAuthModalStatus(getLangCopy().status.registerSuccess);
}

async function handleLogin(event) {
  event.preventDefault();
  if (!supabase) {
    setAuthModalStatus(getLangCopy().status.authConfigMissing);
    return;
  }

  const formData = new FormData(loginForm);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    setAuthModalStatus(error.message || getLangCopy().auth.unknownError);
    return;
  }
}

async function handleReset(event) {
  event.preventDefault();
  if (!supabase) {
    setAuthModalStatus(getLangCopy().status.authConfigMissing);
    return;
  }

  const formData = new FormData(resetForm);
  const email = String(formData.get("email") || "").trim();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.href,
  });

  if (error) {
    setAuthModalStatus(error.message || getLangCopy().auth.unknownError);
    return;
  }

  setAuthModalStatus(getLangCopy().status.resetSuccess);
}

async function handleLogout() {
  if (!supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) {
    setAuthModalStatus(error.message || getLangCopy().auth.unknownError);
  }
}

function bindAuthPanels() {
  authJumpButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const nextTab = button.dataset.authJump || "login";
      setAuthTab(nextTab);
      authAccessSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  authTabs.forEach((button) => {
    button.addEventListener("click", () => setAuthTab(button.dataset.authTab));
  });
}

function bindLearningInteractions() {
  progressItems.forEach((item) => {
    item.addEventListener("change", () => {
      updateProgress();
      queueRemoteSave();
    });
  });

  userInputs.forEach((input) => {
    const eventName = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(eventName, () => {
      queueRemoteSave();
    });
  });

  quizCards.forEach((card) => {
    const options = Array.from(card.querySelectorAll(".quiz-option"));
    options.forEach((option, optionIndex) => {
      option.addEventListener("click", () => {
        options.forEach((entry) => entry.classList.remove("is-correct", "is-wrong"));
        const isCorrect = option.dataset.correct === "true";
        option.classList.add(isCorrect ? "is-correct" : "is-wrong");
        card.dataset.choiceIndex = String(optionIndex);
        card.dataset.solved = isCorrect ? "true" : "false";
        const feedback = card.querySelector(".quiz-feedback");
        if (feedback) {
          feedback.textContent = isCorrect ? getLangCopy().quiz.correct : getLangCopy().quiz.wrong;
        }
        updateQuizScore();
        queueRemoteSave();
      });
    });
  });
}

async function initAuth() {
  if (!supabase) {
    updateAuthUI();
    return;
  }

  const { data } = await supabase.auth.getSession();
  currentUser = data.session?.user || null;
  updateAuthUI();

  if (currentUser) {
    await loadRemoteState();
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    currentUser = session?.user || null;
    updateAuthUI();

    if (currentUser) {
      void loadRemoteState();
      setAuthModalStatus(getLangCopy().status.loginSuccess);
    } else {
      setAuthModalStatus(getLangCopy().status.logoutSuccess);
      loadLocalState();
    }
  });
}

function bootApp() {
  loadTheme();
  setLanguage(getLanguage());
  loadLocalState();
  updateAuthUI();
  bindAuthPanels();
  bindLearningInteractions();

  themeToggle?.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark") ? "light" : "dark";
    applyTheme(nextTheme);
    localStorage.setItem(themeKey, nextTheme);
  });

  langToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => setLanguage(toggle.dataset.lang || "en"));
  });

  loginForm?.addEventListener("submit", (event) => void handleLogin(event));
  registerForm?.addEventListener("submit", (event) => void handleRegister(event));
  resetForm?.addEventListener("submit", (event) => void handleReset(event));
  logoutButton?.addEventListener("click", () => void handleLogout());

  setAuthTab(localStorage.getItem(authTabKey) || "login");
  void initAuth();
}

try {
  bootApp();
} catch (error) {
  console.error("Erlang Campus failed to initialize.", error);
  updateAuthUI();
}
