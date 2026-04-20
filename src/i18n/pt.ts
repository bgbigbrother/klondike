/**
 * Portuguese locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const pt = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'Klondike Solitaire — Jogo de Cartas Grátis Online',
  pageDescription: 'Jogue Klondike Solitaire gratuitamente no seu navegador. Sem descarregamentos, sem registos. O clássico jogo de cartas com desfazer, movimento automático, atalhos de teclado e regras personalizáveis.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: 'Novo Jogo',
  btnUndo: 'Desfazer',
  btnAutoMove: 'Auto-Mover',
  btnAutoMoveTitle: 'Mover automaticamente para a base',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: 'Tempo',
  statMoves: 'Movimentos',
  statStock: 'Monte',
  statPass: 'Passagem',
  statScore: 'Pontuação',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: 'Monte',
  pileWaste: 'Descarte',
  pileFoundationSpades: 'Base ♠',
  pileFoundationHearts: 'Base ♥',
  pileFoundationDiamonds: 'Base ♦',
  pileFoundationClubs: 'Base ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: 'Passes pelo monte',
  toolbarStockTurnsInfo: 'Informação das passes',
  toolbarStockTurnsTooltip: 'Menos passes = jogo mais difícil. Com 1 passe só tens uma oportunidade de percorrer o baralho!',
  toolbarStockTurnsAriaLabel: 'Passes pelo monte',
  toolbarFaceUp: 'Virado',
  settingStockPass: 'Passagem do monte',
  settingFaceUp: 'Virado',
  toolbarPause: 'Pausa',
  toolbarMusic: 'Música',
  toolbarFullscreen: 'Ecrã inteiro',
  toolbarExitFullscreen: 'Sair do ecrã inteiro',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'Jogo Pausado',
  pauseSubtitle: 'Sem pressa — o teu jogo está seguro',
  pauseResume: 'Continuar',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: 'Ganhaste!',
  winFinalScore: 'Pontuação',
  winTime: 'Tempo',
  winMoves: 'Movimentos',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: 'Auto-completar disponível!',
  autocompleteButton: 'Auto Completar',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'Dorso da carta',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: 'Leitor de Música',
  musicSolitaireRadio: 'Rádio Solitaire',
  musicTracksLabel: 'Faixas',
  musicTracksAriaLabel: 'Seleção de faixa',
  musicPlay: 'Reproduzir',
  musicPause: 'Pausar',
  musicVolumeLabel: 'Volume',
  musicVolumeAriaLabel: 'Volume',
  musicMute: 'Silenciar',
  musicUnmute: 'Ativar som',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `Faixa ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'Violoncelo', 'Bateria I', 'Bateria II', 'Flauta', 'Guitarra I', 'Guitarra II', 'Guitarra III',
    'Jazz', 'Natureza I', 'Natureza II', 'Natureza III', 'Natureza IV', 'Natureza V', 'Natureza VI',
    'Orquestra', 'Piano I', 'Piano II', 'Piano III', 'Piano IV', 'Piano V', 'Piano VI',
    'Piano VII', 'Piano VIII', 'Sintetizador I', 'Sintetizador II', 'Sintetizador III', 'Violino',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'Klondike Solitaire. Grátis para jogar.',
  footerPrivacyPolicy: 'Política de Privacidade',
  footerTermsOfService: 'Termos de Serviço',
  footerNavAriaLabel: 'Navegação do rodapé',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'Klondike Solitaire',
  descriptionP1: 'O objetivo é simples: mover todas as 52 cartas para as quatro bases, um por naipe, construídas por ordem crescente do Ás ao Rei.',
  descriptionP2: 'Klondike é o jogo de paciência mais reconhecido do mundo — aquele que acompanhou todas as cópias do Windows durante décadas e apresentou o solitário a milhões de pessoas. O seu nome vem da região de Klondike no Canadá, embora o jogo provavelmente seja anterior à corrida ao ouro. Hoje continua a ser o jogo de cartas definitivo para um jogador, tão à vontade numa mesa de feltro como num ecrã tátil.',

  howToPlayHeading: 'Como Jogar',
  howToPlayLayoutHeading: 'O Layout',
  howToPlayLayoutP: 'O jogo começa com sete colunas de tableau. A coluna 1 tem uma carta virada; a coluna 2 tem uma virada para baixo e uma virada; e assim sucessivamente até à coluna 7. As 24 cartas restantes ficam viradas para baixo no monte. Quatro bases vazias aguardam no canto superior direito, uma para cada naipe.',
  howToPlayGoalHeading: 'O Teu Objetivo',
  howToPlayGoalP: 'Move todas as cartas para as bases. Cada base começa com um Ás e é construída no mesmo naipe — Ás, 2, 3 … Dama, Rei. Preenche as quatro bases e vences.',
  howToPlayTableauHeading: 'Mover Cartas no Tableau',
  howToPlayTableauP: 'Arrasta uma carta virada (ou uma pilha de cartas viradas) para outra coluna do tableau. A carta que colocas tem de ser um grau abaixo e da cor oposta à carta onde vais pousar — por exemplo, um 7 vermelho num 8 preto. Apenas um Rei (ou uma pilha encabeçada por um Rei) pode ser colocado numa coluna vazia do tableau.',
  howToPlayStockHeading: 'Tirar do Monte',
  howToPlayStockP: 'Clica no monte para virar a primeira carta virada para o descarte. Podes jogar a primeira carta do descarte a qualquer momento. Quando o monte acabar, clica novamente para reciclar o descarte de volta ao monte (é aplicada uma penalização na pontuação).',
  howToPlayFoundationsHeading: 'Enviar Cartas para as Bases',
  howToPlayFoundationsP: 'Arrasta uma carta elegível para uma base, ou faz duplo clique para a enviar automaticamente. Usa o botão "Auto-Mover" no cabeçalho para mover todas as cartas atualmente elegíveis para as bases numa só ação.',
  howToPlayUndoHeading: 'Desfazer',
  howToPlayUndoP: 'Clica no botão Desfazer (ou pressiona Ctrl+Z / Cmd+Z) para reverter a última ação. Podes desfazer até à disposição inicial.',

  rulesHeading: 'Regras — Passo a Passo',
  rules: [
    '<strong>Baralhar e Distribuir</strong> — O baralho de 52 cartas é baralhado e distribuído em 7 colunas de tableau. A coluna N recebe N cartas; apenas a carta do topo de cada coluna fica virada. As 24 cartas restantes formam o monte.',
    '<strong>O tableau constrói-se para baixo em cores alternadas</strong> — Uma carta virada pode ser colocada sobre qualquer carta do tableau que seja exatamente um grau acima e da cor oposta (vermelho sobre preto, preto sobre vermelho).',
    '<strong>Apenas Reis preenchem colunas vazias</strong> — Quando uma coluna do tableau fica vazia, apenas um Rei (ou uma pilha encabeçada por um Rei) pode ser movido para lá.',
    '<strong>Mover pilhas como uma unidade</strong> — Qualquer sequência de cartas viradas na ordem correta de cores alternadas pode ser arrastada e largada em conjunto sobre uma carta válida do tableau.',
    '<strong>Virar automaticamente a carta do topo virada para baixo</strong> — Sempre que um movimento expõe a carta do topo virada para baixo de uma coluna do tableau, ela vira-se imediatamente para cima.',
    '<strong>Tirar uma carta de cada vez do monte</strong> — Cada clique no monte move a carta do topo virada para o descarte. Apenas a carta do topo do descarte está em jogo.',
    '<strong>Reciclar o descarte</strong> — Quando o monte está vazio, clica nele para transformar todo o descarte virado para baixo novamente no monte. Uma penalização de 100 pontos é aplicada de cada vez (a pontuação mínima é 0). Se for definido um limite de passagens, a reciclagem é desativada quando o limite é atingido.',
    '<strong>Construir bases do Ás ao Rei</strong> — Cada base aceita cartas de um único naipe em ordem crescente: primeiro o Ás, depois o 2 até ao Rei. O naipe é fixado pelo primeiro Ás colocado.',
    '<strong>Mover cartas de volta de uma base</strong> — Uma carta numa base pode ser arrastada de volta para o tableau se a colocação for válida, embora seja aplicada uma penalização na pontuação.',
    '<strong>Ganhar completando as quatro bases</strong> — Coloca todas as 52 cartas nas quatro bases (13 por naipe, do Ás ao Rei) para vencer o jogo.',
  ],

  shortcutsHeading: 'Atalhos de Teclado',
  shortcutsKeyCol: 'Tecla',
  shortcutsActionCol: 'Ação',
  shortcuts: [
    { key: '← → ↑ ↓ Setas', action: 'Move o cursor do teclado entre as pilhas' },
    { key: 'Espaço', action: 'Seleciona a(s) carta(s) sob o cursor, ou confirma um movimento para o destino destacado' },
    { key: 'Escape', action: 'Cancela a seleção atual' },
    { key: 'F2', action: 'Começa um novo jogo' },
    { key: 'Ctrl+Z / Cmd+Z', action: 'Desfaz a última ação' },
    { key: 'A', action: 'Move automaticamente todas as cartas elegíveis para as bases' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'Política de Privacidade — Klondike Solitaire',
  privacyPageDescription: 'Política de Privacidade do Klondike Solitaire. Saiba como lidamos com os seus dados.',
  privacyBackToGame: 'Voltar ao Jogo',
  privacyHeading: 'Política de Privacidade',
  privacyLastUpdated: 'Última atualização: 7 de abril de 2026',
  privacyIntro: 'Esta Política de Privacidade descreve como o Klondike Solitaire ("nós", "nos" ou "nosso") lida com as informações quando utiliza o nosso jogo de cartas online gratuito em <a href="/">este site</a>.',
  privacyCollectHeading: 'Informações que Recolhemos',
  privacyCollectP: 'Não exigimos que crie uma conta ou forneça qualquer informação pessoal para jogar. Podemos recolher automaticamente dados técnicos limitados e não pessoais, incluindo:',
  privacyCollectItems: ['Tipo e versão do navegador', 'Sistema operativo', 'URLs de referência e páginas visitadas', 'Data e hora das visitas'],
  privacyCollectNote: 'Estes dados são recolhidos de forma agregada e não podem ser usados para o identificar pessoalmente.',
  privacyStorageHeading: 'Armazenamento Local',
  privacyStorageP: 'O jogo pode usar o armazenamento local do seu navegador para guardar preferências (como as definições de passes do monte) localmente no seu dispositivo. Estes dados nunca saem do seu navegador e não são transmitidos para nós.',
  privacyCookiesHeading: 'Cookies',
  privacyCookiesP: 'Não utilizamos cookies de rastreio ou de publicidade. Quaisquer cookies definidos são estritamente necessários para o funcionamento do jogo e não recolhem dados pessoais.',
  privacyThirdPartyHeading: 'Serviços de Terceiros',
  privacyThirdPartyP: 'Podemos usar serviços de terceiros, como uma CDN, para fornecer os recursos do jogo. Esses serviços podem recolher dados padrão de registo do servidor (como endereços IP) como parte das operações normais da Internet. Não vendemos nem partilhamos os seus dados com anunciantes.',
  privacyChildrenHeading: 'Privacidade das Crianças',
  privacyChildrenP: 'O nosso jogo é adequado para todas as idades. Não recolhemos conscientemente informações pessoais de crianças com menos de 13 anos. Se acredita que uma criança nos forneceu informações pessoais, contacte-nos para que possamos eliminá-las.',
  privacyChangesHeading: 'Alterações a esta Política',
  privacyChangesP: 'Podemos atualizar esta Política de Privacidade de tempos a tempos. As alterações serão publicadas nesta página com uma data atualizada. O uso continuado do jogo após as alterações constitui a aceitação da política atualizada.',
  privacyContactHeading: 'Contacto',
  privacyContactP: 'Se tiver alguma dúvida sobre esta Política de Privacidade, pode contactar-nos através das informações de contacto no nosso site.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: 'Termos de Serviço — Klondike Solitaire',
  tosPageDescription: 'Termos de Serviço do Klondike Solitaire.',
  tosBackToGame: 'Voltar ao Jogo',
  tosHeading: 'Termos de Serviço',
  tosLastUpdated: 'Última atualização: 7 de abril de 2026',
  tosIntro: 'Ao aceder ou utilizar o Klondike Solitaire ("o jogo", "o site"), concorda em cumprir estes Termos de Serviço. Se não concordar, por favor não utilize o site.',
  tosUseHeading: 'Utilização do Jogo',
  tosUseP: 'O Klondike Solitaire é fornecido gratuitamente para entretenimento pessoal e não comercial. Pode:',
  tosUseMayItems: ['Jogar para seu divertimento pessoal', 'Partilhar o URL do site com outras pessoas'],
  tosUseMayNotP: 'Não pode:',
  tosUseMayNotItems: [
    'Copiar, redistribuir ou revender o jogo ou os seus recursos sem permissão',
    'Tentar fazer engenharia inversa, descompilar ou adulterar o jogo',
    'Utilizar ferramentas automatizadas ou bots para interagir com o jogo',
    'Utilizar o site para qualquer fim ilícito',
  ],
  tosIPHeading: 'Propriedade Intelectual',
  tosIPP: 'Todo o conteúdo deste site, incluindo o código do jogo, gráficos, ilustrações das cartas e áudio, é de nossa propriedade ou licenciado. Nada nestes Termos lhe concede quaisquer direitos sobre a nossa propriedade intelectual para além do necessário para jogar.',
  tosWarrantyHeading: 'Exclusão de Garantias',
  tosWarrantyP: 'O jogo é fornecido "como está" sem garantias de qualquer tipo, expressas ou implícitas. Não garantimos que o site esteja disponível em todos os momentos, sem erros ou livre de vírus ou outros componentes nocivos.',
  tosLiabilityHeading: 'Limitação de Responsabilidade',
  tosLiabilityP: 'Na medida máxima permitida por lei, não seremos responsáveis por quaisquer danos indiretos, incidentais, especiais ou consequentes decorrentes da sua utilização ou incapacidade de utilizar o jogo.',
  tosChangesHeading: 'Alterações a estes Termos',
  tosChangesP: 'Reservamo-nos o direito de atualizar estes Termos a qualquer momento. As alterações serão publicadas nesta página com uma data atualizada. O uso continuado do jogo após as alterações constitui a sua aceitação dos Termos revistos.',
  tosLawHeading: 'Lei Aplicável',
  tosLawP: 'Estes Termos são regidos pela lei aplicável. Quaisquer disputas serão resolvidas nos tribunais competentes da jurisdição aplicável.',
  tosContactHeading: 'Contacto',
  tosContactP: 'Se tiver dúvidas sobre estes Termos, contacte-nos através das informações disponíveis no nosso site.',
};

export type Locale = typeof pt;