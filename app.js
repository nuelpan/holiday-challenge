'use strict'
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes')

app.set('view engine', 'ejs')

// app.use(require('cors')())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/', routes)

app.listen(port, _ => console.log('Server listening at port', port));