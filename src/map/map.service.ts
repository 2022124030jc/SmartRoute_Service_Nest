import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MapService {
  private readonly logger = new Logger(MapService.name);
  private readonly apiKey: string;
  private readonly mcpDrivingUrl: string;
  private readonly geocodeUrl = 'https://restapi.amap.com/v3/geocode/geo';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('amap.apiKey') || '';
    this.mcpDrivingUrl = this.configService.get<string>('amap.mcpUrl') || '';
  }

  private async getLocation(address: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(this.geocodeUrl, {
          params: {
            key: this.apiKey,
            address,
          },
        }),
      );

      if (response.data.status === '1' && response.data.geocodes && response.data.geocodes.length > 0) {
        return response.data.geocodes[0].location;
      }
      throw new Error(`无法找到地址: ${address}`);
    } catch (error) {
      this.logger.error(`地理编码失败: ${address}`, error.stack);
      throw new Error(`地理编码失败: ${address}`);
    }
  }

  async getDrivingRoute(
    origin: string,
    destination: string,
    waypoint?: string,
  ): Promise<any> {    try {
      // 获取起点和终点的经纬度
      const originLocation = await this.getLocation(origin);
      const destinationLocation = await this.getLocation(destination);
      
      const params: any = {
        key: this.apiKey,
        origin: originLocation,
        destination: destinationLocation,
        show_fields: 'cost,navi,tmcs,steps,polyline',
      };

      // 如果有途经点，也转换为经纬度
      if (waypoint) {
        const waypointLocations = await Promise.all(
          waypoint.split('|').map(wp => this.getLocation(wp))
        );
        params.waypoints = waypointLocations.join('|');
      }

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
