const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./routes/users')
const shopRouter = require('./routes/shops')
const authenticationRouter = require('./authorization/routes')
const orderRouter = require('./routes/orders')
const productRouter = require('./routes/products')
const cors = require("cors");

const app = express()

const port = process.env.PORT || 4000


app
    .use(cors())
    .use(bodyParser.json())
    .use(shopRouter)
    .use(userRouter)
    .use(authenticationRouter)
    .use(orderRouter)
    .use(productRouter)
    .listen(port, () => console.log(`Listening on port ${port}`))
