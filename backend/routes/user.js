let express=require("express")
let router=express.Router()

let wrapForError=require("../utils/catchAsync")
let UserMethods=require("../controller/user")
let middleware=require("../middleware")

router.get("/menu",wrapForError(UserMethods.getMenu))
router.post("/sick",middleware.validateSickMeal,wrapForError(UserMethods.sick))

module.exports=router
