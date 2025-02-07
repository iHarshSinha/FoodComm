let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Meal = require("./meal");
let daySchema = new Schema({
  dates: {
    type: [String],
    required: true
  },
  meals: [{
    type: Schema.Types.ObjectId,
    ref: "Meal"
  }]
});
let Day = mongoose.model("Day", daySchema);
module.exports = Day;
