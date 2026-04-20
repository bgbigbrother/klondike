/**
 * Spanish locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const es = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'Klondike Solitario — Juego de Cartas Gratis Online',
  pageDescription: 'Juega al Klondike Solitario gratis en tu navegador. Sin descargas, sin registro. El juego de cartas clásico con deshacer, movimiento automático, atajos de teclado y reglas personalizables.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: 'Nueva Partida',
  btnUndo: 'Deshacer',
  btnAutoMove: 'Mov. Automático',
  btnAutoMoveTitle: 'Mover automático a la base',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: 'Tiempo',
  statMoves: 'Movimientos',
  statStock: 'Mazo',
  statPass: 'Pase',
  statScore: 'Puntuación',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: 'Mazo',
  pileWaste: 'Descarte',
  pileFoundationSpades: 'Base ♠',
  pileFoundationHearts: 'Base ♥',
  pileFoundationDiamonds: 'Base ♦',
  pileFoundationClubs: 'Base ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: 'Vueltas del mazo',
  toolbarStockTurnsInfo: 'Información de vueltas del mazo',
  toolbarStockTurnsTooltip: 'Menos pases = partida más difícil. ¡Con 1 vuelta solo tienes una oportunidad de recorrer el mazo!',
  toolbarStockTurnsAriaLabel: 'Vueltas del mazo',
  toolbarFaceUp: 'Boca arriba',
  settingStockPass: 'Pase del mazo',
  settingFaceUp: 'Boca arriba',
  toolbarPause: 'Pausa',
  toolbarMusic: 'Música',
  toolbarFullscreen: 'Pantalla completa',
  toolbarExitFullscreen: 'Salir de pantalla completa',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'Juego en pausa',
  pauseSubtitle: 'Tómate tu tiempo — tu partida está guardada',
  pauseResume: 'Reanudar',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: '¡Ganaste!',
  winFinalScore: 'Puntuación',
  winTime: 'Tiempo',
  winMoves: 'Movimientos',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: '¡Autocompletado disponible!',
  autocompleteButton: 'Autocompletar',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'Dorso de la carta',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: 'Reproductor de música',
  musicSolitaireRadio: 'Radio Solitario',
  musicTracksLabel: 'Pistas',
  musicTracksAriaLabel: 'Selección de pista',
  musicPlay: 'Reproducir',
  musicPause: 'Pausar',
  musicVolumeLabel: 'Volumen',
  musicVolumeAriaLabel: 'Volumen',
  musicMute: 'Silenciar',
  musicUnmute: 'Activar sonido',
  /** Usado en aria-label: "Pista 1: Violonchelo" */
  musicTrackAriaLabel: (n: number, name: string) => `Pista ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'Violonchelo', 'Batería I', 'Batería II', 'Flauta', 'Guitarra I', 'Guitarra II', 'Guitarra III',
    'Jazz', 'Naturaleza I', 'Naturaleza II', 'Naturaleza III', 'Naturaleza IV', 'Naturaleza V', 'Naturaleza VI',
    'Orquesta', 'Piano I', 'Piano II', 'Piano III', 'Piano IV', 'Piano V', 'Piano VI',
    'Piano VII', 'Piano VIII', 'Sintetizador I', 'Sintetizador II', 'Sintetizador III', 'Violín',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'Klondike Solitario. Gratis para jugar.',
  footerPrivacyPolicy: 'Política de Privacidad',
  footerTermsOfService: 'Términos de Servicio',
  footerNavAriaLabel: 'Navegación del pie de página',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'Klondike Solitario',
  descriptionP1: 'El objetivo es sencillo: mover las 52 cartas a las cuatro bases, una por palo, construidas en orden desde el As hasta el Rey.',
  descriptionP2: 'Klondike es el juego de cartas de paciencia más reconocido del mundo: el que venía con cada copia de Windows durante décadas e introdujo a millones de personas al solitario. Su nombre proviene de la región de Klondike en Canadá, aunque el juego en sí probablemente es anterior a la época de la fiebre del oro. Hoy sigue siendo el juego de cartas para un jugador por excelencia, tan a gusto en una mesa de fieltro como en una pantalla táctil.',

  howToPlayHeading: 'Cómo Jugar',
  howToPlayLayoutHeading: 'El Tablero',
  howToPlayLayoutP: 'El juego comienza con siete columnas de la mesa. La columna 1 tiene una carta boca arriba; la columna 2 tiene una boca abajo y una boca arriba; y así sucesivamente hasta la columna 7. Las 24 cartas restantes están boca abajo en el mazo. Cuatro bases vacías esperan en la esquina superior derecha, una para cada palo.',
  howToPlayGoalHeading: 'Tu Objetivo',
  howToPlayGoalP: 'Lleva todas las cartas a las bases. Cada base comienza con un As y se construye en el mismo palo — As, 2, 3 … Reina, Rey. Completa las cuatro bases y ganas.',
  howToPlayTableauHeading: 'Mover Cartas en la Mesa',
  howToPlayTableauP: 'Arrastra una carta boca arriba (o una pila de cartas boca arriba) sobre otra columna de la mesa. La carta que colocas debe ser un rango menor y de color opuesto a la carta sobre la que se coloca — por ejemplo, un 7 rojo sobre un 8 negro. Solo un Rey (o una pila encabezada por un Rey) puede colocarse en una columna vacía de la mesa.',
  howToPlayStockHeading: 'Robar del Mazo',
  howToPlayStockP: 'Haz clic en el mazo para voltear la primera carta boca arriba sobre el descarte. Puedes jugar la carta superior del descarte en cualquier momento. Cuando el mazo se agote, haz clic de nuevo para reciclar el descarte de vuelta al mazo (se aplica una penalización de puntuación).',
  howToPlayFoundationsHeading: 'Enviar Cartas a las Bases',
  howToPlayFoundationsP: 'Arrastra una carta elegible a una base, o haz doble clic para enviarla automáticamente. Usa el botón "Mov. Automático" en el encabezado para mover todas las cartas elegibles a las bases en una sola acción.',
  howToPlayUndoHeading: 'Deshacer',
  howToPlayUndoP: 'Haz clic en el botón Deshacer (o presiona Ctrl+Z / Cmd+Z) para revertir tu última acción. Puedes deshacer todo hasta la disposición inicial.',

  rulesHeading: 'Reglas — Paso a Paso',
  rules: [
    '<strong>Barajar y Repartir</strong> — Se baraja la baraja de 52 cartas y se reparten en 7 columnas de la mesa. La columna N recibe N cartas; solo la carta superior de cada columna está boca arriba. Las 24 cartas restantes forman el mazo.',
    '<strong>La mesa se construye hacia abajo en colores alternos</strong> — Una carta boca arriba puede colocarse sobre cualquier carta de la mesa que sea exactamente un rango superior y de color opuesto (rojo sobre negro, negro sobre rojo).',
    '<strong>Solo los Reyes llenan columnas vacías</strong> — Cuando una columna de la mesa queda vacía, solo un Rey (o una pila encabezada por un Rey) puede moverse allí.',
    '<strong>Mover pilas como una unidad</strong> — Cualquier secuencia de cartas boca arriba en orden correcto de colores alternos puede arrastrarse y soltarse junto sobre una carta válida de la mesa.',
    '<strong>Voltear automáticamente la carta superior boca abajo</strong> — Cuando un movimiento deja al descubierto la carta superior boca abajo de una columna de la mesa, se voltea boca arriba inmediatamente.',
    '<strong>Robar una carta a la vez del mazo</strong> — Cada clic en el mazo mueve la carta superior boca arriba al descarte. Solo la carta superior del descarte está en juego.',
    '<strong>Reciclar el descarte</strong> — Cuando el mazo está vacío, haz clic en él para devolver todo el descarte boca abajo al mazo. Se aplica una penalización de 100 puntos cada vez (la puntuación mínima es 0). Si se establece un límite de pases, el reciclaje se desactiva al alcanzar el límite.',
    '<strong>Construir bases del As al Rey</strong> — Cada base acepta cartas de un solo palo en orden ascendente: primero el As, luego 2 hasta el Rey. El palo queda fijado por el primer As colocado.',
    '<strong>Mover cartas de vuelta desde una base</strong> — Una carta en una base puede arrastrarse de vuelta a la mesa si la colocación es válida, aunque se aplica una penalización de puntuación.',
    '<strong>Ganar completando las cuatro bases</strong> — Coloca las 52 cartas en las cuatro bases (13 por palo, del As al Rey) para ganar la partida.',
  ],

  shortcutsHeading: 'Atajos de Teclado',
  shortcutsKeyCol: 'Tecla',
  shortcutsActionCol: 'Acción',
  shortcuts: [
    { key: '← → ↑ ↓ Flechas', action: 'Mover el cursor de teclado entre las pilas' },
    { key: 'Espacio', action: 'Seleccionar la(s) carta(s) en el cursor, o confirmar un movimiento al objetivo resaltado' },
    { key: 'Escape', action: 'Cancelar la selección actual' },
    { key: 'F2', action: 'Empezar una nueva partida' },
    { key: 'Ctrl+Z / Cmd+Z', action: 'Deshacer la última acción' },
    { key: 'A', action: 'Mover automáticamente todas las cartas elegibles a las bases' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'Política de Privacidad — Klondike Solitario',
  privacyPageDescription: 'Política de Privacidad de Klondike Solitario. Aprende cómo manejamos tus datos.',
  privacyBackToGame: 'Volver al Juego',
  privacyHeading: 'Política de Privacidad',
  privacyLastUpdated: 'Última actualización: 7 de abril de 2026',
  privacyIntro: 'Esta Política de Privacidad describe cómo Klondike Solitario ("nosotros", "nuestro" o "nuestra") maneja la información cuando usas nuestro juego de cartas gratuito en línea en <a href="/">este sitio</a>.',
  privacyCollectHeading: 'Información que Recopilamos',
  privacyCollectP: 'No requerimos que crees una cuenta ni proporciones información personal para jugar. Podemos recopilar automáticamente datos técnicos limitados y no personales, incluyendo:',
  privacyCollectItems: ['Tipo y versión del navegador', 'Sistema operativo', 'URLs de referencia y páginas visitadas', 'Fecha y hora de las visitas'],
  privacyCollectNote: 'Estos datos se recopilan de forma agregada y no pueden usarse para identificarte personalmente.',
  privacyStorageHeading: 'Almacenamiento Local',
  privacyStorageP: 'El juego puede usar el almacenamiento local de tu navegador para guardar preferencias (como la configuración de vueltas del mazo) localmente en tu dispositivo. Estos datos nunca abandonan tu navegador y no se nos transmiten.',
  privacyCookiesHeading: 'Cookies',
  privacyCookiesP: 'No utilizamos cookies de seguimiento ni de publicidad. Las cookies que se establecen son estrictamente necesarias para el funcionamiento del juego y no recopilan datos personales.',
  privacyThirdPartyHeading: 'Servicios de Terceros',
  privacyThirdPartyP: 'Podemos usar servicios de terceros como una CDN (Red de Entrega de Contenidos) para servir los recursos del juego. Estos servicios pueden recopilar datos estándar de registro del servidor (como direcciones IP) como parte de las operaciones normales de internet. No vendemos ni compartimos tus datos con anunciantes.',
  privacyChildrenHeading: 'Privacidad de los Niños',
  privacyChildrenP: 'Nuestro juego es apto para todas las edades. No recopilamos conscientemente información personal de niños menores de 13 años. Si crees que un niño nos ha proporcionado información personal, contáctanos para que podamos eliminarla.',
  privacyChangesHeading: 'Cambios a esta Política',
  privacyChangesP: 'Podemos actualizar esta Política de Privacidad ocasionalmente. Los cambios se publicarán en esta página con una fecha actualizada. El uso continuado del juego después de los cambios constituye la aceptación de la política actualizada.',
  privacyContactHeading: 'Contacto',
  privacyContactP: 'Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos a través de la información de contacto en nuestro sitio.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: 'Términos de Servicio — Klondike Solitario',
  tosPageDescription: 'Términos de Servicio de Klondike Solitario.',
  tosBackToGame: 'Volver al Juego',
  tosHeading: 'Términos de Servicio',
  tosLastUpdated: 'Última actualización: 7 de abril de 2026',
  tosIntro: 'Al acceder o usar Klondike Solitario ("el juego", "el sitio"), aceptas cumplir con estos Términos de Servicio. Si no estás de acuerdo, por favor no uses el sitio.',
  tosUseHeading: 'Uso del Juego',
  tosUseP: 'Klondike Solitario se proporciona de forma gratuita para entretenimiento personal y no comercial. Puedes:',
  tosUseMayItems: ['Jugar al juego para disfrute personal', 'Compartir la URL del sitio con otros'],
  tosUseMayNotP: 'No puedes:',
  tosUseMayNotItems: [
    'Copiar, redistribuir o revender el juego o sus recursos sin permiso',
    'Intentar la ingeniería inversa, descompilar o manipular el juego',
    'Usar herramientas automatizadas o bots para interactuar con el juego',
    'Usar el sitio para cualquier propósito ilegal',
  ],
  tosIPHeading: 'Propiedad Intelectual',
  tosIPP: 'Todo el contenido de este sitio, incluyendo el código del juego, los gráficos, el arte de las cartas y el audio, es de nuestra propiedad o está bajo licencia. Nada en estos Términos te otorga derechos sobre nuestra propiedad intelectual más allá de lo necesario para jugar.',
  tosWarrantyHeading: 'Renuncia de Garantías',
  tosWarrantyP: 'El juego se proporciona "tal cual" sin garantías de ningún tipo, expresas o implícitas. No garantizamos que el sitio esté disponible en todo momento, libre de errores o libre de virus u otros componentes dañinos.',
  tosLiabilityHeading: 'Limitación de Responsabilidad',
  tosLiabilityP: 'En la máxima medida permitida por la ley, no seremos responsables por daños indirectos, incidentales, especiales o consecuentes derivados de tu uso o incapacidad para usar el juego.',
  tosChangesHeading: 'Cambios a estos Términos',
  tosChangesP: 'Nos reservamos el derecho de actualizar estos Términos en cualquier momento. Los cambios se publicarán en esta página con una fecha actualizada. El uso continuado del juego después de los cambios constituye tu aceptación de los Términos revisados.',
  tosLawHeading: 'Ley Aplicable',
  tosLawP: 'Estos Términos se rigen por la ley aplicable. Cualquier disputa se resolverá en los tribunales competentes de la jurisdicción correspondiente.',
  tosContactHeading: 'Contacto',
  tosContactP: 'Si tienes preguntas sobre estos Términos, contáctanos a través de la información disponible en nuestro sitio.',
};

export type Locale = typeof es;