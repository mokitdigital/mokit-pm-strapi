/**
 * coupon service
 */

import { factories,  } from '@strapi/strapi';

export default factories.createCoreService('api::coupon.coupon', {
  async useCoupon(customerId: number, couponId: number, ctx) {
    const coupon = await strapi.entityService.findOne('api::coupon.coupon', couponId, {
      populate: ['customers'],
    });

    if (!coupon) {
      return ctx.notFound('Cupom não encontrado');
    }

    const alreadyUsed = coupon.customers.some((customer: { id }) => customer.id === customerId);

    if (alreadyUsed) {
      return ctx.badRequest('Este cupom já foi utilizado por este cliente.');
    }

    await strapi.entityService.update('api::coupon.coupon', couponId, {
      data: {
        customers: [...coupon.customers.map((customer: { id }) => customer.id), customerId],
      },
    });

    return ctx.send({ message: 'Cupom aplicado com sucesso!' });
  }
});
