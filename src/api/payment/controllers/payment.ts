/**
 * payment controller
 */

import { factories } from "@strapi/strapi";
import { CreateTransactionAsaasSchema } from "../validations/schema";

enum EventWebhookAsaas {
  PAYMENT_CREATED = "PAYMENT_CREATED",
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
  PAYMENT_CHECKOUT_VIEWED = "PAYMENT_CHECKOUT_VIEWED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
}

type WebhookAsaasPayload = {
  id: string;
  event: EventWebhookAsaas;
  dateCreated: string;
  payment: {
    object: string;
    id: string;
    dateCreated: string;
    customer: string;
    paymentLink: string;
    value: number;
    netValue: number;
    description: "Qualquer produto em até 10x de R$ 50,00";
    billingType: "PIX";
    pixTransaction: any;
    status: "PENDING" | "CONFIRMED" | any;
    dueDate: string;
    originalDueDate: string;
    paymentDate: string;
    clientPaymentDate: string;
    installmentNumber: number;
    invoiceUrl: string;
    invoiceNumber: string;
    externalReference: string;
    deleted: boolean;
    anticipated: boolean;
    anticipable: boolean;
    creditDate: string;
    estimatedCreditDate: string;
    transactionReceiptUrl: string;
    nossoNumero: number;
    bankSlipUrl: string;
    lastInvoiceViewedDate: any;
    lastBankSlipViewedDate: any;
    postalService: boolean;
    custody: any;
    refunds: any;
  };
};

export default factories.createCoreController(
  "api::payment.payment",
  ({ strapi }) => ({
    async createTransactionAsaas(ctx) {
      const { data } = ctx.request.body;

      const paymentSchema = await CreateTransactionAsaasSchema.validate(data);

      const payment = await strapi
        .service("api::payment.payment")
        .createTransactionAsaas(paymentSchema);
      return payment;
    },
    async webhook(ctx) {
      const response: WebhookAsaasPayload = ctx.request.body;

      const paymentId: { id: string }[] = await strapi.entityService.findMany(
        "api::payment.payment",
        {
          filters: {
            transactionId: response.payment.paymentLink,
          },
          fields: ["id"],
        }
      );
      if (paymentId.length === 0) {
        throw new Error("Payment not found");
      }

      await strapi.entityService.update(
        "api::payment.payment",
        paymentId[0].id,
        {
          data: {
            status:
              response.payment.status === "CONFIRMED"
                ? "paid"
                : response.payment.status === "PENDING"
                ? "in process"
                : "cancelled",
          },
        }
      );

      return ctx.request.body;
    },
  })
);
