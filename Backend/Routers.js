const mongoose = require("mongoose")
const express = require("express")
const { Song, User } = require("./data/schema")
const songRouter = express.Router()
const signUpRouter = express.Router()
const postRouter = express.Router()
const editRouter = express.Router()
const deleteRouter = express.Router()


require("dotenv").config()

signUpRouter.use(express.json())
songRouter.use(express.json())
editRouter.use(express.json())
deleteRouter.use(express.json())
postRouter.use(express.json())


async function connect() {
    await mongoose.connect(process.env.mongoUrl)
}

connect()
    .then(() => {
        console.log("Connected to Database!!!")
    }).catch((err) => {
        console.log("Error Connecting to Database!!!")
    })

songRouter.get("/", async (req, res) => {
    await Song.find().then((data) => {
        returnData = data
        res.send(data)
    })
})

signUpRouter.post("/", async (req, res) => { 
    const { FirstName, LastName, EmailAddress, Password } = req.body;
    console.log(req.body);
    try {
        const newUser = new User({
            FirstName: FirstName,
            LastName: LastName,
            EmailAddress: EmailAddress,
            Password: Password
        });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error');
    }
});

postRouter.post("/", async (req, res) => {
    const { SongName, SongLink, Artist, Release, Category } = req.body;
    try {
        // Find the highest existing SongId
        const highestSong = await Song.findOne().sort({ SongId: -1 });

        // Determine the new SongId
        const newSongId = highestSong ? highestSong.SongId + 1 : 1;

        // Create the new song with the assigned SongId
        const newSong = new Song({
            SongId: newSongId,
            SongName,
            SongLink,
            Artist,
            Release,
            Category,
        });

        // Save the new song
        await newSong.save();
        res.status(201).send('Song added successfully');
    } catch (error) {
        console.error('Error adding song:', error);
        res.status(500).send('Internal server error');
    }
});



editRouter.put("/:songId", async (req, res) => {
    try {
        const { songId } = req.params;
        const { SongName, SongLink, Artist, Release, Category } = req.body;
        const updatedSong = await Song.findOneAndUpdate({ SongId: songId }, {
            SongName,
            SongLink,
            Artist,
            Release,
            Category
        }, { new: true });
        if (!updatedSong) {
            return res.status(404).send('Song not found');
        }
        res.json(updatedSong);
    } catch (error) {
        console.error('Error updating song:', error);
        res.status(500).send('Internal server error');
    }
});


deleteRouter.delete('/:songId', async (req, res) => {
    try {
        const { songId } = req.params;

        // Find the song by SongId and delete it
        const deletedSong = await Song.findOneAndDelete({ SongId: songId });

        if (!deletedSong) {
            return res.status(404).send('Song not found');
        }

        res.status(200).send('Song deleted successfully');
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = { songRouter, postRouter, signUpRouter, editRouter, deleteRouter };