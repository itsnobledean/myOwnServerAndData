// Entry point for the server

// Express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = process.env.path || require("path");
const dotenv = require("dotenv").config();

const EventEmitter = require("events");

// Create an event emitter instance
const eventEmitter = new EventEmitter();

// CORS
const cors = require("cors");
app.use(cors());

// Database Connection
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    // Handle the error appropriately (e.g., exit the application)
    process.exit(1);
  });

// Import Message model
const messagesRoute = require("./routes/messages");
const landingPage = require("./routes/get");

// Static Files
app.use(express.static(path.join(__dirname, "../../client/public")));
app.use(bodyParser.json());

// Middleware
app.use((req, res, next) => {
  console.log("Middleware started");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Routes
// get home page
app.get("/", landingPage);
// click button to get to contact page and send message
app.post("/messages", messagesRoute);

// Event listeners
eventEmitter.on("landingPage", () => {
  console.log("Landing page requested!");
  // Additional actions related to the landing page can be performed here
});

eventEmitter.on("messageSent", (data) => {
  console.log("Message sent:", data);
  // Additional actions related to a message being sent can be performed here
});

// Start Server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
