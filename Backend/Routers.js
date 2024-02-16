// Routers.jsx

const mongoose = require("mongoose")
const express = require("express")
const { Song, User } = require("./data/schema")
const app = express()
const router = express.Router()
const songRouter = express.Router()
require("dotenv").config()

signuprouter.use(express.json())
songRouter.use(express.json())

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

router.post("/", async (req, res) => { 
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

module.exports = { songRouter, router }

