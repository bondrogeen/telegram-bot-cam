import { MenuMiddleware } from 'telegraf-inline-menu';

import main from './MenuMain.js';
import media from './MenuMedia.js';
// import camera from './MenuCamera';
import settings from './MenuSettings.js';
// import Admin from './admin/index.js';



const menuMiddleware = new MenuMiddleware('/', main);

export default (bot) => {
    // main.submenu((ctx) => ctx.$t('menu.video'), 'camera', camera);
    main.submenu((ctx) => ctx.$t('menu.cctv'), 'media', media);
    main.submenu((ctx) => ctx.$t('menu.settings'), 'settings', settings);
    // main.submenu((ctx) => (ctx.user.isAdmin() ? ctx.$t('menu.admin') : ''), 'admin', Admin(bot));

    return menuMiddleware;
} 
