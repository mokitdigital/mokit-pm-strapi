/**
 * order controller
 */

import { Attribute, factories } from '@strapi/strapi'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br');

type ApiProduct = Attribute.GetValues<'api::product.product'>;
type ApiOrderItem = Attribute.GetValues<'api::order-item.order-item'>;

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    try {
      const {
        order_items,
        sellerId,
        customerId,
        couponId,

        zipCode,
        state,
        city,
        address,
        addressNumber,
        complement,
        paymentMethod,
        totalPrice,
        orderNotes,
        shippingRate
      } = ctx.request.body;

      const coupon = await strapi.entityService.findOne('api::coupon.coupon', couponId);
    
      const order = await strapi.entityService.create('api::order.order', {
        data: {
          customer: customerId,
          paymentMethod: paymentMethod,
          totalPrice: totalPrice,
          status: 'pending',
          shippingRate: shippingRate,
          paymentStatus: 'pending',
          zipCode: zipCode,
          state: state,
          city: city,
          discountValue: coupon ? coupon.value : 0,
          address: address,
          addressNumber: addressNumber,
          complement: complement,
          orderNotes: orderNotes,
          seller: sellerId,
          coupon: coupon ? coupon.id : null,
          order_items: order_items,
        }
      });

      ctx.body = order;
      ctx.status = 201;
    } catch (error) {
      strapi.log.error('Error create order: ', error);
      ctx.throw(400, (error as Error).message);
    }
  },
  async monthlySales(ctx) {
    const orders = await strapi.entityService.findMany('api::order.order', {
      filters: { status: 'delivered' },
      fields: ['totalPrice', 'createdAt'],
    });

    const monthlySales = orders.reduce((acc, order) => {
      const month = dayjs(order.createdAt).locale('pt-br').format('MMMM');
      if (!acc[month]) {
        acc[month] = { name: month, totalSales: 0 };
      }
      acc[month].totalSales += order.totalPrice;
      return acc;
    }, {});

    console.log(monthlySales);

    ctx.body = Object.values(monthlySales);
  },
}));
