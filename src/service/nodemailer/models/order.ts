export type OrderModel = {
  href: string;
  logo: string;
  tradeName: string;
  orderNumber: string;
  customerName: string;
  totalPrice: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  discount: string;
  shippingRate: string;
  fullAddress: string;
  itens: {
    name: string;
    quantity: number;
  }[];
}

export const OrderModel = (order: OrderModel) => (`
  <!DOCTYPE html>
  <html
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    lang="en"
  >
    <head>
      <title></title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <!--[if mso
        ]><xml
          ><o:OfficeDocumentSettings
            ><o:PixelsPerInch>96</o:PixelsPerInch
            ><o:AllowPNG /></o:OfficeDocumentSettings></xml
      ><![endif]-->
      <style>
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          padding: 0;
        }
        a[x-apple-data-detectors] {
          color: inherit !important;
          text-decoration: inherit !important;
        }
        #MessageViewBody a {
          color: inherit;
          text-decoration: none;
        }
        p {
          line-height: inherit;
        }
        .desktop_hide,
        .desktop_hide table {
          mso-hide: all;
          display: none;
          max-height: 0;
          overflow: hidden;
        }
        .image_block img + div {
          display: none;
        }
        sub,
        sup {
          line-height: 0;
          font-size: 75%;
        }
        @media (max-width: 720px) {
          .social_block.desktop_hide .social-table {
            display: inline-block !important;
          }
          .mobile_hide {
            display: none;
          }
          .row-content {
            width: 100% !important;
          }
          .stack .column {
            width: 100%;
            display: block;
          }
          .mobile_hide {
            min-height: 0;
            max-height: 0;
            max-width: 0;
            overflow: hidden;
            font-size: 0;
          }
          .desktop_hide,
          .desktop_hide table {
            display: table !important;
            max-height: none !important;
          }
        }
      </style>
      <!--[if mso
        ]><style>
          sup,
          sub {
            font-size: 100% !important;
          }
          sup {
            mso-text-raise: 10%;
          }
          sub {
            mso-text-raise: -10%;
          }
        </style>
      <![endif]-->
    </head>
    <body
      class="body"
      style="
        background-color: #fff;
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
      "
    >
      <table
        class="nl-container"
        width="100%"
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        style="mso-table-lspace: 0; mso-table-rspace: 0; background-color: #fff"
      >
        <tbody>
          <tr>
            <td>
              <table
                class="row row-1"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0; mso-table-rspace: 0"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0;
                          mso-table-rspace: 0;
                          color: #000;
                          width: 700px;
                          margin: 0 auto;
                        "
                        width="700"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 20px;
                                padding-top: 30px;
                                vertical-align: top;
                                border-top: 0;
                                border-right: 0;
                                border-bottom: 0;
                                border-left: 0;
                              "
                            >
                              <table
                                class="image_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="mso-table-lspace: 0; mso-table-rspace: 0"
                              >
                                <tr>
                                  <td class="pad" style="width: 100%">
                                    <div
                                      class="alignment"
                                      align="center"
                                      style="line-height: 10px"
                                    >
                                      <div style="max-width: 200px">
                                        <a
                                          href=${order.href}
                                          target="_blank"
                                          style="outline: none"
                                          tabindex="-1"
                                          ><img
                                            src=${order.logo}
                                            style="
                                              display: block;
                                              height: auto;
                                              border: 0;
                                              width: 100%;
                                            "
                                            alt=${order.tradeName}
                                            title=${order.tradeName}}
                                            height="auto"
                                        /></a>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="row row-2"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  mso-table-lspace: 0;
                  mso-table-rspace: 0;
                  background-color: #f4cdc7;
                  background-size: auto;
                "
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0;
                          mso-table-rspace: 0;
                          background-size: auto;
                          color: #000;
                          width: 700px;
                          margin: 0 auto;
                        "
                        width="700"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                font-weight: 400;
                                text-align: left;
                                padding-top: 40px;
                                vertical-align: top;
                                border-top: 0;
                                border-right: 0;
                                border-bottom: 0;
                                border-left: 0;
                              "
                            >
                              <table
                                class="text_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 30px;
                                    "
                                  >
                                    <div style="font-family: sans-serif">
                                      <div
                                        class
                                        style="
                                          font-size: 12px;
                                          font-family: Arial, Helvetica Neue,
                                            Helvetica, sans-serif;
                                          mso-line-height-alt: 14.399999999999999px;
                                          color: #573739;
                                          line-height: 1.2;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            font-size: 14px;
                                            text-align: center;
                                            mso-line-height-alt: 16.8px;
                                          "
                                        >
                                          <span
                                            style="
                                              word-break: break-word;
                                              font-size: 30px;
                                            "
                                            ><strong>Seu Pedido #${order.orderNumber}</strong></span
                                          >
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="text_block block-2"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 10px;
                                      padding-left: 20px;
                                      padding-right: 20px;
                                      padding-top: 10px;
                                    "
                                  >
                                    <div style="font-family: sans-serif">
                                      <div
                                        class
                                        style="
                                          font-size: 12px;
                                          font-family: Arial, Helvetica Neue,
                                            Helvetica, sans-serif;
                                          mso-line-height-alt: 18px;
                                          color: #573739;
                                          line-height: 1.5;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-alt: 18px;
                                          "
                                        >
                                          Olá&nbsp;<strong
                                            >${order.customerName}</strong
                                          >,
                                        </p>
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-alt: 18px;
                                          "
                                        >
                                          Seu pedido foi atualizado. Confira os
                                          detalhes abaixo:
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="divider_block block-3"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="mso-table-lspace: 0; mso-table-rspace: 0"
                              >
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                        "
                                      >
                                        <tr>
                                          <td
                                            class="divider_inner"
                                            style="
                                              font-size: 1px;
                                              line-height: 1px;
                                              border-top: 1px solid #bbb;
                                            "
                                          >
                                            <span style="word-break: break-word"
                                              >&#8202;</span
                                            >
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="text_block block-4"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div style="font-family: sans-serif">
                                      <div
                                        class
                                        style="
                                          font-size: 14px;
                                          font-family: Arial, Helvetica Neue,
                                            Helvetica, sans-serif;
                                          mso-line-height-alt: 16.8px;
                                          color: #573739;
                                          line-height: 1.2;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                          "
                                        >
                                          <span
                                            style="
                                              word-break: break-word;
                                              color: #573739;
                                            "
                                            ><strong
                                              ><span
                                                style="
                                                  word-break: break-word;
                                                  font-size: 18px;
                                                "
                                                >Informações do Pedido</span
                                              ></strong
                                            ></span
                                          >
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="paragraph_block block-5"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #573739;
                                        direction: ltr;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0; margin-bottom: 16px">
                                        <span
                                          style="
                                            word-break: break-word;
                                            color: #573739;
                                          "
                                          ><strong>Total:</strong> ${order.totalPrice}</span
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 16px">
                                        <span
                                          style="
                                            word-break: break-word;
                                            color: #573739;
                                          "
                                          ><strong>Status:</strong
                                          >&nbsp;${order.status}</span
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 16px">
                                        <span
                                          style="
                                            word-break: break-word;
                                            color: #573739;
                                          "
                                          ><strong>Método de Pagamento:</strong
                                          >&nbsp;${order.paymentMethod}</span
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 16px">
                                        <span
                                          style="
                                            word-break: break-word;
                                            color: #573739;
                                          "
                                          ><strong>Status do Pagamento:</strong
                                          >&nbsp;${order.paymentStatus}</span
                                        >
                                      </p>
                                      <p style="margin: 0; margin-bottom: 16px">
                                        <span
                                          style="
                                            word-break: break-word;
                                            color: #573739;
                                          "
                                          ><strong>Desconto:</strong
                                          >&nbsp;${order.discount}</span
                                        >
                                      </p>
                                      <p style="margin: 0">
                                        <span
                                          style="
                                            word-break: break-word;
                                            color: #573739;
                                          "
                                          ><strong>Taxa de Entrega:</strong
                                          >&nbsp;${order.shippingRate}</span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="divider_block block-6"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="mso-table-lspace: 0; mso-table-rspace: 0"
                              >
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                        "
                                      >
                                        <tr>
                                          <td
                                            class="divider_inner"
                                            style="
                                              font-size: 1px;
                                              line-height: 1px;
                                              border-top: 1px solid #bbb;
                                            "
                                          >
                                            <span style="word-break: break-word"
                                              >&#8202;</span
                                            >
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="text_block block-7"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div style="font-family: sans-serif">
                                      <div
                                        class
                                        style="
                                          font-size: 14px;
                                          font-family: Arial, Helvetica Neue,
                                            Helvetica, sans-serif;
                                          mso-line-height-alt: 16.8px;
                                          color: #555;
                                          line-height: 1.2;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                          "
                                        >
                                          <span
                                            style="
                                              word-break: break-word;
                                              color: #573739;
                                            "
                                            ><strong
                                              ><span
                                                style="
                                                  word-break: break-word;
                                                  font-size: 18px;
                                                "
                                                >Endereço de Entrega</span
                                              ></strong
                                            ></span
                                          >
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="paragraph_block block-8"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div
                                      style="
                                        color: #000;
                                        direction: ltr;
                                        font-family: Arial, Helvetica Neue,
                                          Helvetica, sans-serif;
                                        font-size: 14px;
                                        font-weight: 400;
                                        letter-spacing: 0;
                                        line-height: 120%;
                                        text-align: left;
                                        mso-line-height-alt: 16.8px;
                                      "
                                    >
                                      <p style="margin: 0">
                                        <span
                                          style="
                                            word-break: break-word;
                                            color: #573739;
                                          "
                                          >Endereço: ${order.fullAddress}</span
                                        >
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="divider_block block-9"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="mso-table-lspace: 0; mso-table-rspace: 0"
                              >
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                        "
                                      >
                                        <tr>
                                          <td
                                            class="divider_inner"
                                            style="
                                              font-size: 1px;
                                              line-height: 1px;
                                              border-top: 1px solid #bbb;
                                            "
                                          >
                                            <span style="word-break: break-word"
                                              >&#8202;</span
                                            >
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="text_block block-10"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div style="font-family: sans-serif">
                                      <div
                                        class
                                        style="
                                          font-size: 14px;
                                          font-family: Arial, Helvetica Neue,
                                            Helvetica, sans-serif;
                                          mso-line-height-alt: 16.8px;
                                          color: #555;
                                          line-height: 1.2;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            font-size: 14px;
                                            mso-line-height-alt: 16.8px;
                                          "
                                        >
                                          <span
                                            style="
                                              word-break: break-word;
                                              color: #573739;
                                            "
                                            ><strong
                                              ><span
                                                style="
                                                  word-break: break-word;
                                                  font-size: 18px;
                                                "
                                                >Itens do Pedido</span
                                              ></strong
                                            ></span
                                          >
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              ${order.itens.map((item) => `
                                <table
                                  class="text_block block-11"
                                  width="100%"
                                  border="0"
                                  cellpadding="10"
                                  cellspacing="0"
                                  role="presentation"
                                  style="mso-table-lspace: 0; mso-table-rspace: 0; word-break: break-word"
                                >
                                  <tr>
                                    <td class="pad">
                                      <div style="font-family: sans-serif">
                                        <div
                                          class
                                          style="
                                            font-size: 14px;
                                            font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
                                            mso-line-height-alt: 16.8px;
                                            color: #555;
                                            line-height: 1.2;
                                          "
                                        >
                                          <p style="margin: 0; font-size: 14px; mso-line-height-alt: 16.8px">
                                            <span
                                              style="word-break: break-word; color: #573739; font-size: 14px"
                                              ><strong
                                                ><span style="word-break: break-word"
                                                  >${item.name} - Quantidade: ${item.quantity}</span
                                                ></strong
                                              ></span
                                            >
                                          </p>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                `)}
                              <table
                                class="divider_block block-14"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="mso-table-lspace: 0; mso-table-rspace: 0"
                              >
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <table
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        width="100%"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                        "
                                      >
                                        <tr>
                                          <td
                                            class="divider_inner"
                                            style="
                                              font-size: 1px;
                                              line-height: 1px;
                                              border-top: 1px solid #bbb;
                                            "
                                          >
                                            <span style="word-break: break-word"
                                              >&#8202;</span
                                            >
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              <table
                                class="text_block block-15"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td class="pad">
                                    <div style="font-family: sans-serif">
                                      <div
                                        class
                                        style="
                                          font-size: 14px;
                                          font-family: Arial, Helvetica Neue,
                                            Helvetica, sans-serif;
                                          mso-line-height-alt: 16.8px;
                                          color: #555;
                                          line-height: 1.2;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-alt: 16.8px;
                                          "
                                        >
                                          <span
                                            style="
                                              word-break: break-word;
                                              color: #573739;
                                            "
                                            >Obrigado por comprar conosco!</span
                                          >
                                        </p>
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-alt: 16.8px;
                                          "
                                        >
                                          <span
                                            style="
                                              word-break: break-word;
                                              color: #573739;
                                            "
                                            >&nbsp;</span
                                          >
                                        </p>
                                        <p
                                          style="
                                            margin: 0;
                                            mso-line-height-alt: 16.8px;
                                          "
                                        >
                                          <span
                                            style="
                                              word-break: break-word;
                                              color: #573739;
                                            "
                                            >Atenciosamente,</span
                                          ><br /><span
                                            style="
                                              word-break: break-word;
                                              color: #573739;
                                            "
                                            >Equipe Franciny Produtos Love</span
                                          >
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="row row-3"
                align="center"
                width="100%"
                border="0"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="mso-table-lspace: 0; mso-table-rspace: 0"
              >
                <tbody>
                  <tr>
                    <td>
                      <table
                        class="row-content stack"
                        align="center"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="
                          mso-table-lspace: 0;
                          mso-table-rspace: 0;
                          color: #000;
                          width: 700px;
                          margin: 0 auto;
                        "
                        width="700"
                      >
                        <tbody>
                          <tr>
                            <td
                              class="column column-1"
                              width="100%"
                              style="
                                mso-table-lspace: 0;
                                mso-table-rspace: 0;
                                font-weight: 400;
                                text-align: left;
                                padding-bottom: 25px;
                                padding-top: 25px;
                                vertical-align: top;
                                border-top: 0;
                                border-right: 0;
                                border-bottom: 0;
                                border-left: 0;
                              "
                            >
                              <table
                                class="social_block block-1"
                                width="100%"
                                border="0"
                                cellpadding="10"
                                cellspacing="0"
                                role="presentation"
                                style="mso-table-lspace: 0; mso-table-rspace: 0"
                              >
                                <tr>
                                  <td class="pad">
                                    <div class="alignment" align="center">
                                      <table
                                        class="social-table"
                                        width="104px"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        role="presentation"
                                        style="
                                          mso-table-lspace: 0;
                                          mso-table-rspace: 0;
                                          display: inline-block;
                                        "
                                      >
                                        <tr>
                                          <td style="padding: 0 10px 0 10px">
                                            <a
                                              href="https://www.instagram.com/lingerie_personalizadacco/"
                                              target="_blank"
                                              ><img
                                                src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/instagram@2x.png"
                                                width="32"
                                                height="auto"
                                                alt="Instagram"
                                                title="Instagram"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                            /></a>
                                          </td>
                                          <td style="padding: 0 10px 0 10px">
                                            <a
                                              href="https://www.facebook.com/personalizadocco"
                                              target="_blank"
                                              ><img
                                                src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/circle-gray/facebook@2x.png"
                                                width="32"
                                                height="auto"
                                                alt="Facebook"
                                                title="Facebook"
                                                style="
                                                  display: block;
                                                  height: auto;
                                                  border: 0;
                                                "
                                            /></a>
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                              
                              <table
                                class="text_block block-3"
                                width="100%"
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                role="presentation"
                                style="
                                  mso-table-lspace: 0;
                                  mso-table-rspace: 0;
                                  word-break: break-word;
                                "
                              >
                                <tr>
                                  <td
                                    class="pad"
                                    style="
                                      padding-bottom: 20px;
                                      padding-left: 10px;
                                      padding-right: 10px;
                                      padding-top: 20px;
                                    "
                                  >
                                    <div style="font-family: sans-serif">
                                      <div
                                        class
                                        style="
                                          font-size: 12px;
                                          font-family: Arial, Helvetica Neue,
                                            Helvetica, sans-serif;
                                          mso-line-height-alt: 14.399999999999999px;
                                          color: #555;
                                          line-height: 1.2;
                                        "
                                      >
                                        <p
                                          style="
                                            margin: 0;
                                            font-size: 14px;
                                            text-align: center;
                                            mso-line-height-alt: 16.8px;
                                          "
                                        >
                                          Quer alterar a forma como você recebe
                                          este e-mail?
                                        </p>
                                        <p
                                          style="
                                            margin: 0;
                                            font-size: 14px;
                                            text-align: center;
                                            mso-line-height-alt: 16.8px;
                                          "
                                        >
                                          <span
                                            style="
                                              word-break: break-word;
                                              font-size: 12px;
                                            "
                                            ><a
                                              href="http://[updateprofile]/"
                                              target="_blank"
                                              rel="noopener"
                                              style="color: #555555"
                                              >manage preference</a
                                            >
                                            &nbsp; &nbsp;·&nbsp; &nbsp;
                                            <a
                                              href="http://[globalunsubscribe]/"
                                              target="_blank"
                                              rel="noopener"
                                              style="color: #555555"
                                              >unsubscribe</a
                                            ></span
                                          >
                                        </p>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
`);
