/**
 * Korean locale strings.
 * To add a new language, duplicate this file (e.g. fr.ts), translate the
 * values, then pass the object to `setLocale()` in src/i18n/index.ts.
 */
export const ko = {
  // ── Page metadata ──────────────────────────────────────────────────────────
  pageTitle: '클론다이크 솔리테어 — 무료 온라인 카드 게임',
  pageDescription: '브라우저에서 무료로 클론다이크 솔리테어를 즐기세요. 다운로드, 가입 불필요. 실행 취소, 자동 이동, 키보드 단축키, 맞춤형 규칙을 갖춘 클래식 카드 게임.',

  // ── Header buttons ─────────────────────────────────────────────────────────
  btnNewGame: '새 게임',
  btnUndo: '실행 취소',
  btnAutoMove: '자동 이동',
  btnAutoMoveTitle: '재단으로 자동 이동',

  // ── Stats bar ──────────────────────────────────────────────────────────────
  statTime: '시간',
  statMoves: '이동 수',
  statStock: '더미',
  statPass: '패스',
  statScore: '점수',

  // ── Pile titles ────────────────────────────────────────────────────────────
  pileStock: '더미',
  pileWaste: '버린 더미',
  pileFoundationSpades: '재단 ♠',
  pileFoundationHearts: '재단 ♥',
  pileFoundationDiamonds: '재단 ♦',
  pileFoundationClubs: '재단 ♣',

  // ── Toolbar ────────────────────────────────────────────────────────────────
  toolbarStockTurns: '더미 회전 수',
  toolbarStockTurnsInfo: '더미 회전 수 정보',
  toolbarStockTurnsTooltip: '패스 횟수가 적을수록 어려운 게임입니다. 1회전 시 덱을 단 한 번만 살펴볼 수 있습니다!',
  toolbarStockTurnsAriaLabel: '더미 회전 수',
  toolbarFaceUp: '앞면',
  settingStockPass: '더미 패스',
  settingFaceUp: '앞면',
  toolbarPause: '일시정지',
  toolbarMusic: '음악',
  toolbarFullscreen: '전체 화면',
  toolbarExitFullscreen: '전체 화면 종료',

  // ── Pause modal ────────────────────────────────────────────────────────────
  pauseTitle: '게임 일시정지됨',
  pauseSubtitle: '천천히 하세요 — 게임은 안전하게 보관됩니다',
  pauseResume: '계속하기',

  // ── Win overlay ────────────────────────────────────────────────────────────
  winTitle: '승리했습니다!',
  winFinalScore: '점수',
  winTime: '시간',
  winMoves: '이동 수',

  // ── Auto-complete prompt ───────────────────────────────────────────────────
  autocompleteAvailable: '자동 완성 가능!',
  autocompleteButton: '자동 완성',

  // ── Card accessibility ─────────────────────────────────────────────────────
  cardBack: '카드 뒷면',

  // ── Music player ───────────────────────────────────────────────────────────
  musicPlayerAriaLabel: '음악 플레이어',
  musicSolitaireRadio: '솔리테어 라디오',
  musicTracksLabel: '트랙',
  musicTracksAriaLabel: '트랙 선택',
  musicPlay: '재생',
  musicPause: '일시정지',
  musicVolumeLabel: '볼륨',
  musicVolumeAriaLabel: '볼륨',
  musicMute: '음소거',
  musicUnmute: '음소거 해제',
  /** Used in aria-label: "Track 1: Cello" */
  musicTrackAriaLabel: (n: number, name: string) => `트랙 ${n}: ${name}`,

  // ── Track names ────────────────────────────────────────────────────────────
  trackNames: [
    '첼로', '드럼 I', '드럼 II', '플루트', '기타 I', '기타 II', '기타 III',
    '재즈', '자연 I', '자연 II', '자연 III', '자연 IV', '자연 V', '자연 VI',
    '오케스트라', '피아노 I', '피아노 II', '피아노 III', '피아노 IV', '피아노 V', '피아노 VI',
    '피아노 VII', '피아노 VIII', '신스 I', '신스 II', '신스 III', '바이올린',
  ],

  // ── Footer ─────────────────────────────────────────────────────────────────
  footerCopy: '클론다이크 솔리테어. 무료로 즐기세요.',
  footerPrivacyPolicy: '개인정보처리방침',
  footerTermsOfService: '이용약관',
  footerNavAriaLabel: '바닥글 탐색',

  // ── Below-fold content ─────────────────────────────────────────────────────
  descriptionHeading: '클론다이크 솔리테어',
  descriptionP1: '목표는 간단합니다. 52장의 카드 모두를 네 개의 재단 더미(각 무늬당 하나씩, 에이스에서 킹까지 오름차순으로 쌓음)로 옮기는 것입니다.',
  descriptionP2: '클론다이크는 세계에서 가장 잘 알려진 페이션스 카드 게임입니다 — 수십 년간 모든 Windows 복사본에 포함되어 수백만 명에게 솔리테어를 알려준 게임이죠. 이름은 캐나다의 클론다이크 지역에서 유래했지만, 게임 자체는 아마도 골드러시 시대 이전에 존재했을 것입니다. 오늘날에도 펠트 테이블 위에서나 터치스크린에서나 equally at home한 최고의 1인용 카드 게임으로 남아 있습니다.',

  howToPlayHeading: '게임 방법',
  howToPlayLayoutHeading: '배치',
  howToPlayLayoutP: '게임은 일곱 개의 테이블로 열로 시작합니다. 열 1은 카드 한 장이 앞면, 열 2는 한 장은 뒷면, 한 장은 앞면, 이런 식으로 열 7까지 이어집니다. 나머지 24장의 카드는 뒷면으로 더미에 놓입니다. 네 개의 빈 재단 더미가 오른쪽 상단 모서리에(무늬당 하나씩) 자리합니다.',
  howToPlayGoalHeading: '목표',
  howToPlayGoalP: '모든 카드를 재단으로 옮기세요. 각 재단 더미는 에이스로 시작하며 같은 무늬로 에이스, 2, 3 … 퀸, 킹 순으로 쌓아 올립니다. 네 개의 더미를 모두 채우면 승리합니다.',
  howToPlayTableauHeading: '테이블로에서 카드 옮기기',
  howToPlayTableauP: '앞면 카드(또는 앞면 카드 더미)를 다른 테이블로 열로 드래그하세요. 놓는 카드는 놓이는 카드보다 한 단계 낮은 숫자이고 반대 색상이어야 합니다 — 예: 빨간 7을 검은 8 위에. 빈 테이블로 열에는 킹(또는 킹이 맨 앞인 더미)만 놓을 수 있습니다.',
  howToPlayStockHeading: '더미에서 뽑기',
  howToPlayStockP: '더미를 클릭하면 맨 위 카드를 앞면으로 버린 더미로 옮깁니다. 버린 더미의 맨 위 카드는 언제든지 사용할 수 있습니다. 더미가 떨어지면 다시 클릭하여 버린 더미 전체를 뒷면으로 되돌려 더미로 만듭니다(점수 패널티 적용).',
  howToPlayFoundationsHeading: '재단으로 카드 보내기',
  howToPlayFoundationsP: '조건에 맞는 카드를 재단 더미로 드래그하거나 더블 클릭하여 자동으로 보냅니다. 헤더의 "자동 이동" 버튼을 사용하면 현재 조건에 맞는 모든 카드를 한 번에 재단으로 옮길 수 있습니다.',
  howToPlayUndoHeading: '실행 취소',
  howToPlayUndoP: '실행 취소 버튼(또는 Ctrl+Z / Cmd+Z)을 클릭하여 마지막 동작을 되돌립니다. 처음 배분 상태까지 모두 실행 취소할 수 있습니다.',

  rulesHeading: '규칙 — 단계별',
  rules: [
    '<strong>셔플 및 배분</strong> — 52장 덱을 섞어 7개의 테이블로 열에 배분합니다. N번째 열은 N장의 카드를 받으며, 각 열의 맨 위 카드만 앞면입니다. 나머지 24장이 더미를 형성합니다.',
    '<strong>테이블로는 교차 색상으로 내림차순 쌓기</strong> — 앞면 카드는 정확히 한 단계 높은 숫자이면서 반대 색상(빨강 위 검정, 검정 위 빨강)인 테이블로 카드 위에 놓을 수 있습니다.',
    '<strong>빈 열에는 킹만 채울 수 있음</strong> — 테이블로 열이 비워지면, 그곳으로 이동할 수 있는 것은 킹(또는 킹이 맨 앞인 더미)뿐입니다.',
    '<strong>더미를 하나의 단위로 이동</strong> — 올바른 교차 색상 순서로 된 앞면 카드의 연속된 더미는 유효한 테이블로 카드 위에 함께 드래그 앤 드롭할 수 있습니다.',
    '<strong>맨 위 뒷면 카드 자동으로 앞면으로</strong> — 이동으로 테이블로 열의 맨 위 뒷면 카드가 드러나면 즉시 앞면으로 뒤집힙니다.',
    '<strong>더미에서 한 번에 한 장씩 뽑기</strong> — 더미를 클릭할 때마다 맨 위 카드가 앞면으로 버린 더미로 이동합니다. 버린 더미의 맨 위 카드만 사용할 수 있습니다.',
    '<strong>버린 더미 재활용</strong> — 더미가 비었을 때 더미를 클릭하면 버린 더미 전체를 뒷면으로 되돌려 더미로 만듭니다. 매번 100점의 패널티가 적용됩니다(최소 점수는 0). 패스 제한이 설정된 경우, 제한에 도달하면 재활용이 비활성화됩니다.',
    '<strong>재단은 에이스에서 킹까지 오름차순으로 쌓기</strong> — 각 재단 더미는 한 무늬의 카드를 오름차순(먼저 에이스, 그다음 2부터 킹까지)으로 받습니다. 무늬는 처음 놓인 에이스에 의해 고정됩니다.',
    '<strong>재단에서 카드 되돌리기</strong> — 재단 더미 위의 카드는 유효한 배치일 경우 테이블로로 되돌려 드래그할 수 있지만, 점수 패널티가 적용됩니다.',
    '<strong>네 개의 재단을 모두 완성하면 승리</strong> — 52장의 카드 모두를 네 개의 재단 더미(무늬당 13장, 에이스부터 킹까지)에 놓으면 게임에서 승리합니다.',
  ],

  shortcutsHeading: '키보드 단축키',
  shortcutsKeyCol: '키',
  shortcutsActionCol: '동작',
  shortcuts: [
    { key: '← → ↑ ↓ 화살표 키', action: '키보드 커서를 더미 사이로 이동' },
    { key: '스페이스바', action: '커서 아래의 카드(들) 선택 또는 강조 표시된 대상으로 이동 확인' },
    { key: 'Esc', action: '현재 선택 취소' },
    { key: 'F2', action: '새 게임 시작' },
    { key: 'Ctrl+Z / Cmd+Z', action: '마지막 동작 실행 취소' },
    { key: 'A', action: '조건에 맞는 모든 카드를 자동으로 재단으로 이동' },
  ],

  // ── Privacy Policy page ────────────────────────────────────────────────────
  privacyPageTitle: '개인정보처리방침 — 클론다이크 솔리테어',
  privacyPageDescription: '클론다이크 솔리테어의 개인정보처리방침입니다. 데이터 처리 방법을 알아보세요.',
  privacyBackToGame: '게임으로 돌아가기',
  privacyHeading: '개인정보처리방침',
  privacyLastUpdated: '최종 업데이트: 2026년 4월 7일',
  privacyIntro: '본 개인정보처리방침은 클론다이크 솔리테어("당사", "우리")가 <a href="/">이 사이트</a>에서 무료 온라인 카드 게임을 이용할 때 정보를 어떻게 처리하는지 설명합니다.',
  privacyCollectHeading: '수집하는 정보',
  privacyCollectP: '게임을 플레이하기 위해 계정을 만들거나 개인 정보를 제공할 필요는 없습니다. 당사는 다음과 같은 제한적이고 비개인적인 기술 데이터를 자동으로 수집할 수 있습니다:',
  privacyCollectItems: ['브라우저 유형 및 버전', '운영 체제', '리퍼러 URL 및 방문한 페이지', '방문 날짜 및 시간'],
  privacyCollectNote: '이 데이터는 집계 형태로 수집되며 개인을 식별하는 데 사용할 수 없습니다.',
  privacyStorageHeading: '로컬 저장소',
  privacyStorageP: '게임은 브라우저의 로컬 저장소를 사용하여 게임 환경 설정(예: 더미 회전 수 설정)을 기기에 로컬로 저장할 수 있습니다. 이 데이터는 브라우저를 떠나지 않으며 당사에 전송되지 않습니다.',
  privacyCookiesHeading: '쿠키',
  privacyCookiesP: '당사는 추적 쿠키나 광고 쿠키를 사용하지 않습니다. 설정되는 모든 쿠키는 게임 작동에 엄격히 필요하며 개인 데이터를 수집하지 않습니다.',
  privacyThirdPartyHeading: '제3자 서비스',
  privacyThirdPartyP: '당사는 게임 자산을 제공하기 위해 CDN과 같은 제3자 서비스를 사용할 수 있습니다. 이러한 서비스는 정상적인 인터넷 운영의 일부로 표준 서버 로그 데이터(예: IP 주소)를 수집할 수 있습니다. 당사는 귀하의 데이터를 광고주에게 판매하거나 공유하지 않습니다.',
  privacyChildrenHeading: '아동의 개인정보',
  privacyChildrenP: '당사 게임은 모든 연령대에 적합합니다. 당사는 13세 미만 아동으로부터 고의로 개인 정보를 수집하지 않습니다. 아동이 당사에 개인 정보를 제공했다고 생각되면 연락해 주시기 바랍니다.',
  privacyChangesHeading: '본 방침의 변경',
  privacyChangesP: '당사는 수시로 본 개인정보처리방침을 업데이트할 수 있습니다. 변경 사항은 이 페이지에 업데이트 날짜와 함께 게시됩니다. 변경 후 게임을 계속 사용하면 업데이트된 방침에 동의하는 것으로 간주됩니다.',
  privacyContactHeading: '연락처',
  privacyContactP: '본 개인정보처리방침에 대해 질문이 있으시면 당사 사이트의 연락처 정보를 통해 연락하실 수 있습니다.',

  // ── Terms of Service page ──────────────────────────────────────────────────
  tosPageTitle: '이용약관 — 클론다이크 솔리테어',
  tosPageDescription: '클론다이크 솔리테어의 이용약관입니다.',
  tosBackToGame: '게임으로 돌아가기',
  tosHeading: '이용약관',
  tosLastUpdated: '최종 업데이트: 2026년 4월 7일',
  tosIntro: '클론다이크 솔리테어("게임", "사이트")에 접속하거나 사용함으로써 귀하는 본 이용약관에 구속되는 데 동의합니다. 동의하지 않으면 사이트를 사용하지 마십시오.',
  tosUseHeading: '게임 사용',
  tosUseP: '클론다이크 솔리테어는 개인적이고 비상업적인 오락을 위해 무료로 제공됩니다. 귀하는 다음을 할 수 있습니다:',
  tosUseMayItems: ['개인적 즐거움을 위해 게임을 플레이', '사이트 URL을 다른 사람과 공유'],
  tosUseMayNotP: '귀하는 다음을 할 수 없습니다:',
  tosUseMayNotItems: [
    '허가 없이 게임 또는 그 자산을 복사, 재배포 또는 재판매',
    '게임을 리버스 엔지니어링, 디컴파일 또는 변조하려 시도',
    '자동화 도구나 봇을 사용하여 게임과 상호작용',
    '불법 목적으로 사이트 사용',
  ],
  tosIPHeading: '지적 재산권',
  tosIPP: '이 사이트의 모든 콘텐츠(게임 코드, 그래픽, 카드 아트, 오디오 포함)는 당사 소유이거나 라이선스를 받은 것입니다. 본 약관 중 어느 것도 게임을 플레이하는 데 필요한 범위를 넘어 당사의 지적 재산권에 대한 귀하의 권리를 부여하지 않습니다.',
  tosWarrantyHeading: '보증 부인',
  tosWarrantyP: '게임은 "있는 그대로" 제공되며 명시적이든 묵시적이든 어떠한 종류의 보증도 없습니다. 당사는 사이트가 항상 이용 가능하거나, 오류가 없거나, 바이러스 또는 기타 유해 구성 요소가 없음을 보장하지 않습니다.',
  tosLiabilityHeading: '책임의 제한',
  tosLiabilityP: '법이 허용하는 최대 범위 내에서 당사는 게임 사용 또는 사용 불능으로 인해 발생하는 간접적, 부수적, 특별적 또는 결과적 손해에 대해 책임을 지지 않습니다.',
  tosChangesHeading: '본 약관의 변경',
  tosChangesP: '당사는 언제든지 본 약관을 업데이트할 권리를 보유합니다. 변경 사항은 이 페이지에 업데이트 날짜와 함께 게시됩니다. 변경 후 게임을 계속 사용하면 개정된 약관에 동의하는 것으로 간주됩니다.',
  tosLawHeading: '준거법',
  tosLawP: '본 약관은 적용되는 법률의 지배를 받습니다. 모든 분쟁은 해당 관할권의 적절한 법원에서 해결됩니다.',
  tosContactHeading: '연락처',
  tosContactP: '본 약관에 대해 질문이 있으시면 당사 사이트에서 확인할 수 있는 정보를 통해 연락해 주십시오.',
};

export type Locale = typeof ko;