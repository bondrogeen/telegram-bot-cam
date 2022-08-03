const path = require('path');

export default {
  stop: (error, fileName) => {
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
  }
}
