const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
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

const User = mongoose.model("User", UserSchema);

// Song Schema
const SongSchema = new Schema({
    SongId: {
        type: Number,
        required: true
    },
    SongName: {
        type: String,
        required: true 
    },
    SongLink: {
        type: String,
        required: true 
    },
    Release: Number,
    Category: String,
    Artist: String,
    likes: Number,
    time: { type: Date, default: Date.now() }
}, { timestamps: true });

const Song = mongoose.model("Song", SongSchema);

module.exports = { User, Song };
