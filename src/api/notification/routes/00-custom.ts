export default {
  routes: [
    {
      method: 'POST',
      path: '/notifications/subscribe/:sellerId',
      handler: 'notification.saveSubscription',
    },
    {
      method: 'POST',
      path: '/notifications/send/:sellerId',
      handler: 'notification.notifyAll',
    },
  ],
}