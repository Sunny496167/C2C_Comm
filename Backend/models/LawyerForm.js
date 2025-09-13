const mongoose = require('mongoose');


const LawyerFormSchema = new mongoose.Schema({
    lawyerId: {
        type: String,
    },
    formType: {
        type: String,
    },
    clients: {
        type: Array,
    },
    address: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    email: {
        type: String,
    },
    contactNumber: {
        type: Number,
    },
    caseID: {
        type: String,
        unique: true,
        required: true,
    },
    caseName: {
        type: String,
    },
    caseSections: {
        type: String,
    },
    caseNotes: {
        type: String,
        max: 3500,
    },
    defender: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("LawyerForm", LawyerFormSchema);