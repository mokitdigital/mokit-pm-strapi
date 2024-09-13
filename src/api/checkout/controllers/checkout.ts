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

export default factories.createCoreController('api::checkout.checkout', ({ strapi }) => ({

  async create(ctx) {
    const { 
      sellerId,
      customerId,
      zipCode,
      products,
     } = ctx.request.body;

    try {
      
      const customer = await strapi.entityService.findOne('api::customer.customer', customerId)
      const productsList: ApiProduct[] = await strapi.entityService.findMany('api::product.product', {
        filters: { id: { $in: products.map((product: any) => product.id) } },
        populate: {
          images: true,
          category: true
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

      console.log(shippingRate);

      /* const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items,
        mode: 'payment',
        success_url: 'http://localhost:3000/payment/success',
        cancel_url: 'http://localhost:3000/payment/cancel',
        currency: 'brl',
        shipping_options: [
          {
            shipping_rate: shippingRate.id
          }
        ]
      }); */

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
