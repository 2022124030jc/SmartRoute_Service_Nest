import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MapService } from './map.service';

@Module({
  imports: [HttpModule],
  providers: [MapService],
  exports: [MapService],
})
export class MapModule {}
