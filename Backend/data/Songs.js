const { User,Song } = require("../data/schema.js")
require("dotenv").config({path:'../.env'})
    

const Song1 = new Song({
    SongId: 1,
    SongName: "Funny Song",
    SongLink: "https://open.spotify.com/embed/track/5VD0r0qDYCJvYGNO5wX4ch?utm_source=generator",
    Artist:"Funny Song Studio",
    Release: "2022",
    Category: "Audio",
    likes: "100",
})

const Song2 = new Song({
    SongId: 2,
    SongName: "Alex F",
    SongLink: "https://open.spotify.com/embed/track/0Bo5fjMtTfCD8vHGebivqc?utm_source=generator",
    Artist:"Crazy Frog",
    Release: "2005",
    Category: "Music",
    likes: "3000",
})

const Song3 = new Song({
    SongId: 3,
    SongName: "The Lazy Song",
    SongLink: "https://open.spotify.com/embed/track/386RUes7n1uM1yfzgeUuwp?utm_source=generator",
    Artist:"Bruno Mars",
    Release: "2010",
    Category: "Song",
    likes: "10000",
})

const Song4 = new Song({
    SongId: 4,
    SongName: "Dance Monkey",
    SongLink: "https://open.spotify.com/embed/track/2XU0oxnq2qxCpomAAuJY8K?utm_source=generator&theme=0",
    Artist:"Tones and I",
    Release: "2019",
    Category: "Song",
    likes: "200",
})

const Song5 = new Song({
    SongId: 5,
    SongName: "The Chicken Wing Beat",
    SongLink: "https://open.spotify.com/embed/track/1AOQfIk6infkdfp09vkHvI?utm_source=generator&theme=0",
    Artist:"Funny Minion Guys",
    Release: "2022",
    Category: "Audio",
    likes: "100",
})

const Song6 = new Song({
    SongId: 6,
    SongName: "Goofy Gober Rock",
    SongLink: "https://open.spotify.com/embed/track/3xZek9XkEaX130o3XN9cvd?utm_source=generator",
    Artist:"Spongbob Squarepants",
    Release: "2022",
    Category: "Audio",
    likes: "2000",
})

const Song7 = new Song({
    SongId: 7,
    SongName: "Mission Impossible ( Funny Theme Remix )",
    SongLink: "https://open.spotify.com/embed/track/0wh2YLhRJbWW6yQZd0Hokq?utm_source=generator",
    Artist:"Funny Minion Guys",
    Release: "2015",
    Category: "Audio",
    likes: "10000",
})

const Song8 = new Song({
    SongId: 8,
    SongName: "Gangam Style",
    SongLink: "https://open.spotify.com/embed/track/03UrZgTINDqvnUMbbIMhql?utm_source=generator",
    Artist:"PSY",
    Release: "2019",
    Category: "Audio",
    likes: "2000",
})

const Song9 = new Song({
    SongId: 9,
    SongName: "Jingle Bells ( Minion Remix )",
    SongLink: "https://open.spotify.com/embed/track/3MXMuDAv00mTQR8DYtUB1j?utm_source=generator&theme=0",
    Artist:"Funny Minion Guys",
    Release: "2021",
    Category: "Audio",
    likes: "8000",
})

const Song10 = new Song({
    SongId: 10,
    SongName: "Harry Potter ( Minion Remix )",
    SongLink: "https://open.spotify.com/embed/track/0rCW64jnBDqjcdPClYFPyF?utm_source=generator&theme=0",
    Artist:"Funny Minion Guys",
    Release: "2023",
    Category: "Song",
    likes: "500",
})


const mongoose = require("mongoose")
// Connect to your local MongoDB instance
mongoose.connect(process.env.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to local MongoDB'))
.catch(err => console.error('Error connecting to local MongoDB:', err));

const SongData = [Song1, Song2, Song3, Song4, Song5, Song6, Song7, Song8, Song9, Song10 ];




Song.insertMany(SongData)
.then(() => console.log('Song added successfully!'))
.catch(err => console.error('Error adding Song:', err));