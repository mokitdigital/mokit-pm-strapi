/**
 * order service
 */

import { factories } from '@strapi/strapi';
import webPush from "web-push";

export default factories.createCoreService('api::order.order', ({ strapi }) => ({
  async notifyAll({ sellerId, title, body }) {
    webPush.setVapidDetails(
      process.env.VAPID_EMAIL,
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY
    );

    const subscriptions = await strapi.entityService.findMany(
      "api::subscription.subscription",
      {
        filters: { seller: sellerId },
      }
    );

    if (!subscriptions.length) {
      throw new Error("Nenhuma inscrição encontrada");
    }

    const payload = JSON.stringify({ title, body });

    await Promise.all(
      subscriptions.map((sub) => {
        return webPush.sendNotification(sub.payload as any, payload).catch((err) => {
          console.error("Erro ao enviar push", err);
        });
      })
    );

    await strapi.entityService.create("api::notification.notification", {
      data: {
        seller: sellerId,
        title,
        body,
      },
    });

    return {
      message: "Notificações enviadas",
    };
  },
}));
