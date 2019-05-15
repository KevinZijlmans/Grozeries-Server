const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/register', (req, res, next) => {
    const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        user_type: req.body.user_type
    }
    User
        .create(user)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `user does not exist`
                })
            }
            return res.status(201).send(user)
        })
        .catch(error => next(error))
})

router.get('/users/:id', (req, res, next) => {
    User
        .findByPk(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `customer does not exist`
                })
            }
            return res.send(user)
        })
        .catch(error => next(error))
})

router.get('/users/sellers', (req, res, next) => {
    User
        .findAll(
            { where: { user_type: 'Seller' } }
        )
        .then(users => {
            res.json({ users: users })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

router.get('/users/customers', (req, res, next) => {
    User
        .findAll(
            { where: { user_type: 'Customer' } }
        )
        .then(users => {
            res.json({ users: users })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

router.get('/users/drivers', (req, res, next) => {
    User
        .findAll(
            { where: { user_type: 'Driver' } }
        )
        .then(users => {
            res.json({ users: users })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

router.put('/users/:id', (req, res, next) => {
    User
        .findByPk(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User does not exist`
                })
            }
            return user.update(req.body)
                .then(user => res.send(user))
        })
        .catch(error => next(error))
})

router.delete('/users/:id', (req, res, next) => {
    User
        .findByPk(re.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: 'User does not exist'
                })
            }
            return user.destroy()
                .then(() => res.send({
                    message: 'User was deleted'
                }))
        })
        .catch(error => next(error))
})

module.exports = router