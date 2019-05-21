const { Router } = require('express')
const mollie = require('@mollie/api-client')({ apiKey: 'test_qcMAbRrhuVzzkVaR6DRMgDq86k8NWt' });
const Order = require('../models').order
const Orderline = require('../models').orderline
const auth = require('../authorization/middleware')

const router = new Router()

router.post('/orders', auth, (req, res, next) => {
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

router.get('/orders', auth, (req, res, next) => {
    const page = req.params.page
    const pageSize = 10
    const offset = req.query.offset || (page - 1) * pageSize
    const limit = req.query.limit || pageSize
    Promise.all([
        Order.count(),
        Order.findAll({ limit, offset })
      ])
        .then(([total, orders]) => {
          res.send({
            orders, total
          })
        })
        .catch(error => next(error))
    })

router.get('/orders/:id', auth, (req, res, next) => {
    Order
        .findByPk(req.params.id, { include: [Orderline] })
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                })
            }
            return res.send(order)
        })
        .catch(error => next(error))
})

router.put('/orders/:id', auth, (req, res, next) => {
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

router.post('/orders/:id/payments', auth, (req, res, next) => {
    const orderId = req.params.id
    // const orderAmount = req.payment_amount
    const orderAmount = '100'
    Order
        .findByPk(orderId)
        .then((order) => {
            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                })
            } order.payment_started = true
            console.log("Order 1 changed payment started to true", order)
            order.save()
            return res.status(200).send({
                message: `Order payment initiated`
            })
        })
        .catch(error => next(error))

    mollie.payments
        .create({
            "amount": {
                "value": "14.00",
                "currency": "EUR"
            },
            "description": `Grozeries Payment with orderId: ${orderId} and with orderAmount: ${orderAmount}`,
            "redirectUrl": `http://localhost:3000/orders/thank-you/`,
            // "webhookUrl":  `http://localhost:4000/payments/${orderId}/webhook/`,
            "webhookUrl": "http://albertsm.it/",
            "method": "ideal"
        })
        .then((payment) => {
            // console.log(payment)
            if (!payment) {
                return res.status(404).send({
                    message: `Mollie payment does not exist`
                })
            }
            // console.log("URL-URL",payment.getPaymentUrl())
            return payment.getPaymentUrl()
        })
        .catch((err) => {
            console.log("ERROR: ", err)
            // Handle the error
        });
})

module.exports = router
