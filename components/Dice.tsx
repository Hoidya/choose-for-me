'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface DiceProps {
  options: string[]
  onResult: (result: string) => void
  isRolling: boolean
}

export default function Dice({ options, onResult, isRolling }: DiceProps) {
  const [currentValue, setCurrentValue] = useState(1)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    if (isRolling) {
      // 快速切换数字模拟滚动
      const interval = setInterval(() => {
        setCurrentValue(Math.floor(Math.random() * 6) + 1)
      }, 100)

      // 2秒后停止并选择结果
      setTimeout(() => {
        clearInterval(interval)
        const randomIndex = Math.floor(Math.random() * options.length)
        const finalValue = (randomIndex % 6) + 1
        setCurrentValue(finalValue)
        setSelectedIndex(randomIndex)
        onResult(options[randomIndex])
      }, 2000)
    }
  }, [isRolling, options, onResult])

  const renderDiceFace = (value: number) => {
    const dots = []
    const positions: { [key: number]: number[][] } = {
      1: [[50, 50]],
      2: [[30, 30], [70, 70]],
      3: [[30, 30], [50, 50], [70, 70]],
      4: [[30, 30], [70, 30], [30, 70], [70, 70]],
      5: [[30, 30], [70, 30], [50, 50], [30, 70], [70, 70]],
      6: [[30, 25], [30, 50], [30, 75], [70, 25], [70, 50], [70, 75]],
    }

    positions[value].forEach(([x, y], i) => {
      dots.push(
        <div
          key={i}
          className="absolute w-2 h-2 md:w-3 md:h-3 bg-neutral-800 rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      )
    })

    return dots
  }

  return (
    <div className="flex flex-col items-center gap-6 md:gap-8">
      <motion.div
        className="relative w-24 h-24 md:w-32 md:h-32 bg-white border-4 border-neutral-800 rounded-lg shadow-lg"
        animate={isRolling ? { rotate: [0, 360, 720, 1080] } : {}}
        transition={{ duration: 2, ease: 'easeOut' }}
      >
        {renderDiceFace(currentValue)}
      </motion.div>

      {selectedIndex !== null && !isRolling && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-neutral-600 text-sm mb-2">对应选项</p>
          <p className="text-2xl font-medium">{options[selectedIndex]}</p>
        </motion.div>
      )}
    </div>
  )
}

