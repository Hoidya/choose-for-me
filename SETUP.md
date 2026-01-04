# 环境设置指南

## 当前状态

由于系统环境限制，npm 安装可能遇到日志写入问题。请按照以下步骤手动完成设置：

## 步骤 1: 安装依赖

在终端中运行：

```bash
cd /Users/andyouyang/choose_for_me
npm install
```

如果遇到 Java Runtime 错误，这是警告信息，通常不会阻止安装。如果安装失败，可以尝试：

```bash
# 使用 yarn 替代
yarn install

# 或者使用 pnpm
pnpm install
```

## 步骤 2: 创建环境变量文件

创建 `.env.local` 文件（在项目根目录）：

```bash
touch .env.local
```

编辑 `.env.local`，添加以下内容：

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 如何获取 Supabase 配置：

1. 访问 [supabase.com](https://supabase.com) 并登录
2. 创建新项目（如果还没有）
3. 等待项目初始化完成（约 2 分钟）
4. 在项目 Dashboard 中，点击 **Settings** > **API**
5. 复制以下信息：
   - **Project URL** → 填入 `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → 填入 `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 步骤 3: 设置 Supabase 数据库

1. 在 Supabase Dashboard 中，打开 **SQL Editor**
2. 点击 **New query**
3. 打开项目中的 `supabase-setup.sql` 文件
4. 复制全部内容到 SQL Editor
5. 点击 **Run** 执行 SQL

这将创建 `choices` 表并设置必要的权限。

## 步骤 4: 启动开发服务器

```bash
npm run dev
```

或者：

```bash
yarn dev
# 或
pnpm dev
```

开发服务器将在 [http://localhost:3000](http://localhost:3000) 启动。

## 验证安装

安装成功后，你应该看到：

1. `node_modules` 文件夹已创建
2. `.env.local` 文件已配置（包含你的 Supabase 信息）
3. 开发服务器成功启动，没有错误

## 常见问题

### npm 日志写入错误

如果看到 "Log files were not written" 错误，这通常不影响安装。检查 `node_modules` 文件夹是否存在即可。

### Java Runtime 警告

这个警告可以忽略，不会影响项目运行。

### Supabase 连接错误

- 确认 `.env.local` 文件中的 URL 和 Key 正确
- 确认 Supabase 项目已激活
- 检查数据库表是否已创建（在 Supabase Dashboard > Table Editor 中查看）

### 端口 3000 已被占用

```bash
# 使用其他端口
npm run dev -- -p 3001
```

## 下一步

安装完成后，你可以：

1. 访问 http://localhost:3000 查看首页
2. 点击"新建一个选择"创建你的第一个选择
3. 尝试三种不同的游戏方式：转盘、骰子、抽卡
4. 保存选择并在"我的选择"中查看

祝你使用愉快！🎉




