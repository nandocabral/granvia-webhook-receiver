import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async setWebhook(body: any, store: string, secret: string) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.post(
          `${process.env.URL_SITE}/api/v1/webhook/shopify/public/public/orders/${store}`,
          { body, secret },
        ),
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
