import { replyMenuToContext, MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu';
import { StatelessQuestion } from '@grammyjs/stateless-question';

let item = null;

const getItem = (ctx) => ctx.store.findById('cameras', ctx?.match?.[1] || item?.id || 0);

const getListCameras = (acc, i) => {
	acc[i.id] = `${i.name}`;
	return acc;
};

export default (bot) => {
	const adminCameras = new MenuTemplate((ctx) => ctx.$t('menu.cameras'));

	const adminCamera = new MenuTemplate((ctx) => {
		const { name, ip } = getItem(ctx) || {};
		return `${ctx.$t('menu.camera')}: ${name} (${ip})`;
	});

	const nameQuestion = new StatelessQuestion('name_camera', (ctx) => {
		const name = ctx?.update?.message?.text;
		if (name) {
			item.setName(name);
			ctx.store.save('cameras');
			console.log(item.id);
			ctx.deleteMessage();
			replyMenuToContext(adminCamera, ctx, `/admin/cameras/camera:${item.id}/`);
		}
	});

	const ipQuestion = new StatelessQuestion('ip_camera', (ctx) => {
		const id = ctx?.update?.message?.text;
		if (id) {
			item.setIp(id);
			ctx.store.save('cameras');
			ctx.deleteMessage();
			replyMenuToContext(adminCamera, ctx, `/admin/cameras/camera:${id}/`);
		}
	});

	bot.use(nameQuestion.middleware());
	bot.use(ipQuestion.middleware());

	adminCamera.interact((ctx) => ctx.$t('menu.editName'), 'name', {
		do: async (ctx) => {
			item = getItem(ctx);
			nameQuestion.replyWithMarkdown(ctx, `${ctx.$t('menu.editName')}?`);
			return false;
		},
	});

	adminCamera.interact((ctx) => ctx.$t('menu.editIp'), 'ip', {
		do: async (ctx) => {
			item = getItem(ctx);
			ipQuestion.replyWithMarkdown(ctx, `${ctx.$t('menu.editIp')}?`);
			return false;
		},
	});

	adminCamera.manualRow(
		createBackMainMenuButtons(
			(ctx) => ctx.$t('menu.back'),
			(ctx) => ctx.$t('menu.main.title')
		)
	);

	adminCameras.interact((ctx) => ctx.$t('menu.addCam'), 'add_camera', {
		do: async (ctx) => {
			ctx.store.add('cameras', {});
			ctx.store.save('cameras');
			ctx.deleteMessage();
			replyMenuToContext(adminCameras, ctx, `/admin/cameras/`);
			return false;
		},
	});

	adminCameras.chooseIntoSubmenu('camera', (ctx) => ctx.store.list('cameras', getListCameras), adminCamera);

	adminCameras.manualRow(
		createBackMainMenuButtons(
			(ctx) => ctx.$t('menu.back'),
			(ctx) => ctx.$t('menu.main.title')
		)
	);


	return adminCameras
};
