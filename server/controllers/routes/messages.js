const express = require("express");
const router = express.Router();
const Message = require("../models/messageSchema");
const path = require("path");

const EventEmitter = require("events");

// Create an event emitter instance
const eventEmitter = new EventEmitter();

const landingPage = require("../routes/get");

// Use express.json() middleware to parse JSON data from the request body
router.use(express.json());

// Use express.urlencoded() middleware to parse URL-encoded data from the request body
router.use(express.urlencoded({ extended: true }));

router.post("/messages", async (req, res) => {
  // Emit an event to trigger the a message being sent
  eventEmitter.emit("messageSent", req.body);

  const { name, email, message } = req.body;
  try {
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();
    res.redirect("/");
  } catch (err) {
    console.error({ error: err.message });
    res.sendStatus(500);
  }
});

module.exports = router;
