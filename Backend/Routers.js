const mongoose = require("mongoose")
const express = require("express")
const Song  = require("./data/schema")
const app = express()
const router = express.Router()
require("dotenv").config()

app.use(express.json())

async function connect(){
    await mongoose.connect(process.env.mongoUrl)
}

connect()
.then(() => {
    console.log("Connected to Database!!!")
}).catch((err) => {
    console.log("Error Connecting to Database!!!")
})

router.get("/", async (req,res) => {
    await Song.find().then((data) => {
        returnData = data
        res.send(data)
    })
})

// router.post("/", async (req,res) => {
//     const newdata = new Song(req.body)
//     await newdata.save().then((result) => {
//         res.send("New Song Added!!!")
//     }).catch((err) => {
//         res.status(500).send(err)
//     })
// })

// router.put("/:SongId", async (req,res)=> {
//     try{
//         let {SongId} = req.params
//         let newData = req.body

//         let result  = await Song.findOneAndUpdate({SongId: SongId}, newData)

//         if (result === null || result === undefined){
//             res.status(404).send(err)
//         }
//         else{
//             res.send("Updated!!!")
//         }c d
//     }catch(err){
//         res.status(500).send("Error!!!: ",err.message)
//     }
// })

// router.delete("/", async (req,res) => {
//     let deleteSong = req.body.title

//     try{
//         let result = await Song.deleteOne({title: deleteSong})

//         if(result.deletedCount == 0){
//             res.status(404).send("Song not found!!!!")
//         }
//         else{
//             res.send("Song Deleted!!!")
//         }
//     }catch(err){
//         res.status(500).send("Error Deleting Song",err.message)
//     }


// })

module.exports= {
    router
}