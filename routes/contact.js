const router = require('express').Router()
const ContactController = require('../controllers/ContactController')
const { authenticate, authorize } = require('../middlewares/auth')

router.post('/', authenticate, ContactController.create)
router.get('/', authenticate, ContactController.findAll)
router.get('/:id', authenticate, ContactController.findOne)
router.put('/:id', authenticate, authorize, ContactController.update)
router.delete('/:id', authenticate, authorize, ContactController.delete)
module.exports = router