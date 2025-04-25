const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { SYSTEM_INSTRUCTION, ABOUT_APP } = require('./chatConfig');

const achievementModel = require('../models/achivement.model.js');
const athleteModel = require('../models/athlete.model.js');
const eventModel = require('../models/event.model.js');
const sponsorModel = require('../models/sponsor.model.js');
const userModel = require('../models/user.model.js');


let ABOUT_ACHIEVEMENTS;
let ABOUT_ATHLETES;
let ABOUT_EVENTS;
let ABOUT_SPONSORS;
let ABOUT_USERS;

// Set up model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",
systemInstruction: SYSTEM_INSTRUCTION});

const CHAT_HISTORY_LIMIT = 1000;
let chatID = 0;
// Store chat history for each chat
const historyStore = {};

async function initChatGemini(pageName) {
  if (chatID == CHAT_HISTORY_LIMIT) {
    chatID = 0;
  }
  ABOUT_ACHIEVEMENTS = await achievementModel.find();
  ABOUT_ATHLETES = await athleteModel.find();
  ABOUT_EVENTS = await eventModel.find();
  ABOUT_SPONSORS = await sponsorModel.find();
  ABOUT_USERS = await userModel.find();

  historyStore[chatID] = [
    {
      role: "user",
      parts: [{
        text:`About the app: ${ABOUT_APP}
        About the achievements: ${ABOUT_ACHIEVEMENTS}
        About the athletes: ${ABOUT_ATHLETES}
        About the events: ${ABOUT_EVENTS}
        About the sponsors: ${ABOUT_SPONSORS}
        About the users: ${ABOUT_USERS}
        Current page of the user: ${pageName}`}],
    },
    {
      role: "model",
      parts: [{
        text:"Okay, I have this information."}],
    },
  ];
  return chatID++;
}

// Sends a message to Gemini and maintains chat history for the given userID
async function chatWithGemini(chatID, userMessage) {
  if (!historyStore[chatID]) {
    throw new Error("Chat session not initialized. Call initChat(userID) first.");
  }
  const chat = model.startChat({ history: historyStore[chatID] });
  //Catagorizing the question
  const result = await chat.sendMessage(`user querry :${userMessage}`);
  return result.response.candidates[0].content.parts[0].text
}

async function initChat(req, res) {
  try {
    const { pageName } = req.body;

    if (!pageName) {
      return res.status(400).json({ error: "pageName is required" });
    }

    const chatID = await initChatGemini(pageName);
    res.json({ chatID });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function chat(req, res) {
  const { chatID, message } = req.body;

  if (!chatID || !message) {
    return res.status(400).json({ error: "Missing userID or message" });
  }

  if (!historyStore[chatID]) {
    return res.status(400).json({ error: "The Chat Hasn't been initialized!" });
  }

  try {
    const response = await chatWithGemini(chatID, message);
    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

router.post('/init', initChat);
router.post('/', chat);

module.exports = router;