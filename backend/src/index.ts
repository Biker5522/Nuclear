import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
require('dotenv').config()

const app = express()
app.use(express.json())

//Deployment
__dirname = path.resolve()
let NODE_ENV = 'producti'
if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.use('/', (req, res) => {
    res.send('Nuclear World')
    console.log('0')
  })
}

//Database
mongoose.connect(
  'mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@rest.xarzi.mongodb.net/NuclearDb?retryWrites=true&w=majority',
  () => console.log('Connected to Database'),
)

app.listen(process.env.PORT || 5000, () => console.log('Server Running'))
