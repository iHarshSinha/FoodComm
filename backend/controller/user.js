let Menu=require("../models/menu")
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