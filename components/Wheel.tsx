'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface WheelProps {
  options: string[]
  onResult: (result: string) => void
  isSpinning: boolean
}

export default function Wheel({ options, onResult, isSpinning }: WheelProps) {
  const [rotation, setRotation] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const segmentAngle = 360 / options.length
  const colors = [
    '#171717',
    '#262626',
    '#404040',
    '#525252',
    '#737373',
    '#a3a3a3',
  ]

  useEffect(() => {
    if (isSpinning) {
      const randomRotation = 360 * 5 + Math.random() * 360
      const finalRotation = rotation + randomRotation
      setRotation(finalRotation)

      // 计算最终选中的选项
      const normalizedRotation = finalRotation % 360
      const adjustedRotation = (360 - normalizedRotation) % 360
      const index = Math.floor(adjustedRotation / segmentAngle)
      const finalIndex = index % options.length

      setTimeout(() => {
        setSelectedIndex(finalIndex)
        onResult(options[finalIndex])
      }, 3000)
    }
  }, [isSpinning])

  return (
    <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-square">
      <div className="relative w-full h-full">
        {/* 转盘容器 */}
        <motion.div
          className="relative w-full h-full rounded-full border-4 border-neutral-200 overflow-hidden"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: [0.17, 0.67, 0.12, 0.99] }}
        >
          {options.map((option, index) => {
            const startAngle = index * segmentAngle
            const endAngle = (index + 1) * segmentAngle

            return (
              <div
                key={index}
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180)}%, ${50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180)}% ${50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180)}%)`,
                  backgroundColor: colors[index % colors.length],
                }}
              >
                <div
                  className="absolute text-white font-medium text-sm md:text-base"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${startAngle + segmentAngle / 2}deg)`,
                    transformOrigin: 'center',
                    width: '40%',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      transform: `rotate(${-(startAngle + segmentAngle / 2)}deg)`,
                    }}
                  >
                    {option}
                  </span>
                </div>
              </div>
            )
          })}
        </motion.div>

        {/* 指针 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-neutral-800" />
        </div>
      </div>
    </div>
  )
}

