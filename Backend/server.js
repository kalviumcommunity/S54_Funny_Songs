// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors module
const { songRouter, signUpRouter, editRouter, deleteRouter, postRouter } = require("./Routers");
require("dotenv").config();
const app = express();
const PORT = 3000;

    // Connect to MongoDB
    async function connectDatabase() {
        try {
            await mongoose.connect(process.env.mongoUrl);
            console.log('Connected to Database!!!');
        } catch (error) {
            console.error('Error connecting to Database:', error);
        }
    }
    // Middleware for CORS and JSON parsing
    app.use(cors());
    app.use(express.json());

    // Routes
    app.get("/ping", (req, res) => {
        res.send("Hi");
    });

    // Connect to database route
    app.get("/", (req, res) => {
        connectDatabase()
            .then(() => {
                console.log('Connected to Database!!!')
            });
        res.status(200).send("Connected to Database!!!")
    });

    // Routes using the routers
    app.use("/Songs", songRouter);
    app.use("/signup", signUpRouter);
    app.use("/edit", editRouter);
    app.use("/delete", deleteRouter);
    app.use("/post", postRouter);

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send("Something went wrong!");
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
