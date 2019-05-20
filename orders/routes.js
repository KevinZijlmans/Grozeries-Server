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

router.get('/orders', auth, (req, res, next) => {
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
        return res.status(200).send({
            message: `Order payment initiated`
        })
    })
    .catch(error => next(error))
    
    mollie.payments
        .create({
            "amount": {
                "value": "13.00",
                "currency": "EUR"
            },
            "description": `Grozeries Payment with orderId: ${orderId} and with orderAmount: ${orderAmount}`,
            "redirectUrl": `http://localhost:3000/orders/thank-you/`,
            // "webhookUrl":  `http://localhost:4000/payments/${orderId}/webhook/`,
            "webhookUrl":  "http://albertsm.it/",
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
            console.log("ERROR: ",err)
            // Handle the error
            });
})

router.post(`orders/:id/webhook/`, auth, (req, res, next) => {
(async () => {
    const orderId = req.params.id
    const mollieClient = mollie({ apiKey: 'test_qcMAbRrhuVzzkVaR6DRMgDq86k8NWt' });
  
    try {
      const payment = await mollieClient.payments.get(res);
      // Check if payment is paid - the response of the webhook has as a response an id unique to that payment, e.g. id=tr_d0b0E3EA3v
      const isPaid = payment.isPaid();
  
      if (isPaid) {
        console.log('Payment is paid');
        Order
        .findByPk(orderId)
        .then(order => order.payment_ok = true)
         console.log("Order 1 changed payment ok to true", order)
        .save()
    }
        else {
        console.log(`Payment is not paid, but instead it is: ${payment.status}`);
      }
    } 
    catch (e) {
      console.log(e);
    }
  })
});

module.exports = router

