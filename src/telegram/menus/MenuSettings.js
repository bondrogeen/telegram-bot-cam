import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu';
import { list } from '#locales';

const settings = new MenuTemplate((ctx) => ctx.$t('menu.settings'));

const settingsLanguage = new MenuTemplate((ctx) => ctx.$t('menu.language'));

settingsLanguage.select('select', list, {
	set: async (ctx, key, r) => {
		ctx.user.setLocale(key || 'en');
		ctx.store.save('users');
		await ctx.answerCbQuery(`You selected ${list[key]}`);
		return true;
	},
	isSet: (ctx, key) => key === ctx.user.locale,
});

settingsLanguage.manualRow(
	createBackMainMenuButtons(
		(ctx) => ctx.$t('menu.back'),
		(ctx) => ctx.$t('menu.main.title')
	)
);

const settingsNotification = new MenuTemplate((ctx) => ctx.$t('menu.notification'));

settingsNotification.select(
	'select',
	(c) => {
		return { on: 'On', off: 'Off' };
	},
	{
		set: async (ctx, key, r) => {
			ctx.user.setNotification(key || 'on');
			await ctx.answerCbQuery(`You selected ${list[key]}`);
			return true;
		},
		isSet: (ctx, key) => key === ctx.user.notification,
	}
);

settingsNotification.manualRow(
	createBackMainMenuButtons(
		(ctx) => ctx.$t('menu.back'),
		(ctx) => ctx.$t('menu.main.title')
	)
);

settings.submenu((ctx) => ctx.$t('menu.language'), 'language', settingsLanguage);
settings.submenu((ctx) => ctx.$t('menu.notification'), 'notification', settingsNotification);

settings.manualRow(
	createBackMainMenuButtons(
		(ctx) => ctx.$t('menu.back'),
		(ctx) => ctx.$t('menu.main.title')
	)
);

export default settings;
