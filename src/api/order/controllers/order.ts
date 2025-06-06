/**
 * order controller
 */

import { factories } from '@strapi/strapi'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { sendEmailToCustomer } from '../../../service/nodemailer/nodemailer';

type ChargeType = 'DETACHED' | 'INSTALLMENT'
type BillingType = 'CREDIT_CARD' | 'PIX'

type PaymentAsaasResponse = {
  id: string
  value: number,
  active: boolean,
  chargeType: ChargeType,
  url: string,
  billingType: BillingType,
  subscriptionCycle: string | null,
  description: string,
  endDate: string,
  deleted: boolean,
  viewCount: number,
  maxInstallmentCount: number,
  dueDateLimitDays: number,
  notificationEnabled: boolean,
  isAddressRequired: boolean
}

dayjs.locale('pt-br');

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    try {
      const { data } = ctx.request.body;

      if (data.order_items && data.order_items.length) {
        const items = [];
        for (let i = 0; i < data.order_items.length; i++) {
          const item = data.order_items[i];
          let colorEntity = [];
          if (!item.color || item.color !== '') {
            colorEntity = await strapi.entityService.findMany('api::color.color', {
              filters: { name: item.color },
            });
          }
          const sizeEntity = await strapi.entityService.findMany('api::size.size', {
            filters: { name: item.size },
          });
          const newItem = await strapi.entityService.create('api::order-item.order-item', { data: {
            ...item,
            color: colorEntity[0].id,
            size: sizeEntity[0].id,
          } });

          items.push(newItem);
        }
        data.order_items = items;
      } else {
        strapi.log.error('No order_items found in the request');
        ctx.throw(400, 'No order_items found in the request');
      }

      data.customer = await strapi.entityService.findMany('api::customer.customer', {
        filters: {
          email: data.email
        }
      })

      const response = await strapi.entityService.create('api::order.order', { 
        data,
        populate: {
          order_items: {
            populate: ['color', 'size', 'product'],
          },
          payment: true,
          customer: true,
          seller: true,
        }
      });

      const payment = await strapi.entityService.create('api::payment.payment', {
        data: {
          status: 'in process',
          billingType: data.billingType,
          value: data.totalPrice,
          order: {
            id: response.id
          }
        }
      });

      console.log(data);

      await strapi.service("api::notification.notification").notifyAll({
        sellerId: data?.seller,
        title: `Novo pedido de ${data?.customer.length > 0 && data.customer[0].fullName}`,
        body: `Pedido nº ${response.id} de  ${data?.customer.length > 0 && data.customer[0].fullName}`,
      });

      ctx.body = payment;
    } catch (error) {
      strapi.log.error('Unexpected error during order creation: ', error);
      ctx.throw(400, error.message || 'Error creating order');
    }
  },
  async monthlySales(ctx) {
    const orders = await strapi.entityService.findMany('api::order.order', {
      filters: { status: 'delivered', seller: ctx.request.query.sellerId },
      fields: ['totalPrice', 'updatedAt'],
    });

    const monthlySales = orders.reduce((acc, order) => {
      const month = dayjs(order.updatedAt).locale('pt-br').format('MMMM');
      if (!acc[month]) {
        acc[month] = { name: month, totalSales: 0 };
      }
      acc[month].totalSales += order.totalPrice;
      return acc;
    }, {});

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
          },
          payment: true,
        },
      });

      await sendEmailToCustomer(updatedOrders[0].seller, updatedOrders[0].customer, updatedOrders);
      

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
