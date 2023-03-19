const express = require('express')
const app = express()
const port = 8080;

const db = require('./config/mongoose')

app.use(express.json())

const subscriberRouter = require('./routes/index')

app.get('/', (req, res) => {
    res.send('<h1>REST APIs for CRUD App</h1>')
})

app.use('/subscriber', subscriberRouter)

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`)
        return;
    }
    console.log(`Server is up and running on port : ${port}`)
})