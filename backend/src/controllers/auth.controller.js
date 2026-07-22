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

async function GetURLs(req, res) {
    try {
        const urls = await URLModel.find().sort({ createdAt: -1 });
        return res.status(200).json({ data: urls });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function DeleteURL(req, res) {
    try {
        const { id } = req.params;
        const deleted = await URLModel.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "URL not found" });
        }

        return res.status(200).json({ message: "URL deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function RedirectURL(req, res) {
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
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    CreateURL,
    GetURLs,
    DeleteURL,
    RedirectURL,
};
