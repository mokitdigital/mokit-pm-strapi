/**
 * customer controller
 */

import { Attribute, factories } from '@strapi/strapi'
import { calculateDistance } from '../utils/calculate-distance';
import { melhorEnvio } from '../../../service/melhor-envio';

type ApiProduct = Attribute.GetValues<'api::product.product'>;
type ApiSeller = Attribute.GetValues<'api::seller.seller'>;

export default factories.createCoreController('api::customer.customer', ({ strapi }) => ({
  async create(ctx) {
    const body = ctx.request.body;

    try {
      const customer = await strapi.entityService.create('api::customer.customer', {
        data: {
          ...body
        }
      });

      ctx.body = customer;
      ctx.status = 201;
    } catch (err) {
      strapi.log.error(err);
      ctx.throw(500, err);
    }
  },
  async shippingRates(ctx) {
    const { sellerId, zipCode, products } = ctx.request.body;

    if (!sellerId || !zipCode || !products || products.length === 0) {
      return ctx.badRequest('Missing required fields.');
    }

    const seller: ApiSeller = await strapi.entityService.findOne('api::seller.seller', sellerId);

    if (!seller) {
      return ctx.notFound('Seller not found.');
    }

    const productIds = products.map((product: any) => product.id);
    const productsList: ApiProduct[] = await strapi.entityService.findMany('api::product.product', {
      filters: { id: { $in: productIds } }
    });

    if (!productsList || productsList.length === 0) {
      return ctx.notFound('Products not found.');
    }

    const productData = productsList.map((product: any) => {
      const quantity = products.find((p: any) => p.id === product.id)?.quantity || 1;
      return {
        id: product.id.toString(),
        width: product.width,
        height: product.height,
        length: product.length,
        weight: product.weight,
        insurance_value: product.price * quantity,  // Valor do seguro pode ser baseado no preço do produto
        quantity: quantity
      };
    });

    try {
      const melhorenvio = await melhorEnvio.quoteShipping({
        from: {
          postal_code: seller.zipCode
        },
        to: {
          postal_code: zipCode
        },
        products: productData
      });

      ctx.body = melhorenvio;
      ctx.status = 200;
    } catch (error) {
      strapi.log.error('Error fetching shipping rates', error);
      ctx.throw(500, 'Failed to calculate shipping rates.');
    }
  },
  async motoboyShippingRate(ctx) {
    const { sellerId, zipCode } = ctx.request.body;

    if (!sellerId || !zipCode) {
      return ctx.badRequest('Missing required fields.');
    }

    const seller = await strapi.entityService.findOne('api::seller.seller', sellerId);

    if (!seller) {
      return ctx.notFound('Seller not found.');
    }

    try {
      const originResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${seller.zipCode}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
      const originData = await originResponse.json();
      const originLocation = originData.results[0].geometry.location;
      const destinationResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
      const destinationData = await destinationResponse.json();
      const destinationLocation = destinationData.results[0].geometry.location;

      const distance = calculateDistance(
        originLocation.lat,
        originLocation.lng,
        destinationLocation.lat,
        destinationLocation.lng
      );

      if (distance <= 10) {
        ctx.body = [{
          id: 1,
          available: true,
          name: "Motoboy",
          price: 15.0,
          custom_price: 15.0,
          currency: "R$",
          delivery_time: 6,
          delivery_range: {
            min: 1,
            max: 3
          },
          company: {
            id: 1,
            name: "Motoboy",
            picture: ""
          }
        }]
      } else {
        ctx.body = [{ message: 'Nenhum motoboy disponível para este endereço.', distance: distance, available: false }];
      }

      ctx.status = 200;
    } catch (error) {
      strapi.log.error('Error calculating distance', error);
      ctx.throw(500, 'Failed to calculate shipping distance.');
    }
  }
}));
