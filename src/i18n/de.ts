/**
 * German locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const de = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'Klondike Solitaire — Kostenloses Kartenspiel Online',
  pageDescription: 'Spielen Sie Klondike Solitaire kostenlos in Ihrem Browser. Kein Download, keine Anmeldung. Klassisches Kartenspiel mit Rückgängig, Auto-Move, Tastaturkürzeln und anpassbaren Regeln.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: 'Neues Spiel',
  btnUndo: 'Rückgängig',
  btnAutoMove: 'Auto-Zug',
  btnAutoMoveTitle: 'Auto-Zug zur Foundation',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: 'Zeit',
  statMoves: 'Züge',
  statStock: 'Vorrat',
  statPass: 'Durchgang',
  statScore: 'Punktzahl',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: 'Vorrat',
  pileWaste: 'Ablage',
  pileFoundationSpades: 'Foundation ♠',
  pileFoundationHearts: 'Foundation ♥',
  pileFoundationDiamonds: 'Foundation ♦',
  pileFoundationClubs: 'Foundation ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: 'Vorrat-Durchläufe',
  toolbarStockTurnsInfo: 'Info zu Vorrat-Durchläufen',
  toolbarStockTurnsTooltip: 'Weniger Durchläufe = schwierigeres Spiel. Mit 1 Durchgang haben Sie nur eine Chance, das Deck zu durchlaufen!',
  toolbarStockTurnsAriaLabel: 'Vorrat-Durchläufe',
  toolbarFaceUp: 'Offen',
  settingStockPass: 'Vorrat-Durchgang',
  settingFaceUp: 'Offen',
  toolbarPause: 'Pause',
  toolbarMusic: 'Musik',
  toolbarFullscreen: 'Vollbild',
  toolbarExitFullscreen: 'Vollbild beenden',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'Spiel pausiert',
  pauseSubtitle: 'Lassen Sie sich Zeit — Ihr Spiel ist sicher',
  pauseResume: 'Fortsetzen',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: 'Sie gewinnen!',
  winFinalScore: 'Punktzahl',
  winTime: 'Zeit',
  winMoves: 'Züge',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: 'Auto-Vervollständigung verfügbar!',
  autocompleteButton: 'Auto Vervollständigen',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'Kartenrücken',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: 'Musikplayer',
  musicSolitaireRadio: 'Solitaire Radio',
  musicTracksLabel: 'Titel',
  musicTracksAriaLabel: 'Titelauswahl',
  musicPlay: 'Abspielen',
  musicPause: 'Pause',
  musicVolumeLabel: 'Lautstärke',
  musicVolumeAriaLabel: 'Lautstärke',
  musicMute: 'Stumm',
  musicUnmute: 'Ton an',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `Track ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'Cello', 'Schlagzeug I', 'Schlagzeug II', 'Flöte', 'Gitarre I', 'Gitarre II', 'Gitarre III',
    'Jazz', 'Natur I', 'Natur II', 'Natur III', 'Natur IV', 'Natur V', 'Natur VI',
    'Orchester', 'Klavier I', 'Klavier II', 'Klavier III', 'Klavier IV', 'Klavier V', 'Klavier VI',
    'Klavier VII', 'Klavier VIII', 'Synth I', 'Synth II', 'Synth III', 'Violine',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'Klondike Solitaire. Kostenlos spielbar.',
  footerPrivacyPolicy: 'Datenschutzrichtlinie',
  footerTermsOfService: 'Nutzungsbedingungen',
  footerNavAriaLabel: 'Footer-Navigation',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'Klondike Solitaire',
  descriptionP1: 'Das Ziel ist einfach: Verschieben Sie alle 52 Karten auf die vier Foundation-Stapel, eine pro Farbe, aufsteigend vom Ass bis zum König.',
  descriptionP2: 'Klondike ist das bekannteste Patience-Spiel der Welt — das Spiel, das jahrzehntelang jeder Windows-Kopie beilag und Millionen von Menschen mit Solitaire vertraut machte. Sein Name stammt aus der Klondike-Region in Kanada, obwohl das Spiel selbst wahrscheinlich älter ist als der Goldrausch. Heute ist es nach wie vor das definitive Solitär-Kartenspiel, das auf einem Filztisch genauso gut funktioniert wie auf einem Touchscreen.',

  howToPlayHeading: 'Spielanleitung',
  howToPlayLayoutHeading: 'Das Layout',
  howToPlayLayoutP: 'Das Spiel beginnt mit sieben Tableau-Spalten. Spalte 1 hat eine offene Karte; Spalte 2 hat eine verdeckte und eine offene Karte; und so weiter bis Spalte 7. Die restlichen 24 Karten liegen verdeckt im Vorrat. Vier leere Foundation-Stapel warten in der oberen rechten Ecke, eine für jede Farbe.',
  howToPlayGoalHeading: 'Ihr Ziel',
  howToPlayGoalP: 'Bringen Sie alle Karten auf die Foundations. Jeder Foundation-Stapel beginnt mit einem Ass und wird in derselben Farbe aufgebaut — Ass, 2, 3 … Dame, König. Wenn Sie alle vier Stapel gefüllt haben, haben Sie gewonnen.',
  howToPlayTableauHeading: 'Karten im Tableau verschieben',
  howToPlayTableauP: 'Ziehen Sie eine offene Karte (oder einen Stapel offener Karten) auf eine andere Tableau-Spalte. Die Karte, die Sie ablegen, muss einen niedrigeren Rang und die entgegengesetzte Farbe haben — zum Beispiel eine rote 7 auf eine schwarze 8. Nur ein König (oder ein Stapel mit einem König an der Spitze) darf auf eine leere Tableau-Spalte gelegt werden.',
  howToPlayStockHeading: 'Vom Vorrat ziehen',
  howToPlayStockP: 'Klicken Sie auf den Vorrat, um die oberste Karte offen auf die Ablage zu legen. Sie können die oberste Ablagekarte jederzeit ausspielen. Wenn der Vorrat aufgebraucht ist, klicken Sie erneut darauf, um die Ablage zurück in den Vorrat zu recyclen (eine Punktestrafe wird verhängt).',
  howToPlayFoundationsHeading: 'Karten auf die Foundations legen',
  howToPlayFoundationsP: 'Ziehen Sie eine passende Karte auf einen Foundation-Stapel, oder doppelklicken Sie darauf, um sie automatisch dorthin zu verschieben. Verwenden Sie die Auto-Zug-Schaltfläche in der Kopfzeile, um alle derzeit passenden Karten in einem Zug auf die Foundations zu verschieben.',
  howToPlayUndoHeading: 'Rückgängig',
  howToPlayUndoP: 'Klicken Sie auf die Rückgängig-Schaltfläche (oder drücken Sie Strg+Z / Cmd+Z), um Ihren letzten Zug rückgängig zu machen. Sie können bis zum ursprünglichen Austeilen rückgängig machen.',

  rulesHeading: 'Regeln — Schritt für Schritt',
  rules: [
    '<strong>Mischen & Austeilen</strong> — Das 52-Karten-Deck wird gemischt und in 7 Tableau-Spalten ausgeteilt. Spalte N erhält N Karten; nur die oberste Karte jeder Spalte ist offen. Die restlichen 24 Karten bilden den Vorrat.',
    '<strong>Tableau wird absteigend in alternierenden Farben aufgebaut</strong> — Eine offene Karte kann auf jede Tableau-Karte gelegt werden, die genau einen Rang höher und die entgegengesetzte Farbe hat (rot auf schwarz, schwarz auf rot).',
    '<strong>Nur Könige füllen leere Spalten</strong> — Wenn eine Tableau-Spalte geleert wird, darf nur ein König (oder ein Stapel mit einem König an der Spitze) dorthin verschoben werden.',
    '<strong>Stapel als Einheit verschieben</strong> — Jede Folge von offenen Karten in korrekter, alternierender Farbreihenfolge kann gemeinsam auf eine gültige Tableau-Karte gezogen und abgelegt werden.',
    '<strong>Oberste verdeckte Karte automatisch umdrehen</strong> — Wenn ein Zug die oberste verdeckte Karte einer Tableau-Spalte freilegt, wird sie sofort offen umgedreht.',
    '<strong>Eine Karte nach dem anderen vom Vorrat ziehen</strong> — Jeder Klick auf den Vorrat bewegt die oberste Karte offen auf die Ablage. Nur die oberste Ablagekarte ist im Spiel.',
    '<strong>Ablage recyclen</strong> — Wenn der Vorrat leer ist, klicken Sie darauf, um die gesamte Ablage verdeckt zurück in den Vorrat zu verwandeln. Eine Strafe von 100 Punkten wird jedes Mal verhängt (Mindestpunktzahl ist 0). Wenn eine Durchgangsbegrenzung gesetzt ist, wird das Recycling deaktiviert, sobald die Grenze erreicht ist.',
    '<strong>Foundations vom Ass zum König aufbauen</strong> — Jeder Foundation-Stapel akzeptiert Karten einer Farbe in aufsteigender Reihenfolge: zuerst das Ass, dann 2 bis zum König. Die Farbe wird durch das erste gelegte Ass festgelegt.',
    '<strong>Karten von einer Foundation zurückholen</strong> — Eine Karte auf einem Foundation-Stapel kann zurück auf das Tableau gezogen werden, wenn der Zug gültig ist, allerdings wird eine Punktestrafe verhängt.',
    '<strong>Gewinnen durch Fertigstellen aller vier Foundations</strong> — Legen Sie alle 52 Karten auf die vier Foundation-Stapel (13 pro Farbe, Ass bis König), um das Spiel zu gewinnen.',
  ],

  shortcutsHeading: 'Tastaturkürzel',
  shortcutsKeyCol: 'Taste',
  shortcutsActionCol: 'Aktion',
  shortcuts: [
    { key: '← → ↑ ↓ Pfeiltasten', action: 'Bewegen Sie den Tastaturcursor zwischen den Stapeln' },
    { key: 'Leertaste', action: 'Wählen Sie die Karte(n) unter dem Cursor aus oder bestätigen Sie einen Zug auf das markierte Ziel' },
    { key: 'Escape', action: 'Aktuelle Auswahl abbrechen' },
    { key: 'F2', action: 'Ein neues Spiel beginnen' },
    { key: 'Strg+Z / Cmd+Z', action: 'Letzten Zug rückgängig machen' },
    { key: 'A', action: 'Alle passenden Karten automatisch auf die Foundations verschieben' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'Datenschutzrichtlinie — Klondike Solitaire',
  privacyPageDescription: 'Datenschutzrichtlinie für Klondike Solitaire. Erfahren Sie, wie wir mit Ihren Daten umgehen.',
  privacyBackToGame: 'Zurück zum Spiel',
  privacyHeading: 'Datenschutzrichtlinie',
  privacyLastUpdated: 'Letzte Aktualisierung: 7. April 2026',
  privacyIntro: 'Diese Datenschutzrichtlinie beschreibt, wie Klondike Solitaire („wir“, „uns“ oder „unser“) mit Informationen umgeht, wenn Sie unser kostenloses Online-Kartenspiel auf <a href="/">dieser Website</a> nutzen.',
  privacyCollectHeading: 'Informationen, die wir sammeln',
  privacyCollectP: 'Wir verlangen nicht, dass Sie ein Konto erstellen oder persönliche Daten angeben, um das Spiel zu spielen. Wir können automatisch begrenzte, nicht-personenbezogene technische Daten erfassen, darunter:',
  privacyCollectItems: ['Browsertyp und -version', 'Betriebssystem', 'Referrer-URLs und besuchte Seiten', 'Datum und Uhrzeit der Besuche'],
  privacyCollectNote: 'Diese Daten werden aggregiert erfasst und können nicht verwendet werden, um Sie persönlich zu identifizieren.',
  privacyStorageHeading: 'Lokaler Speicher',
  privacyStorageP: 'Das Spiel kann den lokalen Speicher Ihres Browsers verwenden, um Spieleinstellungen (wie die Einstellungen für Vorrat-Durchläufe) lokal auf Ihrem Gerät zu speichern. Diese Daten verlassen niemals Ihren Browser und werden nicht an uns übermittelt.',
  privacyCookiesHeading: 'Cookies',
  privacyCookiesP: 'Wir verwenden keine Tracking-Cookies oder Werbe-Cookies. Gesetzte Cookies sind streng notwendig für die Funktion des Spiels und sammeln keine personenbezogenen Daten.',
  privacyThirdPartyHeading: 'Dienste Dritter',
  privacyThirdPartyP: 'Wir können Dienste Dritter wie ein CDN (Content Delivery Network) nutzen, um die Spielinhalte auszuliefern. Diese Dienste können im Rahmen des normalen Internetbetriebs standardmäßige Server-Logdaten (wie IP-Adressen) erfassen. Wir verkaufen oder teilen Ihre Daten nicht mit Werbetreibenden.',
  privacyChildrenHeading: 'Datenschutz für Kinder',
  privacyChildrenP: 'Unser Spiel ist für alle Altersgruppen geeignet. Wir sammeln wissentlich keine persönlichen Informationen von Kindern unter 13 Jahren. Wenn Sie glauben, dass ein Kind uns persönliche Informationen gegeben hat, kontaktieren Sie uns bitte, damit wir sie löschen können.',
  privacyChangesHeading: 'Änderungen dieser Richtlinie',
  privacyChangesP: 'Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Änderungen werden auf dieser Seite mit einem aktualisierten Datum veröffentlicht. Die fortgesetzte Nutzung des Spiels nach Änderungen gilt als Ihre Zustimmung zur aktualisierten Richtlinie.',
  privacyContactHeading: 'Kontakt',
  privacyContactP: 'Wenn Sie Fragen zu dieser Datenschutzrichtlinie haben, können Sie uns über die Kontaktinformationen auf unserer Website erreichen.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: 'Nutzungsbedingungen — Klondike Solitaire',
  tosPageDescription: 'Nutzungsbedingungen für Klondike Solitaire.',
  tosBackToGame: 'Zurück zum Spiel',
  tosHeading: 'Nutzungsbedingungen',
  tosLastUpdated: 'Letzte Aktualisierung: 7. April 2026',
  tosIntro: 'Mit dem Zugriff auf oder der Nutzung von Klondike Solitaire („das Spiel“, „die Website“) erklären Sie sich mit diesen Nutzungsbedingungen einverstanden. Wenn Sie nicht einverstanden sind, nutzen Sie die Website bitte nicht.',
  tosUseHeading: 'Nutzung des Spiels',
  tosUseP: 'Klondike Solitaire wird kostenlos zur persönlichen, nicht-kommerziellen Unterhaltung bereitgestellt. Sie dürfen:',
  tosUseMayItems: ['Das Spiel zu Ihrem persönlichen Vergnügen spielen', 'Die URL der Website mit anderen teilen'],
  tosUseMayNotP: 'Sie dürfen nicht:',
  tosUseMayNotItems: [
    'Das Spiel oder seine Inhalte ohne Erlaubnis kopieren, weiterverbreiten oder verkaufen',
    'Versuch einer Reverse Engineering, Dekompilierung oder Manipulation des Spiels',
    'Automatisierte Werkzeuge oder Bots zur Interaktion mit dem Spiel verwenden',
    'Die Website für illegale Zwecke nutzen',
  ],
  tosIPHeading: 'Geistiges Eigentum',
  tosIPP: 'Alle Inhalte dieser Website, einschließlich Spielcode, Grafiken, Kartenillustrationen und Audio, sind unser Eigentum oder lizenziert. Diese Bedingungen gewähren Ihnen keine Rechte an unserem geistigen Eigentum, die über das zum Spielen notwendige Maß hinausgehen.',
  tosWarrantyHeading: 'Haftungsausschluss',
  tosWarrantyP: 'Das Spiel wird „wie besehen“ ohne jegliche Gewährleistung, weder ausdrücklich noch stillschweigend, bereitgestellt. Wir garantieren nicht, dass die Website jederzeit verfügbar, fehlerfrei oder frei von Viren oder anderen schädlichen Komponenten ist.',
  tosLiabilityHeading: 'Haftungsbeschränkung',
  tosLiabilityP: 'Soweit gesetzlich zulässig, haften wir nicht für indirekte, zufällige, besondere oder Folgeschäden, die aus Ihrer Nutzung oder Unfähigkeit zur Nutzung des Spiels entstehen.',
  tosChangesHeading: 'Änderungen dieser Bedingungen',
  tosChangesP: 'Wir behalten uns vor, diese Bedingungen jederzeit zu aktualisieren. Änderungen werden auf dieser Seite mit einem aktualisierten Datum veröffentlicht. Die fortgesetzte Nutzung des Spiels nach Änderungen gilt als Ihre Zustimmung zu den überarbeiteten Bedingungen.',
  tosLawHeading: 'Anwendbares Recht',
  tosLawP: 'Diese Bedingungen unterliegen dem anwendbaren Recht. Streitigkeiten werden vor den zuständigen Gerichten der jeweiligen Gerichtsbarkeit entschieden.',
  tosContactHeading: 'Kontakt',
  tosContactP: 'Wenn Sie Fragen zu diesen Bedingungen haben, kontaktieren Sie uns bitte über die auf unserer Website verfügbaren Informationen.',
};

export type Locale = typeof de;