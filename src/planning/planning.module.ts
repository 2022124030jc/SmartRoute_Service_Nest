import { Module } from '@nestjs/common';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { MapModule } from '../map/map.module';
import { LlmModule } from '../llm/llm.module';

@Module({
  imports: [MapModule, LlmModule],
  controllers: [PlanningController],
  providers: [PlanningService],
})
export class PlanningModule {}
