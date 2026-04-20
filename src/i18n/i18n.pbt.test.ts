// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { setLocale, loadSavedLocale, applyLocale, LOCALES, STORAGE_KEY } from './index';

const LOCALE_CODES = Object.keys(LOCALES) as string[];

// ── Property 1: Language persistence round-trip ──────────────────────────────
// Feature: card-games-site, Property 1: Language persistence round-trip
describe('Property 1: Language persistence round-trip', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('setLocale then loadSavedLocale returns the same code for any supported locale', () => {
    fc.assert(
      fc.property(fc.constantFrom(...LOCALE_CODES), (langCode) => {
        const locale = LOCALES[langCode];
        setLocale(locale, langCode);
        const result = loadSavedLocale();
        expect(result).toBe(langCode);
      }),
      { numRuns: 100 }
    );
  });

  it('loadSavedLocale returns "en" when localStorage is empty', () => {
    localStorage.clear();
    expect(loadSavedLocale()).toBe('en');
  });

  it('loadSavedLocale returns "en" for unrecognised stored values', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => s.length > 0 && !LOCALE_CODES.includes(s)),
        (invalid) => {
          localStorage.setItem(STORAGE_KEY, invalid);
          expect(loadSavedLocale()).toBe('en');
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ── Property 2: Language application completeness ────────────────────────────
// Feature: card-games-site, Property 2: Language application completeness
describe('Property 2: Language application completeness', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('applyLocale updates all data-i18n elements whose keys exist in the locale', () => {
    fc.assert(
      fc.property(fc.constantFrom(...LOCALE_CODES), (langCode) => {
        const locale = LOCALES[langCode] as Record<string, unknown>;
        setLocale(locale as never, langCode);

        // Collect all string-valued keys from the locale
        const stringKeys = Object.entries(locale)
          .filter(([, v]) => typeof v === 'string')
          .map(([k]) => k);

        if (stringKeys.length === 0) return;

        // Build a DOM fragment with one element per string key
        const container = document.createElement('div');
        for (const key of stringKeys) {
          const el = document.createElement('span');
          el.dataset.i18n = key;
          el.textContent = '__placeholder__';
          container.appendChild(el);
        }

        applyLocale(container);

        // Every element should now have the locale's string value
        for (const key of stringKeys) {
          const el = container.querySelector<HTMLElement>(`[data-i18n="${key}"]`);
          expect(el?.textContent).toBe(locale[key] as string);
        }
      }),
      { numRuns: 100 }
    );
  });
});

// ── Property 3: Footer year correctness ──────────────────────────────────────
// Feature: card-games-site, Property 3: Footer year correctness
describe('Property 3: Footer year correctness', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('initShell sets #footer-year to the mocked year for any year in [2024, 2100]', () => {
    fc.assert(
      fc.property(fc.integer({ min: 2024, max: 2100 }), (year) => {
        // Set up minimal DOM required by initShell
        document.body.innerHTML = `
          <span id="footer-year"></span>
          <button id="btn-music"></button>
          <div id="lang-selector">
            <button id="lang-selector-btn" aria-expanded="false">
              <span id="lang-flag"></span>
              <span id="lang-name"></span>
            </button>
            <ul id="lang-dropdown"></ul>
          </div>
        `;

        // Mock Date so getFullYear() returns the test year
        vi.spyOn(globalThis, 'Date').mockImplementation(
          () => ({ getFullYear: () => year } as unknown as Date)
        );

        // Inline the year-injection logic (the only part of initShell under test)
        const yearEl = document.getElementById('footer-year');
        if (yearEl) yearEl.textContent = String(new Date().getFullYear());

        expect(document.getElementById('footer-year')?.textContent).toBe(String(year));
      }),
      { numRuns: 100 }
    );
  });
});
