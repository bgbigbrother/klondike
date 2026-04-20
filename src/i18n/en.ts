/**
 * English locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const en = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'Klondike Solitaire — Free Online Card Game',
  pageDescription: 'Play Klondike Solitaire free in your browser. No download, no sign-up. Classic card game with undo, auto-move, keyboard shortcuts and customisable rules.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: 'New Game',
  btnUndo: 'Undo',
  btnAutoMove: 'Auto-Move',
  btnAutoMoveTitle: 'Auto-Move to Foundation',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: 'Time',
  statMoves: 'Moves',
  statStock: 'Stock',
  statPass: 'Pass',
  statScore: 'Score',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: 'Stock',
  pileWaste: 'Waste',
  pileFoundationSpades: 'Foundation ♠',
  pileFoundationHearts: 'Foundation ♥',
  pileFoundationDiamonds: 'Foundation ♦',
  pileFoundationClubs: 'Foundation ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: 'Stock turns',
  toolbarStockTurnsInfo: 'Stock turns info',
  toolbarStockTurnsTooltip: 'Fewer stock passes = harder game. With 1 pass you only get one shot through the deck!',
  toolbarStockTurnsAriaLabel: 'Stock turns',
  toolbarFaceUp: 'Face up',
  settingStockPass: 'Stock Pass',
  settingFaceUp: 'Face Up',
  toolbarPause: 'Pause',
  toolbarMusic: 'Music',
  toolbarFullscreen: 'Fullscreen',
  toolbarExitFullscreen: 'Exit Fullscreen',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'Game Paused',
  pauseSubtitle: 'Take your time — your game is safe',
  pauseResume: 'Resume',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: 'You Win!',
  winFinalScore: 'Score',
  winTime: 'Time',
  winMoves: 'Moves',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: 'Auto-complete available!',
  autocompleteButton: 'Auto Complete',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'Card back',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: 'Music Player',
  musicSolitaireRadio: 'Solitaire Radio',
  musicTracksLabel: 'Tracks',
  musicTracksAriaLabel: 'Track selection',
  musicPlay: 'Play',
  musicPause: 'Pause',
  musicVolumeLabel: 'Volume',
  musicVolumeAriaLabel: 'Volume',
  musicMute: 'Mute',
  musicUnmute: 'Unmute',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `Track ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'Cello', 'Drums I', 'Drums II', 'Flute', 'Guitar I', 'Guitar II', 'Guitar III',
    'Jazz', 'Nature I', 'Nature II', 'Nature III', 'Nature IV', 'Nature V', 'Nature VI',
    'Orchestra', 'Piano I', 'Piano II', 'Piano III', 'Piano IV', 'Piano V', 'Piano VI',
    'Piano VII', 'Piano VIII', 'Synth I', 'Synth II', 'Synth III', 'Violin',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'Klondike Solitaire. Free to play.',
  footerPrivacyPolicy: 'Privacy Policy',
  footerTermsOfService: 'Terms of Service',
  footerNavAriaLabel: 'Footer navigation',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'Klondike Solitaire',
  descriptionP1: 'The goal is simple: move all 52 cards onto the four Foundation piles, one per suit, built up in order from Ace to King.',
  descriptionP2: 'Klondike is the world\'s most recognised patience card game — the one that shipped with every copy of Windows for decades and introduced millions of people to solitaire. Its name comes from the Klondike region of Canada, though the game itself likely predates the Gold Rush era. Today it remains the definitive single-player card game, equally at home on a felt tabletop or a touchscreen.',

  howToPlayHeading: 'How to Play',
  howToPlayLayoutHeading: 'The Layout',
  howToPlayLayoutP: 'The game opens with seven Tableau columns. Column 1 has one card face-up; column 2 has one face-down and one face-up; and so on up to column 7. The remaining 24 cards sit face-down in the Stock pile. Four empty Foundation piles wait in the top-right corner, one for each suit.',
  howToPlayGoalHeading: 'Your Goal',
  howToPlayGoalP: 'Move every card to the Foundations. Each Foundation pile starts with an Ace and is built up in the same suit — Ace, 2, 3 … Queen, King. Fill all four piles and you win.',
  howToPlayTableauHeading: 'Moving Cards in the Tableau',
  howToPlayTableauP: 'Drag a face-up card (or a stack of face-up cards) onto another Tableau column. The card you place must be one rank lower and the opposite colour to the card it lands on — for example, a red 7 on a black 8. Only a King (or a stack led by a King) may be placed on an empty Tableau column.',
  howToPlayStockHeading: 'Drawing from the Stock',
  howToPlayStockP: 'Click the Stock pile to flip the top card face-up onto the Waste pile. You can play the top Waste card at any time. When the Stock runs out, click it again to recycle the Waste back into the Stock (a score penalty applies).',
  howToPlayFoundationsHeading: 'Sending Cards to the Foundations',
  howToPlayFoundationsP: 'Drag an eligible card to a Foundation pile, or double-click it to send it there automatically. Use the Auto-Move button in the header to move every currently eligible card to the Foundations in one action.',
  howToPlayUndoHeading: 'Undo',
  howToPlayUndoP: 'Click the Undo button (or press Ctrl+Z / Cmd+Z) to reverse your last action. You can undo all the way back to the opening deal.',

  rulesHeading: 'Rules — Step-by-Step',
  rules: [
    '<strong>Shuffle &amp; Deal</strong> — The 52-card deck is shuffled and dealt into 7 Tableau columns. Column N receives N cards; only the top card of each column is face-up. The remaining 24 cards form the Stock.',
    '<strong>Tableau builds down in alternating colours</strong> — A face-up card may be placed on any Tableau card that is exactly one rank higher and the opposite colour (red on black, black on red).',
    '<strong>Only Kings fill empty columns</strong> — When a Tableau column is cleared, only a King (or a stack led by a King) may be moved there.',
    '<strong>Move stacks as a unit</strong> — Any sequence of face-up cards in correct alternating-colour order may be dragged and dropped together onto a valid Tableau card.',
    '<strong>Flip the top face-down card automatically</strong> — Whenever a move exposes the top face-down card of a Tableau column, it flips face-up immediately.',
    '<strong>Draw one card at a time from the Stock</strong> — Each click on the Stock moves the top card face-up onto the Waste. Only the top Waste card is in play.',
    '<strong>Recycle the Waste</strong> — When the Stock is empty, click it to turn the entire Waste pile face-down back into the Stock. A penalty of 100 points is applied each time (minimum score is 0). If a pass limit is set, recycling is disabled once the limit is reached.',
    '<strong>Build Foundations from Ace to King</strong> — Each Foundation pile accepts cards of one suit in ascending order: Ace first, then 2 through King. The suit is fixed by the first Ace placed.',
    '<strong>Move cards back from a Foundation</strong> — A card on a Foundation pile may be dragged back to the Tableau if the placement is valid, though a score penalty applies.',
    '<strong>Win by completing all four Foundations</strong> — Place all 52 cards on the four Foundation piles (13 per suit, Ace through King) to win the game.',
  ],

  shortcutsHeading: 'Keyboard Shortcuts',
  shortcutsKeyCol: 'Key',
  shortcutsActionCol: 'Action',
  shortcuts: [
    { key: '← → ↑ ↓ Arrow keys', action: 'Move the keyboard cursor between piles' },
    { key: 'Space', action: 'Select the card(s) at the cursor, or confirm a move to the highlighted target' },
    { key: 'Escape', action: 'Cancel the current selection' },
    { key: 'F2', action: 'Start a new game' },
    { key: 'Ctrl+Z / Cmd+Z', action: 'Undo the last action' },
    { key: 'A', action: 'Auto-move all eligible cards to the Foundations' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'Privacy Policy — Klondike Solitaire',
  privacyPageDescription: 'Privacy Policy for Klondike Solitaire. Learn how we handle your data.',
  privacyBackToGame: 'Back to Game',
  privacyHeading: 'Privacy Policy',
  privacyLastUpdated: 'Last updated: April 7, 2026',
  privacyIntro: 'This Privacy Policy describes how Klondike Solitaire ("we", "us", or "our") handles information when you use our free online card game at <a href="/">this site</a>.',
  privacyCollectHeading: 'Information We Collect',
  privacyCollectP: 'We do not require you to create an account or provide any personal information to play the game. We may collect limited, non-personal technical data automatically, including:',
  privacyCollectItems: ['Browser type and version', 'Operating system', 'Referring URLs and pages visited', 'Date and time of visits'],
  privacyCollectNote: 'This data is collected in aggregate and cannot be used to identify you personally.',
  privacyStorageHeading: 'Local Storage',
  privacyStorageP: "The game may use your browser's local storage to save game preferences (such as stock turn settings) locally on your device. This data never leaves your browser and is not transmitted to us.",
  privacyCookiesHeading: 'Cookies',
  privacyCookiesP: 'We do not use tracking cookies or advertising cookies. Any cookies set are strictly necessary for the game to function and do not collect personal data.',
  privacyThirdPartyHeading: 'Third-Party Services',
  privacyThirdPartyP: 'We may use third-party services such as a CDN (Content Delivery Network) to serve the game assets. These services may collect standard server log data (such as IP addresses) as part of normal internet operations. We do not sell or share your data with advertisers.',
  privacyChildrenHeading: "Children's Privacy",
  privacyChildrenP: 'Our game is suitable for all ages. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us so we can delete it.',
  privacyChangesHeading: 'Changes to This Policy',
  privacyChangesP: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the game after changes constitutes acceptance of the updated policy.',
  privacyContactHeading: 'Contact',
  privacyContactP: 'If you have any questions about this Privacy Policy, you can reach us via the contact information on our site.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: 'Terms of Service — Klondike Solitaire',
  tosPageDescription: 'Terms of Service for Klondike Solitaire.',
  tosBackToGame: 'Back to Game',
  tosHeading: 'Terms of Service',
  tosLastUpdated: 'Last updated: April 7, 2026',
  tosIntro: 'By accessing or using Klondike Solitaire ("the game", "the site"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.',
  tosUseHeading: 'Use of the Game',
  tosUseP: 'Klondike Solitaire is provided free of charge for personal, non-commercial entertainment. You may:',
  tosUseMayItems: ['Play the game for personal enjoyment', 'Share the site URL with others'],
  tosUseMayNotP: 'You may not:',
  tosUseMayNotItems: [
    'Copy, redistribute, or resell the game or its assets without permission',
    'Attempt to reverse-engineer, decompile, or tamper with the game',
    'Use automated tools or bots to interact with the game',
    'Use the site for any unlawful purpose',
  ],
  tosIPHeading: 'Intellectual Property',
  tosIPP: 'All content on this site, including the game code, graphics, card artwork, and audio, is owned by or licensed to us. Nothing in these Terms grants you any rights to our intellectual property beyond what is needed to play the game.',
  tosWarrantyHeading: 'Disclaimer of Warranties',
  tosWarrantyP: 'The game is provided "as is" without warranties of any kind, express or implied. We do not guarantee that the site will be available at all times, error-free, or free of viruses or other harmful components.',
  tosLiabilityHeading: 'Limitation of Liability',
  tosLiabilityP: 'To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the game.',
  tosChangesHeading: 'Changes to These Terms',
  tosChangesP: 'We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated date. Continued use of the game after changes constitutes your acceptance of the revised Terms.',
  tosLawHeading: 'Governing Law',
  tosLawP: 'These Terms are governed by applicable law. Any disputes shall be resolved in the appropriate courts of the applicable jurisdiction.',
  tosContactHeading: 'Contact',
  tosContactP: 'If you have questions about these Terms, please contact us via the information available on our site.',
};

export type Locale = typeof en;
