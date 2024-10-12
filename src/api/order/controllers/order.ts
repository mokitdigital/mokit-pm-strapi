/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'
import { sendEmailToCustomer } from '../../../service/nodemailer/nodemailer';
import twilio from '../../../service/twilio';

dayjs.locale('pt-br');
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
      } = ctx.request.body.data;

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

    const monthlySales = {} /* orders.reduce((acc, order) => {
      const month = dayjs(order.createdAt).locale('pt-br').format('MMMM');
      if (!acc[month]) {
        acc[month] = { name: month, totalSales: 0 };
      }
      acc[month].totalSales += order.totalPrice;
      return acc;
    }, {}); */

    console.log(monthlySales);

    ctx.body = Object.values(monthlySales);
  },
  async getOrderUpdates(ctx) {
    try {
      const updatedOrders = await strapi.entityService.findMany('api::order.order', {
        filters: {
          id: ctx.request.query.id,
        },
        populate: {
          customer: true,
          seller: true,
          order_items: {
            populate: {
              product: true,
            },
          }
        },
      });
      
      // await sendEmailToCustomer(updatedOrders[0].seller, updatedOrders[0].customer, updatedOrders);
      // await twilio.sendWhatsAppMessage("+555193394478", `Pedido atualizado: ${updatedOrders[0].id}`);
 
      ctx.send({
        message: 'E-mail enviados com sucesso',
        updatedOrders,
      });
    } catch (err) {
      console.log(err);
      ctx.throw(500, 'Erro ao buscar atualizações de pedidos e enviar e-mails');
    }
  },
}));
