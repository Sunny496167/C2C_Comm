const conversationRouter = require("express").Router();
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

//create a conversation
conversationRouter.post("/", async (req, res) => {
    const newConvo = new Conversation({
        members: [req.body.senderId, req.body.recieverId],
    });

    try {
        const savedConvo = await newConvo.save();
        res.status(200).json(savedConvo);
    } catch (err) {
        res.status(500).json(err);
    }
});

//create a group conversation
conversationRouter.post("/group", async (req, res) => {
    const newConvo = new Conversation(req.body);
    try {
        const savedConvo = await newConvo.save();
        res.status(200).json(savedConvo);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get conversations
conversationRouter.get("/:userId", async (req, res) => {
    try {
        const convo = await Conversation.find({ members: { $in: [req.params.userId] } });
        res.status(200).json(convo);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get conversation of 2 users
conversationRouter.get("/find/:firstuserId/:seconduserId", async (req, res) => {
    try {
        let convo = await Conversation.findOne({
            name: "",
            members: { $all: [req.params.firstuserId, req.params.seconduserId] }
        });

        if (!convo) {
            const newConvo = new Conversation({
                members: [req.params.firstuserId, req.params.seconduserId],
            });
            convo = await newConvo.save();
        }
        res.status(200).json(convo);
    } catch (err) {
        res.status(500).json(err);
    }
});

conversationRouter.delete("/:id", async (req, res) => {
    try {
        await Message.deleteMany({ conversationId: req.params.id });
        await Conversation.deleteOne({ _id: req.params.id })
        res.status(200).json("Deleted Conversation!")
    } catch (err) {
        res.status(500).json(err)
    }
})
module.exports = conversationRouter;