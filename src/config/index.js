import dotenv from 'dotenv';
const { config } = dotenv;
config();
console.log('config');

const camera = {
	user: process.env.CAM_USER || 'admin',
	password: process.env.CAM_PASSWORD || '',
};

const users = [process.env.USER_ADMIN];

const ftp = {
	ip: process.env.FTP_IP || '0.0.0.0',
	port: process.env.FTP_PORT || 8021,
	username: process.env.FTP_USERNAME || 'admin',
	password: process.env.FTP_PASSWORD || 'password',
	anonymous: false,
	options: { root: './files/foto/' },
};
const telegram = {
	token: process.env.TELEGRAM_TOKEN || '',
	options: { polling: true },
};

export { camera, ftp, telegram, users };
