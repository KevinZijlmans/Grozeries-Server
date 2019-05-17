const { Router } = require('express')
const Orderline = require('../models').Orderline

const router = new Router()

router.post('/orders/:id', (req, res, next) => {
const quantity = req.body.quantity
const price = req.body.price
const productId = req.body.productId
const orderId = req.params.id
    Orderline
        .create({quantity, price, productId, orderId})
        .then(orderline => {
            if (!orderline) {
                return res.status(404).send({
                    message: `orderline does not exist`
                })
            }
            return res.status(201).send(orderline)
                })
            .catch(err => {
                res.status(500).send({
                    message: 'Something went wrong',
                    error: err
                })
            })
        })

    module.exports = router