const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Counter Schema for auto-incrementing UserId
const CounterSchema = new Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 } // Starting value for UserId
});

const Counter = mongoose.model('Counter', CounterSchema);

// User Schema
const UserSchema = new Schema({
    UserId:{
        type:Number,
        unique: true
    },
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    EmailAddress: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
}, { timestamps: true });

// Pre-save hook to generate auto-incremented UserId
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isNew) {
        return next();
    }
    try {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'userId' }, 
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        user.UserId = counter.sequence_value;
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model("User", UserSchema);

// Song Schema
const SongSchema = new Schema({
    SongId: {
        type: Number,
    },
    SongName: {
        type: String,
        required: true 
    },
    SongLink: {
        type: String,
        required: true 
    },
    Release: {
        type: Number,
        required: true
    },
    Artist: {
        type: String, 
        required: true
    },
    Category: {
        type: String,
        required: true
    },
    Created_by: {
        type: String
    },
    time: { type: Date, default: Date.now() }
}, { timestamps: true });

const Song = mongoose.model("Song", SongSchema);

module.exports = { User, Song };
