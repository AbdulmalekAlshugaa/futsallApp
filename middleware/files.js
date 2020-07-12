const Multer = require('multer')
const path = require('path')

const multer = Multer({
  storage: Multer.memoryStorage(),
  fileFilter: (req, file, callback) => {
    const mimetype = file.mimetype

    // const ext = path.extname(file.originalname);
    // if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
    //     return callback(new Error('Only images are allowed'))
    // }
      if(mimetype !== 'image/jpeg' && mimetype !== 'image/jpeg' && mimetype !== 'image/jpeg' && mimetype !== 'image/jpeg') {
        return callback(new Error('Only images are allowed'))
    }
    callback(null, true)
},
  // limits: { files: 1, fileSize:  2000000 }
})

module.exports = multer

