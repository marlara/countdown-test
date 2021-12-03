const express = require('express') //https://expressjs.com/
const cors = require('cors') //https://www.npmjs.com/package/cors
const morgan = require('morgan') //https://www.npmjs.com/package/morgan
const bodyParser = require('body-parser')
const {Sequelize, DataTypes} = require('sequelize')
const config = require('./config/config')

//creates a new express app
let app = express()
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json())

//adda a Sequelize instance with SQLite and defines the countdown database
const database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite'
  })

const Countdown = database.define('Countdown', {
    title: DataTypes.STRING,
    hours: DataTypes.INTEGER,
    minutes: DataTypes.INTEGER,
    seconds: DataTypes.INTEGER
  })


//launches the express app on what is defined by the config/config.js file
Countdown
.sync({ force: false })
.then(() => {
    app.listen(config.port)
    console.log(`Listening to port ${config.port}`)
})

//define an endpoint for the creating a countdown
app.route('/countdowns')
  .post, async(req, res) =>{
    try{
      const countdown = await Countdown.create(req.body)
      res.send(countdown)
    } catch (err) {
      res.send({
        error: 'an error has occured'
      })
    }
}
