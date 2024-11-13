/**
 * seller controller
 */

import { factories } from '@strapi/strapi'
import { Context } from 'koa';

interface SellerLoginRequest {
  email: string;
  password: string;
}

export default factories.createCoreController('api::seller.seller', ({ strapi }) => ({
  async sellerLogin(ctx: Context) {
    const { email, password }: SellerLoginRequest = ctx.request.body;

    if (!email || !password) {
      return ctx.badRequest('Email and password are required.');
    }

    // Buscar o usuário com base no email
    const user = await strapi.query('plugin::users-permissions.user').findOne({
      where: { email },
      populate: ['role'],
    }) as any | null;

    if (!user) {
      return ctx.unauthorized('Invalid email or password.');
    }

    // Verificar se o usuário tem a role "Seller"
    const sellerRole = await strapi.query('plugin::users-permissions.role').findOne({
      where: { type: 'seller' },
    });

    if (!sellerRole || user.role.id !== sellerRole.id) {
      return ctx.unauthorized('You do not have permission to access this area.');
    }

    // Verificar a senha
    const validPassword = await strapi.plugins['users-permissions'].services.user.validatePassword(password, user.password);

    if (!validPassword) {
      return ctx.unauthorized('Invalid email or password.');
    }

    // Gerar token JWT
    const token = strapi.plugins['users-permissions'].services.jwt.issue({ id: user.id });

    // Retornar o token e as informações do usuário
    return ctx.send({
      jwt: token,
      user,
    });
  },
}));
