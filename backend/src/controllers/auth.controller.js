const URLModel = require("../models/url.model");
const crypto = require("crypto");

async function CreateURL(req, res) {
    try {
        const { originalUrl, expiresAt } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                message: "Original URL is required",
            });
        }

        const shortCode = crypto.randomBytes(4).toString("hex");

        const url = await URLModel.create({
            originalUrl,
            shortCode,
            expiresAt: expiresAt || null,
        });

        res.status(201).json({
            message: "Short URL created successfully",
            data: url,
        });

    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = {
    CreateURL,
};