const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    role: { type: String, required: true },
    description: { type: String },
    present: { type: Boolean, default: false }, // Indicates if the user is currently working here
});

const educationSchema = new mongoose.Schema({
    institute: { type: String, required: true },
    degreeName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    grade: { type: String },
    course: { type: String, required: true },
    present: { type: Boolean, default: false }, // Indicates if the user is currently studying here
});

const professionalSchema = new mongoose.Schema({
    barCouncilNumber: { type: String, required: true }, // Mandatory for lawyers
    practiceArea: { type: String, required: true }, // Area of expertise
    extraCertificates: { type: String }, // Additional certifications
    languages: [{ type: String }], // Array of languages spoken
});

const ratingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who gave the rating
    rating: { type: Number, min: 1, max: 5 }, // Rating value (1-5)
});

const connectionSchema = new mongoose.Schema({
    contactorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who sent the request
    seen: { type: Boolean, default: false }, // Indicates if the request has been seen
});

const paymentHistorySchema = new mongoose.Schema({
    paymentId: { type: String, required: true }, // Unique payment ID
    amount: { type: Number, required: true }, // Payment amount
    currency: { type: String, default: 'INR' }, // Currency (default: INR)
    createdAt: { type: Date, default: Date.now }, // Payment timestamp
});

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
    middlename: {
        type: String,
        default: "",
        maxlength: 15,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
    },
    birthDate: {
        type: Date,
    },
    education: [educationSchema],
    experience: [experienceSchema],
    professional: [professionalSchema],
    summary: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "",
    },
    wallPaper: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    emailId: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of connected users
    pendingContacts: [connectionSchema], // Array of pending connection requests
    sentContact: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of sent connection requests
    isLawyer: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    rating: [ratingSchema], // Array of ratings received
    geoLocation: {
        city: {
            type: String,
            default: '',
        },
        state: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: 'India',
        },
    },
    lawyerType: {
        type: String,
        default: "",
    },
    yearsOfExperience: {
        type: Number,
        default: 0,
    },
    noOfCases: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending',
    },
    confirmationCode: {
        type: String,
        unique: true,
    },
    subscriptionType: {
        type: String,
        enum: ['Free', 'Basic', 'Premium'], // Example subscription types
        default: 'Free',
    },
    subscriptionExpiry: {
        type: Date,
    },
    paymentHistory: [paymentHistorySchema], // Array of payment history
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);