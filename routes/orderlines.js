const { Router } = require('express')
const Orderline = require('../models').Orderline
const totalSum = require('../logic')
const router = new Router()

router.post('/orders/:id', async (req, res, next) => {
    const quantity = req.body.quantity
    const price = req.body.price
    const ProductId = req.body.ProductId
    const OrderId = req.params.id

    console.log('req.body', req.body)

    return sequelize.transaction(t => {

        return Orderline
            .create({ quantity, price, ProductId, OrderId })
            .then(orderline => {
                if (!orderline) {
                    return res.status(404).send({
                        message: `orderline does not exist`
                    })
                }
                return orderline.settotal_price

                const total = totalSum(orderline)
                console.log('total', total)
                orderline.total_price = total
                console.log('total_price', orderline.total_price)
                orderline.save()
                return res.status(201).send(orderline)

            })
            // .then(i => { return orderline.update(total_price).send(orderline) })
            .catch(err => {
                res.status(500).send({
                    message: 'Something went wrong',
                    error: err
                })
            })
    })

    module.exports = router