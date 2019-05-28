const { Router } = require('express')
const mollie = require('@mollie/api-client')({ apiKey: 'test_qcMAbRrhuVzzkVaR6DRMgDq86k8NWt' });
const Order = require('../models').order
const Orderline = require('../models').orderline
const auth = require('../authorization/middleware')
const { paymentAmount } = require('../logic')

const router = new Router()

router.post('/orders/:id', (req, res, next) => {
    const userReqId = req.params.id
    // console.log(userReqId, "userReqId")
    const quantity = req.body.quantity
    // console.log(quantity, "quantity")
    const price = req.body.price
    // console.log(price, "price")
    const productId = req.body.productId
    // console.log(productId, "productId")
    const shopId = req.body.shopId
    // console.log(shopId, "shopId")
    const status = "pending"
    // console.log(status, "status")
    const total_price = (price * quantity)
    // console.log(total_price, "total_price")

    Order
    .findOrCreate({
        where: {
        userId: userReqId,
        payment_ok: "FALSE"
        },
        defaults: { userId: userReqId }
      })
    .then((orderFoundOrCreated, created) => {
        console.log(orderFoundOrCreated, "orderFoundOrCreated")
        if (!orderFoundOrCreated) {
            return res.status(404).send({
                message: `order does not exist`
            })
        }
        else {
        const orderId = orderFoundOrCreated[0].id
        console.log(orderId, "orderId")
        Orderline
        .create({
            quantity, price, productId, orderId, total_price, userReqId, shopId, status
        })
        .then(orderline => {
                if (!orderline) {
                    return res.status(404).send({
                        message: `orderline does not exist`
                    })
                }
                orderline.save()
                return orderline
                // res.status(201).send(orderline)
            })
            .catch(err => {
                res.status(500).send({
                    message: 'Something went wrong with adding to cart',
                    error: err
                })
            })
            // return res.status(201).send(order)
            }   
    })
    .catch(err => {
            res.status(500).send({
                message: 'Something went wrong with finding or creating of the order',
                error: err
        })
    })
})

router.get('/orders', auth, (req, res, next) => {
    Promise.all([
        Order.count(),
        Order.findAll()
    ])
        .then(([total, orders]) => {
            res.send({
                orders, total
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
            Orderline
                .findAll()
                .then(orderlines => {

                    const amount = paymentAmount(order, orderlines)
                    order.payment_amount = amount
                    order.save({ payment_amount: amount })

                    return res.send(order)
                })
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
    const userReqId = req.params.id
        Order
        .findOne({
            where: {
            userId: userReqId,
            payment_ok: "FALSE"
            }, include: [Orderline] })    
        .then((order) => {
            // const totalOrderCost = order.orderlines.reduce((total, orderline) => {
                // return total + orderline.total_price})
            if (!order) {
                res.status(404).send({
                    message: `order does not exist`
                })
            } 
            const totalOrderLineCost = order.orderlines
            .map(orderline => orderline.total_price)
            .reduce((total, cost) => total + cost)
            // console.log(totalOrderLineCost, "totalOrderLineCost")
            order.payment_amount = totalOrderLineCost
            order.payment_started = true
            order.save()

            const orderId = order.id
            const orderAmount = order.payment_amount
            const finalInt = parseFloat(orderAmount)
            const secondFinalActualInt = finalInt.toFixed(2)
            console.log("GET THIS FAR: ", secondFinalActualInt)
            // const secondFinalActualInt = ( Math.floor(finalInt * 100) / 100 )
            mollie.payments
            .create({
                "amount": {
                    "value": `${secondFinalActualInt}`,
                    "currency": "EUR"
                },
                "description": `Grozeries Payment with orderId: ${orderId} and with orderAmount: ${orderAmount}`,
                "redirectUrl": `http://localhost:3000/orders/thank-you/`,
                "webhookUrl":  `http://grozeries.herokuapp.com/orders/${orderId}/webhook/`,
                // "webhookUrl": "http://albertsm.it/",
                // "method": "ideal"
            })
            .then((payment) => {
                // console.log("PAY", payment)
                if (!payment) {
                    res.status(404).send({
                        message: `Mollie payment does not exist`
                    })
                }
                // console.log("URL-URL",payment.getPaymentUrl())
                return res.status(200).send(payment.getPaymentUrl())
            })
            .catch(error => next(error))
            // res.status(200).send({
            //     message: `Order payment initiated`
            // })
        })
        .catch(error => next(error))  
})

router.post('/orders/:id/webhook/', async (req, res) => {
    const orderId = req.params.id
    // console.log("IDDD@:",id)
    console.log("MOLLIE ID?", req.body.id) 
    console.log("MOLLIE BODY?", req.body) 
    console.log("MOLLIE REQ?", req) 
    console.log("MOLLIE RES?", res) 
    try {
    const payment = await mollie.payments.get(req.body.id);
    console.log("ARE WE THERE payment?", payment) 
    const isPaid = payment.isPaid();
    
    if (isPaid) {
          Order
          .findByPk(orderId)
          .then((order) => {
            if (!order) {
                return res.status(404).send({
                    message: `order does not exist`
                }) 
            } 
            else {
                order.payment_ok = true
            console.log("Order 1 changed payment started to true", order)
            console.log("mollie payment", payment)
            console.log("mollie payment is paid?", isPaid)
            console.log("no, but the mollie payment status is:", payment.status)  
            console.log('Payment is paid');
            order.save()
            res.status(200).send({
                message: `Order is paid!`
            })}
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
