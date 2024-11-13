import { Order } from "../../order/types/order";

export interface Seller {
  id: number;
  firstName?: string;
  lastName: string;
  zipCode: string;
  registerNumber: string;
  email: string;
  tradeName: string;
  orders?: Order[];
}
