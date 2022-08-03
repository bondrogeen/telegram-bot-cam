import request from 'request';
import { camera } from '../../config';

export default {
	sendImage: (host) => {
		const url = `http://${camera.user}:${camera.password}@${host}/ISAPI/Streaming/channels/101/picture`;
		const picStream = request.get(url).on('error', function (err) {
			console.log(JSON.stringify(err));
		});
		return picStream;
	},

	sendVideo: (chat_id, host) => {
		const date = new Date();
		const path = `${dir}${host}_${date.toLocaleDateString()}.mp4`;
		const comm = `-y -i rtsp://${camUser}:${camPass}@${host}:554/Streaming/Channels/101 -t 0:00:10 -f mp4 -vcodec libx264 -pix_fmt yuvj420p -an -s 800x600 -r 1 ${path}`;
		const ffmpeg = spawn('ffmpeg', comm.split(' '), {});
		ffmpeg.on('close', function (code) {
			console.log(path);
			bot.sendVideo(chat_id, path);
			status = true;
		});
	},
};
