/**
 * French locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const fr = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'Klondike Solitaire — Jeu de Cartes Gratuit en Ligne',
  pageDescription: 'Jouez au Klondike Solitaire gratuitement dans votre navigateur. Sans téléchargement, sans inscription. Le jeu de cartes classique avec annulation, mouvement automatique, raccourcis clavier et règles personnalisables.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: 'Nouvelle Partie',
  btnUndo: 'Annuler',
  btnAutoMove: 'Auto-Déplacement',
  btnAutoMoveTitle: 'Déplacer automatiquement vers la fondation',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: 'Temps',
  statMoves: 'Mouvements',
  statStock: 'Pioche',
  statPass: 'Passe',
  statScore: 'Score',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: 'Pioche',
  pileWaste: 'Écart',
  pileFoundationSpades: 'Fondation ♠',
  pileFoundationHearts: 'Fondation ♥',
  pileFoundationDiamonds: 'Fondation ♦',
  pileFoundationClubs: 'Fondation ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: 'Tours de pioche',
  toolbarStockTurnsInfo: 'Infos sur les tours de pioche',
  toolbarStockTurnsTooltip: 'Moins de passes = partie plus difficile. Avec 1 passe, vous n’avez qu’une seule chance de parcourir le tas !',
  toolbarStockTurnsAriaLabel: 'Tours de pioche',
  toolbarFaceUp: 'Face visible',
  settingStockPass: 'Passe de pioche',
  settingFaceUp: 'Face visible',
  toolbarPause: 'Pause',
  toolbarMusic: 'Musique',
  toolbarFullscreen: 'Plein écran',
  toolbarExitFullscreen: 'Quitter le plein écran',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'Jeu en pause',
  pauseSubtitle: 'Prenez votre temps — votre partie est sauvegardée',
  pauseResume: 'Reprendre',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: 'Vous avez gagné !',
  winFinalScore: 'Score',
  winTime: 'Temps',
  winMoves: 'Mouvements',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: 'Auto-complétion disponible !',
  autocompleteButton: 'Auto-Compléter',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'Dos de la carte',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: 'Lecteur de musique',
  musicSolitaireRadio: 'Radio Solitaire',
  musicTracksLabel: 'Pistes',
  musicTracksAriaLabel: 'Sélection de piste',
  musicPlay: 'Lire',
  musicPause: 'Pause',
  musicVolumeLabel: 'Volume',
  musicVolumeAriaLabel: 'Volume',
  musicMute: 'Silence',
  musicUnmute: 'Activer le son',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `Piste ${n} : ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'Violoncelle', 'Batterie I', 'Batterie II', 'Flûte', 'Guitare I', 'Guitare II', 'Guitare III',
    'Jazz', 'Nature I', 'Nature II', 'Nature III', 'Nature IV', 'Nature V', 'Nature VI',
    'Orchestre', 'Piano I', 'Piano II', 'Piano III', 'Piano IV', 'Piano V', 'Piano VI',
    'Piano VII', 'Piano VIII', 'Synthé I', 'Synthé II', 'Synthé III', 'Violon',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'Klondike Solitaire. Gratuit.',
  footerPrivacyPolicy: 'Politique de confidentialité',
  footerTermsOfService: 'Conditions d’utilisation',
  footerNavAriaLabel: 'Navigation pied de page',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'Klondike Solitaire',
  descriptionP1: 'L’objectif est simple : déplacer les 52 cartes vers les quatre piles de fondation, une par couleur, construites dans l’ordre de l’As au Roi.',
  descriptionP2: 'Le Klondike est le jeu de patience le plus connu au monde — celui qui était livré avec chaque copie de Windows pendant des décennies et qui a initié des millions de personnes au solitaire. Son nom vient de la région du Klondike au Canada, bien que le jeu lui-même soit probablement antérieur à la ruée vers l’or. Aujourd’hui, il reste le jeu de cartes solitaire par excellence, aussi à l’aise sur un tapis de table que sur un écran tactile.',

  howToPlayHeading: 'Comment jouer',
  howToPlayLayoutHeading: 'Le plateau',
  howToPlayLayoutP: 'Le jeu commence avec sept colonnes de tableau. La colonne 1 a une carte face visible ; la colonne 2 a une carte face cachée et une face visible ; et ainsi de suite jusqu’à la colonne 7. Les 24 cartes restantes sont face cachée dans la pioche. Quatre piles de fondation vides vous attendent dans le coin supérieur droit, une pour chaque couleur.',
  howToPlayGoalHeading: 'Votre objectif',
  howToPlayGoalP: 'Déplacez toutes les cartes vers les fondations. Chaque fondation commence par un As et se construit dans la même couleur — As, 2, 3 … Dame, Roi. Remplissez les quatre piles et vous gagnez.',
  howToPlayTableauHeading: 'Déplacer les cartes dans le tableau',
  howToPlayTableauP: 'Faites glisser une carte face visible (ou une pile de cartes face visible) sur une autre colonne du tableau. La carte que vous déposez doit être d’un rang inférieur et de couleur opposée à la carte sur laquelle elle tombe — par exemple, un 7 rouge sur un 8 noir. Seul un Roi (ou une pile menée par un Roi) peut être placé sur une colonne vide du tableau.',
  howToPlayStockHeading: 'Piocher',
  howToPlayStockP: 'Cliquez sur la pioche pour retourner la carte du dessus face visible sur l’écart. Vous pouvez jouer la carte du dessus de l’écart à tout moment. Quand la pioche est vide, recliquez dessus pour recycler l’écart dans la pioche (une pénalité de score s’applique).',
  howToPlayFoundationsHeading: 'Envoyer les cartes vers les fondations',
  howToPlayFoundationsP: 'Faites glisser une carte éligible vers une fondation, ou double-cliquez dessus pour l’y envoyer automatiquement. Utilisez le bouton "Auto-Déplacement" dans l’en-tête pour déplacer d’un seul coup toutes les cartes actuellement éligibles vers les fondations.',
  howToPlayUndoHeading: 'Annuler',
  howToPlayUndoP: 'Cliquez sur le bouton Annuler (ou appuyez sur Ctrl+Z / Cmd+Z) pour revenir sur votre dernière action. Vous pouvez annuler jusqu’à la donne initiale.',

  rulesHeading: 'Règles — Pas à pas',
  rules: [
    '<strong>Mélanger & Distribuer</strong> — Le jeu de 52 cartes est mélangé et distribué en 7 colonnes de tableau. La colonne N reçoit N cartes ; seule la carte du dessus de chaque colonne est face visible. Les 24 cartes restantes forment la pioche.',
    '<strong>Le tableau se construit vers le bas en couleurs alternées</strong> — Une carte face visible peut être placée sur toute carte du tableau qui est exactement d’un rang supérieur et de couleur opposée (rouge sur noir, noir sur rouge).',
    '<strong>Seuls les Rois remplissent les colonnes vides</strong> — Lorsqu’une colonne du tableau est vidée, seul un Roi (ou une pile menée par un Roi) peut y être déplacé.',
    '<strong>Déplacer des piles comme une seule unité</strong> — Toute séquence de cartes face visible dans l’ordre correct de couleurs alternées peut être glissée et déposée ensemble sur une carte valide du tableau.',
    '<strong>Retourner automatiquement la carte du dessus face cachée</strong> — Lorsqu’un mouvement découvre la carte du dessus face cachée d’une colonne du tableau, elle se retourne immédiatement face visible.',
    '<strong>Piocher une carte à la fois</strong> — Chaque clic sur la pioche déplace la carte du dessus face visible vers l’écart. Seule la carte du dessus de l’écart est en jeu.',
    '<strong>Recycler l’écart</strong> — Lorsque la pioche est vide, cliquez dessus pour retourner tout l’écart face cachée et en faire une nouvelle pioche. Une pénalité de 100 points est appliquée à chaque fois (le score minimum est 0). Si une limite de passes est définie, le recyclage est désactivé une fois la limite atteinte.',
    '<strong>Construire les fondations de l’As au Roi</strong> — Chaque fondation n’accepte que les cartes d’une seule couleur dans l’ordre croissant : d’abord l’As, puis le 2 jusqu’au Roi. La couleur est fixée par le premier As placé.',
    '<strong>Ramener une carte depuis une fondation</strong> — Une carte sur une fondation peut être ramenée vers le tableau si le placement est valide, mais une pénalité de score s’applique.',
    '<strong>Gagner en complétant les quatre fondations</strong> — Placez les 52 cartes sur les quatre piles de fondation (13 par couleur, de l’As au Roi) pour gagner la partie.',
  ],

  shortcutsHeading: 'Raccourcis clavier',
  shortcutsKeyCol: 'Touche',
  shortcutsActionCol: 'Action',
  shortcuts: [
    { key: '← → ↑ ↓ Flèches', action: 'Déplacer le curseur clavier entre les piles' },
    { key: 'Espace', action: 'Sélectionner la ou les cartes sous le curseur, ou confirmer un déplacement vers la cible surlignée' },
    { key: 'Échap', action: 'Annuler la sélection en cours' },
    { key: 'F2', action: 'Commencer une nouvelle partie' },
    { key: 'Ctrl+Z / Cmd+Z', action: 'Annuler la dernière action' },
    { key: 'A', action: 'Déplacer automatiquement toutes les cartes éligibles vers les fondations' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'Politique de confidentialité — Klondike Solitaire',
  privacyPageDescription: 'Politique de confidentialité de Klondike Solitaire. Découvrez comment nous traitons vos données.',
  privacyBackToGame: 'Retour au jeu',
  privacyHeading: 'Politique de confidentialité',
  privacyLastUpdated: 'Dernière mise à jour : 7 avril 2026',
  privacyIntro: 'Cette politique de confidentialité décrit comment Klondike Solitaire (« nous », « notre ») traite les informations lorsque vous utilisez notre jeu de cartes gratuit en ligne sur <a href="/">ce site</a>.',
  privacyCollectHeading: 'Informations que nous collectons',
  privacyCollectP: 'Nous ne vous demandons pas de créer un compte ni de fournir des informations personnelles pour jouer. Nous pouvons collecter automatiquement des données techniques limitées et non personnelles, notamment :',
  privacyCollectItems: ['Type et version du navigateur', 'Système d’exploitation', 'URLs de référence et pages visitées', 'Date et heure des visites'],
  privacyCollectNote: 'Ces données sont collectées de manière agrégée et ne peuvent pas être utilisées pour vous identifier personnellement.',
  privacyStorageHeading: 'Stockage local',
  privacyStorageP: "Le jeu peut utiliser le stockage local de votre navigateur pour enregistrer les préférences (comme les réglages des tours de pioche) localement sur votre appareil. Ces données ne quittent jamais votre navigateur et ne nous sont pas transmises.",
  privacyCookiesHeading: 'Cookies',
  privacyCookiesP: "Nous n'utilisons pas de cookies de suivi ou de publicité. Les cookies éventuels sont strictement nécessaires au fonctionnement du jeu et ne collectent pas de données personnelles.",
  privacyThirdPartyHeading: 'Services tiers',
  privacyThirdPartyP: 'Nous pouvons utiliser des services tiers tels qu’un CDN pour servir les ressources du jeu. Ces services peuvent collecter des données standard de journal serveur (comme les adresses IP) dans le cadre du fonctionnement normal d’Internet. Nous ne vendons ni ne partageons vos données avec des annonceurs.',
  privacyChildrenHeading: 'Confidentialité des enfants',
  privacyChildrenP: 'Notre jeu convient à tous les âges. Nous ne collectons pas sciemment d’informations personnelles auprès d’enfants de moins de 13 ans. Si vous pensez qu’un enfant nous a fourni des informations personnelles, veuillez nous contacter pour que nous puissions les supprimer.',
  privacyChangesHeading: 'Modifications de cette politique',
  privacyChangesP: 'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Les modifications seront affichées sur cette page avec une date mise à jour. L’utilisation continue du jeu après les modifications constitue votre acceptation de la politique révisée.',
  privacyContactHeading: 'Contact',
  privacyContactP: 'Si vous avez des questions concernant cette politique de confidentialité, vous pouvez nous contacter via les coordonnées figurant sur notre site.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: 'Conditions d’utilisation — Klondike Solitaire',
  tosPageDescription: 'Conditions d’utilisation de Klondike Solitaire.',
  tosBackToGame: 'Retour au jeu',
  tosHeading: 'Conditions d’utilisation',
  tosLastUpdated: 'Dernière mise à jour : 7 avril 2026',
  tosIntro: "En accédant ou en utilisant Klondike Solitaire (« le jeu », « le site »), vous acceptez d’être lié par ces conditions d’utilisation. Si vous n’êtes pas d’accord, veuillez ne pas utiliser le site.",
  tosUseHeading: 'Utilisation du jeu',
  tosUseP: 'Klondike Solitaire est fourni gratuitement pour un divertissement personnel et non commercial. Vous pouvez :',
  tosUseMayItems: ['Jouer au jeu pour votre plaisir personnel', 'Partager l’URL du site avec d’autres'],
  tosUseMayNotP: 'Vous ne pouvez pas :',
  tosUseMayNotItems: [
    'Copier, redistribuer ou revendre le jeu ou ses ressources sans autorisation',
    'Tenter d’effectuer de l’ingénierie inverse, décompiler ou altérer le jeu',
    'Utiliser des outils automatisés ou des bots pour interagir avec le jeu',
    'Utiliser le site à des fins illégales',
  ],
  tosIPHeading: 'Propriété intellectuelle',
  tosIPP: "Tout le contenu de ce site, y compris le code du jeu, les graphismes, l’illustration des cartes et l’audio, nous appartient ou est sous licence. Aucune disposition de ces conditions ne vous accorde de droits sur notre propriété intellectuelle au-delà de ce qui est nécessaire pour jouer.",
  tosWarrantyHeading: 'Garantie limitée',
  tosWarrantyP: 'Le jeu est fourni « en l’état » sans garantie d’aucune sorte, expresse ou implicite. Nous ne garantissons pas que le site sera disponible en tout temps, sans erreur, ni exempt de virus ou d’autres composants nuisibles.',
  tosLiabilityHeading: 'Limitation de responsabilité',
  tosLiabilityP: 'Dans toute la mesure permise par la loi, nous ne saurions être tenus responsables des dommages indirects, accessoires, spéciaux ou consécutifs découlant de votre utilisation ou de votre impossibilité d’utiliser le jeu.',
  tosChangesHeading: 'Modifications de ces conditions',
  tosChangesP: 'Nous nous réservons le droit de mettre à jour ces conditions à tout moment. Les modifications seront affichées sur cette page avec une date mise à jour. L’utilisation continue du jeu après les modifications constitue votre acceptation des conditions révisées.',
  tosLawHeading: 'Droit applicable',
  tosLawP: 'Les présentes conditions sont régies par la loi applicable. Tout litige sera résolu devant les tribunaux compétents de la juridiction correspondante.',
  tosContactHeading: 'Contact',
  tosContactP: 'Si vous avez des questions concernant ces conditions, veuillez nous contacter via les informations disponibles sur notre site.',
};

export type Locale = typeof fr;