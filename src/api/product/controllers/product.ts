/**
 * product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::product.product",
  ({ strapi }) => ({
    async create(ctx) {
      const {
        name,
        slug,
        description,
        active,
        customizable,
        price,
        brand,
        colors,
        category,
        sizes,
        images,
        discount,
        height,
        width,
        length,
        weight,
        seller,
      } = JSON.parse(ctx.request.body);

      if (!images) {
        return ctx.badRequest("Nenhum arquivo enviado");
      }

      let imageIds = [];
      for (const img of images) {
        const newImage = await strapi.entityService.create(
          "api::image.image",
          {
            data: {
              url: img,
            },
          }
        );

        imageIds.push(newImage);
      }

      if (!imageIds) {
        return ctx.badRequest("Erro ao criar imagem");
      }

      const product = await strapi.entityService.create(
        "api::product.product",
        {
          data: {
            name,
            slug,
            description,
            active,
            customizable,
            currency: "BRL",
            price,
            brand,
            colors,
            category,
            sizes,
            discount,
            images: imageIds,
            height,
            width,
            length,
            weight,
            seller,
          },
        }
      );

      return (ctx.request.body = product);
    },
    async update(ctx) {
      console.log("update product controller", ctx.request.body);
      const {
        name,
        slug,
        description,
        active,
        price,
        brand,
        colors,
        category,
        sizes,
        discount,
        seller,
      } = ctx.request.body;
      const { id } = ctx.params;

      const product = await strapi.entityService.update(
        "api::product.product",
        id,
        {
          data: {
            name,
            slug,
            description,
            active: Boolean(active),
            price,
            brand,
            colors,
            category,
            sizes,
            discount,
            seller,
          },
        }

      );
      return (ctx.request.body = product);
    },
  })
);
