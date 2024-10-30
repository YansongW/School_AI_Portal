# School AI Portal（学校 AI 融合门户）

## 项目概述

这是一个基于 React + TypeScript 开发的学校 AI 融合门户系统，采用微前端架构，集成了 AI 助手、在线服务等功能。

### 技术栈

- 前端框架：React 18 + TypeScript
- 状态管理：Redux Toolkit
- UI 组件库：Ant Design
- 样式解决方案：TailwindCSS
- 微前端框架：qiankun
- 国际化：i18next
- HTTP 请求：Axios
- 构建工具：Vite

## 项目结构

```
school-ai-portal/
├── main-app/                # 主应用
│   ├── src/
│   │   ├── assets/         # 静态资源
│   │   ├── components/     # 公共组件
│   │   │   ├── ErrorBoundary/    # 错误边界组件
│   │   │   ├── GlobalLoading/    # 全局加载组件
│   │   │   ├── CommonTable/      # 通用表格组件
│   │   │   └── CommonForm/       # 通用表单组件
│   │   ├── hooks/          # 自定义 Hooks
│   │   ├── layouts/        # 布局组件
│   │   ├── pages/          # 页面组件
│   │   ├── store/          # Redux 状态管理
│   │   ├── utils/          # 工具函数
│   │   ├── types/          # TypeScript 类型定义
│   │   ├── micro/          # 微前端相关
│   │   └── i18n/           # 国际化配置
│   └── package.json
└── micro-apps/             # 子应用目录
    ├── student-app/        # 学生服务子应用
    └── teacher-app/        # 教师服务子应用
```

## 核心功能模块

### 1. 认证与授权
- 用户登录/登出
- 权限控制
- 路由守卫
- Token 管理

### 2. 微前端架构
- 主应用与子应用通信机制
- 子应用生命周期管理
- 应用间状态共享
- 样式隔离

### 3. AI 助手集成
- AI 对话功能
- 智能推荐
- 自然语言处理

### 4. 全局状态管理
- 用户信息管理
- 全局加载状态
- 错误处理机制
- 消息通知

### 5. 国际化支持
- 中英文切换
- 动态语言包加载
- 时间日期本地化

## 开发指南

### 环境要求
- Node.js >= 16
- pnpm >= 7

### 安装依赖
```bash
pnpm install
```

### 开发模式
```bash
pnpm dev
```

### 构建项目
```bash
pnpm build
```

## 错误处理机制

系统实现了完整的错误处理机制：

1. 全局错误边界（ErrorBoundary）
2. API 请求错误处理
3. 业务逻辑错误处理
4. 类型化的错误定义

## 代码规范

- 使用 TypeScript 进行类型检查
- ESLint + Prettier 代码格式化
- 遵循 React Hooks 规范
- 组件文档注释规范

## 性能优化

### 1. 代码分割
- 路由级别的代码分割
- 组件懒加载

### 2. 缓存策略
- 接口数据缓存
- 静态资源缓存

### 3. 构建优化
- 资源压缩
- Tree Shaking
- 包大小分析

## 安全措施

1. XSS 防护
2. CSRF 防护
3. 敏感信息加密
4. 权限控制

## 部署说明

### 开发环境
```bash
# .env.development 配置文件
NODE_ENV=development
VITE_API_BASE_URL=http://localhost:3000
```

### 生产环境
```bash
# .env.production 配置文件
NODE_ENV=production
VITE_API_BASE_URL=https://api.example.com
```

## 子应用接入指南

1. 子应用需要导出生命周期钩子
2. 配置 webpack/vite 构建配置
3. 实现主子应用通信机制

## 常见问题

1. 微前端应用加载失败
2. 跨域问题处理
3. 样式冲突解决
4. 性能优化建议

## 维护者

## 版本历史

- v1.0.0 (2024-10-31)
  - 初始版本发布
  - 实现基础功能框架
  - 集成 AI 助手模块

## 许可证

MIT License