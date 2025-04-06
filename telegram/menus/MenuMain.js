import { MenuTemplate } from 'telegraf-inline-menu';
const menu = new MenuTemplate((ctx) => ctx.$t('menu.main.title'));
// menu.url('EdJoPaTo.de', 'https://edjopato.de');

// let mainMenuToggle = false;
// menu.toggle('toggle me', 'toggle me', {
// 	set: (_, newState) => {
// 		mainMenuToggle = newState;
// 		// Update the menu afterwards
// 		return true;
// 	},
// 	isSet: () => mainMenuToggle,
// });

// menu.interact('interaction', 'interact', {
// 	hide: () => mainMenuToggle,
// 	do: async (ctx) => {
// 		console.log(ctx);
// 		await ctx.answerCbQuery({ text: 'you clicked me!' });
// 		// Do not update the menu afterwards
// 		return false;
// 	},
// });

// menu.interact('update after action', 'update afterwards', {
// 	joinLastRow: true,
// 	hide: () => mainMenuToggle,
// 	do: async (ctx) => {
// 		await ctx.answerCbQuery({ text: 'I will update the menu now…' });

// 		return true;

// 		// You can return true to update the same menu or use a relative path
// 		// For example '.' for the same menu or '..' for the parent menu
// 		// return '.'
// 	},
// });

// menu.select('select', locales, {
// 	set: async (ctx, key) => {
// 		locale = findLocal(key)?.code || 'en';
// 		await ctx.answerCbQuery(`You selected ${findLocal(key).name}`);
// 		return true;
// 	},
// 	isSet: (_, key) => key === locale,
// });

export default menu;
