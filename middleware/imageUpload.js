const multer = require("multer");

// configure file storage for multer
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});

imageUpload = (req, res, next) => {
  console.log('imageUpload middleware invoked');
  multer({ storage: multerStorage }).single('imagePath');
  next();
};

module.exports = imageUpload;