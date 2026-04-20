import { GameEngine } from './game/gameEngine';
import { Renderer } from './ui/renderer';
import { DragDropHandler } from './ui/dragDrop';
import { KeyboardController } from './ui/keyboardController';
import { checkWin, canAutoComplete, autoComplete } from './game/winCondition';
import { playCardClick, playCardDrop, playFoundationDrop } from './ui/audio';
import { t, setLocale, applyLocale, loadSavedLocale, LOCALES, listenForLangSync } from './i18n';
import type { PileRef } from './game/types';
import { animateDeal, animateStockFlip, animateToFoundation } from './ui/cardAnimator';
import { LANGUAGES, LangSelector } from './ui/langSelector';
import { MusicPlayer } from './ui/musicPlayer';

// ─── Bootstrap ────────────────────────────────────────────────────────────────

const engine = new GameEngine();
const container = document.getElementById('app')!;
const renderer = new Renderer(container);
const dragDrop = new DragDropHandler(engine, renderer);
const keyboard = new KeyboardController(engine, renderer, afterAction);

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const btnNewGame = document.getElementById('btn-new-game') as HTMLButtonElement;
const btnUndo = document.getElementById('btn-undo') as HTMLButtonElement;
const btnAutoMove = document.getElementById('btn-auto-move') as HTMLButtonElement;
const scoreEl = document.getElementById('score')!;
const movesEl = document.getElementById('moves')!;
const timeEl = document.getElementById('time')!;
const stockpileEl = document.getElementById('stockpile')!;
const passEl = document.getElementById('pass')!;
const stockPassControl = document.getElementById('stock-pass-control')!;
const faceUpToggle = document.getElementById('face-up-toggle') as HTMLInputElement;
const stockPileEl = document.getElementById('stock')!;

const winOverlay = document.getElementById('win-overlay')!;
const winScoreEl = document.getElementById('win-score')!;
const winTimeEl = document.getElementById('win-time')!;
const winMovesEl = document.getElementById('win-moves')!;
const btnWinNewGame = document.getElementById('btn-win-new-game') as HTMLButtonElement;

const autocompletePrompt = document.getElementById('autocomplete-prompt')!;
const btnAutocomplete = document.getElementById('btn-autocomplete') as HTMLButtonElement;

const btnPause = document.getElementById('btn-pause') as HTMLButtonElement;
const btnContinue = document.getElementById('btn-continue') as HTMLButtonElement;
const btnFullscreen = document.getElementById('btn-fullscreen') as HTMLButtonElement;
const pauseModal = document.getElementById('pause-modal')!;

// ─── Pause state ──────────────────────────────────────────────────────────────

let paused = false;
let pausedCardStates: Array<{ pile: 'tableau' | 'waste'; colIndex: number; cardIndex: number; faceUp: boolean }> = [];
let timerElapsedAtPause = 0;

// ─── Auto-complete cancellation flag ─────────────────────────────────────────

let autoCompleteRunning = false;
let autoCompleteCancelled = false;

// ─── Current game options ─────────────────────────────────────────────────────

let currentOptions = { stockPassLimit: 0, faceUpMode: false };

function passLabel(limit: number): string {
  return limit === 0 ? '∞' : String(limit);
}

function syncStockElement(): void {
  const limit = currentOptions.stockPassLimit;
  stockPileEl.dataset.passLabel = passLabel(limit);
  stockPileEl.dataset.stockLocked = engine.isStockLocked() ? 'true' : 'false';
}

// ─── Timer ────────────────────────────────────────────────────────────────────

let timerStart = Date.now();
let timerInterval: ReturnType<typeof setInterval> | null = null;

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function startTimer(): void {
  if (timerInterval) clearInterval(timerInterval);
  timerStart = Date.now();
  timeEl.textContent = '0:00';
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - timerStart) / 1000);
    timeEl.textContent = formatTime(elapsed);
  }, 1000);
}

// ─── Pause / Continue ─────────────────────────────────────────────────────────

