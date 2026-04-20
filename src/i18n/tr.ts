/**
 * Turkish locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const tr = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'Klondike Solitaire — Ücretsiz Çevrimiçi Kart Oyunu',
  pageDescription: 'Tarayıcınızda ücretsiz Klondike Solitaire oynayın. İndirme yok, kayıt yok. Geri alma, otomatik taşıma, klavye kısayolları ve özelleştirilebilir kurallarla klasik kart oyunu.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: 'Yeni Oyun',
  btnUndo: 'Geri Al',
  btnAutoMove: 'Otomatik Taşı',
  btnAutoMoveTitle: 'Temel alana otomatik taşı',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: 'Süre',
  statMoves: 'Hamle',
  statStock: 'Deste',
  statPass: 'Geçiş',
  statScore: 'Puan',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: 'Deste',
  pileWaste: 'Atılanlar',
  pileFoundationSpades: 'Temel ♠',
  pileFoundationHearts: 'Temel ♥',
  pileFoundationDiamonds: 'Temel ♦',
  pileFoundationClubs: 'Temel ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: 'Deste dönüşü',
  toolbarStockTurnsInfo: 'Deste dönüşü bilgisi',
  toolbarStockTurnsTooltip: 'Az geçiş = daha zor oyun. 1 dönüşte desteyi yalnızca bir kez gezebilirsiniz!',
  toolbarStockTurnsAriaLabel: 'Deste dönüşü',
  toolbarFaceUp: 'Açık',
  settingStockPass: 'Deste Geçişi',
  settingFaceUp: 'Açık',
  toolbarPause: 'Durdur',
  toolbarMusic: 'Müzik',
  toolbarFullscreen: 'Tam ekran',
  toolbarExitFullscreen: 'Tam ekrandan çık',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'Oyun Duraklatıldı',
  pauseSubtitle: 'Acele etmeyin — oyununuz güvende',
  pauseResume: 'Devam Et',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: 'Kazandınız!',
  winFinalScore: 'Puan',
  winTime: 'Süre',
  winMoves: 'Hamle',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: 'Otomatik tamamlama mevcut!',
  autocompleteButton: 'Otomatik Tamamla',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'Kart arkası',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: 'Müzik Çalar',
  musicSolitaireRadio: 'Solitaire Radyo',
  musicTracksLabel: 'Parçalar',
  musicTracksAriaLabel: 'Parça seçimi',
  musicPlay: 'Oynat',
  musicPause: 'Durdur',
  musicVolumeLabel: 'Ses',
  musicVolumeAriaLabel: 'Ses',
  musicMute: 'Sessiz',
  musicUnmute: 'Sesi Aç',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `Parça ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'Çello', 'Davul I', 'Davul II', 'Flüt', 'Gitar I', 'Gitar II', 'Gitar III',
    'Caz', 'Doğa I', 'Doğa II', 'Doğa III', 'Doğa IV', 'Doğa V', 'Doğa VI',
    'Orkestra', 'Piyano I', 'Piyano II', 'Piyano III', 'Piyano IV', 'Piyano V', 'Piyano VI',
    'Piyano VII', 'Piyano VIII', 'Sentezleyici I', 'Sentezleyici II', 'Sentezleyici III', 'Keman',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'Klondike Solitaire. Ücretsiz oyna.',
  footerPrivacyPolicy: 'Gizlilik Politikası',
  footerTermsOfService: 'Hizmet Şartları',
  footerNavAriaLabel: 'Altbilgi gezintisi',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'Klondike Solitaire',
  descriptionP1: 'Amaç basit: 52 kartın tamamını dört Temel alanına taşımak, her biri bir renkten oluşur ve As’tan Papaz’a doğru sıralanır.',
  descriptionP2: 'Klondike, dünyanın en tanınmış sabır kart oyunudur — onlarca yıl boyunca her Windows kopyasıyla birlikte gelen ve milyonlarca insanı solitaire ile tanıştıran oyun. Adı Kanada’daki Klondike bölgesinden gelir, ancak oyunun kendisi muhtemelen Altına Hücum döneminden daha eskidir. Bugün hâlâ keçeli bir oyun masasında veya dokunmatik ekranda aynı derecede rahat olan kesin tek oyunculu kart oyunu olmaya devam ediyor.',

  howToPlayHeading: 'Nasıl Oynanır',
  howToPlayLayoutHeading: 'Düzen',
  howToPlayLayoutP: 'Oyun yedi Tablo sütunu ile başlar. 1. sütunda bir kart açık; 2. sütunda bir kapalı ve bir açık; ve bu şekilde 7. sütuna kadar devam eder. Kalan 24 kart Deste’de kapalı olarak durur. Dört boş Temel alanı sağ üst köşede bekler, her renk için bir tane.',
  howToPlayGoalHeading: 'Amacınız',
  howToPlayGoalP: 'Tüm kartları Temel alanlarına taşıyın. Her Temel yığını bir As ile başlar ve aynı renkte sıralanır — As, 2, 3 … Kız, Papaz. Dört yığını da doldurun ve kazanın.',
  howToPlayTableauHeading: 'Tabloda Kart Taşıma',
  howToPlayTableauP: 'Açık bir kartı (veya açık kart yığınını) başka bir Tablo sütununa sürükleyin. Yerleştirdiğiniz kart, üzerine konduğu karttan bir derece düşük ve zıt renkte olmalıdır — örneğin, siyah 8’in üzerine kırmızı 7. Yalnızca bir Papaz (veya Papaz liderliğindeki bir yığın) boş bir Tablo sütununa yerleştirilebilir.',
  howToPlayStockHeading: 'Desteden Çekme',
  howToPlayStockP: 'Desteye tıklayarak üstteki kartı açık olarak Atılanlar yığınına atın. Atılanların üstteki kartını istediğiniz zaman oynayabilirsiniz. Deste bittiğinde, Atılanları tekrar Deste’ye dönüştürmek için tekrar tıklayın (puan cezası uygulanır).',
  howToPlayFoundationsHeading: 'Kartları Temel Alanlarına Gönderme',
  howToPlayFoundationsP: 'Uygun bir kartı Temel yığınına sürükleyin veya otomatik olarak göndermek için çift tıklayın. Başlıktaki "Otomatik Taşı" düğmesini kullanarak şu anda uygun olan tüm kartları tek bir hamlede Temel alanlarına taşıyın.',
  howToPlayUndoHeading: 'Geri Al',
  howToPlayUndoP: 'Geri Al düğmesine tıklayın (veya Ctrl+Z / Cmd+Z tuşlarına basın) son işleminizi geri almak için. İlk dağıtıma kadar her şeyi geri alabilirsiniz.',

  rulesHeading: 'Kurallar — Adım Adım',
  rules: [
    '<strong>Karıştır ve Dağıt</strong> — 52 kartlık deste karıştırılır ve 7 Tablo sütununa dağıtılır. N. sütun N kart alır; her sütunun yalnızca en üst kartı açıktır. Kalan 24 kart Deste’yi oluşturur.',
    '<strong>Tablo, dönüşümlü renklerde azalan sırada inşa edilir</strong> — Açık bir kart, tam olarak bir derece yüksek ve zıt renkte olan (kırmızı üzerine siyah, siyah üzerine kırmızı) herhangi bir Tablo kartının üzerine yerleştirilebilir.',
    '<strong>Boş sütunları yalnızca Papazlar doldurur</strong> — Bir Tablo sütunu boşaldığında, oraya yalnızca bir Papaz (veya Papaz liderliğindeki bir yığın) taşınabilir.',
    '<strong>Yığınları bir birim olarak taşıyın</strong> — Doğru dönüşümlü renk sırasındaki herhangi bir açık kart dizisi, geçerli bir Tablo kartının üzerine birlikte sürüklenip bırakılabilir.',
    '<strong>En üstteki kapalı kartı otomatik olarak çevirin</strong> — Bir hamle, bir Tablo sütununun en üstteki kapalı kartını açığa çıkardığında, hemen açılır.',
    '<strong>Desteden birer birer kart çekin</strong> — Deste’ye her tıklama, üstteki kartı açık olarak Atılanlar’a taşır. Yalnızca Atılanlar’ın en üstteki kartı oynanabilir.',
    '<strong>Atılanları geri dönüştürün</strong> — Deste boşaldığında, tüm Atılanlar yığınını kapalı olarak tekrar Deste’ye dönüştürmek için üzerine tıklayın. Her seferinde 100 puan cezası uygulanır (minimum puan 0’dır). Bir geçiş sınırı belirlenmişse, sınıra ulaşıldığında geri dönüştürme devre dışı kalır.',
    '<strong>Temel alanlarını As’tan Papaz’a inşa edin</strong> — Her Temel yığını, tek bir renkten kartları artan sırada kabul eder: önce As, sonra 2’den Papaz’a kadar. Renk, yerleştirilen ilk As tarafından sabitlenir.',
    '<strong>Kartları Temel’den geri taşıyın</strong> — Bir Temel yığınındaki bir kart, yerleşim geçerliyse Tablo’ya geri sürüklenebilir, ancak puan cezası uygulanır.',
    '<strong>Dört Temel alanını da tamamlayarak kazanın</strong> — Oyunu kazanmak için 52 kartın tamamını dört Temel yığınına (renk başına 13, As’tan Papaz’a) yerleştirin.',
  ],

  shortcutsHeading: 'Klavye Kısayolları',
  shortcutsKeyCol: 'Tuş',
  shortcutsActionCol: 'Eylem',
  shortcuts: [
    { key: '← → ↑ ↓ Ok tuşları', action: 'Klavye imlecini yığınlar arasında hareket ettirir' },
    { key: 'Boşluk', action: 'İmleçteki kart(lar)ı seçer veya vurgulanan hedefe hamleyi onaylar' },
    { key: 'Escape', action: 'Mevcut seçimi iptal eder' },
    { key: 'F2', action: 'Yeni oyun başlatır' },
    { key: 'Ctrl+Z / Cmd+Z', action: 'Son işlemi geri alır' },
    { key: 'A', action: 'Uygun tüm kartları otomatik olarak Temel alanlarına taşır' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'Gizlilik Politikası — Klondike Solitaire',
  privacyPageDescription: 'Klondike Solitaire için Gizlilik Politikası. Verilerinizi nasıl işlediğimizi öğrenin.',
  privacyBackToGame: 'Oyuna Dön',
  privacyHeading: 'Gizlilik Politikası',
  privacyLastUpdated: 'Son güncelleme: 7 Nisan 2026',
  privacyIntro: 'Bu Gizlilik Politikası, Klondike Solitaire’in (“biz”, “bize” veya “bizim”) <a href="/">bu sitedeki</a> ücretsiz çevrimiçi kart oyunumuzu kullandığınızda bilgileri nasıl işlediğini açıklar.',
  privacyCollectHeading: 'Topladığımız Bilgiler',
  privacyCollectP: 'Oyunu oynamak için bir hesap oluşturmanızı veya herhangi bir kişisel bilgi vermenizi istemiyoruz. Sınırlı, kişisel olmayan teknik verileri otomatik olarak toplayabiliriz, bunlar şunları içerir:',
  privacyCollectItems: ['Tarayıcı türü ve sürümü', 'İşletim sistemi', 'Yönlendiren URL’ler ve ziyaret edilen sayfalar', 'Ziyaret tarihi ve saati'],
  privacyCollectNote: 'Bu veriler toplu olarak toplanır ve sizi kişisel olarak tanımlamak için kullanılamaz.',
  privacyStorageHeading: 'Yerel Depolama',
  privacyStorageP: 'Oyun, oyun tercihlerini (deste dönüşü ayarları gibi) cihazınızda yerel olarak kaydetmek için tarayıcınızın yerel deposunu kullanabilir. Bu veriler tarayıcınızdan asla ayrılmaz ve bize iletilmez.',
  privacyCookiesHeading: 'Çerezler',
  privacyCookiesP: 'İzleme çerezleri veya reklam çerezleri kullanmıyoruz. Ayarlanan tüm çerezler, oyunun çalışması için kesinlikle gereklidir ve kişisel veri toplamaz.',
  privacyThirdPartyHeading: 'Üçüncü Taraf Hizmetleri',
  privacyThirdPartyP: 'Oyun varlıklarını sunmak için CDN gibi üçüncü taraf hizmetler kullanabiliriz. Bu hizmetler, normal internet işlemlerinin bir parçası olarak standart sunucu günlük verilerini (IP adresleri gibi) toplayabilir. Verilerinizi reklam verenlerle satmaz veya paylaşmayız.',
  privacyChildrenHeading: 'Çocukların Gizliliği',
  privacyChildrenP: 'Oyunumuz her yaş için uygundur. 13 yaşından küçük çocuklardan bilerek kişisel bilgi toplamıyoruz. Bir çocuğun bize kişisel bilgi verdiğini düşünüyorsanız, silebilmemiz için lütfen bizimle iletişime geçin.',
  privacyChangesHeading: 'Bu Politikadaki Değişiklikler',
  privacyChangesP: 'Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Değişiklikler bu sayfada güncellenmiş bir tarihle yayınlanacaktır. Değişikliklerden sonra oyunu kullanmaya devam etmeniz, güncellenmiş politikayı kabul ettiğiniz anlamına gelir.',
  privacyContactHeading: 'İletişim',
  privacyContactP: 'Bu Gizlilik Politikası hakkında herhangi bir sorunuz varsa, sitemizdeki iletişim bilgileri aracılığıyla bize ulaşabilirsiniz.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: 'Hizmet Şartları — Klondike Solitaire',
  tosPageDescription: 'Klondike Solitaire için Hizmet Şartları.',
  tosBackToGame: 'Oyuna Dön',
  tosHeading: 'Hizmet Şartları',
  tosLastUpdated: 'Son güncelleme: 7 Nisan 2026',
  tosIntro: 'Klondike Solitaire’e (“oyun”, “site”) erişerek veya kullanarak, bu Hizmet Şartları ile bağlı olmayı kabul edersiniz. Kabul etmiyorsanız, lütfen siteyi kullanmayın.',
  tosUseHeading: 'Oyunun Kullanımı',
  tosUseP: 'Klondike Solitaire, kişisel, ticari olmayan eğlence için ücretsiz olarak sunulmaktadır. Şunları yapabilirsiniz:',
  tosUseMayItems: ['Kişisel zevkiniz için oyunu oynamak', 'Site URL’sini başkalarıyla paylaşmak'],
  tosUseMayNotP: 'Şunları yapamazsınız:',
  tosUseMayNotItems: [
    'İzin almadan oyunu veya varlıklarını kopyalamak, yeniden dağıtmak veya yeniden satmak',
    'Oyunu tersine mühendislik yapmaya, derlemeye veya kurcalamaya çalışmak',
    'Oyunla etkileşim kurmak için otomatik araçlar veya botlar kullanmak',
    'Siteyi herhangi bir yasadışı amaçla kullanmak',
  ],
  tosIPHeading: 'Fikri Mülkiyet',
  tosIPP: 'Bu sitedeki tüm içerik (oyun kodu, grafikler, kart sanatı ve ses dahil) bize aittir veya lisanslıdır. Bu Şartlar’daki hiçbir şey, oyunu oynamak için gerekli olanın ötesinde, fikri mülkiyetimiz üzerinde size herhangi bir hak vermez.',
  tosWarrantyHeading: 'Garantilerin Reddi',
  tosWarrantyP: 'Oyun, açık veya zımni hiçbir garanti olmaksızın “olduğu gibi” sağlanır. Sitenin her zaman kullanılabilir olacağını, hatasız olacağını veya virüs veya diğer zararlı bileşenlerden arınmış olacağını garanti etmiyoruz.',
  tosLiabilityHeading: 'Sorumluluğun Sınırlandırılması',
  tosLiabilityP: 'Yasanın izin verdiği azami ölçüde, oyunu kullanmanızdan veya kullanamamanızdan kaynaklanan herhangi bir dolaylı, arızi, özel veya sonuç olarak ortaya çıkan zararlardan sorumlu olmayacağız.',
  tosChangesHeading: 'Bu Şartlardaki Değişiklikler',
  tosChangesP: 'Bu Şartları herhangi bir zamanda güncelleme hakkını saklı tutarız. Değişiklikler bu sayfada güncellenmiş bir tarihle yayınlanacaktır. Değişikliklerden sonra oyunu kullanmaya devam etmeniz, revize edilmiş Şartları kabul ettiğiniz anlamına gelir.',
  tosLawHeading: 'Geçerli Hukuk',
  tosLawP: 'Bu Şartlar, geçerli yasaya tabidir. Herhangi bir anlaşmazlık, ilgili yargı bölgesinin uygun mahkemelerinde çözülecektir.',
  tosContactHeading: 'İletişim',
  tosContactP: 'Bu Şartlar hakkında sorularınız varsa, lütfen sitemizde mevcut olan bilgiler aracılığıyla bizimle iletişime geçin.',
};

export type Locale = typeof tr;