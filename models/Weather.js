
const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  date: { type: Date, default: Date.now },
  temperature: { type: Number, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }
});

module.exports = mongoose.model('Weather', weatherSchema);