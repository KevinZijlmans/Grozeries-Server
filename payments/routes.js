const { Router } = require('express')
const Order = require('./model')
const Orderline = require('../orderlines/model')
const Payment = require('../products/model')
const auth = require("../authorization/middleware")
const mollie = require('@mollie/api-client')({ apiKey: 'test_qcMAbRrhuVzzkVaR6DRMgDq86k8NWt' });

const router = new Router()

router.post('/orders/:id/payments', (req, res, next) => {
    const orderId = req.params.id
    console.log("orderId NUMMER", orderId)
    // const orderAmount = req.payment_amount
    const orderAmount = '100'
    Order
    .findByPk(req.params.id)
    .then(order => {
        if (!order) {
            return res.status(404).send({
                message: `order does not exist`
            }) 
        } order.payment_started = true
        order.save()
        return order
    })
    Payment
        .create({order_id : 1, payment_amount: '100'})
        .then(payment => {
            console.log("PAY BITCH", payment)
            if (!payment) {
                return res.status(404).send({
                    message: `payment does not exist`
                })
            }
            return res.status(201).send(payment)
        })
        // .save()
        // .then(payment => {
        // })
        .catch(error => next(error))
        // console.log("Payment.create", Payment.create({order_id : 1, payment_amount: 100}))
        // console.log("Payment: ",Payment)
    
    mollie.payments
        .create({
            "amount": {
                "value": "1.00",
                "currency": "EUR"
            },
            "description": `Grozeries Payment with orderId: ${orderId}`,
            "redirectUrl": "http://localhost:3000/products/1",
            // "webhookUrl":  `http://localhost:4000/payments/${orderId}/webhook/`,
            "webhookUrl":  "http://albertsm.it/",
            "method": "ideal"
            })
        .then((payment) => {
            console.log(payment)
            if (!payment) {
                return res.status(404).send({
                    message: `Mollie payment does not exist`
                })
            }
            return payment.getPaymentUrl()
            })
        .catch((err) => {
            console.log("ERROR: ",err)
            // Handle the error
            });
})

// router.post(`payments/${paymentId}/webhook/`, auth, (req, res, next) => {
//     const orderId = req.params.id
//     Payment
//     .findByPk(orderId)
//     .then(payment => payment.payment_ok = true)
//     .save()
// })


module.exports = router

