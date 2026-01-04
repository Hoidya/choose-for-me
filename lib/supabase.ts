import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// 创建 Supabase 客户端，即使环境变量为空也不会崩溃
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createClient("https://placeholder.supabase.co", "placeholder-key");

export type ChoiceType = "wheel" | "dice" | "card" | "coin";

export interface Choice {
  id?: string;
  question: string;
  type: ChoiceType;
  options: string[];
  created_at?: string;
  user_id?: string;
}
