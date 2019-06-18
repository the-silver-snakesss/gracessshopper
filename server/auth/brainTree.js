var paypal = require('paypal-rest-sdk')
const router = require('express').Router()
const braintree = require('braintree')

// paypal.configure({
//   'mode': 'sandbox', //sandbox or live
//   'client_id': 'AcgRdY9vs-xjcPttnsbywCkS360XWZiHcHg86zTGWSOj2NzL4hua0g7tUz3cjPD5V9KWjUqLINA7CaMD',
//   'client_secret': 'EGM4tHCs9SvBkF7u8oSIh6tP4_FLeP9yySrnMoRzemdzEKTLhEjycfRR-4OBoRtcwLJQ9RZk8bsBfkVx'
// })

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  // Use your own credentials from the sandbox Control Panel here
  merchantId: '5rsrtbsxrxtmfzy7',
  publicKey: '3vnfmkfjdjwcpqf7',
  privateKey: '02ce7f75b09fabd4ec3a8f974956ac50'
})

router.get('/client_token', function(req, res) {
  gateway.clientToken.generate({}, function(err, response) {
    if (err) res.status(404).send('There was an error')
    res.send(response.clientToken)
  })
})

router.post('/', (req, res, next) => {
  //   const gateway = braintree.connect({
  //   environment: braintree.Environment.Sandbox,
  //   // Use your own credentials from the sandbox Control Panel here
  //   merchantId: '5rsrtbsxrxtmfzy7',
  //   publicKey: '3vnfmkfjdjwcpqf7',
  //   privateKey: '02ce7f75b09fabd4ec3a8f974956ac50'
  // });
  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale(
    {
      amount: '10.00',
      paymentMethodNonce: nonceFromTheClient,
      options: {
        // This option requests the funds from the transaction
        // once it has been authorized successfully
        submitForSettlement: true
      }
    },
    function(error, result) {
      if (result) {
        res.send(result)
      } else {
        res.status(500).send(error)
      }
    }
  )
})

// gateway.clientToken.generate({}, (err, response) => {
//   var clientToken = response.clientToken
//   if (!clientToken) response.send(err)
// });

module.exports = router
