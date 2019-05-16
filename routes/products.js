const { Router } = require('express')
const Product = require('../models').Product;

const router = new Router()

router.post('/shops/:id', (req, res, next) => {

    Product
        .create(req.body)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: `product does not exist`
                })
            }
            return res.status(201).send(product)
        })
        .catch(error => next(error))
})

router.get('/products/categories', (req, res, next) => {
    Product
        .findAll()
        .then(products => {
            res.send(products)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Something went wrong',
                error: err
            })
        })
})

router.get('/products/:productid', (req, res, next) => {
    Product
        .findByPk(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: `product does not exist`
                })
            }
            return res.send(product)
        })
        .catch(error => next(error))
})

router.get('/products/categories/:catid', (req, res, next) => {
    Product
        .findByPk(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: `product does not exist`
                })
            }
            return res.send(product)
        })
        .catch(error => next(error))
})

router.put('/products/:productid', (req, res, next) => {
    Product
        .findByPk(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: `product does not exist`
                })
            }
            return product.update(req.body)
                .then(product => res.send(product))
        })
        .catch(error => next(error))
})

router.delete('/products/:productid', (req, res, next) => {
    Product
        .findByPk(req.params.id)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: 'product does not exist'
                })
            }
            return product.destroy()
                .then(() => res.send({
                    message: 'product was deleted'
                }))
        })
        .catch(error => next(error))
})

module.exports = router