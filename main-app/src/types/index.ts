// 用户信息接口
export interface UserInfo {
  id: string;
  name: string;
  avatar?: string;
  role: string[];
}

// AI聊天接口
export interface AIChatMessage {
  id: string;
  content: string;
  type: 'user' | 'ai';
  timestamp: number;
}

// 待办事项接口
export interface TodoItem {
  id: string;
  title: string;
  count: number;
  type: string;
  url: string;
}

// 常用服务接口
export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  url: string;
  description?: string;
}

// 轮播图接口
export interface CarouselItem {
  id: string;
  imageUrl: string;
  link: string;
  title: string;
}

// 认证接口预留
export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// AI接口预留
export interface AIModelConfig {
  modelName: string;
  temperature: number;
  maxTokens: number;
}

// 微前端应用配置接口
export interface MicroApp {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
} 