const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
    {

        teamName: {
            type: String,
            required: [true, 'Team/Pair name is required'],
            trim: true
        },

        player1: {
            fullName: {
                type: String,
                required: [true, 'Player 1 full name is required'],
                trim: true
            },
            phoneNumber: {
                type: String,
                required: [true, 'Player 1 phone number is required'],
                trim: true
            },
            email: {
                type: String,
                required: [true, 'Player 1 email is required'],
                trim: true,
                lowercase: true,
                match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
            },
            age: {
                type: Number,
                min: [5, 'Age must be at least 5 years old'],
                max: [100, 'Age must be less than 100 years old']
            },
            duprNo: {
                type: String,
                required: [true, 'Player 1 DUPR No. is required'],
                trim: true
            }
        },
        player2: {
            fullName: {
                type: String,
                required: [true, 'Player 2 full name is required'],
                trim: true
            },
            phoneNumber: {
                type: String,
                required: [true, 'Player 2 phone number is required'],
                trim: true
            },
            email: {
                type: String,
                required: [true, 'Player 2 email is required'],
                trim: true,
                lowercase: true,
                match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
            },
            age: {
                type: Number,
                min: [5, 'Age must be at least 5 years old'],
                max: [100, 'Age must be less than 100 years old']
            },
            duprNo: {
                type: String,
                required: [true, 'Player 2 DUPR No. is required'],
                trim: true
            }
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: {
                values: ["Men's Doubles", "Women's Doubles"],
                message: 'Invalid category selected'
            }
        },

        paymentScreenshot: {
            type: String,
            required: [true, 'Payment screenshot is required']
        },
        paymentStatus: {
            type: String,
            enum: ['pending', 'verified', 'rejected'],
            default: 'pending'
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Index for faster queries
registrationSchema.index({ eventId: 1 });
registrationSchema.index({ 'player1.email': 1 });
registrationSchema.index({ 'player2.email': 1 });

// Pre-save middleware to validate that player1 and player2 are different people
registrationSchema.pre('save', function (next) {
    // if (this.player1.email === this.player2.email) {
    //     const err = new Error('Player 1 and Player 2 cannot be the same person');
    //     return next(err);
    // }
    next();
});

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
