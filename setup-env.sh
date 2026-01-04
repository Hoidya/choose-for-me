#!/bin/bash

# 环境变量设置脚本
# 使用方法: ./setup-env.sh

echo "=== Choose For Me 环境变量设置 ==="
echo ""

# 检查 .env.local 是否已存在
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local 文件已存在"
    read -p "是否要覆盖? (y/N): " overwrite
    if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
        echo "已取消"
        exit 0
    fi
fi

echo "请输入你的 Supabase 配置信息"
echo "（在 Supabase Dashboard > Settings > API 中可以找到）"
echo ""

read -p "Supabase URL: " supabase_url
read -p "Supabase Anon Key: " supabase_key

# 创建 .env.local 文件
cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=$supabase_key
EOF

echo ""
echo "✅ .env.local 文件已创建！"
echo ""
echo "下一步："
echo "1. 在 Supabase Dashboard 的 SQL Editor 中运行 supabase-setup.sql"
echo "2. 运行 'npm run dev' 启动开发服务器"



