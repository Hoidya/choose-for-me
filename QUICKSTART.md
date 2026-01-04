# 快速启动指南

## 1. 安装依赖

```bash
npm install
```

## 2. 设置 Supabase

### 2.1 创建 Supabase 项目

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 等待项目初始化完成

### 2.2 设置数据库

1. 在 Supabase Dashboard 中，打开 SQL Editor
2. 复制 `supabase-setup.sql` 文件中的内容
3. 粘贴到 SQL Editor 并运行

### 2.3 获取 API 密钥

1. 在 Supabase Dashboard 中，打开 Settings > API
2. 复制以下信息：
   - Project URL
   - anon/public key

## 3. 配置环境变量

创建 `.env.local` 文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Supabase 配置：

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 5. 部署到 Vercel

### 5.1 准备代码

```bash
git init
git add .
git commit -m "Initial commit"
```

### 5.2 推送到 GitHub

1. 在 GitHub 创建新仓库
2. 推送代码：

```bash
git remote add origin your-repo-url
git push -u origin main
```

### 5.3 在 Vercel 部署

1. 访问 [vercel.com](https://vercel.com)
2. 导入你的 GitHub 仓库
3. 添加环境变量：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. 点击 Deploy

完成！🎉

## 常见问题

### 数据库连接失败

- 检查环境变量是否正确设置
- 确认 Supabase 项目已激活
- 检查 RLS (Row Level Security) 策略是否正确配置

### 样式不显示

- 确认 Tailwind CSS 已正确安装
- 检查 `tailwind.config.js` 配置
- 重启开发服务器

### 动画不工作

- 确认 Framer Motion 已安装
- 检查浏览器控制台是否有错误




