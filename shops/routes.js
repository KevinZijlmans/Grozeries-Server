const { Router } = require('express')
const Shop = require('./model')

const router = new Router()

router.post('/shops', (req, res, next) => {
    const shop = {
        shop_name: req.body.shop_name,
        email: req.body.email,
        street_name: req.body.street_name,
        house_number: req.body.house_number,
        zipcode: req.body.zipcode,
        city: req.body.city,
        phonenumber: req.body.phonenumber,
        business_hours: req.body.business_hours,
        shop_image: req.body.shop_image,
        active: req.body.active
    }
    Shop
        .create(shop)
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
        .findAll()
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