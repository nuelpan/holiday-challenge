const Contact = require('../models').Contact

class ContactController {
  static create(req, res, next) {
    const { name, phone } = req.body
    Contact.create({
      name,
      phone,
      UserId: req.decodedId
    })
      .then(contact => {
        res.status(201).json({ contact })
      })
      .catch(err => next(err))
  }
  static findAll(req, res, next) {
    Contact.findAll({
      where: { UserId: req.decodedId },
      order: [
        ['updatedAt', 'DESC']
      ]
    })
      .then(contacts => {
        res.status(200).json({ contacts })
      })
      .catch(err => next(err))
  }
  static findOne(req, res, next) {
    Contact.findOne({
      where: { UserId: req.decodedId, id: req.params.id }
    })
      .then(contact => {
        res.status(200).json({ contact })
      })
      .catch(err => next(err))
  }
  static update(req, res, next) {
    const { name, phone } = req.body
    Contact.update(
      {
        name,
        phone
      },
      {
        where: {id: req.params.id}
      }
    )
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => next(err))
  }
  static delete(req, res, next) {
    Contact.destroy({
      where: { id: req.params.id}
    })
      .then(data => {
        res.status(200).json({ data })
      })
      .catch(err => next(err))
  }
}

module.exports = ContactController