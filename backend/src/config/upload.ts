import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: tmpPath,
  uploadsFolder: path.resolve(tmpPath, 'uploads'),
  storage: multer.diskStorage({
    destination: tmpPath,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
