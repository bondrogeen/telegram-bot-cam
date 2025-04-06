import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu';
import AdminUsers from './AdminUsers.js';
import AdminCameras from './AdminCameras.js';


export default (bot) => {
	const admin = new MenuTemplate((ctx) => ctx.$t('menu.admin'));

	admin.submenu((ctx) => ctx.$t('menu.users'), 'users', AdminUsers(bot));
	admin.submenu((ctx) => ctx.$t('menu.cameras'), 'cameras', AdminCameras(bot));

	admin.interact((ctx) => ctx.$t('menu.visitors'), 'visitors', {
		do: async (ctx) => {
			const list = ctx?.visitors || [];
			console.log(list);
			ctx.reply(`1${list}`);
			return false;
		},
	});

	admin.manualRow(
		createBackMainMenuButtons(
			(ctx) => ctx.$t('menu.back'),
			(ctx) => ctx.$t('menu.main.title')
		)
	);

	return admin
};
