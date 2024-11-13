import { Context } from 'koa';

export default async (ctx: Context, next: () => Promise<void>) => {
  const { id: userId } = ctx.state.user;
  const { id: resourceId } = ctx.params;

  const resource = await strapi.query('api::product.product').findOne({
    where: { id: resourceId, seller: userId },
  });

  if (!resource) {
    return ctx.unauthorized('You do not have access to this resource.');
  }

  await next();
};
