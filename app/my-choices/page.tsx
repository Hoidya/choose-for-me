'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Play, Trash2 } from 'lucide-react'
import { supabase, type Choice } from '@/lib/supabase'

export default function MyChoicesPage() {
  const router = useRouter()
  const [choices, setChoices] = useState<Choice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadChoices()
  }, [])

  const loadChoices = async () => {
    try {
      const { data, error } = await supabase
        .from('choices')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error

      setChoices(data || [])
    } catch (error) {
      console.error('Error loading choices:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePlay = (choice: Choice) => {
    const params = new URLSearchParams({
      question: choice.question,
      type: choice.type,
      options: JSON.stringify(choice.options),
    })
    router.push(`/play?${params.toString()}`)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个选择吗？')) return

    try {
      const { error } = await supabase.from('choices').delete().eq('id', id)

      if (error) throw error

      setChoices(choices.filter((c) => c.id !== id))
    } catch (error) {
      console.error('Error deleting choice:', error)
      alert('删除失败，请重试')
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'wheel':
        return '转盘'
      case 'dice':
        return '骰子'
      case 'card':
        return '抽卡'
      default:
        return type
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">返回</span>
            </Link>
            <h1 className="text-xl font-bold text-neutral-900">我的选择</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">加载中...</p>
          </div>
        ) : choices.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600 mb-6">还没有保存的选择</p>
            <Link
              href="/create"
              className="inline-block px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors"
            >
              新建一个选择
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {choices.map((choice) => (
              <div
                key={choice.id}
                className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {choice.question}
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium text-neutral-600 bg-neutral-100 rounded">
                        {getTypeLabel(choice.type)}
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mb-3">
                      {choice.options.join(' / ')}
                    </p>
                    {choice.created_at && (
                      <p className="text-xs text-neutral-400">
                        {new Date(choice.created_at).toLocaleDateString('zh-CN')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePlay(choice)}
                      className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                      title="再玩一次"
                    >
                      <Play className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => choice.id && handleDelete(choice.id)}
                      className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="删除"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

