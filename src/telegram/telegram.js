import { telegram } from '../config';
import { Telegraf } from 'telegraf';
import middleware from './middleware/auth';

const bot = new Telegraf(telegram.token);

bot.use(async (ctx, next) => {
	if (middleware.isUser(ctx)) {
		await next();
	} else {
		// const { first_name, username } = ctx?.message?.from;
		// ctx.reply(`Hello ${first_name || username || ''}`);
	}
});

export default bot;
