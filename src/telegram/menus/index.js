import { MenuMiddleware } from 'telegraf-inline-menu';

import main from './MenuMain';
import media from './MenuMedia';
import camera from './MenuCamera';

main.submenu('Video', 'camera', camera);
main.submenu('Media Menu', 'media', media);

const menuMiddleware = new MenuMiddleware('/', main);

export default menuMiddleware;
