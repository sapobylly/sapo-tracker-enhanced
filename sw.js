// 🐸 Sapo Tracker Service Worker
// Versione cache per aggiornamenti
const CACHE_NAME = 'sapo-tracker-v1.0';
const STATIC_CACHE = 'sapo-static-v1.0';

// File da cachare per offline
const STATIC_FILES = [
  '/',
  '/index.html',
  '/js/app.js',
  '/manifest.json',
  // CDN essenziali (cacheranno automaticamente quando accessibili)
  'https://cdn.tailwindcss.com/tailwind.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.min.js',
  'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js',
  'https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js'
];

// URL che devono sempre andare alla rete (API calls)
const NETWORK_FIRST = [
  '/tables/',
  '/api/'
];

// 🚀 Install Event - Cache statico
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES.map(url => new Request(url, { mode: 'no-cors' })));
      })
      .catch((error) => {
        console.warn('⚠️ Service Worker: Cache failed for some files', error);
        // Continua comunque l'installazione anche se alcuni file falliscono
        return Promise.resolve();
      })
      .then(() => {
        console.log('✅ Service Worker: Installation complete');
        return self.skipWaiting(); // Attiva immediatamente
      })
  );
});

// 🔄 Activate Event - Pulizia cache vecchie
self.addEventListener('activate', (event) => {
  console.log('🎯 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
              console.log('🗑️ Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation complete');
        return self.clients.claim(); // Prendi controllo di tutti i client
      })
  );
});

// 🌐 Fetch Event - Strategia di caching
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Ignora requests non GET
  if (request.method !== 'GET') {
    return;
  }
  
  // Strategia Network First per API
  if (NETWORK_FIRST.some(pattern => url.pathname.startsWith(pattern))) {
    event.respondWith(networkFirst(request));
    return;
  }
  
  // Cache First per file statici
  if (STATIC_FILES.some(file => url.href.includes(file) || file === url.pathname)) {
    event.respondWith(cacheFirst(request));
    return;
  }
  
  // Stale While Revalidate per tutto il resto
  event.respondWith(staleWhileRevalidate(request));
});

// 📡 Network First Strategy (per API)
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🔌 Network failed, serving from cache:', request.url);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Fallback per API offline
    return new Response(
      JSON.stringify({
        error: 'Offline',
        message: 'Richiesta API non disponibile offline',
        offline: true
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

// 📦 Cache First Strategy (per file statici)
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn('🔌 Failed to fetch:', request.url);
    // Restituisci una risposta di fallback se necessario
    return new Response('File non disponibile offline', { status: 404 });
  }
}

// 🔄 Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached version if available
    return cachedResponse;
  });
  
  // Return cached version immediately if available, else wait for network
  return cachedResponse || fetchPromise;
}

// 🔔 Push Event - Notifiche
self.addEventListener('push', (event) => {
  console.log('🔔 Push event received');
  
  const options = {
    body: event.data ? event.data.text() : '💰 Ricordati di aggiungere le tue spese oggi!',
    icon: '/manifest-icon-192.png',
    badge: '/manifest-icon-192.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      {
        action: 'add-expense',
        title: '➕ Aggiungi Spesa',
        icon: '/manifest-icon-192.png'
      },
      {
        action: 'dismiss',
        title: '✕ Chiudi',
        icon: '/manifest-icon-192.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('🐸 Sapo Tracker', options)
  );
});

// 🎯 Notification Click Event
self.addEventListener('notificationclick', (event) => {
  console.log('🎯 Notification click received');
  
  event.notification.close();
  
  if (event.action === 'add-expense') {
    // Apri l'app e focalizza sulla creazione spesa
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        if (clientList.length > 0) {
          const client = clientList[0];
          client.focus();
          client.postMessage({ action: 'open-expense-modal' });
          return;
        }
        return clients.openWindow('/');
      })
    );
  } else if (event.action === 'dismiss') {
    // Non fare nulla, notifica già chiusa
    return;
  } else {
    // Click generico - apri l'app
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  }
});

// 🔄 Background Sync (per operazioni offline)
self.addEventListener('sync', (event) => {
  console.log('🔄 Background sync:', event.tag);
  
  if (event.tag === 'sync-transactions') {
    event.waitUntil(syncTransactions());
  }
});

// 📤 Sincronizza transazioni salvate offline
async function syncTransactions() {
  try {
    // Recupera transazioni da sincronizzare dal IndexedDB
    const pendingTransactions = await getPendingTransactions();
    
    for (const transaction of pendingTransactions) {
      try {
        const response = await fetch('/tables/transazioni', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(transaction.data)
        });
        
        if (response.ok) {
          await removePendingTransaction(transaction.id);
          console.log('✅ Transaction synced:', transaction.id);
        }
      } catch (error) {
        console.warn('⚠️ Failed to sync transaction:', transaction.id);
      }
    }
  } catch (error) {
    console.error('❌ Sync failed:', error);
  }
}

// 📊 Utility functions per IndexedDB (implementare se necessario)
async function getPendingTransactions() {
  // TODO: Implementare recupero da IndexedDB
  return [];
}

async function removePendingTransaction(id) {
  // TODO: Implementare rimozione da IndexedDB
}

// 📱 Message Event - Comunicazione con main app
self.addEventListener('message', (event) => {
  console.log('📱 Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    // Programma notifica periodica
    schedulePeriodicNotification(event.data.interval || 24);
  }
});

// ⏰ Programma notifiche periodiche
function schedulePeriodicNotification(hours = 24) {
  console.log(`⏰ Scheduling notification every ${hours} hours`);
  
  // In un'implementazione reale, useresti background sync o web push
  // Per ora logghiamo solo
  
  setInterval(() => {
    self.registration.showNotification('🐸 Sapo Tracker', {
      body: '💰 Non dimenticare di registrare le tue spese di oggi!',
      icon: '/manifest-icon-192.png',
      badge: '/manifest-icon-192.png'
    });
  }, hours * 60 * 60 * 1000); // Converti ore in millisecondi
}