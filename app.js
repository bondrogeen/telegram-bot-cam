import ftp from './ftp/index.js'
import bot from './telegram/index.js'

async function start() {
    try {
        // await ftp.listen();
        await bot.launch();
    } catch (error) {
        console.log(error);
    }
}

start();
