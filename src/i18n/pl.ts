/**
 * Polish locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const pl = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'Klondike Solitaire — Darmowa Gra Karciana Online',
  pageDescription: 'Graj w Klondike Solitaire za darmo w przeglądarce. Bez pobierania, bez rejestracji. Klasyczna gra karciana z cofaniem, automatycznym ruchem, skrótami klawiszowymi i konfigurowalnymi zasadami.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: 'Nowa Gra',
  btnUndo: 'Cofnij',
  btnAutoMove: 'Auto-Ruch',
  btnAutoMoveTitle: 'Automatycznie przenieś do fundamentu',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: 'Czas',
  statMoves: 'Ruchy',
  statStock: 'Zakładka',
  statPass: 'Przejście',
  statScore: 'Wynik',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: 'Zakładka',
  pileWaste: 'Odrzuty',
  pileFoundationSpades: 'Fundament ♠',
  pileFoundationHearts: 'Fundament ♥',
  pileFoundationDiamonds: 'Fundament ♦',
  pileFoundationClubs: 'Fundament ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: 'Przejścia przez zakładkę',
  toolbarStockTurnsInfo: 'Informacja o przejściach',
  toolbarStockTurnsTooltip: 'Mniej przejść = trudniejsza gra. Przy 1 przejściu masz tylko jedną szansę na przeglądnięcie talii!',
  toolbarStockTurnsAriaLabel: 'Przejścia przez zakładkę',
  toolbarFaceUp: 'Odkryte',
  settingStockPass: 'Przejście przez zakładkę',
  settingFaceUp: 'Odkryte',
  toolbarPause: 'Pauza',
  toolbarMusic: 'Muzyka',
  toolbarFullscreen: 'Pełny ekran',
  toolbarExitFullscreen: 'Zamknij pełny ekran',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'Gra wstrzymana',
  pauseSubtitle: 'Nie spiesz się — twoja gra jest bezpieczna',
  pauseResume: 'Wznów',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: 'Wygrałeś!',
  winFinalScore: 'Wynik',
  winTime: 'Czas',
  winMoves: 'Ruchy',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: 'Autouzupełnianie dostępne!',
  autocompleteButton: 'Autouzupełnij',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'Rewers karty',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: 'Odtwarzacz muzyki',
  musicSolitaireRadio: 'Radio Solitaire',
  musicTracksLabel: 'Utwory',
  musicTracksAriaLabel: 'Wybór utworu',
  musicPlay: 'Odtwórz',
  musicPause: 'Wstrzymaj',
  musicVolumeLabel: 'Głośność',
  musicVolumeAriaLabel: 'Głośność',
  musicMute: 'Wycisz',
  musicUnmute: 'Przywróć dźwięk',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `Utwór ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'Wiolonczela', 'Perkusja I', 'Perkusja II', 'Flet', 'Gitara I', 'Gitara II', 'Gitara III',
    'Jazz', 'Natura I', 'Natura II', 'Natura III', 'Natura IV', 'Natura V', 'Natura VI',
    'Orkiestra', 'Piano I', 'Piano II', 'Piano III', 'Piano IV', 'Piano V', 'Piano VI',
    'Piano VII', 'Piano VIII', 'Syntezator I', 'Syntezator II', 'Syntezator III', 'Skrzypce',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'Klondike Solitaire. Darmowa gra.',
  footerPrivacyPolicy: 'Polityka prywatności',
  footerTermsOfService: 'Warunki świadczenia usług',
  footerNavAriaLabel: 'Nawigacja w stopce',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'Klondike Solitaire',
  descriptionP1: 'Cel jest prosty: przenieść wszystkie 52 karty na cztery stosy fundamentów, po jednym dla każdego koloru, ułożone w kolejności od Asa do Króla.',
  descriptionP2: 'Klondike to najpopularniejsza na świecie pasjansowa gra karciana — ta, która przez dziesięciolecia dołączana była do każdego egzemplarza Windows i wprowadziła miliony ludzi do solitaire’a. Jej nazwa pochodzi od regionu Klondike w Kanadzie, choć sama gra prawdopodobnie powstała jeszcze przed erą gorączki złota. Dziś pozostaje definitywną jednoosobową grą karcianą, równie dobrze czującą się na filcowym stole, jak i na ekranie dotykowym.',

  howToPlayHeading: 'Jak grać',
  howToPlayLayoutHeading: 'Układ',
  howToPlayLayoutP: 'Gra rozpoczyna się z siedmioma kolumnami na stole. Kolumna 1 ma jedną odkrytą kartę; kolumna 2 ma jedną zakrytą i jedną odkrytą; i tak dalej aż do kolumny 7. Pozostałe 24 karty leżą zakryte w zakładce. Cztery puste fundamenty czekają w prawym górnym rogu — jeden dla każdego koloru.',
  howToPlayGoalHeading: 'Twój cel',
  howToPlayGoalP: 'Przenieś wszystkie karty na fundamenty. Każdy fundament zaczyna się od Asa i jest budowany w tym samym kolorze — As, 2, 3 … Dama, Król. Wypełnij wszystkie cztery stosy i wygrywasz.',
  howToPlayTableauHeading: 'Przenoszenie kart na stole',
  howToPlayTableauP: 'Przeciągnij odkrytą kartę (lub stos odkrytych kart) na inną kolumnę stołu. Karta, którą kładziesz, musi być o jeden stopień niższa i w przeciwnym kolorze niż karta, na którą trafia — na przykład czerwona 7 na czarną 8. Tylko Król (lub stos na czele z Królem) może być położony na pustej kolumnie stołu.',
  howToPlayStockHeading: 'Dobieranie z zakładki',
  howToPlayStockP: 'Kliknij zakładkę, aby przenieść wierzchnią kartę odkrytą na odrzuty. Możesz w każdej chwili zagrać wierzchnią kartą odrzutów. Gdy zakładka się wyczerpie, kliknij ją ponownie, aby zrecyklować odrzuty z powrotem do zakładki (naliczana jest kara punktowa).',
  howToPlayFoundationsHeading: 'Wysyłanie kart na fundamenty',
  howToPlayFoundationsP: 'Przeciągnij kartę kwalifikującą się na fundament lub kliknij ją dwukrotnie, aby wysłać ją automatycznie. Użyj przycisku "Auto-Ruch" w nagłówku, aby przenieść wszystkie aktualnie kwalifikujące się karty na fundamenty w jednej akcji.',
  howToPlayUndoHeading: 'Cofnij',
  howToPlayUndoP: 'Kliknij przycisk Cofnij (lub naciśnij Ctrl+Z / Cmd+Z), aby cofnąć ostatnią akcję. Możesz cofać aż do początkowego rozdania.',

  rulesHeading: 'Zasady — krok po kroku',
  rules: [
    '<strong>Tasowanie i rozdanie</strong> — Talia 52 kart jest tasowana i rozdawana na 7 kolumn stołu. Kolumna N otrzymuje N kart; tylko wierzchnia karta każdej kolumny jest odkryta. Pozostałe 24 karty tworzą zakładkę.',
    '<strong>Stół buduje się w dół, naprzemiennie kolorami</strong> — Odkrytą kartę można położyć na dowolnej karcie stołu, która jest dokładnie o jeden stopień wyższa i w przeciwnym kolorze (czerwona na czarnej, czarna na czerwonej).',
    '<strong>Tylko Króle wypełniają puste kolumny</strong> — Gdy kolumna stołu zostanie opróżniona, tylko Król (lub stos na czele z Królem) może zostać tam przeniesiony.',
    '<strong>Przenoszenie stosów jako całości</strong> — Dowolny ciąg odkrytych kart we właściwej naprzemiennej kolorystyce może być przeciągnięty i upuszczony razem na właściwą kartę stołu.',
    '<strong>Automatyczne odkrywanie wierzchniej zakrytej karty</strong> — Gdy ruch odsłoni wierzchnią zakrytą kartę kolumny stołu, natychmiast zostaje ona odkryta.',
    '<strong>Dobieranie jednej karty na raz z zakładki</strong> — Każde kliknięcie zakładki przenosi wierzchnią kartę odkrytą na odrzuty. Tylko wierzchnia karta odrzutów jest w grze.',
    '<strong>Recykling odrzutów</strong> — Gdy zakładka jest pusta, kliknij ją, aby cały stos odrzutów zakryć i wrócić do zakładki. Za każdym razem naliczana jest kara 100 punktów (minimalny wynik to 0). Jeśli ustawiono limit przejść, recykling jest wyłączany po osiągnięciu limitu.',
    '<strong>Budowanie fundamentów od Asa do Króla</strong> — Każdy fundament przyjmuje karty jednego koloru w kolejności rosnącej: najpierw As, potem 2 aż do Króla. Kolor jest ustalany przez pierwszego położonego Asa.',
    '<strong>Przenoszenie kart z powrotem z fundamentu</strong> — Kartę na fundamencie można przeciągnąć z powrotem na stół, jeśli miejsce jest prawidłowe, choć naliczana jest kara punktowa.',
    '<strong>Zwycięstwo przez ukończenie wszystkich czterech fundamentów</strong> — Umieść wszystkie 52 karty na czterech fundamentach (13 na kolor, od Asa do Króla), aby wygrać grę.',
  ],

  shortcutsHeading: 'Skróty klawiszowe',
  shortcutsKeyCol: 'Klawisz',
  shortcutsActionCol: 'Akcja',
  shortcuts: [
    { key: '← → ↑ ↓ Strzałki', action: 'Przesuń kursor klawiatury między stosami' },
    { key: 'Spacja', action: 'Wybierz kartę(y) pod kursorem lub potwierdź ruch do podświetlonego celu' },
    { key: 'Esc', action: 'Anuluj bieżący wybór' },
    { key: 'F2', action: 'Rozpocznij nową grę' },
    { key: 'Ctrl+Z / Cmd+Z', action: 'Cofnij ostatnią akcję' },
    { key: 'A', action: 'Automatycznie przenieś wszystkie kwalifikujące się karty na fundamenty' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'Polityka prywatności — Klondike Solitaire',
  privacyPageDescription: 'Polityka prywatności dla Klondike Solitaire. Dowiedz się, jak przetwarzamy Twoje dane.',
  privacyBackToGame: 'Powrót do gry',
  privacyHeading: 'Polityka prywatności',
  privacyLastUpdated: 'Ostatnia aktualizacja: 7 kwietnia 2026 r.',
  privacyIntro: 'Niniejsza Polityka prywatności opisuje, w jaki sposób Klondike Solitaire ("my", "nas", "nam") postępuje z informacjami, gdy korzystasz z naszej darmowej internetowej gry karcianej na <a href="/">tej stronie</a>.',
  privacyCollectHeading: 'Informacje, które zbieramy',
  privacyCollectP: 'Nie wymagamy od Ciebie tworzenia konta ani podawania jakichkolwiek danych osobowych, aby grać. Możemy automatycznie zbierać ograniczone, nieosobowe dane techniczne, w tym:',
  privacyCollectItems: ['Typ i wersja przeglądarki', 'System operacyjny', 'Adresy URL odsyłające i odwiedzane strony', 'Data i godzina wizyt'],
  privacyCollectNote: 'Dane te są zbierane w sposób zagregowany i nie mogą być użyte do osobistej identyfikacji.',
  privacyStorageHeading: 'Przechowywanie lokalne',
  privacyStorageP: 'Gra może używać lokalnej pamięci przeglądarki do zapisywania preferencji gry (takich jak ustawienia przejść przez zakładkę) lokalnie na Twoim urządzeniu. Dane te nigdy nie opuszczają Twojej przeglądarki i nie są do nas przesyłane.',
  privacyCookiesHeading: 'Ciasteczka (cookies)',
  privacyCookiesP: 'Nie używamy ciasteczek śledzących ani reklamowych. Wszelkie ciasteczka, które są ustawiane, są ściśle niezbędne do działania gry i nie zbierają danych osobowych.',
  privacyThirdPartyHeading: 'Usługi zewnętrzne',
  privacyThirdPartyP: 'Możemy korzystać z usług zewnętrznych, takich jak CDN (sieć dostarczania treści), do dostarczania zasobów gry. Usługi te mogą zbierać standardowe dane dziennika serwera (takie jak adresy IP) w ramach normalnych operacji internetowych. Nie sprzedajemy ani nie udostępniamy Twoich danych reklamodawcom.',
  privacyChildrenHeading: 'Prywatność dzieci',
  privacyChildrenP: 'Nasza gra jest odpowiednia dla wszystkich grup wiekowych. Nie świadomie zbieramy dane osobowe od dzieci poniżej 13 roku życia. Jeśli uważasz, że dziecko dostarczyło nam dane osobowe, skontaktuj się z nami, abyśmy mogli je usunąć.',
  privacyChangesHeading: 'Zmiany niniejszej Polityki',
  privacyChangesP: 'Możemy od czasu do czasu aktualizować niniejszą Politykę prywatności. Zmiany zostaną opublikowane na tej stronie z zaktualizowaną datą. Kontynuowanie korzystania z gry po zmianach oznacza akceptację zaktualizowanej Polityki.',
  privacyContactHeading: 'Kontakt',
  privacyContactP: 'Jeśli masz jakiekolwiek pytania dotyczące niniejszej Polityki prywatności, możesz skontaktować się z nami za pośrednictwem danych kontaktowych na naszej stronie.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: 'Warunki świadczenia usług — Klondike Solitaire',
  tosPageDescription: 'Warunki świadczenia usług dla Klondike Solitaire.',
  tosBackToGame: 'Powrót do gry',
  tosHeading: 'Warunki świadczenia usług',
  tosLastUpdated: 'Ostatnia aktualizacja: 7 kwietnia 2026 r.',
  tosIntro: 'Korzystając z Klondike Solitaire ("gra", "strona"), zgadzasz się na przestrzeganie niniejszych Warunków świadczenia usług. Jeśli się nie zgadzasz, nie korzystaj ze strony.',
  tosUseHeading: 'Korzystanie z gry',
  tosUseP: 'Klondike Solitaire jest udostępniany bezpłatnie do osobistej, niekomercyjnej rozrywki. Możesz:',
  tosUseMayItems: ['Grać dla własnej przyjemności', 'Udostępniać adres URL strony innym'],
  tosUseMayNotP: 'Nie możesz:',
  tosUseMayNotItems: [
    'Kopiować, rozpowszechniać ani odsprzedawać gry lub jej zasobów bez pozwolenia',
    'Próbować inżynierii wstecznej, dekompilować ani ingerować w grę',
    'Używać zautomatyzowanych narzędzi ani botów do interakcji z grą',
    'Używać strony do jakiegokolwiek nielegalnego celu',
  ],
  tosIPHeading: 'Własność intelektualna',
  tosIPP: 'Wszystkie treści na tej stronie, w tym kod gry, grafika, ilustracje kart i audio, są naszą własnością lub są licencjonowane. Żadne z niniejszych Warunków nie przyznaje Ci żadnych praw do naszej własności intelektualnej poza tym, co jest niezbędne do grania.',
  tosWarrantyHeading: 'Wyłączenie gwarancji',
  tosWarrantyP: 'Gra jest dostarczana "tak jak jest" bez jakichkolwiek gwarancji, wyraźnych lub domniemanych. Nie gwarantujemy, że strona będzie dostępna przez cały czas, wolna od błędów lub wolna od wirusów i innych szkodliwych komponentów.',
  tosLiabilityHeading: 'Ograniczenie odpowiedzialności',
  tosLiabilityP: 'W maksymalnym zakresie dozwolonym przez prawo, nie ponosimy odpowiedzialności za jakiekolwiek pośrednie, przypadkowe, specjalne lub wynikowe szkody powstałe w wyniku korzystania z gry lub niemożności korzystania z niej.',
  tosChangesHeading: 'Zmiany niniejszych Warunków',
  tosChangesP: 'Zastrzegamy sobie prawo do aktualizacji niniejszych Warunków w dowolnym momencie. Zmiany zostaną opublikowane na tej stronie z zaktualizowaną datą. Kontynuowanie korzystania z gry po zmianach oznacza akceptację zmienionych Warunków.',
  tosLawHeading: 'Prawo właściwe',
  tosLawP: 'Niniejsze Warunki podlegają właściwemu prawu. Wszelkie spory będą rozstrzygane przez właściwe sądy odpowiedniej jurysdykcji.',
  tosContactHeading: 'Kontakt',
  tosContactP: 'Jeśli masz pytania dotyczące niniejszych Warunków, skontaktuj się z nami za pośrednictwem informacji dostępnych na naszej stronie.',
};

export type Locale = typeof pl;