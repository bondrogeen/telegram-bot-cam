import { readFile, writeFile, appendFile } from 'fs/promises'
import { Buffer } from 'buffer'

export default {
  appendFile: async (path, data) => {
    return await appendFile(path, new Uint8Array(Buffer.from(data)))
  },
  writeFiles: async (path, data) => {
    return await writeFile(path, new Uint8Array(Buffer.from(data)))
  },
  readFiles: async (path) => {
    return await readFile(path, { encoding: 'utf8' })
  }
}
