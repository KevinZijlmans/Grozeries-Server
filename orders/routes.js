const { Router } = require('express')
const Order = require('./model')
const Product = require('../products/model')

const router = new Router()

router.post('/orders', (req, res, next) => {

    Order
        .create(req.body)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                })
            }
            return res.status(201).send(order)
        })
        .catch(error => next(error))
})

router.get('/orders', (req, res, next) => {
    Order
        .findAll({ include: [Product] })
        .then(orders => {
            res.send(orders)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Something went wrong',
                error: err
            })
        })
})

router.get('/orders/:id', (req, res, next) => {
    Order
        .findByPk(req.params.id, { include: [Product] })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                })
            }
            order.getOrderlines()
                .then(orderlines => {
                    res.send({ ...order.dataValues, orderlines })
                })
                .catch(error => next(error))
        })
})

router.put('/orders/:id', (req, res, next) => {
    Order
        .findByPk(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                })
            }
            return order.update(req.body)
                .then(order => res.send(order))
        })
        .catch(error => next(error))
})

module.exports = router