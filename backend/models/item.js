let mongoose=require("mongoose")
let Schema=mongoose.Schema
let itemSchema=new Schema({
    name:{
        type:String,
        required:true
    }
})
let Item=mongoose.model("Item",itemSchema)
module.exports=Item