import { yup } from '@strapi/utils'; // Importing yup

const { object, number, string, mixed, array } = yup;

export const OrderCreateParserSchema = object().shape({
  sellerId: number().required(),
  customerId: number().required(),
  products: array().of(
    object().shape({
      id: number().required(),
      quantity: number().required(),
    })
  ),

  zipCode: string().required(),
  stateName: string().required(),
  cityName: string().required(),
  streetName: string().required(),
  streetNumber: number().required(),
  complement: string(),
  
  cardNumber: string().required().length(16),
  cardExpirationYear: string().required().length(4),
  cardExpirationMonth: string().required().length(2),
  cardSecurityCode: string().required().length(3),
  cardHolderIdentificationType: mixed().oneOf(['CPF', 'CNPJ']).required(),
  cardHolderIdentificationNumber: string().test(
    'test-valid-identification-number',
    'Número de identificação inválido',
    (value) => {
      if (value === 'CPF') {
        return /^\d{11}$/.test(value);
      }
      if (value === 'CNPJ') {
        return /^\d{14}$/.test(value);
      }
      return true;
    },
  ).required(),
  cardInstallments: number().required(),
  paymentMethod: mixed().oneOf(['PIX', 'DEBIT', 'CREDIT', 'BOLETO']).required(),
  transactionAmount: number().required(),
  shippingCost: number().required(),
});
