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
  state: string().required(),
  city: string().required(),
  address: string().required(),
  addressNumber: string().required(),
  complement: string(),
  totalPrice: number().required(),
  shippingRate: number().required(),
});
