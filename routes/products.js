const { Router } = require('express')
const Product = require('../models').product
const auth = require("../authorization/middleware")

const router = new Router()

router.post('/shops/:id', (req, res, next) => {
const shopId = req.params.id
const product_name = req.body.product_name
const price = req.body.price
const description = req.body.description
const ingredients = req.body.ingredients
const allergens = req.body.allergens
const prices_by = req.body.prices_by
const quantity = req.body.quantity
const in_stock = req.body.in_stock
const image = req.body.image
    Product
        .create(product_name, 
                price, 
                description, 
                ingredients, 
                allergens, 
                prices_by, 
                quantity, 
                in_stock, 
                image,
                )
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

router.get('/products/:id', (req, res, next) => {
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

router.get('/products/categories/:id', (req, res, next) => {
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

router.put('/products/:id', auth, (req, res, next) => {
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

router.delete('/products/:id', auth, (req, res, next) => {
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