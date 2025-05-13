# SmartRoute 智能路径规划服务

一个基于 NestJS 的智能路径规划服务，集成了：
- NestJS 后端框架
- 高德地图 MCP（路径规划服务）
- LLM（大语言模型，用于增强用户体验）

## 功能特点

- 多点路径规划
- 智能路线优化
- 自然语言处理和总结
- RESTful API 设计

## 项目说明

本项目基于 [NestJS](https://github.com/nestjs/nest) 框架开发，使用 TypeScript 语言。

## 项目安装

```bash
$ npm install
```

## 项目运行

```bash
# 开发环境
$ npm run start

# 开发环境（监听模式）
$ npm run start:dev

# 生产环境
$ npm run start:prod
```

## 测试

```bash
# 单元测试
$ npm run test

# 端到端测试
$ npm run test:e2e

# 测试覆盖率
$ npm run test:cov
```

## 部署说明

当您准备将应用部署到生产环境时，请参考以下步骤：

1. 确保所有环境变量正确配置
2. 建议使用 PM2 或 Docker 进行部署
3. 详细信息请查看 [部署文档](https://docs.nestjs.com/deployment)

## 技术栈

本项目使用了以下主要技术：

- NestJS - Node.js 后端框架
- TypeScript - 编程语言
- 高德地图 API - 路径规划服务
- OpenAI API - 自然语言处理

## 目录结构

```
src/
├── common/          # 公共模块（DTO、工具类等）
├── config/          # 配置文件
├── llm/             # LLM 服务模块
├── map/             # 地图服务模块
├── planning/        # 路径规划模块
└── main.ts         # 应用入口文件
```

## API 文档

主要接口：
- POST `/planning/route` - 路径规划接口
  - 支持多点路径规划
  - 返回详细的路线信息和 LLM 优化建议

## 环境变量配置

请在项目根目录创建 `.env` 文件，配置以下环境变量：

```bash
PORT=3000
AMAP_API_KEY=您的高德地图API密钥
LLM_API_KEY=您的LLM服务API密钥
```

## 开发团队

- 开发者 - jc

## 版权信息

本项目采用 MIT 许可证，详情请参见 [LICENSE](LICENSE) 文件。
