(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme');
  if (saved) root.setAttribute('data-theme', saved);
  if (btn) btn.textContent = (root.getAttribute('data-theme') === 'dark') ? 'Tryb jasny' : 'Tryb ciemny';
  btn && btn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', current);
    localStorage.setItem('theme', current);
    btn.textContent = current === 'dark' ? 'Tryb jasny' : 'Tryb ciemny';
  });

  // Reading progress
  const bar = document.getElementById('progressBar');
  const onScroll = () => {
    const h = document.documentElement;
    const scrollTop = h.scrollTop || document.body.scrollTop;
    const scrollHeight = h.scrollHeight - h.clientHeight;
    const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (bar) bar.style.width = p + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Activate current nav link
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();
