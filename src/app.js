import bot from './telegram/telegram';
import menus from './telegram/menus';

import ftp from './ftp';

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

async function start() {
	try {
		await ftp.listen();
		await bot.launch();
	} catch (error) {
		console.log(error);
	}
}

start();
