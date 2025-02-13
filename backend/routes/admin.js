let express = require("express")
let router = express.Router()
let wrapForError = require("../utils/catchAsync")
let AdminMethods=require("../controller/admin")
let upload=require("../cloudinary/uploadMiddleware")

router.post("/menu",upload,wrapForError(AdminMethods.createMenu))
router.post("/feast",wrapForError(AdminMethods.createFeast))


module.exports=router
