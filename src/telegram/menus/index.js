import { MenuMiddleware } from 'telegraf-inline-menu';

import main from './MenuMain';
import media from './MenuMedia';
// import camera from './MenuCamera';
import settings from './MenuSettings';
import admin from './admin';

// main.submenu((ctx) => ctx.$t('menu.video'), 'camera', camera);
main.submenu((ctx) => ctx.$t('menu.cctv'), 'media', media);
main.submenu((ctx) => ctx.$t('menu.settings'), 'settings', settings);
main.submenu((ctx) => (ctx.user.isAdmin() ? ctx.$t('menu.admin') : ''), 'admin', admin);

const menuMiddleware = new MenuMiddleware('/', main);

export default menuMiddleware;
