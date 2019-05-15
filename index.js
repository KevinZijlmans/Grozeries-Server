const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./users/routes')
const shopRouter = require('./shops/routes')
const authenticationRouter = require('./authorization/routes')
const orderRouter = require('./orders/routes')
const productRouter= require('./products/routes')
const cors = require("cors");

const app = express()

const port = process.env.PORT || 4001


app
    .use(cors())
    .use(bodyParser.json())
    .use(shopRouter)
    .use(userRouter)
    .use(authenticationRouter)
    .use(orderRouter)
    .use(productRouter)
    .listen(port, () => console.log(`Listening on port ${port}`))
