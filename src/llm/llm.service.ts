import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LlmService {
  private readonly logger = new Logger(LlmService.name);
  private readonly apiKey: string;
  private readonly apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('OPENROUTER_API_KEY') || '';
  }

  async generateRouteSummary(routeData: any): Promise<string> {
    const prompt = `你是一个智能出行助手。请根据以下高德地图规划的路径信息，生成一段用户友好的、自然的行程描述和一些有用的出行建议。
路径信息如下：
${JSON.stringify(routeData, null, 2)}
请用中文回答。
行程描述应包含关键的换乘点或主要道路。
出行建议可以包括：避开拥堵的建议、携带物品、注意事项等。`;

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          {
            model: 'deepseek/deepseek-chat-v3-0324:free',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
          },
          {
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
          }
        )
      );

      return response.data.choices[0]?.message?.content || '无法生成路径摘要';
    } catch (error) {
      this.logger.error('LLM API调用失败', error);
      return 'LLM服务暂时不可用';
    }
  }
}
