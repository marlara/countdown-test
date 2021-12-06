const express = require('express') //https://expressjs.com/
const cors = require('cors') //https://www.npmjs.com/package/cors
const bodyParser = require('body-parser')
const {Sequelize, DataTypes} = require('sequelize')
const config = require('./config/config')

//creates a new express app
let app = express()
app.use(cors())
app.use(bodyParser.json())

//adda a Sequelize instance with SQLite and defines the countdown database
const database = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
  )

//define the model

const Countdown = database.define('Countdown', {
    hours: DataTypes.INTEGER,
    minutes: DataTypes.INTEGER,
    seconds: DataTypes.INTEGER
  })

//routes
//route for all the countdowns

app.get('/countdowns', async (req, res) =>{
  try {
    let countdowns = null
    countdowns = await Countdown.findAll({
        })
    res.send(countdowns)
    } catch (err) {
    res.status(500).send({
        error: 'an error has occured trying to fetch the countdowns'
    })
  }
});

//route for getting a single countdown

app.get('/countdowns/:id', async (req, res) =>{
  try {
    let countdown = null
    countdown = await Countdown.findByPk(req.params.id)
    res.send(countdown)
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to fetch the countdown'
    })
  }
});

//route for creating a new countdown

app.post('/countdowns', async(req, res) =>{
  try{
  const countdown = await Countdown.create(req.body)
  res.send(countdown)
  } catch (err) {
  res.send({
      error: 'an error has occured trying to create the countdown'
  })
  }
});

//route for deleting a countdown

app.delete('/countdowns/:id', async (req, res) =>{
  try {
    let countdown = null
    countdown = await Countdown.findByPk(req.params.id)
    countdown.destroy();
    res.redirect('/countdowns')
  } catch (err) {
    res.status(500).send({
      error: 'an error has occured trying to deleting the countdown'
    })
  }
});

//launches the express app on what is defined by the config/config.js file
database
.sync({ force: false })
.then(() => {
    app.listen(config.port)
    console.log(`Listening to port ${config.port}`)
})



