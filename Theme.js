/**
 * Travel Dost - Theme Switcher (Theme.js)
 * Manages Dark Mode & Light Mode with localStorage persistence
 */
(function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const STORAGE_KEY = 'travel_dost_theme';

  // Apply saved theme or fallback to user system preference
  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }

  // Event listener for theme toggle button
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = body.classList.toggle('dark-theme');
      localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');

      // Dispatch custom event for components that need to re-render or adjust colors
      window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: isDark ? 'dark' : 'light' } }));
    });
  }
})();
