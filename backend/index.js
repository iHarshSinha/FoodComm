if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
let express = require('express');
let mongoose = require('mongoose');
let adminRoutes = require("./routes/admin")
let app = express();
app.use(express.urlencoded({extended:true}))



mongoose.connect(process.env.MONGODB_URI);
let db=mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});


// now we will access backend port from .env file
const port = process.env.BACKEND_PORT || 5000;


app.use("/admin",adminRoutes)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});