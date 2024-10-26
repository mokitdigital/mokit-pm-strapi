/**
 * payment service
 */

import { factories } from '@strapi/strapi';
import { paymentAsaas, PaymentAsaasPayload } from '../../../service/asaas/payment-asaas';

export default factories.createCoreService('api::payment.payment', {
  async createTransactionAsaas(data: PaymentAsaasPayload) {
    try {
      const response = await paymentAsaas.createPayment(data)

      return response;
    } catch (error) {
      throw error;
    }
  },
});
