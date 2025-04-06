import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu';

import req from '../controllers/ControllerFtp.js';

const getListCameras = (acc, i) => {
	acc[i.id] = `${i.name}`;
	return acc;
};

let camera = null;

const mediaMenu = new MenuTemplate((ctx) => {
	camera = camera ? camera : ctx.store.findFitst('cameras');
	console.log(camera.name);
	if (camera) {
		const { name, ip } = camera;
		const img = req.sendImage(ip);

		return { type: 'photo', media: { source: img }, text: name };
	}
	return '';
});

mediaMenu.select('type', (ctx) => ctx.store.list('cameras', getListCameras), {
	columns: 2,
	isSet: (_, key) => {
		return camera?.id == key;
	},
	set: (ctx, key) => {
		camera = ctx.store.findById('cameras', key);
		return true;
	},
});

mediaMenu.manualRow(
	createBackMainMenuButtons(
		(ctx) => ctx.$t('menu.back'),
		(ctx) => ctx.$t('menu.main.title')
	)
);

export default mediaMenu;
