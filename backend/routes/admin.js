let express = require("express")
let router = express.Router()
let {processExcelData,parseExcelFromUrl} = require("../utils/parseExcel")
let {cloudinary,storage}=require("../cloudinary/index")
let multer=require("multer")
let upload=multer({storage})

// const upload = multer({
//     storage,
//     limits: { fileSize: 10 * 1024 * 1024 }, // Increase limit to 10MB for testing
//     fileFilter: (req, file, cb) => {
//         console.log("File type:", file.mimetype);
//         cb(null, true);
//     }
// });


// here we will create a get route which will be later used for first checking that if a person is logged in and also that the person is an admin
// but for now we will create a post route where the person will upload the file
router.post("/upload",upload.single('file'),async (req,res)=>{
    console.log("got it")
    try {
        console.log("hasdfha");
        let result = await cloudinary.uploader.upload(req.file.path,{resource_type:"raw"});
        let url = result.secure_url;
        let worksheet = await parseExcelFromUrl(url);
        let parsedData = processExcelData(worksheet);
        console.log(parsedData);
        res.json(parsedData);
        // for now let us upload an image to check
        // console.log(req.file)
        // // we will upload the file which has name file
        // // we will get the file path from req.file.path
        // // we will upload the file to cloudinary
        // let result = await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" });
        // // we will get the url of the file
        // let url=result.secure_url
        // // we will send the url as response
        // res.json(url)
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
})
router.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send("Something went wrong")
})

module.exports=router
