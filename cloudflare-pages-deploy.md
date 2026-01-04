# 🚀 Cloudflare Pages 部署指南

## 为什么选择 Cloudflare Pages？

- ✅ **免费** - 完全免费的静态网站托管
- ✅ **全球 CDN** - 快速访问，无论用户在哪里
- ✅ **自动部署** - 连接 GitHub 后自动部署
- ✅ **HTTPS** - 自动 SSL 证书
- ✅ **持续在线** - 即使你的电脑离线，网站依然可用

## 部署步骤

### 1. 准备代码仓库

#### 1.1 初始化 Git（如果还没有）

```bash
cd /Users/andyouyang/choose_for_me

# 初始化 Git
git init

# 创建 .gitignore（如果还没有）
cat > .gitignore << 'EOF'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
EOF

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Choose For Me app"
```

#### 1.2 推送到 GitHub

1. 在 GitHub 上创建新仓库（例如：`choose-for-me`）
2. 不要初始化 README、.gitignore 或 license
3. 复制仓库 URL

然后运行：

```bash
# 添加远程仓库
git remote add origin https://github.com/你的用户名/choose-for-me.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 2. 设置 Cloudflare Pages

#### 2.1 登录 Cloudflare

1. 访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 如果没有账号，先注册（免费）
3. 登录后，点击左侧菜单的 **Pages**

#### 2.2 连接 GitHub 仓库

1. 点击 **Create a project**
2. 选择 **Connect to Git**
3. 授权 Cloudflare 访问你的 GitHub 账号
4. 选择你的仓库：`choose-for-me`
5. 点击 **Begin setup**

#### 2.3 配置构建设置

在构建设置页面，填写：

- **Project name**: `choose-for-me`（或你喜欢的名字）
- **Production branch**: `main`
- **Framework preset**: `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next`

**环境变量**（重要！）：

点击 **Add environment variable**，添加：

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://qzmoulokbcyqunfpwwbw.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6bW91bG9rYmN5cXVuZnB3d2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc1MjQ0MzQsImV4cCI6MjA4MzEwMDQzNH0.jc5Cy7Um2SYgCt2gjRDy_ZTEw4CbhqNZLHptiU2nCQ0`

⚠️ **注意**：这些是公开的环境变量，会暴露在客户端代码中。Supabase 的 anon key 本身就是设计为公开的，所以是安全的。

#### 2.4 开始部署

1. 点击 **Save and Deploy**
2. 等待构建完成（通常 2-5 分钟）
3. 构建成功后，你会得到一个 URL，例如：`https://choose-for-me.pages.dev`

### 3. 更新 Supabase 数据库

由于我们添加了 `coin` 类型，需要更新数据库：

1. 打开 Supabase Dashboard
2. 进入 SQL Editor
3. 运行以下 SQL：

```sql
-- 更新 choices 表，添加 coin 类型支持
ALTER TABLE choices 
DROP CONSTRAINT IF EXISTS choices_type_check;

ALTER TABLE choices 
ADD CONSTRAINT choices_type_check 
CHECK (type IN ('wheel', 'dice', 'card', 'coin'));
```

### 4. 自定义域名（可选）

如果你想使用自己的域名：

1. 在 Cloudflare Pages 项目设置中
2. 点击 **Custom domains**
3. 添加你的域名
4. Cloudflare 会自动配置 DNS 和 SSL

## 自动部署

设置完成后，每次你推送代码到 GitHub：

1. Cloudflare Pages 会自动检测到更改
2. 自动开始构建
3. 构建成功后自动部署
4. 你的网站会立即更新

## 查看部署状态

在 Cloudflare Pages Dashboard 中，你可以：

- 查看所有部署历史
- 查看构建日志
- 回滚到之前的版本
- 预览部署（在合并到 main 之前）

## 常见问题

### Q: 构建失败怎么办？

**A:** 检查构建日志：
1. 在 Cloudflare Pages Dashboard 中点击失败的部署
2. 查看构建日志中的错误信息
3. 常见问题：
   - 环境变量未设置
   - 依赖安装失败
   - 代码语法错误

### Q: 如何更新环境变量？

**A:** 
1. 在 Cloudflare Pages 项目设置中
2. 点击 **Settings** > **Environment variables**
3. 添加或修改环境变量
4. 需要重新部署才能生效（可以点击 **Retry deployment**）

### Q: 网站访问慢怎么办？

**A:** Cloudflare Pages 使用全球 CDN，通常很快。如果慢：
- 检查 Supabase 数据库连接
- 检查是否有大量未优化的图片
- 考虑使用 Cloudflare 的图片优化功能

### Q: 如何回滚到之前的版本？

**A:**
1. 在 Cloudflare Pages Dashboard 中
2. 找到之前的成功部署
3. 点击 **...** > **Retry deployment**

## 部署后的检查清单

- [ ] 网站可以正常访问
- [ ] 首页显示正常
- [ ] 可以创建新选择
- [ ] 所有游戏方式（转盘、骰子、抽卡、硬币）都能正常工作
- [ ] 可以保存选择
- [ ] "我的选择"页面可以查看保存的选择
- [ ] 模板功能正常

## 下一步

部署成功后：

1. **分享链接** - 把你的网站链接分享给朋友
2. **收集反馈** - 看看用户如何使用
3. **持续改进** - 根据反馈添加新功能

## 参考链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Next.js 部署指南](https://nextjs.org/docs/deployment)
- [Supabase 文档](https://supabase.com/docs)

祝你部署顺利！🎉

