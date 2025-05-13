import { Injectable, Logger } from '@nestjs/common';
import { MapService } from '../map/map.service';
import { LlmService } from '../llm/llm.service';
import { RouteRequestDto } from '../common/dtos/route-request.dto';
import { RouteResponseDto } from '../common/dtos/route-response.dto';

@Injectable()
export class PlanningService {
  private readonly logger = new Logger(PlanningService.name);

  constructor(
    private readonly mapService: MapService,
    private readonly llmService: LlmService,
  ) {}

  async planRoute(routeRequest: RouteRequestDto): Promise<RouteResponseDto> {
    this.logger.log(`Planning route for: ${JSON.stringify(routeRequest)}`);

    const waypointsString = routeRequest.waypoints?.join('|');

    const amapRoute = await this.mapService.getDrivingRoute(
      routeRequest.origin,
      routeRequest.destination,
      waypointsString,
    );

    let llmSummary = 'LLM summary not available for this route.';
    if (amapRoute) {
      try {
        llmSummary = await this.llmService.generateRouteSummary(amapRoute);
      } catch (error) {
        this.logger.error(`Error generating LLM summary: ${error.message}`);
      }
    }

    return {
      amapRoute,
      llmSummary,
    };
  }
}
