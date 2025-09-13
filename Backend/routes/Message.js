const messageRouter = require("express").Router();
const Message = require("../models/Message");

//create a message
messageRouter.post("/", async (req, res) => {
    const newMess = new Message(req.body);
    try {
        const savedMess = await newMess.save();
        res.status(200).json(savedMess);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get messages
messageRouter.get("/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = messageRouter;