import { en, type Locale } from './en';
import { bg } from './bg';
import { es } from './es';
import { fr } from './fr';
import { de } from './de';
import { it } from './it';
import { pt } from './pt';
import { ru } from './ru';
import { zh } from './zh';
import { ja } from './ja';
import { ko } from './ko';
import { ar } from './ar';
import { hi } from './hi';
import { vi } from './vi';
import { pl } from './pl';
import { tr } from './tr';

export const STORAGE_KEY = 'solitaire-lang';

/** All available locales keyed by lang code. Add new translations here. */
export const LOCALES: Record<string, Locale> = { en, bg, es, fr, de, it, pt, ru, zh, ja, ko, ar, hi, vi, pl, tr };

/** Languages that use right-to-left text direction. */
const RTL_LANGS = new Set(['ar', 'he', 'fa', 'ur']);

let current: Locale = en;
let currentLangCode = 'en';

/** Persist the chosen lang code and swap the active locale. */
export function setLocale(locale: Locale, langCode?: string): void {
  current = locale;
  if (langCode) {
    currentLangCode = langCode;
    try { localStorage.setItem(STORAGE_KEY, langCode); } catch { /* private browsing */ }
  }
}

/** Access the active locale strings. */
export function t(): Locale {
  return current;
}

/**
 * Read localStorage and activate the saved locale (if any).
 * Returns the lang code that was applied, or 'en' as fallback.
 */
export function loadSavedLocale(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && Object.prototype.hasOwnProperty.call(LOCALES, saved)) {
      current = LOCALES[saved];
      currentLangCode = saved;
      return saved;
    }
  } catch { /* private browsing */ }
  return 'en';
}

/**
 * Walk the DOM and replace text/attributes on every element that carries
 * a data-i18n* attribute, using the currently active locale.
 *
 * Supported attributes:
 *   data-i18n="key"            → element.textContent = locale[key]  (string)
 *   data-i18n-html="key"       → element.innerHTML   = locale[key]  (string, allows tags)
 *   data-i18n-title="key"      → element.title = locale[key]
 *   data-i18n-aria-label="key" → element.setAttribute('aria-label', val)
 *   data-i18n-rules            → rebuilds <ol> from locale.rules[]
 *   data-i18n-shortcuts        → rebuilds <tbody> from locale.shortcuts[]
 *   data-i18n-list="key"       → rebuilds <ul>/<ol> from locale[key] string[]
 */
export function applyLocale(root: Element | Document = document): void {
  const locale = current as Record<string, unknown>;

  // Apply text direction and language to <html> when called on the full document
  if (root === document) {
    const isRTL = RTL_LANGS.has(currentLangCode);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLangCode;
  }

  // Plain text
  root.querySelectorAll<HTMLElement>('[data-i18n]').forEach(el => {
    const val = locale[el.dataset.i18n!];
    if (typeof val === 'string') el.textContent = val;
  });

  // Inner HTML (allows <strong>, <a>, etc.)
  root.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach(el => {
    const val = locale[el.dataset.i18nHtml!];
    if (typeof val === 'string') el.innerHTML = val;
  });

  // title attribute
  root.querySelectorAll<HTMLElement>('[data-i18n-title]').forEach(el => {
    const val = locale[el.dataset.i18nTitle!];
    if (typeof val === 'string') el.title = val;
  });

  // aria-label attribute
  root.querySelectorAll<HTMLElement>('[data-i18n-aria-label]').forEach(el => {
    const val = locale[el.dataset.i18nAriaLabel!];
    if (typeof val === 'string') el.setAttribute('aria-label', val);
  });

  // Rules list — rebuilds <ol data-i18n-rules> from locale.rules[]
  root.querySelectorAll<HTMLOListElement>('[data-i18n-rules]').forEach(ol => {
    const rules = locale['rules'];
    if (!Array.isArray(rules)) return;
    ol.innerHTML = (rules as string[]).map(r => `<li>${r}</li>`).join('');
  });

  // Shortcuts table body — rebuilds <tbody data-i18n-shortcuts>
  root.querySelectorAll<HTMLElement>('[data-i18n-shortcuts]').forEach(tbody => {
    const shortcuts = locale['shortcuts'];
    if (!Array.isArray(shortcuts)) return;
    tbody.innerHTML = (shortcuts as Array<{ key: string; action: string }>)
      .map(s => `<tr><td><kbd>${s.key}</kbd></td><td>${s.action}</td></tr>`)
      .join('');
  });

  // Generic string-array list — rebuilds <ul>/<ol data-i18n-list="key">
  root.querySelectorAll<HTMLElement>('[data-i18n-list]').forEach(el => {
    const val = locale[el.dataset.i18nList!];
    if (!Array.isArray(val)) return;
    el.innerHTML = (val as string[]).map(item => `<li>${item}</li>`).join('');
  });

  // Music player popup — re-sync text nodes that were built dynamically in JS
  _syncMusicPopup(locale);
}

