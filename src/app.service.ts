import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            rel="icon"
            href="https://granvia.mx/cdn/shop/files/gv_32x.png?v=1668022368"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald&display=swap"
            rel="stylesheet"
          />
          <title>GRANVIA</title>
          <style>
            body {
              font-family: "Oswald", sans-serif;
            }
          </style>
        </head>
        <body
          style="
            background-color: black;
            height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <h1 style="color: white">GRANVIA PROXY SERVICE OK</h1>
        </body>
      </html>
    `;
  }

  setWebhook(body: any, store: string, secret: string) {
    try {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
      axios.post(
        `${process.env.URL_SITE}/api/v1/webhook/shopify/public/public/orders/${store}`,
        { body, secret },
      );
    } catch (error) {
      console.log(error);
    }
  }

  readUpdateHook(body: any, store: string, secret: string) {
    try {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
      axios.post(
        `${process.env.URL_SITE}/api/v1/webhook/shopify/public/public/orders/edit/${store}`,
        { body, secret },
      );
    } catch (error) {
      console.log(error);
    }
  }
}
