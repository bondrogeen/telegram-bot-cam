import path from 'path'

import FtpSrv from 'ftp-srv'

import { ftp } from '../config.js'

const ftpServer = new FtpSrv({ url: `ftp://${ftp.ip}:${ftp.port}` })

ftpServer.on('login', ({ connection, username, password }, resolve, reject) => {
  if (username === ftp.username && password === ftp.password) {
    connection.on('STOR', (error, fileName) => {
      if (error) return
      console.log(fileName)
      const name = path.basename(fileName)
      const [ip, cam, data, event] = name.split('_')
      console.log(ip, cam, data, event)
      // readFiles(fileName)
      // if (status) {
      //   sendVideo(userAdmin, ip)
      //   status = false
      // }
    })
    return resolve(ftp.options)
  }
  return reject(new errors.GeneralError('Invalid username or password', 401))
})

export default ftpServer
