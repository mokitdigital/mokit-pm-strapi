import { MercadoPagoConfig, Payment } from 'mercadopago';
import { PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';

const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });

type CardTokenBody = {
  card_number: string,
  expiration_year: string,
  expiration_month: string,
  security_code: string,
  cardholder: {
    name: string,
    identification: {
      type: "CPF" | "CNPJ",
      number: string
    }
  }
}

export const mercadoPagoService = {
  async createCustomer(): Promise<any> {
    // TODO: Implement
  },
  async createTokenCard(tokenCard: CardTokenBody): Promise<any> {
    const response = await fetch('https://api.mercadopago.com/v1/card_tokens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`
      },
      body: JSON.stringify(tokenCard)
    })

    return response.json();
  },
  async createPayment(order: PaymentCreateRequest): Promise<any> {
    const payment = new Payment(client);

    try {
      const response = await payment.create({ body: order });
      console.log(response);
      return response;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },
};
