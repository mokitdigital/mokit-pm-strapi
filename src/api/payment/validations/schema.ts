import { boolean, number, object, string } from 'yup';

export const CreateTransactionAsaasSchema = object().shape({
  billingType: string().test('billingType', 'Invalid billing type', (value) => {
    if (value) {
      return ['CREDIT_CARD', 'PIX'].includes(value);
    }
    return true;
  }),
  chargeType: string().test('chargeType', 'Invalid charge type', (value) => {
    if (value) {
      return ['DETACHED', 'INSTALLMENT'].includes(value);
    }
    return true;
  }),
  name: string().required(),
  description: string().required(),
  value: number().required(),
  maxInstallmentCount: number().required(),
  notificationEnabled: boolean().required(),
  dueDate: string().required(),
  dueDateLimitDays: number().required(),
})