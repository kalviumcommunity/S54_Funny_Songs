const express = require("express");
const { Song, User } = require("./data/schema");
const { wrapAsync } = require("./middleware/error");

const signUpRouter = express.Router();
const songRouter = express.Router();
const songEditRouter = express.Router();
const songDeleteRouter = express.Router();

signUpRouter.use(express.json());
songRouter.use(express.json());
songEditRouter.use(express.json());
songDeleteRouter.use(express.json());

class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}


songEditRouter.put("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { SongName, Artist, Release, Category } = req.body;
    const updatedSong = await Song.findByIdAndUpdate(id, { SongName, Artist, Release, Category }, { new: true });
    if (!updatedSong) {
        throw new ExpressError(404, "Song not found!");
    }
    res.send("Updated!");
}));

songDeleteRouter.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const result = await Song.findByIdAndDelete(id);
    if (!result) {
        throw new ExpressError(404, "Song not found!");
    }
    res.send("Deleted!");
}));

module.exports = { signUpRouter, songRouter, songEditRouter, songDeleteRouter , ExpressError };
