/**
 * Italian locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const it = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'Klondike Solitario — Gioco di Carte Gratis Online',
  pageDescription: 'Gioca a Klondike Solitario gratuitamente nel tuo browser. Nessun download, nessuna registrazione. Il classico gioco di carte con annulla, movimento automatico, scorciatoie da tastiera e regole personalizzabili.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: 'Nuova Partita',
  btnUndo: 'Annulla',
  btnAutoMove: 'Auto-Muovi',
  btnAutoMoveTitle: 'Sposta automaticamente nella fondazione',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: 'Tempo',
  statMoves: 'Mosse',
  statStock: 'Mazzo',
  statPass: 'Passaggio',
  statScore: 'Punteggio',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: 'Mazzo',
  pileWaste: 'Scarto',
  pileFoundationSpades: 'Fondazione ♠',
  pileFoundationHearts: 'Fondazione ♥',
  pileFoundationDiamonds: 'Fondazione ♦',
  pileFoundationClubs: 'Fondazione ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: 'Giri del mazzo',
  toolbarStockTurnsInfo: 'Info giri del mazzo',
  toolbarStockTurnsTooltip: 'Meno passaggi = partita più difficile. Con 1 giro hai una sola possibilità di scorrere il mazzo!',
  toolbarStockTurnsAriaLabel: 'Giri del mazzo',
  toolbarFaceUp: 'Scoperto',
  settingStockPass: 'Passaggio del mazzo',
  settingFaceUp: 'Scoperto',
  toolbarPause: 'Pausa',
  toolbarMusic: 'Musica',
  toolbarFullscreen: 'Schermo intero',
  toolbarExitFullscreen: 'Esci dallo schermo intero',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'Gioco in pausa',
  pauseSubtitle: 'Prenditi il tuo tempo — la partita è al sicuro',
  pauseResume: 'Riprendi',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: 'Hai vinto!',
  winFinalScore: 'Punteggio',
  winTime: 'Tempo',
  winMoves: 'Mosse',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: 'Auto-completamento disponibile!',
  autocompleteButton: 'Auto Completa',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'Dorso della carta',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: 'Lettore musicale',
  musicSolitaireRadio: 'Radio Solitario',
  musicTracksLabel: 'Brani',
  musicTracksAriaLabel: 'Selezione brano',
  musicPlay: 'Riproduci',
  musicPause: 'Pausa',
  musicVolumeLabel: 'Volume',
  musicVolumeAriaLabel: 'Volume',
  musicMute: 'Silenzia',
  musicUnmute: 'Attiva audio',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `Traccia ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'Violoncello', 'Batteria I', 'Batteria II', 'Flauto', 'Chitarra I', 'Chitarra II', 'Chitarra III',
    'Jazz', 'Natura I', 'Natura II', 'Natura III', 'Natura IV', 'Natura V', 'Natura VI',
    'Orchestra', 'Piano I', 'Piano II', 'Piano III', 'Piano IV', 'Piano V', 'Piano VI',
    'Piano VII', 'Piano VIII', 'Sintetizzatore I', 'Sintetizzatore II', 'Sintetizzatore III', 'Violino',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'Klondike Solitario. Gratis da giocare.',
  footerPrivacyPolicy: 'Informativa sulla privacy',
  footerTermsOfService: 'Termini di servizio',
  footerNavAriaLabel: 'Navigazione piè di pagina',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'Klondike Solitario',
  descriptionP1: 'L’obiettivo è semplice: spostare tutte le 52 carte sui quattro mazzi della fondazione, uno per seme, costruiti in ordine crescente dall’Asso al Re.',
  descriptionP2: 'Il Klondike è il gioco di carte solitario più famoso al mondo — quello fornito con ogni copia di Windows per decenni, che ha introdotto milioni di persone al solitario. Il suo nome deriva dalla regione canadese del Klondike, anche se il gioco stesso è probabilmente antecedente alla corsa all’oro. Oggi rimane il gioco di carte per un giocatore per eccellenza, a suo agio sia su un tavolo di feltro che su uno schermo tattile.',

  howToPlayHeading: 'Come giocare',
  howToPlayLayoutHeading: 'Il layout',
  howToPlayLayoutP: 'Il gioco inizia con sette colonne del tableau. La colonna 1 ha una carta scoperta; la colonna 2 ha una coperta e una scoperta; e così via fino alla colonna 7. Le restanti 24 carte sono coperte nel mazzo. Quattro fondazioni vuote attendono nell’angolo in alto a destra, una per ogni seme.',
  howToPlayGoalHeading: 'Il tuo obiettivo',
  howToPlayGoalP: 'Sposta tutte le carte sulle fondazioni. Ogni fondazione inizia con un Asso e viene costruita nello stesso seme — Asso, 2, 3 … Regina, Re. Riempi tutte e quattro le fondazioni e vinci.',
  howToPlayTableauHeading: 'Spostare le carte nel tableau',
  howToPlayTableauP: 'Trascina una carta scoperta (o una pila di carte scoperte) su un’altra colonna del tableau. La carta che posizioni deve essere di rango inferiore e di colore opposto rispetto alla carta su cui la metti — ad esempio, un 7 rosso su un 8 nero. Solo un Re (o una pila guidata da un Re) può essere posizionato su una colonna vuota del tableau.',
  howToPlayStockHeading: 'Pescare dal mazzo',
  howToPlayStockP: 'Clicca sul mazzo per girare la prima carta scoperta sullo scarto. Puoi giocare la prima carta dello scarto in qualsiasi momento. Quando il mazzo finisce, clicca di nuovo per riciclare lo scarto nel mazzo (viene applicata una penalità di punteggio).',
  howToPlayFoundationsHeading: 'Inviare le carte alle fondazioni',
  howToPlayFoundationsP: 'Trascina una carta idonea su una fondazione, oppure fai doppio clic per inviarla automaticamente. Usa il pulsante Auto-Muovi nell’intestazione per spostare tutte le carte attualmente idonee sulle fondazioni in una sola azione.',
  howToPlayUndoHeading: 'Annulla',
  howToPlayUndoP: 'Clicca sul pulsante Annulla (o premi Ctrl+Z / Cmd+Z) per invertire l’ultima mossa. Puoi annullare fino alla distribuzione iniziale.',

  rulesHeading: 'Regole — Passo dopo passo',
  rules: [
    '<strong>Mischia e distribuisci</strong> — Il mazzo da 52 carte viene mescolato e distribuito in 7 colonne del tableau. La colonna N riceve N carte; solo la carta superiore di ogni colonna è scoperta. Le restanti 24 carte formano il mazzo.',
    '<strong>Il tableau si costruisce in ordine decrescente e colori alternati</strong> — Una carta scoperta può essere posizionata su qualsiasi carta del tableau che sia esattamente di rango superiore e di colore opposto (rosso su nero, nero su rosso).',
    '<strong>Solo i Re riempiono le colonne vuote</strong> — Quando una colonna del tableau viene liberata, solo un Re (o una pila guidata da un Re) può essere spostato lì.',
    '<strong>Sposta le pile come un’unità</strong> — Qualsiasi sequenza di carte scoperte in corretto ordine di colori alternati può essere trascinata e rilasciata insieme su una carta valida del tableau.',
    '<strong>Scopri automaticamente la prima carta coperta</strong> — Quando una mossa scopre la prima carta coperta di una colonna del tableau, questa si gira immediatamente scoperta.',
    '<strong>Pesca una carta alla volta dal mazzo</strong> — Ogni clic sul mazzo sposta la carta superiore scoperta sullo scarto. Solo la prima carta dello scarto è in gioco.',
    '<strong>Ricicla lo scarto</strong> — Quando il mazzo è vuoto, cliccalo per trasformare l’intero scarto coperto di nuovo nel mazzo. Viene applicata una penalità di 100 punti ogni volta (il punteggio minimo è 0). Se è impostato un limite di passaggi, il riciclaggio viene disabilitato una volta raggiunto il limite.',
    '<strong>Costruisci le fondazioni dall’Asso al Re</strong> — Ogni fondazione accetta carte di un solo seme in ordine crescente: prima l’Asso, poi il 2 fino al Re. Il seme è fissato dal primo Asso posizionato.',
    '<strong>Riporta le carte da una fondazione</strong> — Una carta su una fondazione può essere trascinata di nuovo sul tableau se la mossa è valida, anche se viene applicata una penalità di punteggio.',
    '<strong>Vinci completando tutte e quattro le fondazioni</strong> — Posiziona tutte le 52 carte sulle quattro fondazioni (13 per seme, dall’Asso al Re) per vincere la partita.',
  ],

  shortcutsHeading: 'Scorciatoie da tastiera',
  shortcutsKeyCol: 'Tasto',
  shortcutsActionCol: 'Azione',
  shortcuts: [
    { key: '← → ↑ ↓ Frecce', action: 'Sposta il cursore della tastiera tra i mazzi' },
    { key: 'Spazio', action: 'Seleziona la/e carta/e sotto il cursore o conferma una mossa verso la destinazione evidenziata' },
    { key: 'Esc', action: 'Annulla la selezione corrente' },
    { key: 'F2', action: 'Inizia una nuova partita' },
    { key: 'Ctrl+Z / Cmd+Z', action: 'Annulla l’ultima mossa' },
    { key: 'A', action: 'Sposta automaticamente tutte le carte idonee sulle fondazioni' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'Informativa sulla privacy — Klondike Solitario',
  privacyPageDescription: 'Informativa sulla privacy per Klondike Solitario. Scopri come gestiamo i tuoi dati.',
  privacyBackToGame: 'Torna al gioco',
  privacyHeading: 'Informativa sulla privacy',
  privacyLastUpdated: 'Ultimo aggiornamento: 7 aprile 2026',
  privacyIntro: 'La presente Informativa sulla privacy descrive come Klondike Solitario ("noi", "ci" o "nostro") gestisce le informazioni quando utilizzi il nostro gioco di carte online gratuito su <a href="/">questo sito</a>.',
  privacyCollectHeading: 'Informazioni che raccogliamo',
  privacyCollectP: 'Non ti richiediamo di creare un account o fornire informazioni personali per giocare. Possiamo raccogliere automaticamente dati tecnici limitati e non personali, tra cui:',
  privacyCollectItems: ['Tipo e versione del browser', 'Sistema operativo', 'URL di riferimento e pagine visitate', 'Data e ora delle visite'],
  privacyCollectNote: 'Questi dati vengono raccolti in forma aggregata e non possono essere utilizzati per identificarti personalmente.',
  privacyStorageHeading: 'Archiviazione locale',
  privacyStorageP: 'Il gioco può utilizzare l’archiviazione locale del tuo browser per salvare le preferenze di gioco (come le impostazioni dei giri del mazzo) localmente sul tuo dispositivo. Questi dati non lasciano mai il tuo browser e non vengono trasmessi a noi.',
  privacyCookiesHeading: 'Cookie',
  privacyCookiesP: 'Non utilizziamo cookie di tracciamento o pubblicitari. Eventuali cookie sono strettamente necessari per il funzionamento del gioco e non raccolgono dati personali.',
  privacyThirdPartyHeading: 'Servizi di terze parti',
  privacyThirdPartyP: 'Potremmo utilizzare servizi di terze parti come un CDN per servire le risorse del gioco. Questi servizi possono raccogliere dati standard di log del server (come indirizzi IP) come parte delle normali operazioni Internet. Non vendiamo né condividiamo i tuoi dati con inserzionisti.',
  privacyChildrenHeading: 'Privacy dei minori',
  privacyChildrenP: 'Il nostro gioco è adatto a tutte le età. Non raccogliamo consapevolmente informazioni personali da minori di 13 anni. Se ritieni che un minore ci abbia fornito informazioni personali, contattaci in modo da poterle eliminare.',
  privacyChangesHeading: 'Modifiche a questa informativa',
  privacyChangesP: 'Potremmo aggiornare questa Informativa sulla privacy di tanto in tanto. Le modifiche verranno pubblicate su questa pagina con una data aggiornata. L’uso continuato del gioco dopo le modifiche costituisce accettazione dell’informativa aggiornata.',
  privacyContactHeading: 'Contatti',
  privacyContactP: 'Se hai domande su questa Informativa sulla privacy, puoi contattarci tramite le informazioni di contatto sul nostro sito.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: 'Termini di servizio — Klondike Solitario',
  tosPageDescription: 'Termini di servizio per Klondike Solitario.',
  tosBackToGame: 'Torna al gioco',
  tosHeading: 'Termini di servizio',
  tosLastUpdated: 'Ultimo aggiornamento: 7 aprile 2026',
  tosIntro: 'Accedendo o utilizzando Klondike Solitario ("il gioco", "il sito"), accetti di essere vincolato dai presenti Termini di servizio. Se non sei d’accordo, ti preghiamo di non utilizzare il sito.',
  tosUseHeading: 'Utilizzo del gioco',
  tosUseP: 'Klondike Solitario è fornito gratuitamente per intrattenimento personale e non commerciale. Puoi:',
  tosUseMayItems: ['Giocare per il tuo divertimento personale', 'Condividere l’URL del sito con altri'],
  tosUseMayNotP: 'Non puoi:',
  tosUseMayNotItems: [
    'Copiare, ridistribuire o rivendere il gioco o i suoi contenuti senza autorizzazione',
    'Tentare di eseguire l’ingegneria inversa, decompilare o manomettere il gioco',
    'Utilizzare strumenti automatizzati o bot per interagire con il gioco',
    'Utilizzare il sito per scopi illeciti',
  ],
  tosIPHeading: 'Proprietà intellettuale',
  tosIPP: 'Tutti i contenuti di questo sito, incluso il codice del gioco, la grafica, le illustrazioni delle carte e l’audio, sono di nostra proprietà o concessi in licenza. Nessuna disposizione di questi Termini ti concede diritti sulla nostra proprietà intellettuale al di là di quanto necessario per giocare.',
  tosWarrantyHeading: 'Esclusione di garanzia',
  tosWarrantyP: 'Il gioco è fornito "così com’è" senza garanzie di alcun tipo, espresse o implicite. Non garantiamo che il sito sia sempre disponibile, privo di errori o privo di virus o altri componenti dannosi.',
  tosLiabilityHeading: 'Limitazione di responsabilità',
  tosLiabilityP: 'Nella misura massima consentita dalla legge, non saremo responsabili per danni indiretti, incidentali, speciali o consequenziali derivanti dall’uso o dall’impossibilità di utilizzare il gioco.',
  tosChangesHeading: 'Modifiche a questi termini',
  tosChangesP: 'Ci riserviamo il diritto di aggiornare questi Termini in qualsiasi momento. Le modifiche verranno pubblicate su questa pagina con una data aggiornata. L’uso continuato del gioco dopo le modifiche costituisce la tua accettazione dei Termini rivisti.',
  tosLawHeading: 'Legge applicabile',
  tosLawP: 'Questi Termini sono regolati dalla legge applicabile. Eventuali controversie saranno risolte nei tribunali competenti della giurisdizione applicabile.',
  tosContactHeading: 'Contatti',
  tosContactP: 'Se hai domande su questi Termini, contattaci tramite le informazioni disponibili sul nostro sito.',
};

export type Locale = typeof it;