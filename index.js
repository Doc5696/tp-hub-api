const express = require('express')
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')

const app = express()
 
const mongoClient = new MongoClient('mongodb://localhost:27017/', { useNewUrlParser: true })

const port = 8080
 
let dbClient
 
app.use(express.static(__dirname + '/public'))
app.use(cors())

mongoClient.connect(function(err, client){
  
  if(err) return console.log(err)

  require('./routes')(app, client)

  dbClient = client

  app.locals.users = client.db('TPHub').collection('users')

  app.listen(port, function(){
    console.log(`Server is running on ${port} port`)
  })

})

process.on('SIGINT', () => {
  dbClient.close()
  process.exit()
})
