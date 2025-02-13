let Menu=require("../models/menu")
let Meal=require("../models/meal")
let Item=require("../models/item")
let mongoose = require("mongoose")
let ExpressError = require("../utils/ExpressError");
let twilio = require('twilio');
let client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
module.exports.getMenu = async (req, res, next) => {
    // we will see the current date and then get the menu whose start date is before current date and end date is after current date
    // this will be a static method in the Menu model
    let menu = await Menu.getThisWeekMenu();
    // now we will send json response
    console.log(menu);
    res.json(menu);
}
module.exports.sick = async (req, res, next) => {
    // we have name of the user, room number, meal type, start date, end date, others, meals
    // now we will construct a whatsapp message that we will send to the manager
    // we will send the message to the manager using twilio
    // first lets check if others field is there or not
    let { name, room, mealType, startDate, endDate, others, meals } = req.body;
    let message = `Name: ${name}\nRoom: ${room}\nMeal Type: ${mealType}\nStart Date: ${startDate}\nEnd Date: ${endDate}\n`;
    message += `Meals:\n`;
    for (let meal of meals) {
        message += `${meal}\n`;
    }
    if (others) {
        message += `Others: ${others}\n`;
    }
    
    console.log(message);
    let managerNumber = process.env.MANAGER_NUMBER;
    let adminNumber = process.env.ADMIN_NUMBER;
    let sendMessage= await client.messages.create({
        body: message,
        from: "whatsapp:"+adminNumber,
        to: "whatsapp:"+managerNumber
    });
    console.log(sendMessage.sid);
    return res.json({message:"Sick Meal Request Sent"});   
}
module.exports.updateRating = async (req, res, next) => {
    
    let mealId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(mealId)) {
        return next(new ExpressError("Invalid Meal Id", 400));
    }
    let CurrentMeal = await Meal.findById(mealId).populate("items");
    // now in body we have rating as an array of objects with item id and rating of those individual items
    let { rating } = req.body;
    if(!rating){
        return next(new ExpressError("Rating is required", 400));
    }
    console.log(rating);
    for (let rate of rating) {
        console.log("loop");
        // check for valid item id
        if (!mongoose.Types.ObjectId.isValid(rate.itemId)) {
            return next(new ExpressError("Invalid Item Id", 400));
        }
        let item = await CurrentMeal.getItem(rate.itemId);
        console.log(item);
        if (!item) {
            return next(new ExpressError("Invalid Item Id", 400));
        }
        // here we will call  that method which will update the rating and the number of user
        await item.updateRating(rate.rating);
        
    }
    return res.json({ message: "Rating Updated" });
}