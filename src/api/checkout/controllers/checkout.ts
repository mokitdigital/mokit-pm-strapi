/**
 * checkout controller
 */

import { Attribute, factories } from '@strapi/strapi'
import Stripe from 'stripe';
import { StripeService } from '../../../service/stripe';
import { melhorEnvio } from '../../../service/melhor-envio';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

type ApiProduct = Attribute.GetValues<'api::product.product'>;
type ApiOrderItem = Attribute.GetValues<'api::order-item.order-item'>;

export default factories.createCoreController('api::checkout.checkout', ({ strapi }) => ({

  async create(ctx) {
    const { 
      sellerId,
      customerId,
      orderItemsIds,
      zipCode,
     } = ctx.request.body;

    try {
      
      const customer = await strapi.entityService.findOne('api::customer.customer', customerId)
      const orderItems: ApiOrderItem[] = await strapi.entityService.findMany('api::order-item.order-item', {
        filters: { id: { $in: orderItemsIds.map((item: any) => item) } },
        populate: {
          products: {
            populate: '*'
          }
        }
      })

      const shippingRate = await StripeService.shippingRates({
        display_name: `${customer.fullName} - ${zipCode}`,
        type: 'fixed_amount',
        fixed_amount: {
          amount: 1000,
          currency: 'brl'
        },
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 5
          },
          maximum: {
            unit: 'business_day',
            value: 10
          }
        }
      })

      if (!shippingRate) {
        return ctx.badRequest('Error creating shipping rate');
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: orderItems.map((item) => {
          return item.products.map((product) => {
            return {
              price_data: {
                currency: 'brl',
                product_data: {
                  name: product.name
                },
                unit_amount: product.price
              },
              quantity: item.quantity
            }
          })
        }).flat(),
        mode: 'payment',
        success_url: 'http://localhost:3000/payment/success',
        cancel_url: 'http://localhost:3000/payment/cancel',
        currency: 'brl',
        shipping_options: [
          {
            shipping_rate: shippingRate.id
          }
        ]
      });

      return ctx.send({ shippingRate });
    } catch (err) {
      console.log(err);
      return ctx.badRequest('Error creating Stripe session', { error: err });
    }
  },
  async handleWebhook(ctx) {
    const unparsedBody = ctx.request.body?.[Symbol.for('unparsedBody')];
    const signature = ctx.request.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        unparsedBody,
        signature,
        endpointSecret
      );
    } catch (err) {
      return ctx.badRequest(`Webhook Error: ${err.message}`);
    }

    await strapi.service('api::checkout.checkout').payment(event.type);

    ctx.status = 200;
    ctx.body = { received: true };
  },
}));
