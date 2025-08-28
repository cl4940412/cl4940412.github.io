import { initInbound } from './pages/inbound.js';
import { initOutbound } from './pages/outbound.js';
import { initReturn } from './pages/return.js';
import { initInventory } from './pages/inventory.js';
import { initAccount } from './pages/account.js';

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

router.on('/outbound', async () => {
  await initOutbound();
  Alpine.store('app').loadPage('./pages/outbound.html', async () => {});
});

router.on('/return', async () => {
  await initReturn();
  Alpine.store('app').loadPage('./pages/return.html', async () => {});
});

router.on('/inventory', async () => {
  await initInventory();
  Alpine.store('app').loadPage('./pages/inventory.html', async () => {});
});

router.on('/account', async () => {
  await initAccount();
  Alpine.store('app').loadPage('./pages/account.html', async () => {});
});


router.resolve();
