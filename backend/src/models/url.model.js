const mongoose = require('mongoose')



const urlSchema = new mongoose.Schema({
    
    originalUrl: {
      type: String,
      required: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

const URLModel = mongoose.model("URL",urlSchema);


module.exports = URLModel;