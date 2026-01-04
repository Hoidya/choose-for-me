'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CoinProps {
  options: string[]
  onResult: (result: string) => void
  isFlipping: boolean
}

export default function Coin({ options, onResult, isFlipping }: CoinProps) {
  const [isHeads, setIsHeads] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (isFlipping) {
      // 快速翻转动画
      let flipCount = 0
      const maxFlips = 10
      
      const interval = setInterval(() => {
        setIsHeads(prev => !prev)
        flipCount++
        
        if (flipCount >= maxFlips) {
          clearInterval(interval)
          // 随机选择结果
          const randomIndex = Math.floor(Math.random() * options.length)
          setSelectedIndex(randomIndex)
          // 根据结果决定最终显示
          setIsHeads(randomIndex === 0)
          onResult(options[randomIndex])
        }
      }, 150)
    }
  }, [isFlipping, options, onResult])

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative w-32 h-32 md:w-40 md:h-40"
          animate={isFlipping ? { rotateY: [0, 180, 360, 540, 720] } : {}}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* 硬币正面 */}
          <div
            className="absolute inset-0 rounded-full border-4 border-amber-600 shadow-xl flex items-center justify-center"
            style={{
              backgroundColor: isHeads ? '#fbbf24' : '#92400e',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="text-white font-bold text-2xl md:text-3xl">
              {isHeads ? options[0]?.[0] || '正' : options[1]?.[0] || '反'}
            </div>
          </div>
          
          {/* 硬币背面 */}
          <div
            className="absolute inset-0 rounded-full border-4 border-amber-600 shadow-xl flex items-center justify-center"
            style={{
              backgroundColor: !isHeads ? '#fbbf24' : '#92400e',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="text-white font-bold text-2xl md:text-3xl">
              {!isHeads ? options[0]?.[0] || '正' : options[1]?.[0] || '反'}
            </div>
          </div>
        </motion.div>
      </div>

      {selectedIndex !== null && !isFlipping && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-neutral-600 text-sm mb-2">结果</p>
          <p className="text-3xl font-bold text-amber-600">{options[selectedIndex]}</p>
        </motion.div>
      )}
    </div>
  )
}



