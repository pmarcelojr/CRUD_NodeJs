const express = require('express');

const app = express()

app.set('view engine', 'ejs')

app.get('/', (request, Response) => {
  Response.render('index.ejs')
});

app.listen(3000);