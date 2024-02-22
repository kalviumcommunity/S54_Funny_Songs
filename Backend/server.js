// server.js

const express = require("express");
const { MongoClient } = require("mongodb");
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());
const { signUpRouter, songRouter , editRouter , deleteRouter, postRouter } = require("./Routers")
const mongoose = require("mongoose")
require("dotenv").config()

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.mongoUrl);
        console.log('Connected to Database!!!');
    } catch (error) {
        console.error('Error connecting to Database:', error);
    }
}

app.get("/ping", (req, res) => {
    res.send("Hi");
});

app.get("/", (req, res) => {
    connectDatabase()
        .then(() => {
            console.log('Connected to Database!!!')
        })
    res.status(200).send("Connected to Database!!!")
    });

app.use("/songs", songRouter)
app.use("/signup", signUpRouter) 
app.use("/edit",editRouter)
app.use("/delete",deleteRouter)
app.use("/post",postRouter)


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

