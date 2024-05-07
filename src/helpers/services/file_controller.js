// const multer = require('multer');
// const path = require('path');

// // Multer configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, './images')); // Specify the directory for storing files
//   },
//   filename: function (req, file, cb) {
//     // Use the original file name with a timestamp prefix to make it unique
//     const timestamp = Date.now();
//     const filename = `${timestamp}_${file.originalname}`;
//     cb(null, filename);
//   }
// });

// const upload = multer({ storage: storage });

// module.exports = () => upload.single('image'); // Export upload as a function

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

const upload = multer({ storage: storage });

module.exports = () => upload.array('images', 10); // Export upload as a function for handling multiple images

