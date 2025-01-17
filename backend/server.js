const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')

mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)

require('dotenv').config()

const app = express()
app.use(cookieParser())
app.use(cors())
app.use(bodyParser.json())
app.use(fileUpload({
	createParentPath: true,
    limits: { 
        fileSize: 256 * 1024 * 1024 //256MB
	},
}))

if(!process.env.DBUsername){
	console.log("Missing process.env.DBUsername")
	return
}
if(!process.env.DBPassword){
	console.log("Missing process.env.DBPassword")
	return
}
if(!process.env.DBName){
	console.log("Missing process.env.DBName")
	return
}

mongoose.connect(`mongodb+srv://${process.env.DBUsername}:${process.env.DBPassword}@prak.oew3t.gcp.mongodb.net/${process.env.DBName}?retryWrites=true&w=majority`)

// routes
app.get('/documentation', function(req, res) {
    res.sendFile(__dirname+'/API documentation.html')
})

app.use('/uploads', require('./routes/uploads'))
app.use('/pages', require('./routes/pages'))

app.use('/user', require('./routes/user'))
app.use('/auth', require('./routes/auth'))

app.use('/metadata', require('./routes/metadata'))
app.use('/corporationIndex', require('./routes/corporationIndex'))
app.use('/creationIndex', require('./routes/creationIndex'))
app.use('/familyIndex', require('./routes/familyIndex'))
app.use('/geographicIndex', require('./routes/geographicIndex'))
app.use('/keywordIndex', require('./routes/keywordIndex'))
app.use('/personIndex', require('./routes/personIndex'))
app.use('/subjectIndex', require('./routes/subjectIndex'))

const port = process.env.PORT || 50081 
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`)
})
