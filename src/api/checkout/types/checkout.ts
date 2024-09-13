export enum EventTypes {
  /** 
   * Este evento é disparado quando um `PaymentIntent` tem um valor atualizado que pode ser capturado. 
   * Isso ocorre em transações com captura manual.
   */
  PAYMENT_AMOUNT_CAPTURABLE_UPDATED = 'payment_intent.amount_capturable_updated',

  /**
   * Este evento é disparado quando um `PaymentIntent` é cancelado.
   * Pode acontecer por vários motivos, como tempo esgotado para a captura de pagamento ou uma requisição explícita de cancelamento.
   */
  PAYMENT_CANCELED = 'payment_intent.canceled',

  /**
   * Disparado quando um novo `PaymentIntent` é criado. 
   * Representa a intenção de processar um pagamento e é o início do fluxo de pagamento.
   */
  PAYMENT_CREATED = 'payment_intent.created',

  /**
   * Disparado quando um `PaymentIntent` recebe um valor parcialmente financiado.
   * Isso pode acontecer em cenários onde o cliente está pagando em múltiplas etapas ou fontes de pagamento.
   */
  PAYMENT_PARTIALLY_FUNDED = 'payment_intent.partially_funded',

  /**
   * Este evento é disparado quando uma tentativa de pagamento falha.
   * Ocorre por motivos como fundos insuficientes, problemas no cartão ou outros erros de pagamento.
   */
  PAYMENT_FAILED = 'payment_intent.payment_failed',

  /**
   * Disparado quando um pagamento está em processamento.
   * Isso indica que a transação está em andamento e o resultado final ainda não está determinado.
   */
  PAYMENT_PROCESSING = 'payment_intent.processing',

  /**
   * Disparado quando uma ação adicional é necessária para completar o pagamento.
   * Por exemplo, pode ser solicitada a autenticação adicional do cliente (como autenticação 3D Secure).
   */
  PAYMENT_REQUIRES_ACTION = 'payment_intent.requires_action',

  /**
   * Disparado quando um pagamento é bem-sucedido.
   * Este evento significa que o pagamento foi autorizado e processado corretamente.
   */
  PAYMENT_SUCCEEDED = 'payment_intent.succeeded',

  /**
   * Disparado quando um link de pagamento é criado.
   * Um link de pagamento é uma URL que permite ao cliente realizar o pagamento através de um formulário hospedado pelo Stripe.
   */
  PAYMENT_LINK_CREATED = 'payment_link.created',

  /**
   * Disparado quando um link de pagamento existente é atualizado.
   * Isso pode ocorrer quando detalhes, como o valor do pagamento ou a moeda, são alterados.
   */
  PAYMENT_LINK_UPDATED = 'payment_link.updated',

  /**
   * Disparado quando um `PaymentMethod` é anexado a um cliente ou `PaymentIntent`.
   * Um `PaymentMethod` pode ser um cartão de crédito, débito, ou outros métodos de pagamento.
   */
  PAYMENT_METHOD_ATTACHED = 'payment_method.attached',

  /**
   * Disparado quando um `PaymentMethod` é desvinculado de um cliente ou `PaymentIntent`.
   * Isso ocorre quando o cliente remove uma forma de pagamento associada à sua conta.
   */
  PAYMENT_METHOD_DETACHED = 'payment_method.detached',

  /**
   * Disparado quando um `PaymentMethod` existente é atualizado.
   * Por exemplo, isso pode ocorrer quando o cliente atualiza os detalhes de seu cartão de crédito.
   */
  PAYMENT_METHOD_UPDATED = 'payment_method.updated',
}
