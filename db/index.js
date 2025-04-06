import { uid } from '../utils/main.js';

class Base {
	#id;
	#name;

	constructor(data) {
		this.#id = data?.id || uid();
		this.#name = data?.name || 'New';
	}

	get id() {
		return this.#id;
	}
	get name() {
		return this.#name;
	}

	setId(id) {
		this.#id = id;
	}
	setName(name) {
		this.#name = name || '';
	}
	toObject() {
		return {
			id: this.#id,
			name: this.#name,
		};
	}
}

export class Camera extends Base {
	#ip;
	#path;
	constructor(data) {
		super(data);
		this.#ip = data?.ip || '0.0.0.0';
		this.#path = data?.path || '';
	}

	get ip() {
		return this.#ip;
	}
	get path() {
		return this.#path;
	}

	setIp(ip) {
		this.#ip = ip;
	}
	setPath(path) {
		this.#path = path;
	}

	toObject() {
		return {
			...super.toObject(),
			ip: this.#ip,
		};
	}
}

export class User extends Base {
	#role;
	#locale;
	#notification;
	constructor(data) {
		super(data);
		this.#role = data?.role || 'unauthorized';
		this.#locale = data?.locale || 'en';
		this.#notification = data?.notification || 'on';
	}

	get role() {
		return this.#role;
	}
	get locale() {
		return this.#locale;
	}
	get notification() {
		return this.#notification;
	}
	isAccess() {
		return ['admin', 'user'].includes(this.#role);
	}
	isAdmin() {
		return ['admin'].includes(this.#role);
	}
	setRole(role) {
		this.#role = role || 'unauthorized';
	}
	setLocale(locale) {
		this.#locale = locale || 'en';
	}
	setNotification(value) {
		this.#notification = value || 'on';
	}
	toObject() {
		return {
			...super.toObject(),
			role: this.#role,
			locale: this.#locale,
			notification: this.#notification,
		};
	}
}



const getId = (ctx) => ctx?.update?.message?.from?.id || ctx?.update?.callback_query?.from?.id;

const getClass = (key, data) => {
	if (key === 'users') return new User(data);
	if (key === 'cameras') return new Camera(data);
	return;
};

class Store {
	db;
	users;
	cameras;
	constructor(db, { users = [], cameras = [] }) {
		this.db = db;
		this.users = (db.get('users') || users).map((user) => new User(user));
		this.cameras = (db.get('cameras') || cameras).map((user) => new Camera(user));
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
			this.db.set('users', users);
		}
		if (key === 'cameras' || key === 'all') {
			const cameras = this.cameras.map((cam) => cam.toObject());
			this.db.set('cameras', cameras);
		}
	}
}

export default Store;
