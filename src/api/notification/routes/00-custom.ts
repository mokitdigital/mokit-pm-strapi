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
    {
      method: 'GET',
      path: '/notifications/viewers/:sellerId',
      handler: 'notification.getNotifications',
    },
    {
      method: 'PUT',
      path: '/notifications/mark-viewed/:id',
      handler: 'notification.markViewed',
    }
  ],
}