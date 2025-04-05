import dotenv from 'dotenv';
import path from 'path';

const { config } = dotenv;
config({ path: path.join(__dirname, '../.env') });

console.log(path.join(__dirname, '.env'));
console.log(process.env.TELEGRAM_TOKEN);


export const camera = {
	user: process.env.CAM_USER || 'admin',
	password: process.env.CAM_PASSWORD || '',
};

export const admin = {
	id: +process.env.USER_ADMIN,
	role: 'admin',
	locale: 'en',
};

export const ftp = {
	ip: process.env.FTP_IP || '0.0.0.0',
	port: process.env.FTP_PORT || 8021,
	username: process.env.FTP_USERNAME || 'admin',
	password: process.env.FTP_PASSWORD || 'password',
	anonymous: false,
	options: { root: './files/foto/' },
};
export const telegram = {
	token: process.env.TELEGRAM_TOKEN || '',
	options: { polling: true },
};
