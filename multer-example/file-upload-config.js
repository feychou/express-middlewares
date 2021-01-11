const path = require('path');
const multer  = require('multer');

const publicFolder = path.join(__dirname, 'public');
const uploadFolder = path.join(publicFolder, 'uploads');

const fileFilter = (req, file, cb) => {
  // Accept image file types only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const uploadConfig = multer({ storage, fileFilter })

module.exports = uploadConfig