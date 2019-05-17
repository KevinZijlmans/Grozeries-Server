const { Router } = require('express')
// const stripe = require('stripe')('sk_test_WcsvMvCNOm0rvxAIHB6AEUkr00lKZ4flJl');
const router = new Router()



const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const hbs = require('express-hbs');
const dotenv = require('dotenv');

// note that we load the process.env from `dotenv`
// before we start to load any of our own code.
const envfile = process.env.NODE_ENV === 'production' ? '.env' : '.dev.env';
dotenv.config({
  silent: true,
  path: `${__dirname}/${envfile}`,
});

// *now* load our custom Stripe charing module
// which we'll use in the router later on
const checkout = require('./checkout');

// create the server, and all the routes and configuration
// go against this `app`
// const app = express();

// render using handlebars, but use .html as the extention
router.engine('html', hbs.express3({ extname: '.html' }));
router.set('view engine', 'html');
router.set('views', __dirname);
router.disable('x-powered-by');

// expose `process` to the view templates
router.locals.process = process;

// serve static assets
router.use(express.static(path.join(__dirname, 'public')));

// enable the body parser middleware
router.use(bodyParser.urlencoded({ extended: true }));

// the router

// GET /
router.get('/checkout', (req, res) => {
  res.render('index');
});

// POST /charge
router.post('/checkout/payment-succesful', (req, res, next) => {
  checkout(req).then(data => {
    res.render('thanks');
  }).catch(error => {
    res.render('error', error);
  });
});






// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
// const stripe = require('stripe')('sk_test_WcsvMvCNOm0rvxAIHB6AEUkr00lKZ4flJl');

// router.use(cors({
//   origin: [/http:\/\/localhost:\d+$/],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }))

// router.post('/checkout', async (req, res) => {
//   const order = req.body.order
//   const source = req.body.source
//   try {
//     const stripeOrder = await stripe.orders.create(order)
//     console.log(`Order created: ${stripeOrder.id}`)
//     await stripe.orders.pay(stripeOrder.id, {source})
//   } catch (err) {
//     // Handle stripe errors here: No such coupon, sku, ect
//     console.log(`Order error: ${err}`)
//     return res.sendStatus(500)
//   }
//   return res.sendStatus(200)
// })

// router.post('/order/process', async (req, res) => {
//   const sig = req.headers['stripe-signature']
//   try {
//     const event = await stripe.webhooks.constructEvent(req.rawBody, sig, 'whsec_gsk2Fd6HJLJdI1zcSgQuQYZU9210L5Sy')
//     console.log(`Processing Order : ${event.data.object.id}`)
//     // Process payed order here
//   } catch (err) {
//     return res.sendStatus(500)
//   }
//   return res.sendStatus(200)
// })


// module.exports = router