'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Wheel from '@/components/Wheel'
import Dice from '@/components/Dice'
import Card from '@/components/Card'
import Coin from '@/components/Coin'
import type { ChoiceType } from '@/lib/supabase'

export default function PlayPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [question, setQuestion] = useState('')
  const [type, setType] = useState<ChoiceType>('wheel')
  const [options, setOptions] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    const questionParam = searchParams.get('question')
    const typeParam = searchParams.get('type') as ChoiceType
    const optionsParam = searchParams.get('options')

    if (questionParam && typeParam && optionsParam) {
      setQuestion(questionParam)
      setType(typeParam)
      try {
        setOptions(JSON.parse(optionsParam))
      } catch (e) {
        console.error('Failed to parse options', e)
      }
    }
  }, [searchParams])

  const handleStart = () => {
    setIsPlaying(true)
    setResult(null)
  }

  const handleResult = (selectedResult: string) => {
    setResult(selectedResult)
    setIsPlaying(false)
  }

  const handlePlayAgain = () => {
    setResult(null)
    setIsPlaying(false)
  }

  const handleSave = () => {
    const params = new URLSearchParams({
      question,
      type,
      options: JSON.stringify(options),
      result: result || '',
    })
    router.push(`/result?${params.toString()}`)
  }

  if (!question || options.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <p className="text-neutral-600">加载中...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* 问题显示 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            {question}
          </h1>
        </div>

        {/* 游戏区域 */}
        <div className="mb-12">
          {type === 'wheel' && (
            <Wheel
              options={options}
              onResult={handleResult}
              isSpinning={isPlaying}
            />
          )}
          {type === 'dice' && (
            <Dice
              options={options}
              onResult={handleResult}
              isRolling={isPlaying}
            />
          )}
          {type === 'card' && (
            <Card
              options={options}
              onResult={handleResult}
              isDrawing={isPlaying}
            />
          )}
          {type === 'coin' && (
            <Coin
              options={options}
              onResult={handleResult}
              isFlipping={isPlaying}
            />
          )}
        </div>

        {/* 控制按钮 */}
        {!result && (
          <div className="text-center">
            <button
              onClick={handleStart}
              disabled={isPlaying}
              className={`px-10 py-5 rounded-2xl text-lg font-semibold transition-all ${
                isPlaying
                  ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-neutral-900 to-neutral-800 text-white hover:shadow-2xl hover:scale-105 shadow-xl'
              }`}
            >
              {isPlaying ? '进行中...' : '开始'}
            </button>
          </div>
        )}

        {/* 结果显示 */}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-8"
          >
            <div className="space-y-6 p-8 bg-white rounded-3xl shadow-xl border border-neutral-200">
              <p className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
                {result}
              </p>
              <p className="text-xl md:text-2xl text-neutral-600 font-medium">
                {getRandomFateMessage()}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePlayAgain}
                className="px-8 py-4 border-2 border-neutral-300 rounded-xl text-lg font-semibold text-neutral-700 hover:border-neutral-400 hover:bg-neutral-50 transition-all shadow-sm hover:shadow-md"
              >
                再来一次
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-4 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white rounded-xl text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all shadow-lg"
              >
                保存这个选择
              </button>
            </div>
          </motion.div>
        )}
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