function pauseGame(): void {
  if (paused) return;
  paused = true;

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerElapsedAtPause = Math.floor((Date.now() - timerStart) / 1000);

  const state = engine.getState();
  pausedCardStates = [];

  state.tableau.forEach((col, colIndex) => {
    col.forEach((card, cardIndex) => {
      pausedCardStates.push({ pile: 'tableau', colIndex, cardIndex, faceUp: card.faceUp });
      card.faceUp = false;
    });
  });
  state.waste.forEach((card, cardIndex) => {
    pausedCardStates.push({ pile: 'waste', colIndex: 0, cardIndex, faceUp: card.faceUp });
    card.faceUp = false;
  });

  renderer.render(state);
  pauseModal.classList.remove('overlay--hidden');

  btnUndo.disabled = true;
  btnAutoMove.disabled = true;
  btnPause.disabled = true;
}

function continueGame(): void {
  if (!paused) return;
  paused = false;

  const state = engine.getState();
  for (const snap of pausedCardStates) {
    if (snap.pile === 'tableau') {
      const card = state.tableau[snap.colIndex]?.[snap.cardIndex];
      if (card) card.faceUp = snap.faceUp;
    } else {
      const card = state.waste[snap.cardIndex];
      if (card) card.faceUp = snap.faceUp;
    }
  }
  pausedCardStates = [];

  pauseModal.classList.add('overlay--hidden');
  renderer.render(state);

  timerStart = Date.now() - timerElapsedAtPause * 1000;
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - timerStart) / 1000);
    timeEl.textContent = formatTime(elapsed);
  }, 1000);

  btnUndo.disabled = !engine.canUndo();
  btnAutoMove.disabled = false;
  btnPause.disabled = false;
}

// ─── Fullscreen ───────────────────────────────────────────────────────────────

