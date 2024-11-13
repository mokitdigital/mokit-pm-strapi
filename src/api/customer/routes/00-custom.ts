export default {
  routes: [
    {
      method: 'POST',
      path: '/customers/shipping-rates',
      handler: 'customer.shippingRates',
    },
    {
      method: 'POST',
      path: '/customers/motoboy-shipping-rate',
      handler: 'customer.motoboyShippingRate',
    }
  ],
}