const { Router } = require('express')
const Product = require('./model')

const router = new Router()

router.post('/shops/:id/products', (req, res, next) => {
    const product = {
        product_name: req.body.product_name,
        price: req.body.price,
        description: req.body.desrciption,
        ingredients: req.body.ingredients,
        allergens: req.body.allergens,
        prices_by: req.body.prices_by,
        quantity: req.body.quantity,
        in_stock: req.body.in_stock,
        image: req.body.image,
        active: req.body.active
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

router.get('/shops/:id', (req, res, next) => {
    Shop
        .findByPk(req.params.id)
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