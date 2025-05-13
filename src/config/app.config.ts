export const AppConfig = () => ({
  port: parseInt(process.env.PORT as string, 10) || 3000,
  amap: {
    apiKey: process.env.AMAP_API_KEY,
    mcpUrl: 'https://restapi.amap.com/v5/direction/driving', // 驾车多策略路径规划示例
    // 更多策略URL:
    // 公交: https://restapi.amap.com/v5/direction/transit/integrated
    // 步行: https://restapi.amap.com/v5/direction/walking
    // 骑行: https://restapi.amap.com/v5/direction/bicycling
  },  llm: {
    apiKey: process.env.LLM_API_KEY,
    baseUrl: 'https://openrouter.ai/api/v1',
    model: 'deepseek/deepseek-chat-v3-0324:free',
  },
});