import { IsString, IsOptional, IsArray } from 'class-validator';

export class RouteRequestDto {
  @IsString()
  origin: string;

  @IsString()
  destination: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  waypoints?: string[];
}
