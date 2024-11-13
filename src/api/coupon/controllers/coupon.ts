/**
 * coupon controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::coupon.coupon', ({ strapi }) => ({
  async useCoupon(ctx) {
    const { customerId, couponId } = ctx.request.body as { customerId: number; couponId: number };

    await strapi.service('api::coupon.coupon').useCoupon(customerId, couponId, ctx);
  },
}));
