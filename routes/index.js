const express = require('express');
const router = express.Router()
const userRoute = require('./user')
const contactRoute = require('./contact')
const path = require('path')

router.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
router.use('/', userRoute)
router.use('/contact', contactRoute)

module.exports = router