/**
 * Minimal i18n bootstrap for pages that don't load main.ts
 * (privacy-policy.html, terms-of-service.html).
 *
 * Import this as a module script in those pages:
 *   <script type="module" src="/src/i18n/init.ts"></script>
 */
import { loadSavedLocale, applyLocale } from './index';

loadSavedLocale();
applyLocale();