async function toggleFullscreen(): Promise<void> {
  if (!document.fullscreenElement) {
    await document.getElementById('app')!.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
}

document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    btnFullscreen.title = t().toolbarExitFullscreen;
    btnFullscreen.innerHTML = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>`;
  } else {
    btnFullscreen.title = t().toolbarFullscreen;
    btnFullscreen.innerHTML = `<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`;
  }
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function updateStats(): void {
  const state = engine.getState();
  scoreEl.textContent = String(state.score);
  movesEl.textContent = String(state.moves);
  stockpileEl.textContent = String(state.stock.length);
  const limit = currentOptions.stockPassLimit;
  if (limit === 0) {
    passEl.textContent = '∞';
  } else {
    const remaining = Math.max(0, limit - state.stockPasses);
    passEl.textContent = String(remaining);
  }
  btnUndo.disabled = !engine.canUndo();
  syncStockElement();
}

function showWinOverlay(): void {
  const state = engine.getState();
  winScoreEl.textContent = String(state.score);
  const elapsed = paused ? timerElapsedAtPause : Math.floor((Date.now() - timerStart) / 1000);
  winTimeEl.textContent = formatTime(elapsed);
  winMovesEl.textContent = String(state.moves);
  winOverlay.classList.remove('overlay--hidden');
}

function hideWinOverlay(): void {
  winOverlay.classList.add('overlay--hidden');
}

function showAutocompletePrompt(): void {
  autocompletePrompt.classList.remove('autocomplete-prompt--hidden');
}

function hideAutocompletePrompt(): void {
  autocompletePrompt.classList.add('autocomplete-prompt--hidden');
}

function afterAction(): void {
  renderer.render(engine.getState(), keyboard.getState());
  updateStats();

  const state = engine.getState();

  if (checkWin(state)) {
    hideAutocompletePrompt();
    showWinOverlay();
    return;
  }

  if (canAutoComplete(state)) {
    showAutocompletePrompt();
  } else {
    hideAutocompletePrompt();
  }
}

// ─── Animated auto-complete ───────────────────────────────────────────────────

async function runAutoCompleteAnimated(): Promise<void> {
  if (autoCompleteRunning) return;
  autoCompleteRunning = true;
  autoCompleteCancelled = false;
  hideAutocompletePrompt();

  const state = engine.getState();
  const moves: Array<{ from: PileRef; to: PileRef }> = [];

  const snapshot = JSON.parse(JSON.stringify(state)) as typeof state;
  autoComplete(snapshot, (move) => {
    moves.push({ from: move.from, to: move.to });
  });

  for (const move of moves) {
    if (autoCompleteCancelled) break;

    if (move.from.type === 'waste' || move.from.type === 'tableau') {
      engine.autoMoveToFoundation(move.from);
    }

    renderer.render(engine.getState());
    updateStats();

    await delay(120);
  }

  if (!autoCompleteCancelled) {
    renderer.render(engine.getState());
    updateStats();
    if (checkWin(engine.getState())) {
      showWinOverlay();
    }
  }

  autoCompleteRunning = false;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ─── Animated auto-move ───────────────────────────────────────────────────────

async function runAutoMoveAnimated(): Promise<void> {
  const state = engine.getState();
  const layout = renderer.getLayout();

  const moves: Array<{ from: PileRef; card: typeof state.tableau[0][0]; foundationIdx: number }> = [];

  if (state.waste.length > 0) {
    const card = state.waste[state.waste.length - 1];
    const fi = _findFoundationTarget(state, card);
    if (fi !== -1) moves.push({ from: { type: 'waste', index: 0 }, card, foundationIdx: fi });
  }

  for (let col = 0; col < 7; col++) {
    const column = state.tableau[col];
    if (column.length === 0) continue;
    const card = column[column.length - 1];
    if (!card.faceUp) continue;
    const fi = _findFoundationTarget(state, card);
    if (fi !== -1) moves.push({ from: { type: 'tableau', index: col }, card, foundationIdx: fi });
  }

  if (moves.length === 0) {
    engine.autoMoveAllToFoundation();
    afterAction();
    return;
  }

  for (const move of moves) {
    const to: PileRef = { type: 'foundation', index: move.foundationIdx };
    engine.autoMoveToFoundation(move.from);
    await new Promise<void>(resolve => {
      animateToFoundation(container, move.card, move.from, to, layout, resolve);
    });
    renderer.render(engine.getState(), keyboard.getState());
    updateStats();
    await delay(40);
  }

  afterAction();
}

function _findFoundationTarget(state: ReturnType<typeof engine.getState>, card: { suit: string; rank: number }): number {
  for (let fi = 0; fi < 4; fi++) {
    const fp = state.foundations[fi];
    if (fp.length === 0 && card.rank === 1) return fi;
    if (fp.length > 0) {
      const top = fp[fp.length - 1];
      if (top.suit === card.suit && card.rank === top.rank + 1) return fi;
    }
  }
  return -1;
}

// ─── Settings wiring ──────────────────────────────────────────────────────────

stockPassControl.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.seg-btn');
  if (!btn) return;
  stockPassControl.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('seg-btn--active'));
  btn.classList.add('seg-btn--active');
  currentOptions = { ...currentOptions, stockPassLimit: Number(btn.dataset.value) };
  startNewGame();
});

faceUpToggle.addEventListener('change', () => {
  currentOptions = { ...currentOptions, faceUpMode: faceUpToggle.checked };
  startNewGame();
});

// ─── New Game ─────────────────────────────────────────────────────────────────

function startNewGame(): void {
  autoCompleteCancelled = true;
  hideWinOverlay();
  hideAutocompletePrompt();
  engine.newGame(currentOptions);
  keyboard.onNewGame();
  updateStats();
  startTimer();

  renderer.render(engine.getState(), keyboard.getState());
  animateDeal(container, renderer.getLayout(), engine.getState().tableau, () => {
    renderer.render(engine.getState(), keyboard.getState());
  }, playCardClick);
}

// ─── Button wiring ────────────────────────────────────────────────────────────

btnNewGame.addEventListener('click', startNewGame);
btnWinNewGame.addEventListener('click', startNewGame);

btnUndo.addEventListener('click', () => {
  if (paused) return;
  engine.undo();
  afterAction();
});

btnAutoMove.addEventListener('click', () => {
  if (paused) return;
  runAutoMoveAnimated();
});

btnAutocomplete.addEventListener('click', () => {
  if (paused) return;
  runAutoCompleteAnimated();
});

btnPause.addEventListener('click', pauseGame);
btnContinue.addEventListener('click', continueGame);
btnFullscreen.addEventListener('click', toggleFullscreen);

// ─── Stock click ──────────────────────────────────────────────────────────────

const stockEl = document.getElementById('stock')!;
stockEl.addEventListener('click', () => {
  if (paused) return;
  playCardClick();

  const stateBefore = engine.getState();
  const wasteLenBefore = stateBefore.waste.length;

  engine.drawFromStock();

  const stateAfter = engine.getState();
  const drawnCard = stateAfter.waste[stateAfter.waste.length - 1];

  if (drawnCard && stateAfter.waste.length > wasteLenBefore) {
    animateStockFlip(container, drawnCard, renderer.getLayout(), () => {
      afterAction();
    });
  } else {
    afterAction();
  }
});

// ─── Card click sound ─────────────────────────────────────────────────────────

container.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('card') || target.closest('.card')) {
    playCardClick();
  }
});

// ─── Double-click to auto-move to foundation ──────────────────────────────────

container.addEventListener('dblclick', (e: MouseEvent) => {
  if (paused) return;
  const target = e.target as HTMLElement;

  let el: HTMLElement | null = target;
  while (el && el !== container) {
    const id = el.id;
    if (id) {
      const pileRef = parsePileId(id);
      if (pileRef) {
        let fromRef: PileRef | null = null;

        if (pileRef.type === 'tableau') {
          const cardEl = target.closest<HTMLElement>('[data-card-index]') ??
                         target.closest<HTMLElement>('[data-col]');
          if (cardEl && cardEl.dataset.col !== undefined) {
            fromRef = { type: 'tableau', index: parseInt(cardEl.dataset.col, 10) };
          } else {
            fromRef = pileRef;
          }
        } else if (pileRef.type === 'waste') {
          fromRef = pileRef;
        }

        if (fromRef) {
          const stateBefore = engine.getState();
          let cardToAnimate = null;
          let foundationTarget: PileRef | null = null;

          if (fromRef.type === 'tableau') {
            const col = stateBefore.tableau[fromRef.index];
            cardToAnimate = col.length > 0 ? col[col.length - 1] : null;
          } else if (fromRef.type === 'waste') {
            cardToAnimate = stateBefore.waste.length > 0
              ? stateBefore.waste[stateBefore.waste.length - 1]
              : null;
          }

          if (cardToAnimate) {
            for (let fi = 0; fi < 4; fi++) {
              const fp = stateBefore.foundations[fi];
              if (fp.length === 0 && cardToAnimate.rank === 1) {
                foundationTarget = { type: 'foundation', index: fi };
                break;
              } else if (fp.length > 0) {
                const top = fp[fp.length - 1];
                if (top.suit === cardToAnimate.suit && cardToAnimate.rank === top.rank + 1) {
                  foundationTarget = { type: 'foundation', index: fi };
                  break;
                }
              }
            }
          }

          const moved = engine.autoMoveToFoundation(fromRef);

          if (moved && cardToAnimate && foundationTarget) {
            animateToFoundation(container, cardToAnimate, fromRef, foundationTarget, renderer.getLayout(), () => {
              afterAction();
            });
          } else {
            afterAction();
          }
        } else {
          afterAction();
        }
        break;
      }
    }
    el = el.parentElement;
  }
});

// ─── Drag-drop wiring ─────────────────────────────────────────────────────────

dragDrop.attach(container);

dragDrop.onDrop((_source: PileRef, target: PileRef) => {
  if (paused) return;
  if (target.type === 'foundation') {
    playFoundationDrop();
  } else {
    playCardDrop();
  }
  setTimeout(() => {
    updateStats();
    const state = engine.getState();
    if (checkWin(state)) {
      hideAutocompletePrompt();
      showWinOverlay();
    } else if (canAutoComplete(state)) {
      showAutocompletePrompt();
    } else {
      hideAutocompletePrompt();
    }
  }, 0);
});

// ─── Helper: parse pile ID ────────────────────────────────────────────────────

function parsePileId(id: string): PileRef | null {
  if (id === 'stock') return { type: 'stock', index: 0 };
  if (id === 'waste') return { type: 'waste', index: 0 };
  const foundationMatch = id.match(/^foundation-(\d)$/);
  if (foundationMatch) return { type: 'foundation', index: parseInt(foundationMatch[1], 10) };
  const tableauMatch = id.match(/^tableau-(\d)$/);
  if (tableauMatch) return { type: 'tableau', index: parseInt(tableauMatch[1], 10) };
  return null;
}

// ─── Initial render ───────────────────────────────────────────────────────────

renderer.render(engine.getState());
updateStats();
startTimer();
keyboard.attach();

requestAnimationFrame(() => {
  animateDeal(container, renderer.getLayout(), engine.getState().tableau, () => {
    renderer.render(engine.getState(), keyboard.getState());
  }, playCardClick);
});

// ─── Hamburger Menu ───────────────────────────────────────────────────────────

const btnHamburger = document.getElementById('btn-hamburger') as HTMLButtonElement;
const hamburgerMenu = document.getElementById('hamburger-menu') as HTMLDivElement;
const hmNewGame = document.getElementById('hm-new-game') as HTMLButtonElement;
const hmUndo = document.getElementById('hm-undo') as HTMLButtonElement;
const hmAutoMove = document.getElementById('hm-auto-move') as HTMLButtonElement;
const hmLangList = document.getElementById('hm-lang-list') as HTMLDivElement;

function buildHamburgerLangs(activeLang: string): void {
  hmLangList.innerHTML = '';
  for (const lang of LANGUAGES) {
    const btn = document.createElement('button');
    btn.className = 'hamburger-menu__lang-item' + (lang.lang === activeLang ? ' hamburger-menu__lang-item--active' : '');
    btn.innerHTML = `<span>${lang.flag}</span><span>${lang.name}</span>`;
    btn.addEventListener('click', () => {
      const locale = LOCALES[lang.lang];
      if (!locale) return;
      setLocale(locale, lang.lang);
      applyLocale();
      buildHamburgerLangs(lang.lang);
      closeHamburger();
    });
    hmLangList.appendChild(btn);
  }
}

function openHamburger(): void {
  hamburgerMenu.classList.remove('hamburger-menu--hidden');
  btnHamburger.setAttribute('aria-expanded', 'true');
  hmUndo.disabled = !engine.canUndo();
}

function closeHamburger(): void {
  hamburgerMenu.classList.add('hamburger-menu--hidden');
  btnHamburger.setAttribute('aria-expanded', 'false');
}

btnHamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  hamburgerMenu.classList.contains('hamburger-menu--hidden') ? openHamburger() : closeHamburger();
});

document.addEventListener('click', () => closeHamburger());
hamburgerMenu.addEventListener('click', (e) => e.stopPropagation());

hmNewGame.addEventListener('click', () => { closeHamburger(); startNewGame(); });
hmUndo.addEventListener('click', () => {
  if (paused) return;
  closeHamburger();
  engine.undo();
  afterAction();
});
hmAutoMove.addEventListener('click', () => {
  if (paused) return;
  closeHamburger();
  runAutoMoveAnimated();
});

const klondikeSavedLang = loadSavedLocale();
applyLocale();
buildHamburgerLangs(klondikeSavedLang);

// Sync language changes from other tabs
listenForLangSync((langCode) => {
  buildHamburgerLangs(langCode);
});

// Sync language changes from the site-header selector on the same page
window.addEventListener('locale-changed', ((e: CustomEvent<{ langCode: string }>) => {
  const langCode = e.detail.langCode;
  const locale = LOCALES[langCode];
  if (!locale) return;
  setLocale(locale, langCode);
  applyLocale();
  buildHamburgerLangs(langCode);
}) as EventListener);

// ─── Site-header language selector ────────────────────────────────────────────

const headerLangSelector = new LangSelector((lang) => {
  const locale = LOCALES[lang.lang];
  if (!locale) return;
  setLocale(locale, lang.lang);
  applyLocale();
  buildHamburgerLangs(lang.lang);
});
headerLangSelector.attach();
headerLangSelector.setActiveLang(klondikeSavedLang);

// ─── Music player ─────────────────────────────────────────────────────────────

const musicPlayer = new MusicPlayer(document.getElementById('game-toolbar') ?? document.body);
musicPlayer.attach();
