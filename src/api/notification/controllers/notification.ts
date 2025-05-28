/**
 * notification controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::notification.notification",
  ({ strapi }) => ({
    async saveSubscription(ctx) {
      const subscription = ctx.request.body;
      const { sellerId } = ctx.params;

      if (!subscription) {
        return ctx.badRequest("Subscription is required.");
      }

      if (!sellerId) {
        return ctx.badRequest("Seller ID is required.");
      }

      const seller = await strapi.entityService.findOne(
        "api::seller.seller",
        sellerId
      );

      if (!seller) {
        return ctx.notFound("Seller not found.");
      }

      await strapi.entityService.create("api::subscription.subscription", {
        data: {
          seller: sellerId,
          payload: subscription,
        },
      });

      ctx.send({ message: "Inscrição salva com sucesso" });
    },

    async notifyAll(ctx) {
      const { sellerId } = ctx.params;
      const { title, body } = ctx.request.body;

      try {
        const result = await strapi
          .service("api::notification.notification")
          .notifyAll({ sellerId, title, body });

        ctx.send(result);
      } catch (err) {
        ctx.badRequest(err.message);
      }
    },
    async getNotifications(ctx) {
      const { sellerId } = ctx.params;
      const notifications = await strapi.entityService.findMany(
        "api::notification.notification",
        {
          filters: { seller: sellerId },
        }
      );

      ctx.send(notifications);
    },
    async markViewed(ctx) {
      const { id } = ctx.params;

      const notifications = await strapi.entityService.update(
        "api::notification.notification",
        id,
        {
          data: {
            viewed: true,
          },
        }
      );

      ctx.send(notifications);
    }
  })
);
