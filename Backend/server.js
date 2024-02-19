const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const { signUpRouter, songRouter, songEditRouter, songDeleteRouter } = require("./Routers");

require("dotenv").config();

const app = express();
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to Database!!!');
    })
    .catch((err) => {
        console.log('Error Connecting to Database:', err);
    });

// Middleware
app.use(express.json());

// Routes
app.get("/ping", (req, res) => {
    res.send("Hi");
});

// Mount routers
app.use("/songs", songRouter);
app.use("/signup", signUpRouter);
app.use("/update", songEditRouter);
app.use("/delete", songDeleteRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
