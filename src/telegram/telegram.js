import { telegram } from '../config/';
import { Telegraf } from 'telegraf';
import store from '../db/index';
import { $t } from '#locales';

const bot = new Telegraf(telegram.token);

const visitorsIds = {};

bot.use(async (ctx, next) => {
	// console.log(ctx);
	if (typeof ctx.user === 'undefined') {
		ctx.user = store.find('users', ctx);
		ctx.store = store;
		ctx.visitors = [];
		ctx.$t = (value) => $t(value, ctx?.user?.locale);
	}
	if (ctx?.user?.isAccess?.()) {
		const path = ctx?.update?.callback_query?.data;
		if (path && path.includes('admin')) {
			if (ctx.user.isAdmin()) {
				await next();
			}
		} else {
			await next();
		}
		return;
	} else {
		const { id, first_name, username } = ctx?.message?.from || {};
		console.log(ctx?.message?.from);
		if (!visitorsIds?.[id]) {
			visitorsIds[id] = true;
			ctx.visitors.push({ id, first_name, username });
		}
		ctx.reply(`Hello ${first_name || username || ''}`);
	}
});

export default bot;
