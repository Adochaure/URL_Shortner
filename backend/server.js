require('dotenv').config();
const app = require('./src/app')
const URLModel = require("./src/models/url.model");

const connectDB = require('./src/db/db')
//server started
async function startServer() {
    await connectDB();

    const port = process.env.PORT || 3000;
    app.listen(port,()=>{
        console.log(`server started at port ${port}`)
    })

    setInterval(async () => {
        try {
            const result = await URLModel.deleteMany({
                expiresAt: { $ne: null, $lte: new Date() },
            });

            if (result.deletedCount) {
                console.log(`Removed ${result.deletedCount} expired url(s)`);
            }
        } catch (error) {
            console.error("Expired URL cleanup failed:", error.message);
        }
    }, 60 * 1000);
}

startServer();
