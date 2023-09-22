import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async setWebhook(body: any, store: string, secret: string) {
    try {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
      const { data } = await axios.post(
        `${process.env.URL_SITE}/api/v1/webhook/shopify/public/public/orders/${store}`,
        { body, secret },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
