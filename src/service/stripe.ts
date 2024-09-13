import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

interface ShippingRate {
  /**
   * Descrição da taxa de envio.
   */
  display_name: string;
  /**
   * Tipo de taxa de envio.
   */
  type: string;
  /**
   * Taxa de envio fixa.
   */
  fixed_amount: {
    amount: number;
    currency: string;
  };
  /**
   * Taxa de envio padrão.
   */
  delivery_estimate: {
    minimum: {
      unit: string;
      value: number;
    },
    maximum: {
      unit: string;
      value: number;
    },
  }
}

export const StripeService = {
  async shippingRates(createShippingRate: ShippingRate) {
    return await stripe.shippingRates.create(createShippingRate as any);
  }
}