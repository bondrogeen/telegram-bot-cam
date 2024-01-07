import { uid } from '../utils/main';

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
