const { Router } = require("express");
const User = require("../models").User;
const bcrypt = require("bcrypt");
const auth = require("../authorization/middleware")

const router = new Router();

router.post("/register", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((passwordHash) => {
        req.body.password = passwordHash;
        User.create(req.body)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: `user does not exist`
                    });
                }
                return res.status(201).send(user);
            })
            .catch(error => next(error));
    });
});

router.get("/users/:id", auth, (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `user does not exist`
                });
            }
            return res.send(user);
        })
        .catch(error => next(error));
});

router.get("/users/sellers", auth, (req, res, next) => {
    User.findAll({ where: { user_type: "Seller" } })
        .then(users => {
            res.json({ users: users });
        })
        .catch(err => {
            res.status(500).json({
                message: "Something went wrong",
                error: err
            });
        });
});

router.get("/users/customers", auth, (req, res, next) => {
    User.findAll({ where: { user_type: "Customer" } })
        .then(users => {
            res.json({ users: users });
        })
        .catch(err => {
            res.status(500).json({
                message: "Something went wrong",
                error: err
            });
        });
});

router.get("/users/drivers", auth, (req, res, next) => {
    User.findAll({ where: { user_type: "Driver" } })
        .then(users => {
            res.json({ users: users });
        })
        .catch(err => {
            res.status(500).json({
                message: "Something went wrong",
                error: err
            });
        });
});

router.put("/users/:id", auth, (req, res, next) => {
    User.findByPk(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User does not exist`
                });
            }
            return user.update(req.body).then(user => res.send(user));
        })
        .catch(error => next(error));
});

router.delete("/users/:id", auth, (req, res, next) => {
    User.findByPk(re.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User does not exist"
                });
            }
            return user.destroy().then(() =>
                res.send({
                    message: "User was deleted"
                })
            );
        })
        .catch(error => next(error));
});

module.exports = router;
