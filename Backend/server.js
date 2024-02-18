// server.js

const express = require("express");
const { MongoClient } = require("mongodb");
var cors = require('cors')
const app = express();
app.use(cors())
const { signUpRouter, songRouter } = require("./Routers")
const mongoose = require("mongoose")
require("dotenv").config()

async function connectDatabase() {
    await mongoose.connect(process.env.mongoUrl)
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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.use("/songs", songRouter)
app.use("/signup", signUpRouter) 

app.listen(3000, () => {
    console.log("Running on port 3000")
})
