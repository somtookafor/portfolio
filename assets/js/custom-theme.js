(() => {
  'use strict';

  const selector = document.getElementById('theme-mode');
  if (!selector) return;

  const storageKey = 'portfolio-theme-mode';
  const validModes = ['auto', 'light', 'dark'];
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function readSavedMode() {
    try {
      const saved = localStorage.getItem(storageKey);
      return validModes.includes(saved) ? saved : 'auto';
    } catch (_) {
      return 'auto';
    }
  }

  function applyMode(mode) {
    const isDark = mode === 'dark' || (mode === 'auto' && systemDark.matches);
    document.body.dataset.theme = isDark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

    const themeLogo = document.getElementById('theme-logo');
    if (themeLogo) {
      const logoPath = isDark ? themeLogo.dataset.logoDark : themeLogo.dataset.logoLight;
      if (logoPath && themeLogo.getAttribute('src') !== logoPath) {
        themeLogo.setAttribute('src', logoPath);
      }
    }

    selector.value = mode;
    selector.setAttribute('aria-label', `Color mode: ${mode}`);
  }

  let selectedMode = readSavedMode();
  applyMode(selectedMode);

  selector.addEventListener('change', () => {
    selectedMode = validModes.includes(selector.value) ? selector.value : 'auto';
    try {
      localStorage.setItem(storageKey, selectedMode);
    } catch (_) {
      // The selection still works for this page view if storage is unavailable.
    }
    applyMode(selectedMode);
  });

  systemDark.addEventListener('change', () => {
    if (selectedMode === 'auto') applyMode('auto');
  });
})();
