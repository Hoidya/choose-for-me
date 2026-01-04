-- Choose For Me 数据库设置
-- 在 Supabase SQL Editor 中运行此脚本

-- 创建 choices 表
CREATE TABLE IF NOT EXISTS choices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('wheel', 'dice', 'card', 'coin')),
  options JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_id TEXT DEFAULT 'anonymous'
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_choices_user_id ON choices(user_id);
CREATE INDEX IF NOT EXISTS idx_choices_created_at ON choices(created_at DESC);

-- 启用 Row Level Security (RLS)
ALTER TABLE choices ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取和插入（MVP阶段）
CREATE POLICY "Allow all operations for anonymous users"
  ON choices
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 或者，如果需要更严格的策略：
-- CREATE POLICY "Allow read for all"
--   ON choices
--   FOR SELECT
--   USING (true);
--
-- CREATE POLICY "Allow insert for all"
--   ON choices
--   FOR INSERT
--   WITH CHECK (true);
--
-- CREATE POLICY "Allow delete for own records"
--   ON choices
--   FOR DELETE
--   USING (user_id = current_setting('app.user_id', true));



