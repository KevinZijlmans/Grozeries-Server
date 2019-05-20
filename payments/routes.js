const { Router } = require('express')
const Order = require('../orders/model')
// const Orderline = require('../orderlines/model')
// const Payment = require('../payments/model')
// const auth = require("../authorization/middleware")


const router = new Router()



// router.post(`payments/${paymentId}/webhook/`, auth, (req, res, next) => {
//     const orderId = req.params.id
//     Order
//     .findByPk(orderId)
//     .then(order => order.payment_ok = true)
//      console.log("Order 1 changed payment ok to true", order)
//     .save()
// })


module.exports = router