/**
 * Listen for language changes from other tabs/windows via the storage event.
 * When the language key changes, reload the locale and re-apply to the DOM.
 */
export function listenForLangSync(onSync?: (langCode: string) => void): void {
  window.addEventListener('storage', (e) => {
    if (e.key !== STORAGE_KEY || !e.newValue) return;
    const langCode = e.newValue;
    if (LOCALES[langCode]) {
      current = LOCALES[langCode];
      currentLangCode = langCode;
      applyLocale();
      onSync?.(langCode);
    }
  });
}

function _syncMusicPopup(locale: Record<string, unknown>): void {
  const popup = document.getElementById('music-popup');
  if (!popup) return;

  const str = (key: string) => (typeof locale[key] === 'string' ? locale[key] as string : null);

  const ariaLabel = str('musicPlayerAriaLabel');
  if (ariaLabel) popup.setAttribute('aria-label', ariaLabel);

  const sub = popup.querySelector<HTMLElement>('.music-popup__track-sub');
  if (sub) { const v = str('musicSolitaireRadio'); if (v) sub.textContent = v; }

  const tracksLabel = popup.querySelector<HTMLElement>('.music-popup__tracks-section .music-popup__section-label');
  if (tracksLabel) { const v = str('musicTracksLabel'); if (v) tracksLabel.textContent = v; }

  const volLabel = popup.querySelector<HTMLElement>('.music-popup__volume-section .music-popup__section-label');
  if (volLabel) { const v = str('musicVolumeLabel'); if (v) volLabel.textContent = v; }

  const playBtn = popup.querySelector<HTMLElement>('#music-btn-play');
  if (playBtn) { const v = str('musicPlay'); if (v) playBtn.setAttribute('aria-label', v); }

  const pauseBtn = popup.querySelector<HTMLElement>('#music-btn-pause');
  if (pauseBtn) { const v = str('musicPause'); if (v) pauseBtn.setAttribute('aria-label', v); }

  const tracksGroup = popup.querySelector<HTMLElement>('.music-popup__tracks');
  if (tracksGroup) { const v = str('musicTracksAriaLabel'); if (v) tracksGroup.setAttribute('aria-label', v); }

  const volInput = popup.querySelector<HTMLElement>('#music-volume');
  if (volInput) { const v = str('musicVolumeAriaLabel'); if (v) volInput.setAttribute('aria-label', v); }

  // Track buttons aria-labels and now-playing name
  const trackNames = locale['trackNames'];
  if (Array.isArray(trackNames)) {
    popup.querySelectorAll<HTMLElement>('[data-track]').forEach(btn => {
      const i = Number(btn.dataset.track);
      const name = (trackNames as string[])[i];
      if (name) {
        const fn = locale['musicTrackAriaLabel'];
        btn.setAttribute('aria-label', typeof fn === 'function' ? (fn as (n: number, s: string) => string)(i + 1, name) : `${i + 1}: ${name}`);
      }
    });
    // Update now-playing label if it matches the current track
    const activeBtn = popup.querySelector<HTMLElement>('.track-btn--active');
    if (activeBtn) {
      const i = Number(activeBtn.dataset.track);
      const nameEl = popup.querySelector<HTMLElement>('.music-popup__track-name');
      if (nameEl && (trackNames as string[])[i]) nameEl.textContent = (trackNames as string[])[i];
    }
  }

  // Volume icon mute/unmute aria-label
  const volIcon = popup.querySelector<HTMLElement>('#music-volume-icon');
  if (volIcon) {
    const isMuted = volIcon.querySelector('path[d*="4.27"]') !== null; // muted SVG has this path
    const v = str(isMuted ? 'musicUnmute' : 'musicMute');
    if (v) volIcon.setAttribute('aria-label', v);
  }
}
