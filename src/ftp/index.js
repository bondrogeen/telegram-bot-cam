import FtpSrv from 'ftp-srv'
import { ftp } from '../config/'
import controller from './controllers/'

const ftpServer = new FtpSrv({ url: `ftp://${ftp.ip}:${ftp.port}` })

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  if (username === ftp.username && password === ftp.password) {
      connection.on('STOR', controller.stop)
    return resolve(ftp.options)
  }
  return reject(new errors.GeneralError('Invalid username or password', 401))
})

export default ftpServer
