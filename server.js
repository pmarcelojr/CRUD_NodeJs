const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://marcelo:qwer4321@cluster0-q7aco.mongodb.net/crud-nodejs?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
  if (err)
    return console.log(err)
  db = client.db('crud-nodejs')

  app.listen(3000, () => {
    console.log('Server running on Port 3000')
  })
})

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', (request, response) => {
  response.render('index.ejs')
  let cursor = db.collection('data').find()
});

app.get('/show', (request, response) => {
  db.collection('data').find().toArray((err, results) => {
    if(err)
      return console.log(err)
      response.render('show.ejs', { data: results })
  })
})

app.post('/show', (request, response) => {
  db.collection('data').save(request.body, (err, result) => {
    if (err)
      return console.log(err)
    
    console.log('Salvo no Banco de Dados')
    response.redirect('/show')
  })
})