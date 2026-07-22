const mongoose = require('mongoose')

async function createDB() {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected successfully");
    }
    catch(err){
         console.log("Error while connecting daabase: ",err);
    }
}  

module.exports = createDB;
