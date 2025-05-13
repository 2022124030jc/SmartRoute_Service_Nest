import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { RouteRequestDto } from '../common/dtos/route-request.dto';
import { RouteResponseDto } from '../common/dtos/route-response.dto';

@Controller('planning')
export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  @Post('route')
  async planRoute(@Body() routeRequest: RouteRequestDto): Promise<RouteResponseDto> {
    return this.planningService.planRoute(routeRequest);
  }
}
