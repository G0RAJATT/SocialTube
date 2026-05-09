import multer from 'multer'
import { tempPath } from '../constants.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tempPath)
    },
    filename: function (req, file, cb) {
        cb(null,Date.now() + "_" + file.originalname)
    }
})


// const storage = multer.memoryStorage()

export const upload = multer({ storage });