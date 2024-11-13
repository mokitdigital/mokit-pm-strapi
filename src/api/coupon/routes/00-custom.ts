export default {
  routes: [
    {
      method: 'POST',
      path: '/coupons/use',
      handler: 'coupon.useCoupon',
    },
  ],
};