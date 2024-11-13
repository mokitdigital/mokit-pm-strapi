import { Order } from "../../order/types/order";

export interface Customer {
  id: number;
  fullName: string;
  email: string;
  phoneNumber?: string;
  birthdate?: string; // Date format as string
  gender?: 'male' | 'female' | 'other';
  accountStatus?: 'active' | 'inactive';
  orders?: Order[];
  receivePromotions?: boolean;
  shareData?: boolean;
  photo?: string;
  password?: string;
  addressMain?: Record<string, any>; // JSON type
  addressSecondary?: Record<string, any>; // JSON type
}