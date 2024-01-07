import { replyMenuToContext, MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu';
import bot from '../../telegram';

import { list } from '../../../locales/';

import { StatelessQuestion } from '@grammyjs/stateless-question';

const getUser = (ctx) => ctx.store.findById('users', ctx?.match?.[1] || user?.id || 0);

const getListUsers = (acc, i) => {
	acc[i.id] = `${i.name} (${i.id})`;
	return acc;
};

let user = null;

const adminUsers = new MenuTemplate((ctx) => ctx.$t('menu.users'));

const adminUser = new MenuTemplate((ctx) => {
	const { name, id } = getUser(ctx) || {};
	return `${ctx.$t('menu.user')}: ${name} (${id})`;
});

const nameQuestion = new StatelessQuestion('name', (ctx) => {
	const name = ctx?.update?.message?.text;
	if (name) {
		user.setName(name);
		ctx.store.save('users');
		replyMenuToContext(adminUser, ctx, `/admin/users/user:${user.id}/`);
	}
});

const idQuestion = new StatelessQuestion('id', (ctx) => {
	const id = +ctx?.update?.message?.text;
	if (id) {
		user.setId(id);
		ctx.store.save('users');
		replyMenuToContext(adminUser, ctx, `/admin/users/user:${id}/`);
	}
});

bot.use(nameQuestion.middleware());
bot.use(idQuestion.middleware());

adminUser.interact((ctx) => ctx.$t('menu.editName'), 'name', {
	do: async (ctx) => {
		user = getUser(ctx);
		nameQuestion.replyWithMarkdown(ctx, `${ctx.$t('menu.editName')}?`);
		return false;
	},
});

adminUser.interact((ctx) => ctx.$t('menu.editId'), 'id', {
	do: async (ctx) => {
		user = getUser(ctx);
		idQuestion.replyWithMarkdown(ctx, `${ctx.$t('menu.editId')}?`);
		return false;
	},
});

adminUser.select('locale', list, {
	set: async (ctx, key) => {
		getUser(ctx).setLocale(key || 'en');
		ctx.store.save('users');
		await ctx.answerCbQuery(`You selected ${list[key]}`);
		return true;
	},
	isSet: (ctx, key) => key === getUser(ctx).locale,
});

adminUser.select(
	'notification',
	{ on: 'On', off: 'Off' },
	{
		set: async (ctx, key) => {
			getUser(ctx).setNotification(key || 'on');
			ctx.store.save('users');
			await ctx.answerCbQuery(`You selected ${list[key]}`);
			return true;
		},
		isSet: (ctx, key) => key === getUser(ctx).notification,
	}
);

adminUser.select(
	'role',
	{ admin: 'Admin', user: 'User', unauthorized: 'Unauthorized' },
	{
		set: async (ctx, key) => {
			getUser(ctx).setRole(key || 'on');
			ctx.store.save('users');
			await ctx.answerCbQuery(`You selected ${list[key]}`);
			return true;
		},
		isSet: (ctx, key) => key === getUser(ctx).role,
	}
);

adminUser.manualRow(
	createBackMainMenuButtons(
		(ctx) => ctx.$t('menu.back'),
		(ctx) => ctx.$t('menu.main.title')
	)
);

adminUsers.interact((ctx) => ctx.$t('menu.addUser'), 'add_user', {
	do: async (ctx) => {
		ctx.store.add('users', {});
		ctx.store.save('users');
		ctx.deleteMessage();
		replyMenuToContext(adminUsers, ctx, `/admin/users/`);
		return false;
	},
});

adminUsers.chooseIntoSubmenu('user', (ctx) => ctx.store.list('users', getListUsers), adminUser);

adminUsers.manualRow(
	createBackMainMenuButtons(
		(ctx) => ctx.$t('menu.back'),
		(ctx) => ctx.$t('menu.main.title')
	)
);

export default adminUsers;
