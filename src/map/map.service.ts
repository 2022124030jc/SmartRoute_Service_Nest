import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MapService {
  private readonly logger = new Logger(MapService.name);
  private readonly apiKey: string;
  private readonly mcpDrivingUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('amap.apiKey') || '';
    this.mcpDrivingUrl = this.configService.get<string>('amap.mcpUrl') || '';
  }
  async getDrivingRoute(
    origin: string,
    destination: string,
    waypoint?: string,
  ): Promise<any> {
    const params: any = {
      key: this.apiKey,
      origin,
      destination,
      show_fields: 'cost,navi,tmcs,steps,polyline',
    };
      if (waypoint) {
      params.waypoints = waypoint;
    }

    try {
      this.logger.log(`Requesting Amap MCP: ${this.mcpDrivingUrl} with params: ${JSON.stringify(params)}`);
      const response = await firstValueFrom(
        this.httpService.get(this.mcpDrivingUrl, { params }),
      );
      
      if (response.data.status === '1' && response.data.route) {
        this.logger.log('Amap MCP request successful.');
        return response.data.route;
      } else {
        this.logger.error(`Amap API Error: ${response.data.infocode} - ${response.data.info}`);
        throw new Error(`Amap API Error: ${response.data.info}`);
      }
    } catch (error) {
      this.logger.error('Failed to fetch route from Amap', error.stack);
      throw error;
    }
  }
}
