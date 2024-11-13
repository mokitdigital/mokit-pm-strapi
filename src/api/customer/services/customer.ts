/**
 * customer service
 */

import { Attribute, factories } from '@strapi/strapi';
import { melhorEnvio } from '../../../service/melhor-envio';



export default factories.createCoreService('api::customer.customer');
