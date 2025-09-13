const lawyerFormRouter = require("express").Router();
const LawyerForm = require("../models/LawyerForm");

//create a form
lawyerFormRouter.post("/", async (req, res) => {
    const newForm = new LawyerForm(req.body);

    try {
        const savedForm = await newForm.save();
        res.status(200).json(savedForm);
    } catch (err) {
        res.status(500).json(err);
    }
});


//delete a form
lawyerFormRouter.delete("/:id/:lawyerId", async (req, res) => {
    try {
        const form = await LawyerForm.findById(req.params.id);
        if (form.lawyerId === req.params.lawyerId) {
            await form.deleteOne();
            res.status(200).json("Form deleted");
        } else {
            res.status(403).json("You can delete only your Form");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//edit a form
lawyerFormRouter.put("/:id", async (req, res) => {
    try {
        const form = await LawyerForm.findById(req.params.id);
        if (form.lawyerId === req.body.lawyerId) {
            await Post.updateOne({ $set: req.body });
            res.status(200).json("Form Updated");
        } else {
            res.status(403).json("You can update only your Form");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get forms
lawyerFormRouter.get("/:lawyerId", async (req, res) => {
    try {
        const userForms = await LawyerForm.find({ lawyerId: req.params.lawyerId });
        res.status(200).json(userForms);
    } catch (err) {
        res.status(500).json(err);
    }
});


//search form with caseID
lawyerFormRouter.get("/form/:caseID", async (req, res) => {
    try {
        const form = await LawyerForm.findOne({ caseID: req.params.caseID });
        res.status(200).json(form);
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = lawyerFormRouter;