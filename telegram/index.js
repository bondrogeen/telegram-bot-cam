
import { Telegraf } from 'telegraf';
import JSONdb from 'simple-json-db';

import { telegram, admin } from '../config.js';

import Menus from './menus/index.js';

import Store from '../db/index.js';
import { $t } from '../locales/index.js';

const db = new JSONdb('./files/store.json');

const bot = new Telegraf(telegram.token);

const visitorsIds = {};

const store = new Store(db, { users: [admin], cameras: [], })

const menus = Menus(bot)


bot.use(async (ctx, next) => {
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


bot.on('callback_query:data', async (ctx, next) => {
    console.log(
        'another callbackQuery happened',
        ctx.callbackQuery.data.length,
        ctx.callbackQuery.data
    );
    return next();
});

bot.command('start', async (ctx) => menus.replyToContext(ctx));
bot.use(menus.middleware());

bot.catch((error) => {
    console.log('bot error', error);
});

export default bot