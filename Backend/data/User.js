const { User } = require("./schema.js");
const mongoose = require("mongoose");

mongoose.connect(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Create user data
const userData = [
    {
        FirstName: "Nivaash",
        LastName: "😶‍🌫️",
        EmailAddress: "nidishnivash@gmail.com",
        Password: "Nivaash_777",
    },
];

User.insertMany(userData)
    .then(() => console.log('Users added successfully!'))
    .catch(err => console.error('Error adding users:', err));

module.exports = { mongoose }; 
