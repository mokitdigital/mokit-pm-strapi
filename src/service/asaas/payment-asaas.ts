type ChargeType = 'DETACHED' | 'INSTALLMENT'
type BillingType = 'CREDIT_CARD' | 'PIX'

export type PaymentAsaasPayload = {
  billingType: BillingType,
  chargeType: ChargeType,
  name: string,
  description: string,
  value: number,
  maxInstallmentCount: number,
  notificationEnabled: boolean,
  dueDateLimitDays: number,
  endDate: string,
}

export type PaymentAsaasResponse = {
  id: string
  value: number,
  active: boolean,
  chargeType: ChargeType,
  url: string,
  billingType: BillingType,
  subscriptionCycle: string | null,
  description: string,
  endDate: string,
  deleted: boolean,
  viewCount: number,
  maxInstallmentCount: number,
  dueDateLimitDays: number,
  notificationEnabled: boolean,
  isAddressRequired: boolean
}

export const paymentAsaas = {
  createPayment: async (payload: PaymentAsaasPayload) => {
    const response = await fetch(`${process.env.ASAAS_URL}/paymentLinks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': `${process.env.ASAAS_API_KEY}`,
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    return response;
  },
}
