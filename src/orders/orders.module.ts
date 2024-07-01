import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env, PRODUCT_SERVICE } from 'src/config';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE,
        transport: Transport.TCP,
        options: {
          host: env.productsMicroservice.host,
          port: env.productsMicroservice.port,
        },
      },
    ]),
  ],
})
export class OrdersModule {}
