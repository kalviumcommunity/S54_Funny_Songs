const Song = require("./schema.js")
require("dotenv").config({path:'../.env'})


const Song1 = new Song({
    SongId: 1,
    SongName: "Funny Song",
    SongLink: "https://youtu.be/yz8NSvmAaDw?feature=shared",
    Artist:"Funny Song Studio",
    Release: "2022",
    Category: "Audio",
    likes: "100",
})

const Song2 = new Song({
    SongId: 2,
    SongName: "Alex F",
    SongLink: "https://youtu.be/k85mRPqvMbE?feature=shared",
    Artist:"Crazy Frog",
    Release: "2005",
    Category: "Music",
    likes: "3000",
})

const Song3 = new Song({
    SongId: 3,
    SongName: "The Lazy Song",
    SongLink: "https://youtu.be/fLexgOxsZu0?feature=shared",
    Artist:"Bruno Mars",
    Release: "2010",
    Category: "Song",
    likes: "10000",
})

const Song4 = new Song({
    SongId: 4,
    SongName: "Dance Monkey",
    SongLink: "https://youtu.be/1__CAdTJ5JU?feature=shared",
    Artist:"Tones and I",
    Release: "2019",
    Category: "Song",
    likes: "200",
})

const Song5 = new Song({
    SongId: 5,
    SongName: "Minion Voice",
    SongLink: "https://youtu.be/BAJPLCXu0o8?feature=shared",
    Artist:"Free Sound Effects",
    Release: "2022",
    Category: "Audio",
    likes: "100",
})

const Song6 = new Song({
    SongId: 6,
    SongName: "Meme Audio Mix",
    SongLink: "https://youtu.be/z_EdpzSyhoY?feature=shared",
    Artist:"doggity",
    Release: "2022",
    Category: "Audio",
    likes: "2000",
})

const Song7 = new Song({
    SongId: 7,
    SongName: "Suspense",
    SongLink: "https://youtu.be/QEjxSLTe5_M?feature=shared",
    Artist:"Gaming Sound FX",
    Release: "2015",
    Category: "Audio",
    likes: "10000",
})

const Song8 = new Song({
    SongId: 8,
    SongName: "Wasted",
    SongLink: "https://youtu.be/apBgEkC2NY0?feature=shared",
    Artist:"Free Sound Effects",
    Release: "2019",
    Category: "Audio",
    likes: "2000",
})

const Song9 = new Song({
    SongId: 9,
    SongName: "Epic Notification Spam",
    SongLink: "https://youtu.be/P_fhU5XsmuQ?feature=shared",
    Artist:"Astian",
    Release: "2021",
    Category: "Audio",
    likes: "8000",
})

const Song10 = new Song({
    SongId: 10,
    SongName: "Rizz",
    SongLink: "https://youtu.be/THb84xO_PY0?feature=shared",
    Artist:"Phantomx",
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

const SongData = [Song1, Song2, Song3, Song4, Song5, Song6, Song7, Song8, Song9, Song10];

// Song.insertMany(SongData)
// .then(() => console.log('Song added successfully!'))
// .catch(err => console.error('Error adding Song:', err));