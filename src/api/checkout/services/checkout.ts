/**
 * checkout service
 */

import { factories } from '@strapi/strapi';
import { EventTypes } from '../types/checkout';

export default factories.createCoreService('api::checkout.checkout', ({ strapi }) => ({
  async payment(eventType: EventTypes) {

    if (eventType === EventTypes.PAYMENT_SUCCEEDED) {
      console.log('Payment succeeded');
    } else if (eventType === EventTypes.PAYMENT_FAILED) {
      console.log('Payment failed');
    } else if (eventType === EventTypes.PAYMENT_CANCELED) {
      console.log('Payment canceled');
    } else if (eventType === EventTypes.PAYMENT_PROCESSING) {
      console.log('Payment processing');
    } else if (eventType === EventTypes.PAYMENT_REQUIRES_ACTION) {
      console.log('Payment requires action');
    } else if (eventType === EventTypes.PAYMENT_PARTIALLY_FUNDED) {
      console.log('Payment partially funded');
    } else if (eventType === EventTypes.PAYMENT_AMOUNT_CAPTURABLE_UPDATED) {
      console.log('Payment amount capturable updated');
    } else if (eventType === EventTypes.PAYMENT_LINK_CREATED) {
      console.log('Payment link created');
    } else if (eventType === EventTypes.PAYMENT_LINK_UPDATED) {
      console.log('Payment link updated');
    } else if (eventType === EventTypes.PAYMENT_METHOD_ATTACHED) {
      console.log('Payment method attached');
    } else if (eventType === EventTypes.PAYMENT_METHOD_DETACHED) {
      console.log('Payment method detached');
    } else if (eventType === EventTypes.PAYMENT_METHOD_UPDATED) {
      console.log('Payment method updated');
    }
    
    return {
      success: true
    };
  }
}));
