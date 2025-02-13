if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
let express = require('express');
let methodOverride=require("method-override")
let ExpressError = require("./utils/ExpressError")
let mongoose = require('mongoose');
let adminRoutes = require("./routes/admin")
let userRoutes = require("./routes/user")
let app = express();
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride("_method"))



mongoose.connect(process.env.MONGODB_URI);
let db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});


// now we will access backend port from .env file
const port = process.env.BACKEND_PORT || 5000;


app.use("/admin",adminRoutes)
app.use("/user",userRoutes)

app.all("*",(req,res,next)=>{
    next(new ExpressError("Page Not Found",404))
})

app.use((err,req,res,next)=>{
    console.log("in error route")
    // let {status=500,message="something went wrong"}=err;
    let {status=500}=err;
    if(!err.message){
        err.message="Something went Wrong"
    }
    // res.status(status).render("error",{err})
    res.status(status).json({error:err.message})
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});