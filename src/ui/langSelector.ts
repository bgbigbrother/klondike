export interface LangOption {
  lang: string;
  flag: string;
  name: string;
}

// Only languages with actual translation files
export const LANGUAGES: LangOption[] = [
  { lang: 'en', flag: '🇬🇧', name: 'English' },
  { lang: 'bg', flag: '🇧🇬', name: 'Български' },
  { lang: 'es', flag: '🇪🇸', name: 'Español' },
  { lang: 'fr', flag: '🇫🇷', name: 'Français' },
  { lang: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { lang: 'it', flag: '🇮🇹', name: 'Italiano' },
  { lang: 'pt', flag: '🇵🇹', name: 'Português' },
  { lang: 'ru', flag: '🇷🇺', name: 'Русский' },
  { lang: 'zh', flag: '🇨🇳', name: '中文' },
  { lang: 'ja', flag: '🇯🇵', name: '日本語' },
  { lang: 'ko', flag: '🇰🇷', name: '한국어' },
  { lang: 'ar', flag: '🇸🇦', name: 'العربية' },
  { lang: 'hi', flag: '🇮🇳', name: 'हिन्दी' },
  { lang: 'vi', flag: '🇻🇳', name: 'Tiếng Việt' },
  { lang: 'pl', flag: '🇵🇱', name: 'Polski' },
  { lang: 'tr', flag: '🇹🇷', name: 'Türkçe' },
];

export class LangSelector {
  private btn: HTMLButtonElement;
  private dropdown: HTMLUListElement;
  private flagEl: HTMLElement;
  private nameEl: HTMLElement;
  private open = false;
  private onChange: (lang: LangOption) => void;

  constructor(onChange: (lang: LangOption) => void) {
    this.onChange = onChange;
    this.btn = document.getElementById('lang-selector-btn') as HTMLButtonElement;
    this.dropdown = document.getElementById('lang-dropdown') as HTMLUListElement;
    this.flagEl = document.getElementById('lang-flag') as HTMLElement;
    this.nameEl = document.getElementById('lang-name') as HTMLElement;
  }

  setActiveLang(langCode: string): void {
    const lang = LANGUAGES.find(l => l.lang === langCode);
    if (lang) this._updateButton(lang);
  }

  attach(): void {
    // If the dropdown is empty (standalone dev mode), populate from LANGUAGES
    if (this.dropdown.children.length === 0) {
      for (const lang of LANGUAGES) {
        const li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.dataset.lang = lang.lang;
        li.dataset.flag = lang.flag;
        li.textContent = `${lang.flag} ${lang.name}`;
        this.dropdown.appendChild(li);
      }
    }

    this.btn.addEventListener('click', (e) => {
      e.stopPropagation();
      this._toggle();
    });

    this.dropdown.addEventListener('click', (e) => {
      const li = (e.target as HTMLElement).closest<HTMLElement>('[data-lang]');
      if (!li) return;
      const lang = LANGUAGES.find(l => l.lang === li.dataset.lang);
      if (lang) this._select(lang);
    });

    this.dropdown.addEventListener('keydown', (e) => {
      const items = Array.from(this.dropdown.querySelectorAll<HTMLElement>('[role="option"]'));
      const focused = document.activeElement as HTMLElement;
      const idx = items.indexOf(focused);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(idx + 1) % items.length]?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length]?.focus();
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        focused?.click();
      } else if (e.key === 'Escape') {
        this._close();
        this.btn.focus();
      }
    });

    document.addEventListener('click', () => { if (this.open) this._close(); });

    this.dropdown.querySelectorAll<HTMLElement>('[role="option"]').forEach(li => {
      li.tabIndex = -1;
    });
  }

  private _toggle(): void {
    this.open ? this._close() : this._openDropdown();
  }

  private _openDropdown(): void {
    this.open = true;
    this.dropdown.classList.add('lang-selector__dropdown--open');
    this.btn.setAttribute('aria-expanded', 'true');
    (this.dropdown.querySelector<HTMLElement>('[role="option"]'))?.focus();
  }

  private _close(): void {
    this.open = false;
    this.dropdown.classList.remove('lang-selector__dropdown--open');
    this.btn.setAttribute('aria-expanded', 'false');
  }

  private _select(lang: LangOption): void {
    this._updateButton(lang);
    this.dropdown.querySelectorAll<HTMLElement>('[role="option"]').forEach(li => {
      li.setAttribute('aria-selected', li.dataset.lang === lang.lang ? 'true' : 'false');
    });
    this._close();
    this.onChange(lang);
  }

  private _updateButton(lang: LangOption): void {
    this.flagEl.textContent = lang.flag;
    this.nameEl.textContent = lang.name;
  }
}
