const { Router } = require('express')
const totalSum = require('../logic')
const Order = require('../models').Order
const Orderline = require('../models').Orderline
// const Product = require('../models').Product

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
        .catch(err => {
            res.status(500).send({
                message: 'Something went wrong',
                error: err
            })
        })
})

router.get('/orders', (req, res, next) => {
    Order
        .findAll()
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
        .findByPk(req.params.id
            , { include: [Orderline] }
        )
        .then(order => {

            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                })
            }

            // Orderline
            //     .findAll()
            //     .then(orderlines => {
            //         console.log('orderlines price', orderlines.dataValues)
            //         order.total_price = totalSum(orderlines, order)
            //     })
            return res.send(order)
        })
        .catch(error => next(error))
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
