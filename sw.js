const SHELL_URL = '/shell.html';
const CACHE_NAME = 'shell-v1';
const SHELL_FILES = [SHELL_URL, '/manifest.json', '/favicon.ico']; // ajustar se tiver ícone

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_FILES)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

// Intercepta navegações: se a URL tiver ?no-splash=1 -> deixa passar pra rede.
// Caso contrário, responde com o shell cacheado imediatamente (para evitar flash).
self.addEventListener('fetch', evt => {
  const req = evt.request;
  // só interessa a navegation requests (entradas de página)
  if (req.mode === 'navigate') {
    const url = new URL(req.url);
    if (url.searchParams.get('no-splash') === '1') {
      // Bypass: buscar direto na rede (sem cache)
      evt.respondWith(fetch(req));
      return;
    }
    // Responder com shell cacheado (rápido)
    evt.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(SHELL_URL).then(resp => resp || fetch(SHELL_URL))
      )
    );
    return;
  }
  // Para outros recursos: deixar passar (não fazemos caching)
  // (Evita qualquer cache persistente de assets reais)
});
