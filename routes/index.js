const express = require('express');
const router = express.Router()

router.use('/', (req,res) => {
  res.render('index', {something: 'this is something'})
})

module.exports = router