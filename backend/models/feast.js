const { string } = require("joi")
let mongoose=require("mongoose")
let Schema=mongoose.Schema
let feastSchema=new Schema({
    name:{
        type:String,
        required:true,
        enum:["breakfast","lunch","snacks","dinner"]
    },
    date:{
        type:String,
        required:true
    },
    items:[
        {
            type:String,
        }
    ]
})
let Feast=mongoose.model("Feast",feastSchema)
module.exports=Feast