const { Router } = require('express')
const Product = require('./model')
const Shop = require('../shops/model')

const router = new Router()

router.post('/shops/:id/products', (req, res, next) => {
    const product = {
        product_name: req.body.product_name,
        price: req.body.price,
        description: req.body.description,
        ingredients: req.body.ingredients,
        allergens: req.body.allergens,
        prices_by: req.body.prices_by,
        quantity: req.body.quantity,
        in_stock: req.body.in_stock,
        image: req.body.image
    }
    Product
        .create(product)
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

router.get('/shops/:id/products', (req, res, next) => {
    Product
        .findAll({include: [Shop]})
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

router.get('/shops/:id/products/:productid', (req, res, next) => {
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

router.put('/shops/:id/products/:productid', (req, res, next) => {
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

router.delete('/shops/:id/products/:productid', (req, res, next) => {
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