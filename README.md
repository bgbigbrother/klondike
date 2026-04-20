# @cardgames/klondike

A browser-based Klondike Solitaire game built with TypeScript, Vite, and vanilla DOM — no framework required. Features drag-and-drop, keyboard navigation, card animations, synthesised sound effects, a built-in music player, and full i18n support for 16 languages.

## Features

- Classic Klondike (Patience) rules with configurable stock-pass limits (∞ / 1 / 3) and a face-up mode
- Drag-and-drop card movement with visual drop-target highlighting and stack ghost images
- Full keyboard navigation — arrow keys to move between piles, Space to select/place, Escape to cancel
- Animated card dealing, stock flips (3D Y-axis rotation), and foundation fly-to transitions
- Synthesised Web Audio API sound effects (card click, card drop, foundation chime) — no audio files needed
- Built-in music player powered by `@rse/soundlp` with 27 ambient tracks, play/pause, volume slider, and mute toggle
- Undo support — every action is reversible all the way back to the opening deal
- Auto-move (sends all eligible cards to foundations) and auto-complete (finishes the game when all cards are visible)
- Pause mode that hides all card faces and freezes the timer
- Fullscreen support
- Responsive layout that adapts to any viewport size, including mobile and orientation changes
- Internationalisation (i18n) with 16 locales: English, Bulgarian, Spanish, French, German, Italian, Portuguese, Russian, Chinese, Japanese, Korean, Arabic (RTL), Hindi, Vietnamese, Polish, and Turkish
- Language selector in the header and hamburger menu, with cross-tab sync via `localStorage`
- Score tracking with point values for waste-to-tableau (+5), to-foundation (+10), card flip (+5), foundation-to-tableau (−15), and stock recycle (−100)
- Win detection with a celebratory overlay showing final score, time, and move count
- SVG card images via `cardsJS` with automatic CSS/Unicode fallback
- Published as an ES module with typed exports for game engine, UI, and i18n

## Project Structure

```
├── src/
│   ├── index.ts              # App bootstrap — wires engine, renderer, drag-drop, keyboard, timer, UI
│   ├── game/
│   │   ├── types.ts           # Card, GameState, GameOptions, Move, scoring constants
│   │   ├── deck.ts            # createDeck() and Fisher-Yates shuffle
│   │   ├── gameEngine.ts      # Core game logic — draw, recycle, move, auto-move, undo
│   │   ├── scoring.ts         # Score delta helpers
│   │   ├── winCondition.ts    # checkWin(), canAutoComplete(), autoComplete()
│   │   ├── undoManager.ts     # Command-pattern undo stack
│   │   ├── deck.test.ts       # Unit + property-based tests for deck
│   │   └── gameEngine.test.ts # Unit + property-based tests for engine
│   ├── ui/
│   │   ├── renderer.ts        # DOM rendering — stock, waste, foundations, tableau, keyboard highlights
│   │   ├── layout.ts          # Responsive layout calculator (card sizing, pile positions)
│   │   ├── dragDrop.ts        # HTML5 drag-and-drop with validity checking and stack ghosts
│   │   ├── keyboardController.ts # Full keyboard navigation and selection
│   │   ├── cardAnimator.ts    # Deal, stock-flip, and foundation-fly animations
│   │   ├── audio.ts           # Synthesised sound effects (Web Audio API)
│   │   ├── musicPlayer.ts     # Ambient music player with track selection and volume control
│   │   └── langSelector.ts    # Language dropdown component
│   └── i18n/
│       ├── index.ts           # Locale registry, setLocale, applyLocale, cross-tab sync
│       ├── init.ts            # Minimal bootstrap for static pages
│       ├── en.ts              # English (canonical locale type)
│       └── {bg,es,fr,de,it,pt,ru,zh,ja,ko,ar,hi,vi,pl,tr}.ts
├── index.html                 # Standalone dev shell
├── dev-entry.ts               # Dev entry point (imports shared styles + game)
├── dev.css                    # Dev-mode style overrides
├── package.json
├── vite.config.ts             # Vite config (library build + dev server)
├── vitest.config.ts           # Vitest config (happy-dom environment)
├── tsconfig.json              # Dev/IDE TypeScript config
└── tsconfig.build.json        # Build TypeScript config (emits declarations)
```

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm (or your preferred package manager)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens a local Vite dev server with hot module replacement. The standalone dev shell at `index.html` includes a site header, language selector, and dev banner.

### Build

```bash
npm run build
```

Compiles TypeScript declarations via `tsc` and bundles the library as an ES module into `dist/`.

### Test

```bash
npm test
```

Runs all tests with Vitest in a `happy-dom` environment. The test suite includes:

- Unit tests for deck creation, shuffle, game engine moves, scoring, foundations, and undo
- Property-based tests (via `fast-check`) covering shuffle permutation validity, draw/recycle invariants, tableau/foundation placement rules, card count preservation, and i18n persistence round-trips

## Keyboard Shortcuts

| Key | Action |
|---|---|
| ← → ↑ ↓ | Move cursor between piles |
| Space | Select card(s) or confirm a move |
| Escape | Cancel current selection |
| F2 | New game |
| Ctrl+Z / Cmd+Z | Undo |
| A | Auto-move all eligible cards to foundations |

## Game Rules

1. A standard 52-card deck is shuffled and dealt into 7 tableau columns (column N gets N cards; only the top card is face-up). The remaining 24 cards form the stock.
2. Tableau builds go down in rank with alternating colours (red on black, black on red).
3. Only Kings may fill empty tableau columns.
4. Contiguous face-up sequences can be moved as a unit.
5. Removing a card from a tableau column automatically flips the newly exposed face-down card.
6. Click the stock to draw one card face-up to the waste pile.
7. When the stock is empty, click to recycle the waste (−100 points; disabled if the pass limit is reached).
8. Foundations build up by suit from Ace to King.
9. Cards can be moved back from foundations to the tableau (−15 points).
10. Complete all four foundations (Ace through King) to win.

## Scoring

| Action | Points |
|---|---|
| Waste → Tableau | +5 |
| Any → Foundation | +10 |
| Flip face-down card | +5 |
| Foundation → Tableau | −15 |
| Recycle waste to stock | −100 |

Score floor is 0 (never goes negative).

## Internationalisation

All UI strings are driven by locale objects in `src/i18n/`. The `applyLocale()` function walks the DOM and updates elements tagged with `data-i18n`, `data-i18n-title`, `data-i18n-aria-label`, and other data attributes. Arabic is supported with automatic RTL layout.

To add a new language, duplicate `src/i18n/en.ts`, translate the values, and register the new locale in `src/i18n/index.ts`.

## Tech Stack

- TypeScript (strict mode, ES2020 target)
- Vite (dev server + library build)
- Vitest + happy-dom (testing)
- fast-check (property-based testing)
- `@rse/soundlp` (ambient music sprite)
- `cardsJS` (SVG card images)
- Web Audio API (synthesised sound effects)
- Vanilla DOM (no UI framework)

## License

This project is licensed under the [MIT License](./LICENSE.md).
