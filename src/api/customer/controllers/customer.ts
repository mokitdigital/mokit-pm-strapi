/**
 * customer controller
 */

import { factories } from '@strapi/strapi'
import { calculateDistance } from '../utils/calculate-distance';
import { melhorEnvio } from '../../../service/melhor-envio';

async function getCoordinates(address: string, retries = 5, delay = 100) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
      );

      if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        throw new Error("Endereço não encontrado.");
      }

      return {
        latitude: data[0].lat,
        longitude: data[0].lon
      };
    } catch (error) {
      console.error(`Tentativa ${attempt} falhou: ${error.message}`);

      if (attempt < retries) {
        const waitTime = Math.pow(2, attempt) * delay; // 200ms, 400ms, 800ms...
        console.log(`Aguardando ${waitTime}ms antes de tentar novamente...`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));
      } else {
        console.error("Número máximo de tentativas atingido.");
        throw error;
      }
    }
  }
}

export default factories.createCoreController('api::customer.customer', ({ strapi }) => ({
  async shippingRates(ctx) {
    const { sellerId, zipCode, products } = ctx.request.body;

    if (!sellerId || !zipCode || !products || products.length === 0) {
      return ctx.badRequest('Missing required fields.');
    }

    const seller = await strapi.entityService.findOne('api::seller.seller', sellerId);

    if (!seller) {
      return ctx.notFound('Seller not found.');
    }

    const productIds = products.map((product: any) => product.id);
    const productsList = await strapi.entityService.findMany('api::product.product', {
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
      return ctx.badRequest('Seller not found.');
    }

    try {
      console.log("Google Maps API Key:", process.env.GOOGLE_MAPS_API_KEY);
      console.log("Zip Code:", zipCode);
      console.log("Seller Zip Code:", seller.zipCode);
      const originResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${seller.zipCode}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
      const originData = await originResponse.json();
      console.log("Origin Data:", originData);
      if (!originData.results || originData.results.length === 0) {
        return ctx.badRequest('Origin not found.' + originData);
      }
      const originLocation = originData.results[0].geometry.location;
      const destinationResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
      const destinationData = await destinationResponse.json();
      console.log("Destination Data:", destinationData);
      if (!destinationData.results || destinationData.results.length === 0) {
        return ctx.notFound('Destination not found.');
      }
      const destinationLocation = destinationData.results[0].geometry.location;

      console.log("Origin Location:", originLocation);
      console.log("Destination Location:", destinationLocation);

      if (!originLocation || !destinationLocation) {
        return ctx.notFound('Origin or destination not found.');
      }

      console.log("Distance:", calculateDistance(originLocation.lat, originLocation.lng, destinationLocation.lat, destinationLocation.lng));

      if (!originLocation.lat || !originLocation.lng || !destinationLocation.lat || !destinationLocation.lng) {
        return ctx.notFound('Origin or destination not found.');
      }

      const distance = calculateDistance(
        originLocation.lat,
        originLocation.lng,
        destinationLocation.lat,
        destinationLocation.lng
      );

      const delivery = await strapi.entityService.findMany('api::delivery.delivery', {
        filters: { 
          sellers: {
            id: {
              $contains: sellerId
            }
          }
        }
      });

      if (distance <= delivery[0].distance) {
        ctx.body = [{
          id: 1,
          available: true,
          name: "Motoboy",
          price: delivery[0].price,
          custom_price: delivery[0].price,
          currency: "R$",
          delivery_time: 6,
          delivery_range: {
            min: delivery[0].min,
            max: delivery[0].max
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
  },
  async motoboyShippingRateWithPostGis(ctx) {
    const { sellerId, zipCode } = ctx.request.body;

    const coordinates = await getCoordinates(zipCode)

    if (!sellerId || !zipCode) {
      return ctx.badRequest('Missing required fields.');
    }

    const seller = await strapi.entityService.findOne('api::seller.seller', sellerId, {
      fields: ['latitude', 'longitude', 'zipCode']
    });

    if (!seller || !seller.latitude || !seller.longitude) {
      return ctx.badRequest('Seller not found or missing coordinates.');
    }

    if (!coordinates) {
      return ctx.notFound('Destination not found.');
    }

    const { latitude: destLat, longitude: destLon } = coordinates;

    const distance = calculateDistance(seller.latitude, seller.longitude, destLat, destLon);

    console.log("Distance:", distance);

    if (distance <= 5) {
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
      }];
    } else {
      ctx.body = [{ message: 'Nenhum motoboy disponível para este endereço.', distance, available: false }];
    }

    ctx.status = 200;
  }
}));
