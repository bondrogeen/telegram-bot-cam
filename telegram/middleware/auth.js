import users from '../../db/index';

const getId = (ctx) => {
	const id = ctx?.update?.message?.from?.id;
	const idCallback = ctx?.update?.callback_query?.from?.id;
	return id || idCallback;
};

export default {
	isAdmin: (ctx) => users.find(getId(ctx)),
	isUser: (ctx) => users.find(getId(ctx)),
};
