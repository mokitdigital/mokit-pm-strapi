/**
 * payment service
 */

import { factories } from '@strapi/strapi';
import { mokitPago } from '../../../service/mokit/mokit-pago';

type ChargeType = 'DETACHED' | 'INSTALLMENT'
type BillingType = 'CREDIT_CARD' | 'PIX'

type PaymentAsaasPayload = {
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

export default factories.createCoreService('api::payment.payment', {
  async createTransactionAsaas(data: PaymentAsaasPayload) {
    try {
      const response = await mokitPago.createPayment(data)

      return response;
    } catch (error) {
      throw error;
    }
  },
});
