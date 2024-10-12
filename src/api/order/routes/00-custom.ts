export default {
  routes: [
    {
      method: 'GET',
      path: '/orders/monthly-sales',
      handler: 'order.monthlySales',
    },
    {
      method: 'GET',
      path: '/orders/send-email',
      handler: 'order.getOrderUpdates',
    },
  ],
}