const ru = {
	menu: {
		main: {
			title: 'Основное меню',
		},
		settings: 'Настройки',
		video: 'Видео',
		media: 'Медиа',
		changeLang: 'Сменить язык?',
		back: 'Назад',
		language: 'Язык',
		notification: 'Уведомление',
		admin: 'Администрирование',
		users: 'Пользователи',
		user: 'Пользователь',
		admin: 'Администрирование',
		cameras: 'Камеры',
		camera: 'Камера',
		edit: 'Изменить',
		editName: 'Изменить имя',
		editId: 'Изменить id',
		editIp: 'Изменить ip',
		cctv: 'Видеонаблюдение',
		addUser: 'Добавить пользователя',
		addCam: 'Добавить камеру',
		visitors: 'Посетители',
	},
};
const en = {
	menu: {
		main: {
			title: 'Main menu',
		},
		settings: 'Settings',
		video: 'Video',
		media: 'Media',
		changeLang: 'Change language?',
		back: 'Back',
		language: 'Language',
		notification: 'Notification',
		users: 'Users',
		user: 'User',
		admin: 'Administration',
		cameras: 'Cameras',
		camera: 'Camera',
		editName: 'Edit name',
		editId: 'Edit id',
		editIp: 'Edit ip',
		cctv: 'CCTV',
		addUser: 'Add user',
		addCam: 'Add cam',
		visitors: 'Visitors',
	},
};

const locales = {
	ru,
	en,
};

const getValueInItem = (object = {}, string = '') => {
	const keys = string.split('.');
	return keys.reduce((acc, key) => (acc?.[key] ? acc[key] : null), object);
};

export const list = { en: 'English', ru: 'Русский' };

export const $t = (value, locale) => getValueInItem(locales?.[locale], value) || value;
