const { Router } = require('express')
const Orderline = require('../models').orderline
const Order = require('../models').order
const auth = require('../authorization/middleware')
const Product = require('../models').product
const { totalSum } = require('../logic')
const Shop = require('../models').shop

const router = new Router()

router.post('/orders/:id', auth, (req, res, next) => {
    const quantity = req.body.quantity
    const price = req.body.price
    const productId = req.body.productId
    const orderId = req.params.id
    const userId = req.body.userId
    const shopId = req.body.shopId
    const status = req.body.status
    const total_price = req.body.total_price

    Orderline
        .create({
            quantity, price, productId, orderId, total_price, userId, shopId, status
        }, { include: [Product] })
        .then(orderline => {
            const total = totalSum(orderline)
            orderline.total_price = total


            if (!orderline) {
                return res.status(404).send({
                    message: `orderline does not exist`
                })
            }
            orderline.save({ total_price: total })
            res.status(201).send(orderline)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Something went wrong',
                error: err
            })
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

router.get('/shops/:id/orderlines', auth, (req, res, next) => {
    Shop
        .findByPk(req.params.id)
        .then(shop => {
            if (!shop) {
                return res.status(404).send({
                    message: `shop does not exist`
                })
            }
            Orderline
                .findAll({ where: { shopId: shop.id }, include: [Product] })
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

router.delete('/orderlines/:id', (req, res, next) => {
    Order
        .findByPk(req.params.id)
        .then(order => {
            if (!order) {
                return res.status(404).send({
                    message: 'order does not exist'
                })
            }

            Orderline
                .findByPk(req.params.orderlineid)
                .then(orderline => {
                    if (!orderline) {
                        return res.status(404).send({
                            message: 'orderline does not exist'
                        })
                    }
                    return orderline.destroy()
                        .then(() => res.send({
                            message: 'orderline was deleted'
                        }))
                })

        })
        .catch(
            error => next(error)
        )
})

router.put('/orderlines/:id', auth, (req, res, next) => {
    Orderline
        .findByPk(req.params.id)
        .then(orderline => {
            if (!orderline) {
                return res.status(404).send({
                    message: `order does not exist`
                })
            }
            return orderline.update(req.body)
                .then(orderline => res.send(orderline))
        })
        .catch(error => next(error))
})

module.exports = router
