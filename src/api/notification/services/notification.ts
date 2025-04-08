// src/api/notification/services/notification.ts

const webPush = require("web-push");

export default {
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
      subscriptions.map((sub) =>
        webPush.sendNotification(sub.payload, payload).catch((err) => {
          console.error("Erro ao enviar push", err);
        })
      )
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
};
