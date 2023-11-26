// In models/messageSchema.js
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  // Define your schema fields here
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("Message", messageSchema);
