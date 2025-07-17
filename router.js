import { initInbound } from './pages/inbound.js';

const router = new Navigo("/", { hash: true });
Alpine.store('router', router);

router.on('/', () => {
  Alpine.store('app').loadPage('./pages/home.html');
});

router.on('/index.html', () => {
  Alpine.store('app').loadPage('./pages/home.html');
});

router.on('/inbound', async () => {
	await initInbound();
  Alpine.store('app').loadPage('./pages/inbound.html', async () => {
    
  });
});

router.resolve();
