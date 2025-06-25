import { SharedModule } from 'src/shared/http/http.module';
import { BymaService } from './services/byma.service';
import { BymaController } from './controllers/byma.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [SharedModule],
  controllers: [BymaController],
  providers: [BymaService],
})
export class BymaModule {}
