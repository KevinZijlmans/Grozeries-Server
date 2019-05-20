const { Router } = require('express')
const Orderline = require('../models').Orderline
const totalSum = require('../logic')
const router = new Router()

router.post('/orders/:id', (req, res, next) => {
    const quantity = req.body.quantity
    const price = req.body.price
    const ProductId = req.body.ProductId
    const OrderId = req.params.id
    Orderline
        .create({ quantity, price, ProductId, OrderId })
        .then(orderline => {
            if (!orderline) {
                return res.status(404).send({
                    message: `orderline does not exist`
                })
            }

            orderline.total_price= totalSum(orderline)
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