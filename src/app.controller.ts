import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import * as crypto from 'crypto';
import { throwError } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('shopify/webhook/orders/:store')
  async readHook(
    @Param('store') store: string,
    @Req() req: RawBodyRequest<Request>,
    @Body() body: any,
    @Headers() headers: any,
  ) {
    const webhooks = {
      test: process.env.SHOPIFY_SECRET,
      granvia: process.env.SHOPIFY_SECRET_GRANVIA,
      granviaoutlet: process.env.SHOPIFY_SECRET_GRANVIA_OUTLET,
      louder: process.env.SHOPIFY_SECRET_GRANVIA_LOUDER,
    };
    const secret = webhooks[store];
    const shopifyHash = headers['x-shopify-hmac-sha256'];
    console.log(`Controller: ${body.id}, made in: ${store}`);
    const hash = crypto
      .createHmac('sha256', secret)
      .update(req.rawBody)
      .digest('base64');
    if (hash !== shopifyHash) {
      return throwError(() => 'Da hell are you doing here!');
    }
    return this.appService.setWebhook(body, store, secret);
  }

  @Post('shopify/webhook/orders/edit/:store')
  async readUpdateHook(
    @Param('store') store: string,
    @Req() req: RawBodyRequest<Request>,
    @Body() body: any,
    @Headers() headers: any,
  ) {
    const webhooks = {
      test: process.env.SHOPIFY_SECRET,
      granvia: process.env.SHOPIFY_SECRET_GRANVIA,
      granviaoutlet: process.env.SHOPIFY_SECRET_GRANVIA_OUTLET,
      louder: process.env.SHOPIFY_SECRET_GRANVIA_LOUDER,
    };
    const secret = webhooks[store];
    const shopifyHash = headers['x-shopify-hmac-sha256'];
    console.log(`Controller: ${body.id}, made in: ${store}`);
    const hash = crypto
      .createHmac('sha256', secret)
      .update(req.rawBody)
      .digest('base64');
    if (hash !== shopifyHash) {
      return throwError(() => 'Da hell are you doing here!');
    }
    return this.appService.readUpdateHook(body, store, secret);
  }
}
