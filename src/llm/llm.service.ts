import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);  private readonly apiKey: string;
  private readonly apiUrl: string;
  private readonly model: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('llm.apiKey') || '';
    this.apiUrl = `${this.configService.get<string>('llm.baseUrl')}/chat/completions`;
    this.model = this.configService.get<string>('llm.model') || '';
    this.logger.log('LLM API Key configured:', this.apiKey ? '已配置' : '未配置');
  }

  async generateRouteSummary(routeData: any): Promise<string> {    // 检查和格式化路由数据
    const formattedRouteData = routeData ? 
      `起点：${routeData.origin || '未知'}
终点：${routeData.destination || '未知'}
${routeData.steps ? '路线详情：' + JSON.stringify(routeData.steps, null, 2) : ''}` : 
      '无路线数据';

    const prompt = `作为一个智能出行助手，请根据以下高德地图规划的路径信息，生成一段简洁的行程描述和出行建议：

${formattedRouteData}

请提供：
1. 路线概览：主要道路和关键路段
2. 预计用时和距离
3. 出行建议：如避堵建议、注意事项等

请用简洁的中文回答，控制在200字以内。`;try {
      this.logger.log(`Calling OpenRouter API with URL: ${this.apiUrl}`);
      this.logger.log(`Using model: ${this.model}`);
      
      const requestData = {
        model: this.model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      };      const headers = {
        'Authorization': `Bearer ${this.apiKey}`,
        'HTTP-Referer': 'http://localhost:3000',
        'Content-Type': 'application/json',
        'X-Title': 'SmartRoute Service'
      };

      this.logger.log('Sending request to OpenRouter...');
      const response = await firstValueFrom(
        this.httpService.post(this.apiUrl, requestData, { headers })
      );      this.logger.log('API Response:', {
        status: response.status,
        data: response.data,
        routeDataSample: JSON.stringify(routeData).slice(0, 200) + '...' // 记录部分路由数据用于调试
      });

      if (response.data.choices && response.data.choices.length > 0) {
        const content = response.data.choices[0]?.message?.content;
        this.logger.log('Successfully received response from OpenRouter');
        return content || '无法生成路径摘要';
      } else {
        this.logger.warn('Received empty response from OpenRouter', response.data);
        return '无法生成路径摘要';
      }
    } catch (error) {
      this.logger.error('LLM API调用失败:', {
        error: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: this.apiUrl,
        model: this.model
      });
      return `LLM服务调用失败: ${error.response?.data?.error || error.message}`;
    }
  }
}
