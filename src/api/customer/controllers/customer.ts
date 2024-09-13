/**
 * customer controller
 */

import { Attribute, factories } from '@strapi/strapi'
import { melhorEnvio } from '../../../service/melhor-envio';

type ApiProduct = Attribute.GetValues<'api::product.product'>;

export default factories.createCoreController('api::customer.customer', ({ strapi }) => ({
  async shippingRates(ctx) {
    const {
      sellerId,
      zipCode,
      products
    } = ctx.request.body;

    console.log({
      sellerId,
      zipCode,
      products
    })

    const seller = await strapi.entityService.findOne('api::seller.seller', sellerId);

    if (!seller) {
      ctx.throw(404, 'Seller not found.');
    }

    const productIds = products.map((product: any) => product.id);
    console.log('productIds', productIds);
    const productsList: ApiProduct[] = await strapi.entityService.findMany('api::product.product', {
      filters: { id: { $in: productIds } }});

    const melhorenvio = await melhorEnvio.quoteShipping({
      from: {
        postal_code: seller.zipCode
      },
      to: {
        postal_code: zipCode
      },
      products: productsList.map((product: any) => ({
        id: product.id.toString(),
        width: product.width,
        height: product.height,
        length: product.length,
        weight: product.weight,
        insurance_value: 0,
        quantity: products.find((productOrder: any) => productOrder.id === product.id).quantity
      }))
    });

    ctx.body = melhorenvio;
    ctx.status = 200;
  }
}));
