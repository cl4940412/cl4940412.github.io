export function fetchPage(url) {
  return fetch(url).then(res => res.text());
}

import { openDB } from 'https://unpkg.com/idb?module';

export const dbPromise = openDB('inbound-db', 1, {
  upgrade(db) {
    db.createObjectStore('scans');
  }
});

// document.addEventListener('alpine:init', () => {
  // Alpine.data('app', () => ({
    // pageContent: '',
    // async init() {
      // if ('serviceWorker' in navigator) {
        // navigator.serviceWorker.register('/service-worker.js');
      // }
    // },
    // async loadPage(url, onLoaded) {
      // this.pageContent = await fetchPage(url);
      // this.$nextTick(() => {
        // if (onLoaded) onLoaded();
      // });
    // }
  // }));

  // Alpine.store('app', Alpine.data('app')());
// });
