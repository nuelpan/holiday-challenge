'use strict'
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(require('cors')())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(express.static('client'))
app.use('/', routes)
app.use(errorHandler)

app.listen(port, _ => console.log('Server listening at port', port));