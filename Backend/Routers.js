const express = require("express");
const { Song, User } = require("./data/schema");
const { userSignupSchema, songSchema, validate } = require("./Validation");
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

const songRouter = express.Router();
const signUpRouter = express.Router();
const postRouter = express.Router();
const editRouter = express.Router();
const deleteRouter = express.Router();
const usersRouter = express.Router();


// Apply JSON parsing middleware to all routers
signUpRouter.use(express.json());
songRouter.use(express.json());
editRouter.use(express.json());
deleteRouter.use(express.json());
postRouter.use(express.json());
usersRouter.use(express.json());

// Routes (using validation middleware)


songRouter.get("/", async (req, res) => {
    await Song.find().then((data) => {
        returnData = data
        res.send(data)
    })
})


usersRouter.get("/", async (req, res) => { // Define the route handler for /users GET endpoint
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json(users); // Send the users as JSON response
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
});


signUpRouter.post("/", validate(userSignupSchema), async (req, res) => {
    const { FirstName, LastName, EmailAddress, Password } = req.body;

    try {

        const hashedPassword = crypto.createHash('sha256').update(Password).digest('hex');

        const newUser = new User({
            FirstName: FirstName,
            LastName: LastName,
            EmailAddress: EmailAddress,
            Password: hashedPassword
        });

        // Save the user
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, 'secretKey'); // Replace 'your-secret-key' with your actual secret key
        
        // Send response with token
        res.status(201).json({ token }); // You may want to send additional data along with the token
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal server error');
    }
});




// Add song route with validation middleware
postRouter.post("/", validate(songSchema), async (req, res) => {
    const { SongName, SongLink, Artist, Release, Category,Created_by } = req.body;
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
            Created_by
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

// Export routers
module.exports = { songRouter, postRouter, signUpRouter, editRouter, deleteRouter , usersRouter };
