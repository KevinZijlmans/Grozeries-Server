const { Router } = require('express')
const Orderline = require('../models').Orderline
const totalSum = require('../logic')

const router = new Router()

router.post('/orders/:id', async (req, res, next) => {
    const quantity = req.body.quantity
    const price = req.body.price
    const ProductId = req.body.ProductId
    const OrderId = req.params.id
    const total_price = req.body.total_price

    Orderline
        .create({ quantity, price, ProductId, OrderId, total_price })
        .then(orderline => {
            const total = totalSum(orderline)
            console.log('total', total)
            orderline.total_price = total
            // console.log('total_price', orderline.total_price)

            if (!orderline) {
                res.status(404).send({
                    message: `orderline does not exist`
                })
            }
            console.log('orderline.total_price', orderline.total_price)
            orderline.save({ total_price: total })

            return res.status(201).send(orderline)

        })
        .catch(err => {
            res.status(500).send({
                message: 'Something went wrong',
                error: err
            })
        })
})

module.exports = router
