import { MenuTemplate, createBackMainMenuButtons } from 'telegraf-inline-menu';

const MenuCamera = new MenuTemplate('People like food. What do they like?');

const people = { Mark: {}, Paul: {} };
const food = ['bread', 'cake', 'bananas'];

function personButtonText(_, key) {
	const entry = people[key];
	if (entry?.food) {
		return `${key} (${entry.food})`;
	}

	return key;
}

function foodSelectText(ctx) {
	const person = ctx.match[1];
	const hisChoice = people[person].food;
	if (!hisChoice) {
		return `${person} is still unsure what to eat.`;
	}

	return `${person} likes ${hisChoice} currently.`;
}

const foodSelectSubmenu = new MenuTemplate(foodSelectText);
foodSelectSubmenu.toggle('Prefer tea', 'tea', {
	set: (ctx, choice) => {
		const person = ctx.match[1];
		people[person].tee = choice;
		return true;
	},
	isSet: (ctx) => {
		const person = ctx.match[1];
		return people[person].tee === true;
	},
});
foodSelectSubmenu.select('food', food, {
	set: (ctx, key) => {
		const person = ctx.match[1];
		people[person].food = key;
		return true;
	},
	isSet: (ctx, key) => {
		const person = ctx.match[1];
		return people[person].food === key;
	},
});
foodSelectSubmenu.manualRow(createBackMainMenuButtons());

MenuCamera.chooseIntoSubmenu('person', () => Object.keys(people), foodSelectSubmenu, {
	buttonText: personButtonText,
	columns: 2,
});

MenuCamera.manualRow(createBackMainMenuButtons());

export default MenuCamera;
