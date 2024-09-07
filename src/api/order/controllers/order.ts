/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br' // carregar sob demanda

dayjs.locale('pt-br');

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async monthlySales(ctx) {
    const orders = await strapi.entityService.findMany('api::order.order', {
      filters: { status: 'delivered' },
      fields: ['totalPrice', 'orderDate'],
    });

    const monthlySales = orders.reduce((acc, order) => {
      const month = dayjs(order.orderDate).locale('pt-br').format('MMMM');
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
