export interface QuoteShippingBody {
  from: {
    postal_code: string
  },
  to: {
    postal_code: string
  },
  products: {
    id: string,
    width: number,
    height: number,
    length: number,
    weight: number,
    insurance_value: number,
    quantity: number
  }[]
}

export const melhorEnvio = {
  async quoteShipping(body: QuoteShippingBody) {
    const response = await fetch('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.MELHOR_ENVIO_ACCESS_TOKEN,
        'Content-Type': 'application/json',
        'User-Agent': 'Aplicação (email para contato técnico)',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        ...body,
        options: {
          receipt: false,
          own_hand: false
        },
        services: "1,2,3,4"
      })
    });

    const data = await response.json();
    
    return data;
  }
};