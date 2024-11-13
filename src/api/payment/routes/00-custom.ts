export default {
  routes: [
    {
      method: 'POST',
      path: '/payments/create-transaction',
      handler: 'payment.createTransactionAsaas',
    },
    {
      method: 'POST',
      path: '/payments/webhooks',
      handler: 'payment.webhook',
    }
  ],
}
