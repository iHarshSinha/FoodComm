let { processExcelData, parseExcelFromUrl } = require("../utils/parseExcel")
let { cloudinary, storage } = require("../cloudinary/index")
let convertToDate = require("../utils/date")
let Item = require("../models/item")
let Meal = require("../models/meal")
let Day = require("../models/day")
let Menu = require("../models/menu")
let multer = require("multer")
let upload = multer({ storage })
let yyyymmdd=require("../utils/yyyymmdd")

module.exports.createMenu = async (req, res, next) => {

    let result = await cloudinary.uploader.upload(req.file.path, { resource_type: "raw" });
    let url = result.secure_url;
    let worksheet = await parseExcelFromUrl(url);
    const menuData = processExcelData(worksheet);
    console.log(menuData);


    const startDate = convertToDate(menuData['MONDAY'].dates[0]);
    startDate.setHours(0, 0, 0, 0); // Set to start of day

    const endDate = convertToDate(menuData['SUNDAY'].dates[1]);
    endDate.setHours(23, 59, 59, 999); // Set to end of day

    // Process each day's data
    const daysArray = [];
    for (const [dayName, dayData] of Object.entries(menuData)) {
        // Convert dates
        const dates = dayData.dates.map(date => convertToDate(date));

        // Process meals for the day
        const mealDocuments = [];
        for (const [mealName, items] of Object.entries(dayData.meals)) {
            // Create items
            const itemDocs = await Promise.all(
                items.map(async itemName => {
                    const item = new Item({ name: itemName });
                    await item.save();
                    return item._id;
                })
            );

            // Create meal
            const meal = new Meal({
                name: mealName.toLowerCase(),
                items: itemDocs
            });
            await meal.save();
            mealDocuments.push(meal._id);
        }

        // Create day
        const day = new Day({
            dates: dates,
            meals: mealDocuments
        });
        await day.save();
        daysArray.push(day._id);
    }

    // Create menu
    const menu = new Menu({
        startDate: startDate,
        endDate: endDate,
        days: daysArray
    });
    await menu.save();

    res.status(201).json({
        success: true,
        message: 'Menu created successfully',
        data: {
            menuId: menu._id,
            startDate: startDate,
            endDate: endDate
        }
    });
    // console.log(parsedData);
    // res.json(parsedData);

}
module.exports.createFeast = async (req, res, next) => {
    let { date, meal } = req.body;
    let feastDate = yyyymmdd(date);
    // now we will make the meal object
    // first lets get the menu which is active on this date
    // then we will get the day object which has this date
    
}