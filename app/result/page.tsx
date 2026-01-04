'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Play } from 'lucide-react'
import { supabase, type Choice } from '@/lib/supabase'

export default function ResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const question = searchParams.get('question') || ''
  const type = searchParams.get('type') || ''
  const options = searchParams.get('options') || '[]'
  const result = searchParams.get('result') || ''

  useEffect(() => {
    // 检查是否已保存
    checkIfSaved()
  }, [])

  const checkIfSaved = async () => {
    // 这里可以添加检查逻辑
  }

  const handleSave = async () => {
    if (saving || saved) return

    setSaving(true)

    try {
      const choiceData: Omit<Choice, 'id' | 'created_at'> = {
        question,
        type: type as Choice['type'],
        options: JSON.parse(options),
        user_id: 'anonymous', // MVP阶段使用匿名
      }

      const { error } = await supabase.from('choices').insert([choiceData])

      if (error) throw error

      setSaved(true)
    } catch (error) {
      console.error('Error saving choice:', error)
      alert('保存失败，请重试')
    } finally {
      setSaving(false)
    }
  }

  const handlePlayAgain = () => {
    const params = new URLSearchParams({
      question,
      type,
      options,
    })
    router.push(`/play?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">返回首页</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-title-sm md:text-title font-bold text-neutral-900">
              {question}
            </h1>
            <div className="pt-8">
              <p className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
                {result}
              </p>
              <p className="text-xl text-neutral-600">
                {getRandomFateMessage()}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={handlePlayAgain}
              className="px-8 py-4 border-2 border-neutral-300 rounded-lg text-lg font-medium text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              再来一次
            </button>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className={`px-8 py-4 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2 ${
                saved
                  ? 'bg-neutral-200 text-neutral-500 cursor-not-allowed'
                  : saving
                  ? 'bg-neutral-300 text-neutral-600 cursor-not-allowed'
                  : 'bg-neutral-900 text-white hover:bg-neutral-800 shadow-lg hover:shadow-xl'
              }`}
            >
              <Save className="w-5 h-5" />
              {saved ? '已保存' : saving ? '保存中...' : '保存这个选择'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

function getRandomFateMessage(): string {
  const messages = [
    '就这样了。',
    '宇宙已经替你决定。',
    '不要反悔。',
    '命运已定。',
    '接受这个结果。',
    '没有回头路。',
    '这就是答案。',
    '尘埃落定。',
  ]
  return messages[Math.floor(Math.random() * messages.length)]
}

