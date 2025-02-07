let { cloudinary, storage } = require("./index")
let multer = require("multer")
let upload = multer({ storage })
module.exports = upload.single("file")