import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu';
import adminUsers from './AdminUsers';
import adminCameras from './AdminCameras';

const admin = new MenuTemplate((ctx) => ctx.$t('menu.admin'));

admin.submenu((ctx) => ctx.$t('menu.users'), 'users', adminUsers);
admin.submenu((ctx) => ctx.$t('menu.cameras'), 'cameras', adminCameras);

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

export default admin;
