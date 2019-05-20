const { Router } = require('express')
const Order = require('./model')
const Orderline = require('../orderlines/model')
const Product = require('../products/model')
const auth = require("../authorization/middleware")
const mollie = require('@mollie/api-client')({ apiKey: 'test_qcMAbRrhuVzzkVaR6DRMgDq86k8NWt' });


const router = new Router()

router.post('/orders', auth, (req, res, next) => {

    Order
        .create(req.body)
        .then(order => {
            return Orderline.create(req.body).then(orderline => {
                return order.addOrderline(orderline).then(result => {
                    if (!orderline) {
                        return res.status(404).send({
                            message: `orderline does not exist`
                        })
                    }
                    return res.status(201).send(order)

                })
            })
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
        .findAll({ include: [Orderline] })
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

router.post('/orders/:id/payments', (req, res, next) => {
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
        res.status(200).send({
            message: `Order payment initiated`
        })
    })
    .catch(error => next(error))
    
    mollie.payments
        .create({
            "amount": {
                // "value": `${orderAmount}`,
                "value": "18.00",
                "currency": "EUR"
            },
            "description": `Grozeries Payment with orderId: ${orderId} and with orderAmount: 
            ${orderAmount}`,
            "redirectUrl": `https://52965898.ngrok.io/orders/`,
            "webhookUrl":  `https://52965898.ngrok.io/orders/${orderId}/webhook/`
            })
        .then((payment) => {
            console.log("Payment created and Sent to mollie:", payment)
            if (!payment) {
                return res.status(404).send({
                    message: `Mollie payment does not exist`
                })
            } 
            console.log("URL-URL",payment.getPaymentUrl())
            const redirectPayUrl = payment.getPaymentUrl()
            return redirectPayUrl
        })
        .catch((err) => {
            console.log("ERROR OCCURRED: ",err)
            });
})

router.post('/orders/:id/webhook/', async (req, res) => {
    // console.log("body id: ",req.body.id)
    const orderId = req.params.id
    console.log("orderIds is:",orderId)
    try {
    const payment = await mollie.payments.get(req.body.id);
    const isPaid = payment.isPaid();
      
      if (!isPaid) {
          Order
          .findByPk(orderId)
          .then((order) => {
            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                }) 
            } order.payment_ok = true
            console.log("Order 1 changed payment started to true", order)
            console.log("mollie payment", payment)
            console.log("mollie payment is paid?", isPaid)
            console.log("no, but the mollie payment status is:", payment.status)  
            console.log('Payment is paid');
            order.save()
            return res.status(200).send({
                message: `Order is paid!`
            })
        })
    }
    else {
        return res.status(404).send({
            message: `Payment is not paid, but instead it is: ${payment.status}`
        })
      }
    }
    catch (err) {
      console.log("ERROR OCCURRED:", err);
    }
  })

module.exports = router

