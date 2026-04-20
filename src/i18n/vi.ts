/**
 * Vietnamese locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const vi = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: 'Klondike Solitaire — Game Bài Trực Tuyến Miễn Phí',
  pageDescription: 'Chơi Klondike Solitaire miễn phí ngay trên trình duyệt. Không cần tải về, không cần đăng ký. Game bài cổ điển với tính năng hoàn tác, tự động di chuyển, phím tắt và luật chơi tùy chỉnh.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: 'Ván Mới',
  btnUndo: 'Hoàn Tác',
  btnAutoMove: 'Tự Động',
  btnAutoMoveTitle: 'Tự động di chuyển lên Nền',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: 'Thời gian',
  statMoves: 'Lượt đi',
  statStock: 'Bộ bài',
  statPass: 'Lượt qua',
  statScore: 'Điểm',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: 'Bộ bài',
  pileWaste: 'Bài thải',
  pileFoundationSpades: 'Nền ♠',
  pileFoundationHearts: 'Nền ♥',
  pileFoundationDiamonds: 'Nền ♦',
  pileFoundationClubs: 'Nền ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: 'Số lượt bốc',
  toolbarStockTurnsInfo: 'Thông tin số lượt bốc',
  toolbarStockTurnsTooltip: 'Càng ít lượt bốc càng khó. Với 1 lượt, bạn chỉ có một cơ hội đi qua bộ bài!',
  toolbarStockTurnsAriaLabel: 'Số lượt bốc',
  toolbarFaceUp: 'Ngửa',
  settingStockPass: 'Lượt bốc',
  settingFaceUp: 'Ngửa',
  toolbarPause: 'Tạm dừng',
  toolbarMusic: 'Nhạc',
  toolbarFullscreen: 'Toàn màn hình',
  toolbarExitFullscreen: 'Thoát toàn màn hình',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: 'Trò chơi tạm dừng',
  pauseSubtitle: 'Cứ bình tĩnh — ván bài của bạn vẫn an toàn',
  pauseResume: 'Tiếp tục',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: 'Bạn thắng rồi!',
  winFinalScore: 'Điểm',
  winTime: 'Thời gian',
  winMoves: 'Lượt đi',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: 'Có thể tự động hoàn tất!',
  autocompleteButton: 'Tự Động Hoàn Tất',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: 'Mặt sau bài',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: 'Trình phát nhạc',
  musicSolitaireRadio: 'Radio Solitaire',
  musicTracksLabel: 'Bản nhạc',
  musicTracksAriaLabel: 'Chọn bản nhạc',
  musicPlay: 'Phát',
  musicPause: 'Tạm dừng',
  musicVolumeLabel: 'Âm lượng',
  musicVolumeAriaLabel: 'Âm lượng',
  musicMute: 'Tắt tiếng',
  musicUnmute: 'Bật tiếng',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `Bản ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    'Cello', 'Trống I', 'Trống II', 'Sáo', 'Guitar I', 'Guitar II', 'Guitar III',
    'Jazz', 'Thiên nhiên I', 'Thiên nhiên II', 'Thiên nhiên III', 'Thiên nhiên IV', 'Thiên nhiên V', 'Thiên nhiên VI',
    'Dàn nhạc', 'Piano I', 'Piano II', 'Piano III', 'Piano IV', 'Piano V', 'Piano VI',
    'Piano VII', 'Piano VIII', 'Synth I', 'Synth II', 'Synth III', 'Violin',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: 'Klondike Solitaire. Chơi miễn phí.',
  footerPrivacyPolicy: 'Chính sách riêng tư',
  footerTermsOfService: 'Điều khoản dịch vụ',
  footerNavAriaLabel: 'Điều hướng chân trang',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: 'Klondike Solitaire',
  descriptionP1: 'Mục tiêu rất đơn giản: di chuyển toàn bộ 52 lá bài lên bốn cột Nền, mỗi cột một chất, được xây dựng theo thứ tự từ Át đến Vua.',
  descriptionP2: 'Klondike là trò chơi bài patience nổi tiếng nhất thế giới — thứ đã xuất hiện trong mọi bản Windows suốt nhiều thập kỷ và giới thiệu solitaire với hàng triệu người. Tên của nó bắt nguồn từ vùng Klondike ở Canada, mặc dù bản thân trò chơi có lẽ đã có từ trước thời đại đào vàng. Ngày nay, nó vẫn là trò chơi bài một người chơi đỉnh cao, thoải mái như trên bàn phủ nỉ cũng như trên màn hình cảm ứng.',

  howToPlayHeading: 'Cách chơi',
  howToPlayLayoutHeading: 'Cách bố trí',
  howToPlayLayoutP: 'Trò chơi bắt đầu với bảy cột Bài trên bàn. Cột 1 có một lá ngửa; cột 2 có một lá úp và một lá ngửa; và cứ thế cho đến cột 7. 24 lá còn lại nằm úp trong cột Bộ bài. Bốn cột Nền trống chờ ở góc trên bên phải, mỗi cột dành cho một chất.',
  howToPlayGoalHeading: 'Mục tiêu của bạn',
  howToPlayGoalP: 'Di chuyển mọi lá bài lên các cột Nền. Mỗi cột Nền bắt đầu bằng quân Át và được xây dựng theo cùng chất — Át, 2, 3 … Đầm, Già. Lấp đầy cả bốn cột và bạn chiến thắng.',
  howToPlayTableauHeading: 'Di chuyển bài trên bàn',
  howToPlayTableauP: 'Kéo một lá bài ngửa (hoặc một chồng bài ngửa) sang một cột Bài trên bàn khác. Lá bạn đặt phải có thứ hạng thấp hơn một bậc và khác màu với lá nó được đặt lên — ví dụ, 7 đỏ trên 8 đen. Chỉ có quân Già (hoặc chồng bài có Già ở đầu) mới được đặt lên cột Bài trên bàn trống.',
  howToPlayStockHeading: 'Bốc từ Bộ bài',
  howToPlayStockP: 'Nhấp vào cột Bộ bài để lật lá trên cùng ngửa lên cột Bài thải. Bạn có thể chơi lá trên cùng của cột Bài thải bất cứ lúc nào. Khi Bộ bài hết, nhấp lại để tái chế Bài thải trở lại Bộ bài (bị trừ điểm).',
  howToPlayFoundationsHeading: 'Gửi bài lên Nền',
  howToPlayFoundationsP: 'Kéo một lá bài hợp lệ lên cột Nền, hoặc nhấp đúp để tự động gửi lên đó. Dùng nút "Tự Động" ở đầu trang để di chuyển tất cả các lá hiện đủ điều kiện lên Nền chỉ trong một thao tác.',
  howToPlayUndoHeading: 'Hoàn tác',
  howToPlayUndoP: 'Nhấp vào nút Hoàn tác (hoặc nhấn Ctrl+Z / Cmd+Z) để lùi lại hành động cuối cùng. Bạn có thể hoàn tác cho đến tận lúc chia bài ban đầu.',

  rulesHeading: 'Luật chơi — Từng bước một',
  rules: [
    '<strong>Xào & Chia bài</strong> — Bộ 52 lá được xào và chia thành 7 cột Bài trên bàn. Cột thứ N nhận N lá; chỉ lá trên cùng của mỗi cột là ngửa. 24 lá còn lại tạo thành Bộ bài.',
    '<strong>Bài trên bàn xếp giảm dần, xen kẽ màu</strong> — Một lá ngửa có thể được đặt lên bất kỳ lá bài trên bàn nào có thứ hạng cao hơn đúng một bậc và khác màu (đỏ lên đen, đen lên đỏ).',
    '<strong>Chỉ Già mới lấp đầy cột trống</strong> — Khi một cột Bài trên bàn bị dọn sạch, chỉ có Già (hoặc chồng bài có Già ở đầu) mới được di chuyển vào đó.',
    '<strong>Di chuyển cả chồng bài như một khối</strong> — Bất kỳ chuỗi lá ngửa nào theo đúng thứ tự xen kẽ màu đều có thể được kéo và thả cùng lúc lên một lá Bài trên bàn hợp lệ.',
    '<strong>Tự động lật lá úp trên cùng</strong> — Bất cứ khi nào một nước đi lật mở lá úp trên cùng của một cột Bài trên bàn, nó sẽ ngay lập tức được lật ngửa.',
    '<strong>Bốc từng lá một từ Bộ bài</strong> — Mỗi lần nhấp vào Bộ bài sẽ đưa lá trên cùng ngửa lên Bài thải. Chỉ lá trên cùng của Bài thải mới được chơi.',
    '<strong>Tái chế Bài thải</strong> — Khi Bộ bài hết, nhấp vào nó để biến toàn bộ Bài thải trở lại thành Bộ bài (úp xuống). Mỗi lần như vậy bị trừ 100 điểm (điểm tối thiểu là 0). Nếu có giới hạn số lượt qua, việc tái chế sẽ bị vô hiệu hóa khi đạt giới hạn.',
    '<strong>Xây Nền từ Át đến Già</strong> — Mỗi cột Nền chỉ chấp nhận bài của một chất theo thứ tự tăng dần: Át trước, sau đó 2 đến Già. Chất được xác định bởi quân Át đầu tiên được đặt.',
    '<strong>Lấy bài từ Nền trở lại</strong> — Một lá bài trên Nền có thể được kéo trở lại Bài trên bàn nếu nước đi hợp lệ, tuy nhiên sẽ bị trừ điểm.',
    '<strong>Thắng bằng cách hoàn thành cả bốn Nền</strong> — Đặt tất cả 52 lá lên bốn cột Nền (13 lá mỗi chất, từ Át đến Già) để chiến thắng.',
  ],

  shortcutsHeading: 'Phím tắt bàn phím',
  shortcutsKeyCol: 'Phím',
  shortcutsActionCol: 'Hành động',
  shortcuts: [
    { key: '← → ↑ ↓ Các phím mũi tên', action: 'Di chuyển con trỏ bàn phím giữa các cột' },
    { key: 'Space', action: 'Chọn (các) lá bài tại con trỏ, hoặc xác nhận di chuyển đến mục tiêu được tô sáng' },
    { key: 'Escape', action: 'Hủy lựa chọn hiện tại' },
    { key: 'F2', action: 'Bắt đầu ván mới' },
    { key: 'Ctrl+Z / Cmd+Z', action: 'Hoàn tác hành động cuối' },
    { key: 'A', action: 'Tự động di chuyển mọi lá bài đủ điều kiện lên Nền' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: 'Chính sách riêng tư — Klondike Solitaire',
  privacyPageDescription: 'Chính sách riêng tư của Klondike Solitaire. Tìm hiểu cách chúng tôi xử lý dữ liệu của bạn.',
  privacyBackToGame: 'Quay lại trò chơi',
  privacyHeading: 'Chính sách riêng tư',
  privacyLastUpdated: 'Cập nhật lần cuối: 7 tháng 4, 2026',
  privacyIntro: 'Chính sách riêng tư này mô tả cách Klondike Solitaire ("chúng tôi" hoặc "của chúng tôi") xử lý thông tin khi bạn sử dụng trò chơi bài trực tuyến miễn phí tại <a href="/">trang web này</a>.',
  privacyCollectHeading: 'Thông tin chúng tôi thu thập',
  privacyCollectP: 'Chúng tôi không yêu cầu bạn tạo tài khoản hoặc cung cấp bất kỳ thông tin cá nhân nào để chơi trò chơi. Chúng tôi có thể tự động thu thập dữ liệu kỹ thuật hạn chế, không mang tính cá nhân, bao gồm:',
  privacyCollectItems: ['Loại và phiên bản trình duyệt', 'Hệ điều hành', 'URL giới thiệu và các trang đã xem', 'Ngày và giờ truy cập'],
  privacyCollectNote: 'Dữ liệu này được thu thập dưới dạng tổng hợp và không thể được sử dụng để nhận dạng cá nhân bạn.',
  privacyStorageHeading: 'Lưu trữ cục bộ',
  privacyStorageP: 'Trò chơi có thể sử dụng bộ nhớ cục bộ của trình duyệt để lưu các tùy chọn trò chơi (như cài đặt số lượt bốc) cục bộ trên thiết bị của bạn. Dữ liệu này không bao giờ rời khỏi trình duyệt của bạn và không được truyền cho chúng tôi.',
  privacyCookiesHeading: 'Cookie',
  privacyCookiesP: 'Chúng tôi không sử dụng cookie theo dõi hoặc cookie quảng cáo. Bất kỳ cookie nào được đặt đều hoàn toàn cần thiết cho trò chơi hoạt động và không thu thập dữ liệu cá nhân.',
  privacyThirdPartyHeading: 'Dịch vụ bên thứ ba',
  privacyThirdPartyP: 'Chúng tôi có thể sử dụng dịch vụ bên thứ ba như CDN (Mạng phân phối nội dung) để cung cấp các tài nguyên trò chơi. Các dịch vụ này có thể thu thập dữ liệu nhật ký máy chủ tiêu chuẩn (như địa chỉ IP) như một phần của hoạt động Internet thông thường. Chúng tôi không bán hoặc chia sẻ dữ liệu của bạn với nhà quảng cáo.',
  privacyChildrenHeading: 'Quyền riêng tư của trẻ em',
  privacyChildrenP: 'Trò chơi của chúng tôi phù hợp với mọi lứa tuổi. Chúng tôi không cố tình thu thập thông tin cá nhân từ trẻ em dưới 13 tuổi. Nếu bạn tin rằng trẻ em đã cung cấp thông tin cá nhân cho chúng tôi, vui lòng liên hệ để chúng tôi có thể xóa thông tin đó.',
  privacyChangesHeading: 'Thay đổi đối với Chính sách này',
  privacyChangesP: 'Chúng tôi có thể cập nhật Chính sách quyền riêng tư này theo thời gian. Các thay đổi sẽ được đăng trên trang này với ngày cập nhật. Tiếp tục sử dụng trò chơi sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận chính sách đã cập nhật.',
  privacyContactHeading: 'Liên hệ',
  privacyContactP: 'Nếu bạn có bất kỳ câu hỏi nào về Chính sách quyền riêng tư này, bạn có thể liên hệ với chúng tôi qua thông tin liên hệ trên trang web của chúng tôi.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: 'Điều khoản dịch vụ — Klondike Solitaire',
  tosPageDescription: 'Điều khoản dịch vụ của Klondike Solitaire.',
  tosBackToGame: 'Quay lại trò chơi',
  tosHeading: 'Điều khoản dịch vụ',
  tosLastUpdated: 'Cập nhật lần cuối: 7 tháng 4, 2026',
  tosIntro: 'Bằng cách truy cập hoặc sử dụng Klondike Solitaire ("trò chơi", "trang web"), bạn đồng ý tuân theo các Điều khoản dịch vụ này. Nếu bạn không đồng ý, vui lòng không sử dụng trang web.',
  tosUseHeading: 'Sử dụng trò chơi',
  tosUseP: 'Klondike Solitaire được cung cấp miễn phí cho mục đích giải trí cá nhân, phi thương mại. Bạn có thể:',
  tosUseMayItems: ['Chơi trò chơi cho niềm vui cá nhân', 'Chia sẻ URL trang web với người khác'],
  tosUseMayNotP: 'Bạn không được phép:',
  tosUseMayNotItems: [
    'Sao chép, phân phối lại hoặc bán lại trò chơi hoặc tài nguyên của trò chơi khi chưa được phép',
    'Cố gắng dịch ngược, giải mã hoặc can thiệp vào trò chơi',
    'Sử dụng công cụ tự động hoặc bot để tương tác với trò chơi',
    'Sử dụng trang web cho bất kỳ mục đích bất hợp pháp nào',
  ],
  tosIPHeading: 'Sở hữu trí tuệ',
  tosIPP: 'Tất cả nội dung trên trang web này, bao gồm mã trò chơi, đồ họa, hình ảnh bài và âm thanh, thuộc sở hữu của chúng tôi hoặc được cấp phép cho chúng tôi. Không có điều khoản nào trong Điều khoản này cấp cho bạn bất kỳ quyền nào đối với tài sản trí tuệ của chúng tôi ngoài những gì cần thiết để chơi trò chơi.',
  tosWarrantyHeading: 'Từ chối bảo hành',
  tosWarrantyP: 'Trò chơi được cung cấp "nguyên trạng" mà không có bất kỳ bảo hành nào, dù là rõ ràng hay ngụ ý. Chúng tôi không đảm bảo rằng trang web sẽ luôn sẵn sàng, không có lỗi hoặc không có vi-rút hoặc các thành phần độc hại khác.',
  tosLiabilityHeading: 'Giới hạn trách nhiệm pháp lý',
  tosLiabilityP: 'Trong phạm vi tối đa được pháp luật cho phép, chúng tôi sẽ không chịu trách nhiệm cho bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc do hậu quả phát sinh từ việc bạn sử dụng hoặc không thể sử dụng trò chơi.',
  tosChangesHeading: 'Thay đổi Điều khoản này',
  tosChangesP: 'Chúng tôi bảo lưu quyền cập nhật các Điều khoản này bất cứ lúc nào. Các thay đổi sẽ được đăng trên trang này với ngày cập nhật. Tiếp tục sử dụng trò chơi sau khi có thay đổi đồng nghĩa với việc bạn chấp nhận các Điều khoản đã sửa đổi.',
  tosLawHeading: 'Luật điều chỉnh',
  tosLawP: 'Các Điều khoản này được điều chỉnh bởi luật pháp hiện hành. Mọi tranh chấp sẽ được giải quyết tại các tòa án có thẩm quyền phù hợp theo luật định.',
  tosContactHeading: 'Liên hệ',
  tosContactP: 'Nếu bạn có câu hỏi về các Điều khoản này, vui lòng liên hệ với chúng tôi qua thông tin có sẵn trên trang web của chúng tôi.',
};

export type Locale = typeof vi;