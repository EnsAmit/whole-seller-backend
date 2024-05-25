const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, './images')); // Specify the directory for storing files
  },
  filename: function (req, file, cb) {
    // Use the original file name with a timestamp prefix to make it unique
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.originalname}`;
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2 // Set the file size limit to 2MB
  },
  fileFilter: (_req, file, cb) => {
    const allowedFileTypes = /\.(pdf|docx|txt|jpg|JPG|jpeg|JPEG|png|PNG|xlsx|pptx|ppt|csv)$/;

    if (!file.originalname.match(allowedFileTypes)) {
      // Return an error for unsupported file types
      cb(new Error('Only pdf|docx|txt|jpg|jpeg|png|xlsx|pptx|csv file types are allowed!'), false);
    } else {
      // Pass the file if it meets the requirements
      cb(null, true);
    }
  }
 });

const uploadImage1 = upload.array('images', 5);

module.exports = (req, res, next) => {
  uploadImage1(req, res, function (err) {
    if (err) {
      // Multer error, check if it's related to exceeding the file limit
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          return res.status(400).json({ error: 'Exceeded the maximum number of files allowed (5).' });
        }
      }
      // For other errors, or if the error type is not recognized, pass it to the next middleware
      return next(err);
    }
    // No errors, proceed to the next middleware
    next();
  });
};

