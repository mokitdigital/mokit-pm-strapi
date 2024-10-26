import { Customer } from "../../customer/types/customer";
import { Seller } from "../../seller/types/seller";

export interface Order {
  id: number;
  totalPrice: number;
  status: 'pending' | 'processing' | 'sent' | 'delivered' | 'canceled';
  shippingRate?: number;
  discountValue?: number;
  orderNotes?: string;
  customer?: Customer;
  zipCode: string;
  state: string;
  city: string;
  address: string;
  addressNumber: string;
  complement?: string;
  seller?: Seller;
  coupon?: Coupon;
  order_items?: OrderItem[];
  payment?: Payment;
}

interface Coupon {
  id: number;
  // Defina os campos do Coupon conforme necessário
}

interface OrderItem {
  id: number;
  // Defina os campos do OrderItem conforme necessário
}

interface Payment {
  id: number;
  // Defina os campos do Payment conforme necessário
}
