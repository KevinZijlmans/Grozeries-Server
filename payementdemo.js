const mollie = require('@mollie/api-client')({ apiKey: 'test_qcMAbRrhuVzzkVaR6DRMgDq86k8NWt' });

console.log('hello')
// create payment first (in the database)
// make sure the the payment is linked to the order

mollie.payments.create({
  amount: {
    // calculate amount based on the order
    value:    payment_amount,
    currency: 'EUR',
  },
  description: 'My first API payment',
  redirectUrl: 'http://localhost:3001/thanks',
  webhookUrl:  `http://localhost:4000/payments/${paymentId}/webhook/`,
  method: 'ideal'
})
.then((payment) => {
  console.log(payment.getPaymentUrl())
  // Forward the customer to the payment.getPaymentUrl()
})
.catch((err) => {
  console.log(err)
  // Handle the error
});