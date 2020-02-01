const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://marcelo:qwer4321@cluster0-q7aco.mongodb.net/crud-nodejs?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
    if (err) return console.log(err)
    db = client.db('crud-nodejs') // coloque o nome do seu DB

    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs')
    var cursor = db.collection('data').find()
})

app.post('/show', (req, res) => {
    db.collection('data').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log('Salvo no Banco de Dados')
        res.redirect('/show')
    })
})

app.get('/show', (req, res) => {
  db.collection('data').find().toArray((err, results) => {
      if (err) return console.log(err)
      res.render('show.ejs', { data: results })

  })
})

app.get('/edit/:id', (req, res) => {
  var id = req.params.id

  db.collection('data').find(ObjectId(id)).toArray((err, result) => {
    if(err) return res.send(err)
    res.render('edit.ejs', { data: result })
  })
})

app.post('/edit/:id', (req, res) => {
  var id = req.params.id
  var name = req.body.name
  var surname = req.body.surname

  db.collection('data').updateOne({_id: ObjectId(id)}, {
    $set: {
      name: name,
      surname: surname
    }
  }, (err, result) => {
    if(err) return res.send(err)
    res.redirect('/show')
    console.log('Atualizado o Banco de Dados')
  })
})

app.get('/delete/:id', (req, res) => {
  var id = req.params.id

  db.collection('data').deleteOne({_id: ObjectId}, (err, result) => {
    if(err) return res.send(500, err)
    console.log('Deletado do Banco de Dados')
    res.redirect('/show')
  })
})