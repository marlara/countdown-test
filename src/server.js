const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

//create a new express app

let app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/status', (req, res) =>{
    res.send({
        message: "hello world!"
    })
})

//add a Sequelize instance with SQLite
let database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite'
  })
  
  let Countdown = database.define('countdown', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT
  })


// Resets the database and launches the express app on :8081
database
.sync({ force: true })
.then(() => {
    app.listen(8081, () => {
    console.log('listening to port localhost:8081')
    })
})
