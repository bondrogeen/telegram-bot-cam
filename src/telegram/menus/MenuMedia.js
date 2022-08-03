import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu';

import req from '../controllers/ControllerFtp'

let mediaOption = 'photo1';
const mediaMenu = new MenuTemplate((ctx) => {
	// return {
	// 	type: 'photo',
	// 	media: 'https://telegram.org/img/SiteiOs.jpg',
	// };
  const img = req.sendImage('192.168.1.49')
  return {
		type: 'photo',
		media: {
			source: img,
		},
		text: 'Some *caption*',
		parse_mode: 'Markdown',
	};
});

mediaMenu.interact('Just a button', 'randomButton', {
	do: async (ctx) => {
		await ctx.answerCbQuery({ text: 'Just a callback query answer' });
		return false;
	},
});

mediaMenu.select('type', ['animation', 'document', 'photo1'], {
	columns: 2,
	isSet: (_, key) => mediaOption === key,
	set: (_, key) => {
		mediaOption = key;
		return true;
	},
});
mediaMenu.manualRow(createBackMainMenuButtons());

export default mediaMenu;
