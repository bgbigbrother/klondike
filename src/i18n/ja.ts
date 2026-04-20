/**
 * Japanese locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const ja = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'クロンダイク・ソリティア — 無料オンラインカードゲーム',
  pageDescription: 'ブラウザで無料でクロンダイク・ソリティアをプレイ。ダウンロード不要、登録不要。元に戻す、自動移動、キーボードショートカット、カスタマイズ可能なルールを備えたクラシックカードゲーム。',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: '新規ゲーム',
  btnUndo: '元に戻す',
  btnAutoMove: '自動移動',
  btnAutoMoveTitle: '自動でFoundationへ移動',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: '時間',
  statMoves: '手数',
  statStock: '山札',
  statPass: 'パス',
  statScore: 'スコア',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: '山札',
  pileWaste: '捨て札',
  pileFoundationSpades: 'Foundation ♠',
  pileFoundationHearts: 'Foundation ♥',
  pileFoundationDiamonds: 'Foundation ♦',
  pileFoundationClubs: 'Foundation ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: '山札の引き直し',
  toolbarStockTurnsInfo: '山札の引き直し情報',
  toolbarStockTurnsTooltip: 'パスが少ないほど難易度が上がります。1回引き直しでは、山札を一度しか巡れません！',
  toolbarStockTurnsAriaLabel: '山札の引き直し',
  toolbarFaceUp: '表向き',
  settingStockPass: '山札パス',
  settingFaceUp: '表向き',
  toolbarPause: '一時停止',
  toolbarMusic: '音楽',
  toolbarFullscreen: '全画面表示',
  toolbarExitFullscreen: '全画面終了',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'ゲーム一時停止中',
  pauseSubtitle: 'ゆっくりどうぞ — ゲームは保存されています',
  pauseResume: '再開',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: '勝利！',
  winFinalScore: 'スコア',
  winTime: '時間',
  winMoves: '手数',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: '自動完了できます！',
  autocompleteButton: '自動完了',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'カードの裏面',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: '音楽プレーヤー',
  musicSolitaireRadio: 'ソリティア・ラジオ',
  musicTracksLabel: 'トラック',
  musicTracksAriaLabel: 'トラック選択',
  musicPlay: '再生',
  musicPause: '一時停止',
  musicVolumeLabel: '音量',
  musicVolumeAriaLabel: '音量',
  musicMute: 'ミュート',
  musicUnmute: 'ミュート解除',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `トラック ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'チェロ', 'ドラムス I', 'ドラムス II', 'フルート', 'ギター I', 'ギター II', 'ギター III',
    'ジャズ', '自然 I', '自然 II', '自然 III', '自然 IV', '自然 V', '自然 VI',
    'オーケストラ', 'ピアノ I', 'ピアノ II', 'ピアノ III', 'ピアノ IV', 'ピアノ V', 'ピアノ VI',
    'ピアノ VII', 'ピアノ VIII', 'シンセ I', 'シンセ II', 'シンセ III', 'ヴァイオリン',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'クロンダイク・ソリティア。無料でプレイできます。',
  footerPrivacyPolicy: 'プライバシーポリシー',
  footerTermsOfService: '利用規約',
  footerNavAriaLabel: 'フッターナビゲーション',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'クロンダイク・ソリティア',
  descriptionP1: '目標はシンプル：52枚すべてのカードを4つのFoundation（エースからキングへ同じスートで昇順に積む）に移動することです。',
  descriptionP2: 'クロンダイクは世界で最も有名なペイシェンスカードゲームです — 何十年もの間Windowsのすべてのコピーに収録され、何百万人もの人々にソリティアを紹介してきました。名前はカナダのクロンダイク地方に由来しますが、ゲーム自体はおそらくゴールドラッシュ時代より前に存在していました。今日でも、フェルトのテーブルでもタッチスクリーンでも、最高のソロカードゲームであり続けています。',

  howToPlayHeading: '遊び方',
  howToPlayLayoutHeading: 'レイアウト',
  howToPlayLayoutP: 'ゲームは7列のTableauで始まります。列1は1枚表向き、列2は1枚裏向きと1枚表向き、というふうに列7まで続きます。残りの24枚は裏向きで山札に置かれます。右上隅に4つの空のFoundation（各スートにつき1つ）があります。',
  howToPlayGoalHeading: '目標',
  howToPlayGoalP: 'すべてのカードをFoundationに移動させます。各Foundationはエースで始まり、同じスートでエース、2、3 … クイーン、キングと昇順に積み上げます。4つすべての山を完成させると勝利です。',
  howToPlayTableauHeading: 'Tableauでのカード移動',
  howToPlayTableauP: '表向きのカード（または表向きのカードの束）を別のTableau列にドラッグします。置くカードは、置き先のカードよりランクが1つ下で、色が反対でなければなりません — 例えば、赤の7を黒の8の上に置きます。空のTableau列に置けるのは、キング（またはキングが先頭の束）だけです。',
  howToPlayStockHeading: '山札から引く',
  howToPlayStockP: '山札をクリックして、一番上のカードを表向きで捨て札に移します。捨て札の一番上のカードはいつでもプレイできます。山札がなくなったら、もう一度クリックして捨て札を裏向きで山札に戻します（スコア減点があります）。',
  howToPlayFoundationsHeading: 'Foundationへカードを送る',
  howToPlayFoundationsP: '条件を満たすカードをFoundationにドラッグするか、ダブルクリックで自動的に送ります。ヘッダーの「自動移動」ボタンを使うと、現在条件を満たすすべてのカードを一度にFoundationへ移動できます。',
  howToPlayUndoHeading: '元に戻す',
  howToPlayUndoP: '「元に戻す」ボタン（またはCtrl+Z / Cmd+Z）をクリックして、直前の動作を取り消せます。最初の配牌までさかのぼって取り消せます。',

  rulesHeading: 'ルール — ステップバイステップ',
  rules: [
    '<strong>シャッフル＆ディール</strong> — 52枚のデッキをシャッフルし、7列のTableauに配ります。列NにはN枚のカードが置かれ、各列の一番上のカードだけが表向きです。残りの24枚が山札となります。',
    '<strong>Tableauは交互の色で降順に構築</strong> — 表向きのカードは、ちょうど1つ上のランクで色が反対（赤の上に黒、黒の上に赤）のTableauカードの上に置けます。',
    '<strong>空き列に置けるのはキングのみ</strong> — Tableauの列が空になった場合、そこに移動できるのはキング（またはキングが先頭の束）だけです。',
    '<strong>束をまとめて移動</strong> — 交互の色の正しい順序になっている表向きカードの連続した束は、まとめてドラッグ＆ドロップで有効なTableauカードの上に移動できます。',
    '<strong>一番上の裏向きカードを自動的に表に</strong> — 移動によってTableau列の一番上の裏向きカードが露わになった場合、すぐに表向きになります。',
    '<strong>山札から一度に1枚引く</strong> — 山札をクリックするたびに、一番上のカードが表向きで捨て札に移動します。プレイできるのは捨て札の一番上のカードだけです。',
    '<strong>捨て札を戻す</strong> — 山札が空になったら、山札をクリックして捨て札全体を裏向きで山札に戻します。そのたびに100点のペナルティが適用されます（最低スコアは0）。パス制限が設定されている場合、制限に達すると戻しは無効になります。',
    '<strong>Foundationはエースからキングへ昇順に構築</strong> — 各Foundationは1つのスートのカードを昇順（最初にエース、次に2からキングまで）で受け入れます。スートは最初に置かれたエースで固定されます。',
    '<strong>Foundationからカードを戻す</strong> — Foundationのカードは、有効な配置であればTableauにドラッグして戻せますが、スコアペナルティが適用されます。',
    '<strong>4つのFoundationをすべて完成させると勝利</strong> — 52枚すべてのカードを4つのFoundation（各スート13枚、エースからキングまで）に置くとゲームに勝利します。',
  ],

  shortcutsHeading: 'キーボードショートカット',
  shortcutsKeyCol: 'キー',
  shortcutsActionCol: 'アクション',
  shortcuts: [
    { key: '← → ↑ ↓ 矢印キー', action: 'キーボードカーソルを山の間で移動' },
    { key: 'スペース', action: 'カーソル位置のカードを選択、またはハイライトされた移動先への移動を確定' },
    { key: 'Esc', action: '現在の選択をキャンセル' },
    { key: 'F2', action: '新規ゲームを開始' },
    { key: 'Ctrl+Z / Cmd+Z', action: '直前の動作を元に戻す' },
    { key: 'A', action: '条件を満たすすべてのカードを自動でFoundationに移動' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'プライバシーポリシー — クロンダイク・ソリティア',
  privacyPageDescription: 'クロンダイク・ソリティアのプライバシーポリシー。データの取り扱いについて説明します。',
  privacyBackToGame: 'ゲームに戻る',
  privacyHeading: 'プライバシーポリシー',
  privacyLastUpdated: '最終更新日：2026年4月7日',
  privacyIntro: 'このプライバシーポリシーは、クロンダイク・ソリティア（「当社」、「私たち」）が、<a href="/">当サイト</a>で無料オンラインカードゲームをご利用いただく際の情報の取り扱いについて説明するものです。',
  privacyCollectHeading: '収集する情報',
  privacyCollectP: 'ゲームをプレイするためにアカウントを作成したり、個人情報を提供したりする必要はありません。以下のような、限定的で非個人の技術的データを自動的に収集する場合があります。',
  privacyCollectItems: ['ブラウザの種類とバージョン', 'オペレーティングシステム', '参照元URLとアクセスしたページ', 'アクセス日時'],
  privacyCollectNote: 'これらのデータは集計形式で収集され、個人を特定するために使用することはできません。',
  privacyStorageHeading: 'ローカルストレージ',
  privacyStorageP: 'ゲームは、ブラウザのローカルストレージを使用して、ゲームの設定（山札の引き直し設定など）を端末にローカル保存する場合があります。これらのデータがブラウザの外に出ることはなく、当社に送信されることもありません。',
  privacyCookiesHeading: 'Cookie',
  privacyCookiesP: '追跡用Cookieや広告用Cookieは使用していません。設定されるCookieはゲームの動作に厳密に必要なものであり、個人データを収集することはありません。',
  privacyThirdPartyHeading: '第三者サービス',
  privacyThirdPartyP: 'ゲームアセットを配信するためにCDNなどの第三者サービスを利用する場合があります。これらのサービスは、通常のインターネット運用の一環として標準的なサーバーログデータ（IPアドレスなど）を収集する場合があります。当社はお客様のデータを広告主に販売したり共有したりすることはありません。',
  privacyChildrenHeading: '子供のプライバシー',
  privacyChildrenP: '当ゲームは全年齢向けです。13歳未満のお子様から故意に個人情報を収集することはありません。お子様が当社に個人情報を提供したと思われる場合は、削除できるようご連絡ください。',
  privacyChangesHeading: '本ポリシーの変更',
  privacyChangesP: '本プライバシーポリシーは随時更新されることがあります。変更はこのページに更新日付を付けて掲載します。変更後にゲームを継続して使用することは、更新されたポリシーに同意したものとみなされます。',
  privacyContactHeading: 'お問い合わせ',
  privacyContactP: '本プライバシーポリシーについてご質問がある場合は、当サイトの連絡先情報からご連絡ください。',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: '利用規約 — クロンダイク・ソリティア',
  tosPageDescription: 'クロンダイク・ソリティアの利用規約。',
  tosBackToGame: 'ゲームに戻る',
  tosHeading: '利用規約',
  tosLastUpdated: '最終更新日：2026年4月7日',
  tosIntro: 'クロンダイク・ソリティア（「ゲーム」、「サイト」）にアクセスまたは使用することにより、本利用規約に拘束されることに同意したものとします。同意できない場合は、サイトを使用しないでください。',
  tosUseHeading: 'ゲームの使用',
  tosUseP: 'クロンダイク・ソリティアは、個人の非商用エンターテイメントのために無料で提供されます。以下のことができます：',
  tosUseMayItems: ['個人的な楽しみのためにゲームをプレイする', 'サイトのURLを他の人と共有する'],
  tosUseMayNotP: '以下のことはできません：',
  tosUseMayNotItems: [
    '許可なくゲームまたはそのアセットをコピー、再配布、転売する',
    'ゲームのリバースエンジニアリング、逆コンパイル、改ざんを試みる',
    '自動ツールやボットを使用してゲームとやり取りする',
    '違法な目的でサイトを使用する',
  ],
  tosIPHeading: '知的財産',
  tosIPP: 'このサイト上のすべてのコンテンツ（ゲームコード、グラフィック、カードアート、オーディオを含む）は、当社が所有するか、ライセンスを受けています。本規約のいかなる条項も、ゲームをプレイするために必要な範囲を超えて、当社の知的財産に対する権利をあなたに付与するものではありません。',
  tosWarrantyHeading: '保証の否認',
  tosWarrantyP: 'ゲームは「現状有姿」で提供され、明示または黙示を問わず、いかなる種類の保証もありません。当社は、サイトが常に利用可能であること、エラーがないこと、ウイルスやその他の有害なコンポーネントがないことを保証しません。',
  tosLiabilityHeading: '責任の制限',
  tosLiabilityP: '法律で認められる最大限の範囲において、当社は、ゲームの使用または使用不能に起因する間接的、偶発的、特別、または派生的な損害について責任を負いません。',
  tosChangesHeading: '本規約の変更',
  tosChangesP: '当社は、いつでも本規約を更新する権利を留保します。変更はこのページに更新日付を付けて掲載します。変更後にゲームを継続して使用することは、改訂された規約に同意したものとみなされます。',
  tosLawHeading: '準拠法',
  tosLawP: '本規約は、適用される法律に準拠します。紛争は、適用される管轄区域の適切な裁判所で解決されるものとします。',
  tosContactHeading: 'お問い合わせ',
  tosContactP: '本規約についてご質問がある場合は、当サイトに記載されている情報からご連絡ください。',
};

export type Locale = typeof ja;