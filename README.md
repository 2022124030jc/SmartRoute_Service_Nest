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
- OpenRouter API（Deepseek模型）- 自然语言处理

## 目录结构

```
.
├── public/                 # 静态文件目录
│   └── index.html         # 前端页面
├── src/                   # 源代码目录
│   ├── common/           # 公共模块
│   │   └── dtos/        # 数据传输对象
│   │       ├── route-request.dto.ts   # 路由请求DTO
│   │       └── route-response.dto.ts  # 路由响应DTO
│   ├── config/          # 配置文件
│   │   └── app.config.ts # 应用配置
│   ├── llm/            # LLM服务模块
│   │   ├── llm.module.ts  # LLM模块定义
│   │   └── llm.service.ts # LLM服务实现
│   ├── map/            # 地图服务模块
│   │   ├── map.module.ts  # 地图模块定义
│   │   └── map.service.ts # 地图服务实现
│   ├── planning/       # 路径规划模块
│   │   ├── planning.controller.ts # 路径规划控制器
│   │   ├── planning.module.ts     # 规划模块定义
│   │   └── planning.service.ts    # 规划服务实现
│   ├── app.controller.ts  # 应用控制器
│   ├── app.module.ts      # 主模块
│   ├── app.service.ts     # 应用服务
│   └── main.ts           # 应用入口文件
├── test/                  # 测试目录
│   ├── app.e2e-spec.ts    # E2E测试
│   └── jest-e2e.json      # 测试配置
├── .env                   # 环境变量配置
├── nest-cli.json         # Nest CLI配置
├── package.json          # 项目依赖配置
├── tsconfig.json         # TypeScript配置
└── README.md            # 项目说明文档
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
