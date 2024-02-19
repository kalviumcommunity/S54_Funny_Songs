// Routers.js

const mongoose = require("mongoose")
const express = require("express")
const { Song, User } = require("./data/schema")
const signUpRouter = express.Router()
const songRouter = express.Router()
const editRouter = express.Router()
const deleteRouter = express.Router()


require("dotenv").config()

signUpRouter.use(express.json())
songRouter.use(express.json())
editRouter.use(express.json())
deleteRouter.use(express.json())



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


editRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { Artist, Release, Category } = req.body;
    try {
        const updatedSong = await Song.findByIdAndUpdate(id, { Artist, Release, Category }, { new: true });
        if (!updatedSong) {
            return res.status(404).send('Song not found');
        }
        res.status(200).json(updatedSong);
    } catch (error) {
        console.error('Error updating song:', error);
        res.status(500).send('Internal server error');
    }
});

deleteRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSong = await Song.findByIdAndDelete(id);
        if (!deletedSong) {
            return res.status(404).send('Song not found');
        }
        res.status(200).send('Song deleted successfully');
    } catch (error) {
        console.error('Error deleting song:', error);
        res.status(500).send('Internal server error');
    }
});




module.exports = { songRouter, signUpRouter, editRouter, deleteRouter };
