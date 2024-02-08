const mongoose = require("mongoose")

const schema = mongoose.Schema

const SongSchema = new schema({
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
    Artist:String,
    Name:String,
    UserName:String,
    Password:String,
    likes: Number,
    time: { type: Date, default: Date.now() }
},{ timestamps: true })

const Songs = mongoose.model("Song",SongSchema)

module.exports = Songs
