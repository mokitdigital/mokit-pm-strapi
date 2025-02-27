/**
 * payment controller
 */

import { factories } from "@strapi/strapi";
import { CreateTransactionAsaasSchema } from "../validations/schema";

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
      const { transactionId, status } = ctx.request.body;

      const paymentId: { id: string }[] = await strapi.entityService.findMany(
        "api::payment.payment",
        {
          filters: {
            transactionId,
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
              status === "CONFIRMED" || status === "RECEIVED"
                ? "paid"
                : status === "PENDING"
                ? "in process"
                : "canceled",
          },
        }
      );

      return ctx.request.body;
    },
  })
);
