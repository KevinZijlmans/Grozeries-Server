const { Router } = require('express')
const Order = require('./model')
const Orderline = require('../orderlines/model')
const Payment = require('../products/model')
const auth = require("../authorization/middleware")


const router = new Router()

router.post('/orders/:id/payments', auth, (req, res, next) => {
    const orderId = req.params.id
    const orderAmount = req.payment_amount
    Order
    .findByPk(req.params.id, { include: [Payment] })
    .then(order => {
        if (!order) {
            return res.status(404).send({
                message: `order does not exist`
            }) 
        } const newOrder = (order.payment_initiated = true)
        return newOrder.save()
    })
    Payment
        .create(orderId, orderAmount)
        .save()
        .catch(error => next(error))
})

router.post('/orders/:id/payment', auth, (req, res, next) => {
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

