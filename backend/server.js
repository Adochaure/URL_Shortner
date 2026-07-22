require('dotenv').config();
const app = require('./src/app')
const URLModel = require("./src/models/url.model");

const connectDB = require('./src/db/db')
//server started
async function startServer() {
    await connectDB();

    app.get("/:shortCode", async (req, res) => {
        try {
            const { shortCode } = req.params;
            const url = await URLModel.findOne({ shortCode });

            if (!url) {
                return res.status(404).json({ message: "Short URL not found" });
            }

            if (url.expiresAt && new Date(url.expiresAt) <= new Date()) {
                await URLModel.deleteOne({ _id: url._id });
                return res.status(410).json({ message: "Short URL expired" });
            }

            return res.redirect(url.originalUrl);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    });

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
