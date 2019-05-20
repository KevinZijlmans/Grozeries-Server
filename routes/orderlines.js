const { Router } = require('express')
const Orderline = require('../models').orderline
const Order = require('../models').order
const auth = require('../authorization/middleware')
const Product = require('../models').product

const router = new Router()

router.post('/orders/:id', auth, (req, res, next) => {
    const quantity = req.body.quantity
    const price = req.body.price
    const productId = req.body.productId
    const orderId = req.params.id
    Order
        .findByPk(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                })
            }
            else {
                Orderline
                    .create({ quantity, price, productId, orderId })
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
            }
        })
})

router.get('/orders/:id/orderlines', auth, (req, res, next) => {
    Order
        .findByPk(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                })
            }

            Orderline
                .findAll({ where: { orderId: order.id }, include: [Product] })
                .then(orderlines => {
                    res.send(orderlines)
                })
                .catch(err => {
                    res.status(500).send({
                        message: 'Something went wrong',
                        error: err
                    })
                })
        })
})
module.exports = router