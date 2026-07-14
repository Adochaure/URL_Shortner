require('dotenv').config();
const {connect} = require('mongoose')
const app = require('./src/app')

const connectDB = require('./src/db/db')
//server started
connectDB();
app.listen(3000,()=>{
    console.log("server started at port 3000")
})