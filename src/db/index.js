import JSONdb from 'simple-json-db';
import { admin } from '../config/index';
import { User, Camera } from '../class/index';

const db = new JSONdb('./files/store.json');

const getId = (ctx) => ctx?.update?.message?.from?.id || ctx?.update?.callback_query?.from?.id;

const getClass = (key, data) => {
	if (key === 'users') return new User(data);
	if (key === 'cameras') return new Camera(data);
	return;
};

class Store {
	users;
	cameras;
	constructor({ users = [], cameras = [] }) {
		this.users = users.map((user) => new User(user));
		this.cameras = cameras.map((user) => new Camera(user));
	}

	add(key, data) {
		this[key].push(getClass(key, data));
	}

	remove(key, id) {
		this[key].filter((item) => item.id === !id);
	}

	findById(key, id) {
		return this[key].find((item) => item.id === id || item.id === +id);
	}

	find(key, ctx) {
		const id = getId(ctx);
		return this[key].find((item) => item.id === id) || getClass(key, {});
	}

	list(key, fc) {
		return this[key].reduce(fc, {});
	}

	findFitst(key) {
		return this[key]?.[0];
	}

	save(key) {
		if (key === 'users' || key === 'all') {
			const users = this.users.map((user) => user.toObject());
			db.set('users', users);
		}
		if (key === 'cameras' || key === 'all') {
			const cameras = this.cameras.map((cam) => cam.toObject());
			db.set('cameras', cameras);
		}
	}
}

const store = {
	users: db.get('users') || [admin],
	cameras: db.get('cameras') || [],
};

export default new Store(store);
