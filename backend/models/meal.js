let mongoose=require("mongoose")
let Item=require("./item")
let Schema=mongoose.Schema
let mealSchema=new Schema({
    name:{
        // it will be string but can only be breakfast,lunch,snacks,dinner
        type:String,
        required:true,
        enum:["breakfast","lunch","snacks","dinner"]
    },
    items:[{
        type:Schema.Types.ObjectId,
        ref:"Item"
    }]
})
let Meal=mongoose.model("Meal",mealSchema)
module.exports=Meal