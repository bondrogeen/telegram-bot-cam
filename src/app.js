import menus from './telegram/menus';

import ftp from './ftp';

import { telegram, admin } from './config';

import { Telegraf } from 'telegraf';
import Store from './db/index';
import { $t } from './locales/';

import JSONdb from 'simple-json-db';

const db = new JSONdb('./files/store.json');

const bot = new Telegraf(telegram.token);

const visitorsIds = {};

const store = new Store(db, { users: [admin], cameras: [], })

console.log(telegram);


// bot.use(async (ctx, next) => {
// 	// console.log(ctx);
// 	if (typeof ctx.user === 'undefined') {
// 		ctx.user = store.find('users', ctx);
// 		ctx.store = store;
// 		ctx.visitors = [];
// 		ctx.$t = (value) => $t(value, ctx?.user?.locale);
// 	}
// 	if (ctx?.user?.isAccess?.()) {
// 		const path = ctx?.update?.callback_query?.data;
// 		if (path && path.includes('admin')) {
// 			if (ctx.user.isAdmin()) {
// 				await next();
// 			}
// 		} else {
// 			await next();
// 		}
// 		return;
// 	} else {
// 		const { id, first_name, username } = ctx?.message?.from || {};
// 		console.log(ctx?.message?.from);
// 		if (!visitorsIds?.[id]) {
// 			visitorsIds[id] = true;
// 			ctx.visitors.push({ id, first_name, username });
// 		}
// 		ctx.reply(`Hello ${first_name || username || ''}`);
// 	}
// });


// bot.on('callback_query:data', async (ctx, next) => {
// 	console.log(
// 		'another callbackQuery happened',
// 		ctx.callbackQuery.data.length,
// 		ctx.callbackQuery.data
// 	);
// 	return next();
// });

// bot.command('start', async (ctx) => menus.replyToContext(ctx));
// bot.use(menus.middleware());

// bot.catch((error) => {
// 	console.log('bot error', error);
// });

async function start() {
	try {
		console.log(11111);
		
		// await ftp.listen();
		// await bot.launch();
	} catch (error) {
		console.log(error);
	}
}

start();
