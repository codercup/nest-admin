import * as multer from 'multer'
import * as fs from 'fs'
import * as path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'))
    } catch (e) {}

    cb(null, path.join(process.cwd(), 'uploads'))
  },
  filename: function (req, file, cb) {
    const [filename, ext] = file.originalname.split('.')
    // 类似：pretty-girl_709264038_1712302297375.png；可以按需调整格式
    const resultFilename =
      filename + '_' + Math.round(Math.random() * 1e9) + '_' + Date.now() + '.' + ext
    cb(null, resultFilename)
  },
})

export { storage }
