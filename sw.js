// 장보기 계산기 서비스 워커
// 앱 파일을 수정해서 다시 올릴 때는 아래 버전 숫자를 하나 올려주세요 (v1 → v2).
const CACHE = 'jangbogi-v9';
const ASSETS = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // 방문 통계(구글 애널리틱스)는 저장하지 않고 항상 인터넷으로 보냄
  const url = new URL(req.url);
  if (/google-analytics\.com|googletagmanager\.com|analytics\.google\.com/.test(url.hostname)) return;

  // 화면(HTML): 인터넷이 되면 최신 버전, 안 되면 저장해 둔 버전
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 아이콘·글꼴 등: 저장해 둔 것을 먼저 쓰고, 없으면 받아서 저장
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => hit))
  );
});
