/**
 * Simplified Chinese locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const zh = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: '克朗代克纸牌 — 免费在线卡牌游戏',
  pageDescription: '在浏览器中免费玩克朗代克纸牌。无需下载，无需注册。经典纸牌游戏，支持撤销、自动移动、键盘快捷键和可自定义规则。',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: '新游戏',
  btnUndo: '撤销',
  btnAutoMove: '自动移动',
  btnAutoMoveTitle: '自动移动到目标区',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: '时间',
  statMoves: '步数',
  statStock: '牌堆',
  statPass: '过牌',
  statScore: '分数',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: '牌堆',
  pileWaste: '废牌堆',
  pileFoundationSpades: '目标区 ♠',
  pileFoundationHearts: '目标区 ♥',
  pileFoundationDiamonds: '目标区 ♦',
  pileFoundationClubs: '目标区 ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: '牌堆轮次',
  toolbarStockTurnsInfo: '牌堆轮次信息',
  toolbarStockTurnsTooltip: '更少的过牌次数 = 更难的游戏。选择 1 次轮次意味着你只能将牌堆过一遍！',
  toolbarStockTurnsAriaLabel: '牌堆轮次',
  toolbarFaceUp: '朝上',
  settingStockPass: '牌堆过牌',
  settingFaceUp: '朝上',
  toolbarPause: '暂停',
  toolbarMusic: '音乐',
  toolbarFullscreen: '全屏',
  toolbarExitFullscreen: '退出全屏',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: '游戏已暂停',
  pauseSubtitle: '慢慢来 — 你的游戏进度已保存',
  pauseResume: '继续游戏',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: '你赢了！',
  winFinalScore: '分数',
  winTime: '时间',
  winMoves: '步数',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: '可自动完成！',
  autocompleteButton: '自动完成',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: '牌背',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: '音乐播放器',
  musicSolitaireRadio: '纸牌电台',
  musicTracksLabel: '音轨',
  musicTracksAriaLabel: '音轨选择',
  musicPlay: '播放',
  musicPause: '暂停',
  musicVolumeLabel: '音量',
  musicVolumeAriaLabel: '音量',
  musicMute: '静音',
  musicUnmute: '取消静音',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `音轨 ${n}：${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    '大提琴', '鼓 I', '鼓 II', '长笛', '吉他 I', '吉他 II', '吉他 III',
    '爵士', '自然 I', '自然 II', '自然 III', '自然 IV', '自然 V', '自然 VI',
    '管弦乐', '钢琴 I', '钢琴 II', '钢琴 III', '钢琴 IV', '钢琴 V', '钢琴 VI',
    '钢琴 VII', '钢琴 VIII', '合成器 I', '合成器 II', '合成器 III', '小提琴',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: '克朗代克纸牌。免费畅玩。',
  footerPrivacyPolicy: '隐私政策',
  footerTermsOfService: '服务条款',
  footerNavAriaLabel: '页脚导航',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: '克朗代克纸牌',
  descriptionP1: '目标很简单：将所有 52 张牌移动到四个目标区，每个花色一叠，按从 A 到 K 的顺序递增排列。',
  descriptionP2: '克朗代克是世界上最著名的纸牌接龙游戏 — 几十年来每份 Windows 系统都自带它，让数百万人认识了纸牌游戏。它的名字来源于加拿大的克朗代克地区，但游戏本身可能早于淘金热时代。如今，它依然是单人纸牌游戏的经典代表，无论是在绒布桌面上还是触摸屏上都同样出色。',

  howToPlayHeading: '玩法说明',
  howToPlayLayoutHeading: '牌局布局',
  howToPlayLayoutP: '游戏开始时桌面上有七列牌。第 1 列有 1 张牌朝上；第 2 列有 1 张牌朝下、1 张朝上；依此类推直到第 7 列。剩余 24 张牌朝下放在牌堆中。右上角有四个空的目标区，每个花色一个。',
  howToPlayGoalHeading: '你的目标',
  howToPlayGoalP: '将所有牌移到目标区。每个目标区从 A 开始，按相同花色递增排列 — A、2、3 … Q、K。填满所有四个目标区即获胜。',
  howToPlayTableauHeading: '在桌面上移动牌',
  howToPlayTableauP: '将一张朝上的牌（或一叠朝上的牌）拖到另一列桌面上。你放置的牌必须比目标牌小一个点数且颜色相反 — 例如，红色 7 可以放在黑色 8 上。只有 K（或以 K 开头的牌叠）可以放在空的桌面上。',
  howToPlayStockHeading: '从牌堆抽牌',
  howToPlayStockP: '点击牌堆将顶部牌翻到废牌堆。你可以随时使用废牌堆顶部的牌。当牌堆用完时，再次点击它可将废牌堆翻回牌堆（会扣除分数）。',
  howToPlayFoundationsHeading: '将牌移到目标区',
  howToPlayFoundationsP: '将符合条件的牌拖到目标区，或双击自动移入。使用顶部的“自动移动”按钮可一次性将所有符合条件的牌移到目标区。',
  howToPlayUndoHeading: '撤销',
  howToPlayUndoP: '点击撤销按钮（或按 Ctrl+Z / Cmd+Z）来撤销上一步操作。你可以一直撤销回初始发牌状态。',

  rulesHeading: '规则 — 逐步说明',
  rules: [
    '<strong>洗牌与发牌</strong> — 洗匀 52 张牌，发成 7 列桌面牌。第 N 列有 N 张牌；每列只有最上面一张牌朝上。剩余 24 张牌作为牌堆。',
    '<strong>桌面按颜色交替降序构建</strong> — 一张朝上的牌可以放在点数恰好大一点且颜色相反的任何桌面牌上（红上放黑，黑上放红）。',
    '<strong>只有 K 能填补空列</strong> — 当一列桌面牌清空时，只有 K（或以 K 为首的牌叠）可以移过去。',
    '<strong>整叠牌一起移动</strong> — 任何一叠颜色交替顺序正确的朝上牌可以整体拖放到符合条件的桌面牌上。',
    '<strong>自动翻开顶部盖牌</strong> — 当移动后露出某列桌面牌最下面的盖牌时，它会立即自动翻开。',
    '<strong>每次从牌堆抽一张牌</strong> — 每次点击牌堆都会将顶部牌朝上移到废牌堆。只有废牌堆顶部的牌可以参与游戏。',
    '<strong>回收废牌堆</strong> — 当牌堆为空时，点击它将整个废牌堆翻回牌堆（牌面向下）。每次回收扣 100 分（最低分为 0）。如果设置了过牌次数限制，达到限制后将禁用回收。',
    '<strong>目标区从 A 到 K 构建</strong> — 每个目标区只接受同一花色的牌，按升序排列：先 A，然后是 2 到 K。花色由放入的第一张 A 确定。',
    '<strong>从目标区移回牌</strong> — 如果符合规则，可以将目标区上的牌拖回桌面，但会扣除分数。',
    '<strong>完成所有四个目标区获胜</strong> — 将所有 52 张牌放入四个目标区（每个花色 13 张，从 A 到 K）即可获胜。',
  ],

  shortcutsHeading: '键盘快捷键',
  shortcutsKeyCol: '按键',
  shortcutsActionCol: '操作',
  shortcuts: [
    { key: '← → ↑ ↓ 方向键', action: '在牌堆之间移动键盘光标' },
    { key: '空格键', action: '选中光标下的牌，或确认移动到高亮的目标位置' },
    { key: 'Esc', action: '取消当前选择' },
    { key: 'F2', action: '开始新游戏' },
    { key: 'Ctrl+Z / Cmd+Z', action: '撤销上一步操作' },
    { key: 'A', action: '将所有符合条件的牌自动移动到目标区' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: '隐私政策 — 克朗代克纸牌',
  privacyPageDescription: '克朗代克纸牌的隐私政策。了解我们如何处理你的数据。',
  privacyBackToGame: '返回游戏',
  privacyHeading: '隐私政策',
  privacyLastUpdated: '最后更新：2026年4月7日',
  privacyIntro: '本隐私政策说明了克朗代克纸牌（“我们”、“我们的”）在你使用我们的免费在线纸牌游戏<a href="/">本网站</a>时如何处理信息。',
  privacyCollectHeading: '我们收集的信息',
  privacyCollectP: '我们不需要你创建账户或提供任何个人信息即可游戏。我们可能会自动收集有限的、非个人的技术数据，包括：',
  privacyCollectItems: ['浏览器类型和版本', '操作系统', '来源 URL 和访问过的页面', '访问日期和时间'],
  privacyCollectNote: '这些数据以汇总方式收集，无法用于识别你的个人身份。',
  privacyStorageHeading: '本地存储',
  privacyStorageP: '游戏可能使用浏览器的本地存储将游戏偏好（如牌堆轮次设置）保存在你的设备上。这些数据永远不会离开你的浏览器，也不会传输给我们。',
  privacyCookiesHeading: 'Cookie',
  privacyCookiesP: '我们不使用跟踪 cookie 或广告 cookie。任何设置的 cookie 都是游戏运行所必需的，不会收集个人数据。',
  privacyThirdPartyHeading: '第三方服务',
  privacyThirdPartyP: '我们可能使用第三方服务（如 CDN）来提供游戏资源。这些服务可能在正常的互联网操作中收集标准的服务器日志数据（如 IP 地址）。我们不会出售或与广告商分享你的数据。',
  privacyChildrenHeading: '儿童隐私',
  privacyChildrenP: '我们的游戏适合所有年龄段。我们不会故意收集 13 岁以下儿童的个人信息。如果你认为儿童向我们提供了个人信息，请联系我们以便删除。',
  privacyChangesHeading: '本政策的变更',
  privacyChangesP: '我们可能不时更新本隐私政策。变更将在此页面上发布，并更新日期。变更后继续使用游戏即表示你接受更新后的政策。',
  privacyContactHeading: '联系方式',
  privacyContactP: '如果你对本隐私政策有任何疑问，可以通过我们网站上的联系信息与我们联系。',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: '服务条款 — 克朗代克纸牌',
  tosPageDescription: '克朗代克纸牌的服务条款。',
  tosBackToGame: '返回游戏',
  tosHeading: '服务条款',
  tosLastUpdated: '最后更新：2026年4月7日',
  tosIntro: '访问或使用克朗代克纸牌（“游戏”、“本网站”）即表示你同意遵守本服务条款。如果你不同意，请勿使用本网站。',
  tosUseHeading: '游戏的使用',
  tosUseP: '克朗代克纸牌免费提供，用于个人、非商业娱乐目的。你可以：',
  tosUseMayItems: ['为个人娱乐玩游戏', '与他人分享本网站的 URL'],
  tosUseMayNotP: '你不得：',
  tosUseMayNotItems: [
    '未经许可复制、再分发或转售游戏或其资源',
    '尝试逆向工程、反编译或篡改游戏',
    '使用自动化工具或机器人程序与游戏交互',
    '将本网站用于任何非法目的',
  ],
  tosIPHeading: '知识产权',
  tosIPP: '本网站上的所有内容，包括游戏代码、图形、牌面图案和音频，均为我们所有或获得许可。本条款中的任何内容均不授予你超出游戏所需的对我们知识产权的任何权利。',
  tosWarrantyHeading: '免责声明',
  tosWarrantyP: '游戏按“原样”提供，不附带任何明示或暗示的保证。我们不保证本网站始终可用、无错误或没有病毒或其他有害组件。',
  tosLiabilityHeading: '责任限制',
  tosLiabilityP: '在法律允许的最大范围内，我们不对因使用或无法使用游戏而产生的任何间接、附带、特殊或后果性损害承担责任。',
  tosChangesHeading: '本条款的变更',
  tosChangesP: '我们保留随时更新本条款的权利。变更将在此页面上发布，并更新日期。变更后继续使用游戏即表示你接受修订后的条款。',
  tosLawHeading: '管辖法律',
  tosLawP: '本条款受适用法律管辖。任何争议均应在适用司法管辖区的适当法院解决。',
  tosContactHeading: '联系方式',
  tosContactP: '如果你对本条款有任何疑问，请通过我们网站上提供的信息与我们联系。',
};

export type Locale = typeof zh;