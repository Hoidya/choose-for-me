'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, X, Sparkles, BookOpen } from 'lucide-react'
import type { ChoiceType } from '@/lib/supabase'
import { questionTemplates, getTemplatesByCategory, type QuestionTemplate } from '@/lib/templates'

export default function CreatePage() {
  const router = useRouter()
  const [question, setQuestion] = useState('')
  const [type, setType] = useState<ChoiceType | ''>('')
  const [options, setOptions] = useState<string[]>(['', ''])
  const [showTemplates, setShowTemplates] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('全部')

  const templatesByCategory = getTemplatesByCategory()
  const categories = ['全部', ...Object.keys(templatesByCategory)]

  useEffect(() => {
    // 根据类型调整选项数量限制
    if (type === 'coin') {
      // 硬币固定2个选项
      if (options.length !== 2) {
        setOptions(['', ''])
      }
    } else if (type === 'dice') {
      // 骰子最多6个选项
      if (options.length > 6) {
        setOptions(options.slice(0, 6))
      }
    }
  }, [type, options.length])

  const handleAddOption = () => {
    const maxOptions = type === 'coin' ? 2 : type === 'dice' ? 6 : Infinity
    if (options.length < maxOptions) {
      setOptions([...options, ''])
    }
  }

  const handleRemoveOption = (index: number) => {
    const minOptions = type === 'coin' ? 2 : 2
    if (options.length > minOptions) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const handleTypeChange = (newType: ChoiceType) => {
    setType(newType)
    // 根据类型重置选项
    if (newType === 'coin') {
      setOptions(['', ''])
    } else if (newType === 'dice' && options.length > 6) {
      setOptions(options.slice(0, 6))
    }
  }

  const handleTemplateSelect = (template: QuestionTemplate) => {
    setQuestion(template.question)
    setType(template.type)
    setOptions([...template.options])
    setShowTemplates(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validOptions = options.filter(o => o.trim())
    const minOptions = type === 'coin' ? 2 : 2
    const maxOptions = type === 'coin' ? 2 : type === 'dice' ? 6 : Infinity

    if (!question.trim() || !type || validOptions.length < minOptions || validOptions.length > maxOptions) {
      return
    }

    const params = new URLSearchParams({
      question: question.trim(),
      type,
      options: JSON.stringify(validOptions),
    })

    router.push(`/play?${params.toString()}`)
  }

  const validOptions = options.filter(o => o.trim())
  const minOptions = type === 'coin' ? 2 : 2
  const maxOptions = type === 'coin' ? 2 : type === 'dice' ? 6 : Infinity
  const isValid = question.trim() && type && validOptions.length >= minOptions && validOptions.length <= maxOptions

  const filteredTemplates = selectedCategory === '全部' 
    ? questionTemplates 
    : templatesByCategory[selectedCategory] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">返回</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">新建一个选择</h1>
          <p className="text-neutral-600">让命运帮你做决定</p>
        </div>

        {/* 模板按钮 */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-all shadow-sm"
          >
            <BookOpen className="w-4 h-4" />
            {showTemplates ? '隐藏模板' : '使用模板'}
          </button>
        </div>

        {/* 模板选择 */}
        {showTemplates && (
          <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-neutral-900 text-white shadow-md'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {filteredTemplates.map((template, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleTemplateSelect(template)}
                  className="text-left p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all bg-white"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-neutral-900">{template.question}</p>
                    <span className="px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-600 rounded">
                      {template.type === 'wheel' ? '转盘' : template.type === 'dice' ? '骰子' : template.type === 'card' ? '抽卡' : '硬币'}
                    </span>
                  </div>
                  <p className="text-sm text-neutral-500">{template.options.join(' / ')}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 问题输入 */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-3">
              问题
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="今晚吃什么？"
              className="w-full px-5 py-4 text-lg border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-white transition-all shadow-sm hover:shadow-md"
            />
          </div>

          {/* 选择方式 */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-4">
              选择方式
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {([
                { key: 'wheel', label: '转盘', icon: '🎡' },
                { key: 'dice', label: '骰子', icon: '🎲', max: 6 },
                { key: 'card', label: '抽卡', icon: '🃏' },
                { key: 'coin', label: '抛硬币', icon: '🪙', max: 2 },
              ] as const).map(({ key, label, icon, max }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTypeChange(key as ChoiceType)}
                  className={`relative px-6 py-5 border-2 rounded-xl text-center font-semibold transition-all ${
                    type === key
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-lg scale-105'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-2xl mb-2">{icon}</div>
                  <div>{label}</div>
                  {max && (
                    <div className="text-xs mt-1 opacity-70">最多{max}个</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 选项列表 */}
          <div>
            <label className="block text-sm font-semibold text-neutral-900 mb-4">
              选项
              {type && (
                <span className="ml-2 text-xs font-normal text-neutral-500">
                  {type === 'coin' ? '（固定 2 个）' : type === 'dice' ? '（最多 6 个，至少 2 个）' : '（至少 2 个）'}
                </span>
              )}
            </label>
            <div className="space-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`选项 ${index + 1}`}
                      className="w-full px-5 py-3 border-2 border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent bg-white transition-all shadow-sm hover:shadow-md"
                    />
                  </div>
                  {options.length > (type === 'coin' ? 2 : 2) && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="px-4 py-3 border-2 border-neutral-200 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all text-neutral-600 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {options.length < maxOptions && (
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="w-full px-5 py-3 border-2 border-dashed border-neutral-300 rounded-xl text-neutral-600 hover:border-neutral-400 hover:text-neutral-700 hover:bg-neutral-50 transition-all flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>添加选项</span>
                </button>
              )}
            </div>
            {type === 'dice' && options.length >= 6 && (
              <p className="mt-2 text-sm text-amber-600">骰子最多支持 6 个选项</p>
            )}
            {type === 'coin' && (
              <p className="mt-2 text-sm text-amber-600">抛硬币固定为 2 个选项</p>
            )}
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full px-6 py-4 rounded-xl text-lg font-semibold transition-all ${
              isValid
                ? 'bg-gradient-to-r from-neutral-900 to-neutral-800 text-white hover:shadow-2xl hover:scale-[1.02] shadow-lg'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            开始游戏
          </button>
        </form>
      </main>
    </div>
  )
}
