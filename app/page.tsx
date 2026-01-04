'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Sparkles, Zap, TrendingUp, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter()

  const features = [
    {
      icon: '🎡',
      title: '转盘',
      description: '让命运转起来',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🎲',
      title: '骰子',
      description: '掷出你的答案',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🃏',
      title: '抽卡',
      description: '翻开你的命运',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: '🪙',
      title: '抛硬币',
      description: '最简单的选择',
      color: 'from-emerald-500 to-teal-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-neutral-50">
      {/* Header */}
      <header className="border-b border-neutral-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
              Choose For Me
            </h1>
            <nav className="flex items-center gap-6">
              <Link
                href="/my-choices"
                className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors"
              >
                我的选择
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
            决定吧
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            这是一个把"做决定"变成"交给命运"的网站。
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-20"
        >
          <button
            onClick={() => router.push('/create')}
            className="group relative px-10 py-5 bg-gradient-to-r from-neutral-900 to-neutral-800 text-white text-lg font-semibold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            <span>新建一个选择</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <div className="group relative p-8 bg-white rounded-2xl border border-neutral-200 hover:border-neutral-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                   onClick={() => router.push('/create')}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-neutral-900 text-center">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm text-center">
                  {feature.description}
                </p>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                     style={{ background: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})` }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
        >
          <div>
            <div className="text-3xl font-bold text-neutral-900 mb-1">4</div>
            <div className="text-sm text-neutral-600">种选择方式</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neutral-900 mb-1">∞</div>
            <div className="text-sm text-neutral-600">无限可能</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-neutral-900 mb-1">100%</div>
            <div className="text-sm text-neutral-600">随机公平</div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200/50 bg-white/50 backdrop-blur-sm mt-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-neutral-500 text-sm">
            © 2024 Choose For Me. 把决定交给命运。
          </p>
        </div>
      </footer>
    </div>
  )
}
