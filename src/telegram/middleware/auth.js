import { users } from '../config';

const getId = (ctx) => {
	// console.log(ctx)
	// console.log(idCallback)
	const id = ctx?.update?.message?.from?.id;
	const idCallback = ctx?.update?.callback_query?.from?.id;
	return id || idCallback;
};

export default {
	isAdmin: (ctx) => Boolean(users.find((i) => i === getId(ctx))),
	isUser: (ctx) => Boolean(users.find((i) => i === getId(ctx))),
};
