/**
 * order controller
 */

import { Attribute, factories } from '@strapi/strapi'
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br' // carregar sob demanda
import { mercadoPagoService } from '../../../service/mercado-pago';
import { melhorEnvio, QuoteShippingBody } from '../../../service/melhor-envio';
import { OrderCreateParserSchema } from '../validation/schemas';

dayjs.locale('pt-br');

type ApiProduct = Attribute.GetValues<'api::product.product'>;

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
  async create(ctx) {
    try {
      const body: QuoteShippingBody = ctx.request.body;

      const orderCreate = await OrderCreateParserSchema.validate(body);
      
      const seller = await strapi.entityService.findOne('api::seller.seller', orderCreate.sellerId);

      const customer = await strapi.entityService.findOne('api::customer.customer', orderCreate.customerId)

      const products: ApiProduct[] = await strapi.entityService.findMany('api::product.product', {
        filters: { id: { $in: orderCreate.products.map((product: any) => product.id) } },
        populate: {
          images: true,
          category: true
        }
      })

      /* const melhorenvio = await melhorEnvio.quoteShipping({
        from: {
          postal_code: seller.zipCode
        },
        to: {
          postal_code: orderCreate.zipCode
        },
        products: products.map((product: any) => ({
          id: product.id,
          width: product.width,
          height: product.height,
          length: product.length,
          weight: product.weight,
          insurance_value: 0,
          quantity: orderCreate.products.find((productOrder: any) => productOrder.id === product.id).quantity
        }))
      }); */
      
      const tokenCard = await mercadoPagoService.createTokenCard({
        card_number: orderCreate.cardNumber,
        expiration_year: orderCreate.cardExpirationYear,
        expiration_month: orderCreate.cardExpirationMonth,
        security_code: orderCreate.cardSecurityCode,
        cardholder: {
          name: "APRO",
          identification: {
            type: orderCreate.cardHolderIdentificationType,
            number: orderCreate.cardHolderIdentificationNumber
          }
        }
      })

      const transactionAmount = orderCreate.transactionAmount + orderCreate.shippingCost;

      console.log('transactionAmount', transactionAmount);

      const payment = await mercadoPagoService.createPayment({
        additional_info: {
          items: products.map((product) => ({
            id: product.id.toString(),
            title: product.name,
            description: product.description,
            picture_url: product.images[0].url,
            category_id: product.category.id.toString(),
            quantity: orderCreate.products.find((productOrder: any) => productOrder.id === product.id).quantity,
            unit_price: products.find((productOrder: any) => productOrder.id === product.id).price
          })),
          payer: {
            first_name: customer.fullName.split(' ')[0],
            last_name: customer.fullName.split(' ')[1],
            phone: {
              area_code: customer.phoneNumber.split(' ')[0],
              number: customer.phoneNumber.split(' ')[1],
            },
            address: {
              street_number: null
            }
          },
          shipments: {
            receiver_address: {
              zip_code: orderCreate.zipCode,
              state_name: orderCreate.stateName,
              city_name: orderCreate.cityName,
              street_name: orderCreate.streetName,
              street_number: orderCreate.streetNumber
            }
          }
        },
        application_fee: 0.10,
        binary_mode: false,
        external_reference: orderCreate.customerId.toString() + dayjs().valueOf().toString(),
        installments: orderCreate.cardInstallments,
        issuer_id: null,
        notification_url: null,
        description: null,
        payment_method_id: 'pix',
        payer: {
          type: 'customer',
          email: customer.email,
          identification: {
            type: 'CPF',
            number: customer.taxId,
          },
          first_name: customer.fullName.split(' ')[0],
          last_name: customer.fullName.split(' ')[1],
        },
        statement_descriptor: seller.tradeName,
        // token: tokenCard.id,
        transaction_amount: transactionAmount,
      });

      const order = await strapi.entityService.create('api::order.order', {
        data: {
          orderDate: new Date(),
          customer: customer.id,
          paymentMethod: orderCreate.paymentMethod,
          totalPrice: transactionAmount,
          status: 'pending',
          shippingFee: orderCreate.shippingCost,
          paymentStatus: 'pending',
          shippingAddress: {
            zipCode: orderCreate.zipCode,
            stateName: orderCreate.stateName,
            cityName: orderCreate.cityName,
            streetName: orderCreate.streetName,
            streetNumber: orderCreate.streetNumber,
            complement: orderCreate.complement,
          },
          products: orderCreate.products.map((product: any) => ({
            id: product.id
          })),
        }
      });

      ctx.send({ payment, order });
    } catch (error) {
      console.log(error)
      ctx.throw(400, (error as Error).message);
    }
  },
}));
