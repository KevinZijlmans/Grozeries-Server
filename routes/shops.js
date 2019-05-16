const { Router } = require('express')
const Shop = require('../models/shopsP')
const Product = require('../models/productsP')

const router = new Router()

router.post('/shops', (req, res, next) => {

    Shop
        .create(req.body)
        .then(shop => {
            if (!shop) {
                return res.status(404).send({
                    message: `shop does not exist`
                })
            }
            return res.status(201).send(shop)
        })
        .catch(error => next(error))
})

router.get('/shops', (req, res, next) => {
    Shop
        .findAll({ include: [Product] })
        .then(shops => {
            res.send(shops)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Something went wrong',
                error: err
            })
        })
})

router.get('/shops/:id', (req, res, next) => {
    Shop
        .findByPk(req.params.id, { include: [Product] })
        .then(shop => {
            if (!shop) {
                return res.status(404).send({
                    message: `shop does not exist`
                })
            }
            return res.send(shop)
        })
        .catch(error => next(error))
})

router.put('/shops/:id', (req, res, next) => {
    Shop
        .findByPk(req.params.id)
        .then(shop => {
            if (!shop) {
                return res.status(404).send({
                    message: `shop does not exist`
                })
            }
            return shop.update(req.body)
                .then(shop => res.send(shop))
        })
        .catch(error => next(error))
})

router.delete('/shops/:id', (req, res, next) => {
    Shop
        .findByPk(re.params.id)
        .then(shop => {
            if (!shop) {
                return res.status(404).send({
                    message: 'shop does not exist'
                })
            }
            return shop.destroy()
                .then(() => res.send({
                    message: 'shop was deleted'
                }))
        })
        .catch(error => next(error))
})

module.exports = router