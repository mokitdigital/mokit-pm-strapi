export const mokitPago = {
  createPayment: async (payload: any) => {
    const response = await fetch(`${process.env.MOKIT_PAGO_URL}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': `${process.env.MOKIT_API_KEY}`,
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    return response;
  }
}