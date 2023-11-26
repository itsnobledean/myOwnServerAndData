const express = require("express");
const path = require("path");
const router = express.Router();

const EventEmitter = require("events");

// Create an event emitter instance
const eventEmitter = new EventEmitter();

// Define the path to your landing page HTML file
const landingPagePath = path.join(
  __dirname,
  "../../../client/public/pages/index.html"
);

router.get("/", (req, res) => {
  // Emit an event to trigger the landing page HTML file
  eventEmitter.emit("landingPage", res);

  // Send the landing page HTML file
  res.sendFile(landingPagePath);
});

module.exports = router;
