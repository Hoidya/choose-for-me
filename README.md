# Choose For Me / 决定吧

这是一个把"做决定"变成"交给命运"的网站。

## ✨ 功能特性

- 🎡 **转盘** - 让命运转起来
- 🎲 **骰子** - 掷出你的答案（最多 6 个选项）
- 🃏 **抽卡** - 翻开你的命运
- 🪙 **抛硬币** - 最简单的选择（固定 2 个选项）
- 📋 **问题模板** - 快速开始，无需输入
- 💾 **保存选择** - 保存常用选择，一键重玩
- 📱 **响应式设计** - 完美适配移动端和桌面端

## 🎨 设计特点

参考 [Dribbble](https://dribbble.com/) 的现代化设计风格：

- **极简优雅** - 干净的界面，清晰的层次
- **流畅动画** - 使用 Framer Motion 实现丝滑体验
- **渐变设计** - 现代化的渐变色彩
- **卡片式布局** - 清晰的信息组织
- **响应式** - 完美适配所有设备

## 🚀 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 设置环境变量
cp .env.example .env.local
# 编辑 .env.local，填入你的 Supabase 配置

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 部署到 Cloudflare Pages

详细部署指南请查看：[cloudflare-pages-deploy.md](./cloudflare-pages-deploy.md)

**快速步骤：**

1. 推送代码到 GitHub
2. 在 Cloudflare Pages 中连接仓库
3. 设置环境变量
4. 部署完成！

## 📋 问题模板

应用内置了多种问题模板，包括：

- **食物类** - 今晚吃什么、午餐选择等
- **旅行类** - 旅行目的地、周末去哪玩
- **决定类** - 要不要联系TA、买不买等
- **工作类** - 任务优先级、项目选择
- **娱乐类** - 看什么电影、听什么音乐
- **社交类** - 谁买单、选什么礼物

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **数据库**: Supabase
- **部署**: Cloudflare Pages
- **图标**: Lucide React

## 📁 项目结构

```
choose_for_me/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx           # 首页
│   ├── create/            # 创建选择页面
│   ├── play/              # 游戏页面
│   ├── result/            # 结果页面
│   └── my-choices/        # 我的选择页面
├── components/            # React 组件
│   ├── Wheel.tsx         # 转盘组件
│   ├── Dice.tsx          # 骰子组件
│   ├── Card.tsx          # 抽卡组件
│   └── Coin.tsx          # 抛硬币组件
├── lib/                   # 工具函数
│   ├── supabase.ts       # Supabase 客户端
│   ├── utils.ts          # 工具函数
│   └── templates.ts      # 问题模板
└── prd.md                # 产品需求文档
```

## 🔧 配置

### Supabase 设置

1. 在 Supabase Dashboard 中运行 `supabase-setup.sql`
2. 获取 Project URL 和 anon key
3. 在 `.env.local` 中配置环境变量

### 环境变量

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 使用说明

### 创建选择

1. 点击"新建一个选择"
2. 输入问题
3. 选择游戏方式（转盘/骰子/抽卡/抛硬币）
4. 添加选项（注意限制：
   - 抛硬币：固定 2 个选项
   - 骰子：最多 6 个选项
   - 其他：无限制）
5. 点击"开始游戏"

### 使用模板

1. 在创建页面点击"使用模板"
2. 选择分类或浏览所有模板
3. 点击模板自动填充
4. 可以修改后使用

### 保存选择

1. 在结果页面点击"保存这个选择"
2. 在"我的选择"中查看
3. 可以快速重玩或删除

## 🎯 设计理念

- **冷静** - 不卖萌，不教育
- **命运感** - 让选择看起来像命运，而不是责任
- **极简** - 黑白/中性色，大字号，多留白
- **明确反馈** - 清晰的动画和结果展示

## 📚 相关文档

- [Cloudflare Pages 部署指南](./cloudflare-pages-deploy.md)
- [数据库设置说明](./数据库设置说明.md)
- [产品需求文档](./prd.md)

## 🐛 问题反馈

如果遇到问题，请检查：

1. 环境变量是否正确配置
2. Supabase 数据库是否已设置
3. 浏览器控制台是否有错误

## 📄 License

MIT

---

**一句话产品定义：** 这是一个把"做决定"变成"交给命运"的网站。
