import { Module } from '@nestjs/common';
import { BymaModule } from './byma/byma.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config/appConfig';

@Module({
  imports: [
    BymaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
})
export class AppModule {}
