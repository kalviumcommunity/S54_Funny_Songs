const express = require('express')
const app = express()
const port =3000
const connectDB = require('./db')

app.use(express.json())

connectDB()

app.get('/',(req, res)=>{
    res.send('<h1>🎼 FunnySongs 😂</h1>');
})

if (require.main === module) {
	app.listen(port, () => {
		console.log(`server running on PORT: ${port}`)
	})
}

module.exports = app

