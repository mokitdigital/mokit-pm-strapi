import nodemailer from "nodemailer";
import { Attribute } from "@strapi/strapi";
import { OrderModel } from "./models/order";
import { formatBRL } from "../../utils/formatBRL";

const translateOrderStatus = (status: "pending" | "processing" | "sent" | "delivered" | "canceled") => {
  switch (status) {
    case "pending":
      return "Pendente";
    case "processing":
      return "Processando";
    case "sent":
      return "Enviado";
    case "delivered":
      return "Entregue";
    case "canceled":
      return "Cancelado";
  }
};

const translatePaymentMethod = (method: "PIX" | "CREDIT" | "DEBIT" | "BOLETO") => {
  switch (method) {
    case "PIX":
      return "Pix";
    case "CREDIT":
      return "Cartão de Credito";
    case "DEBIT":
      return "Cartão de Debito";
    case "BOLETO":
      return "Boleto";
  }
}

const translatePaymentStatus = (status: "approved" | "pending" | "declined") => {
  switch (status) {
    case "approved":
      return "Aprovado";
    case "pending":
      return "Pendente";
    case "declined":
      return "Rejeitado";
  }
}

export async function sendEmailToCustomer(
  seller: Attribute.GetValues<"api::seller.seller">,
  customer: Attribute.GetValues<"api::customer.customer">,
  orders: Attribute.GetValues<"api::order.order">[]
) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const orderModel: OrderModel = {
    href: `https://dev-franciny-produtos-love.vercel.app/`,
    logo: `https://dev-franciny-produtos-love.vercel.app/_next/image?url=%2Flogo-1.png&w=96&q=75`,
    customerName: `${customer.fullName}`,
    discount: formatBRL(orders[0].discountValue),
    fullAddress: `${orders[0].address}, ${orders[0].addressNumber} - ${orders[0].complement}, ${orders[0].city} - ${orders[0].state}`,
    orderNumber: orders[0].id.toString(),
    paymentMethod: translatePaymentMethod(orders[0].paymentMethod),
    paymentStatus: translatePaymentStatus(orders[0].paymentStatus),
    tradeName: seller.tradeName,
    totalPrice: formatBRL(orders[0].totalPrice),
    shippingRate: formatBRL(orders[0].shippingRate),
    status: translateOrderStatus(orders[0].status),
    itens: orders[0].order_items.map((item) => ({
      name: item.product?.name,
      quantity: item.quantity
    }))
  }

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: customer.email,
    subject: `Atualização de Pedido #${orders[0].id} - ${seller.tradeName}`,
    html: OrderModel(orderModel),

  };

  await transporter.sendMail(mailOptions);
}