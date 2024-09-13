export default {
  routes: [
    {
      method: 'POST',
      path: '/checkouts/webhook',
      handler: 'checkout.handleWebhook',
    },
  ],
}