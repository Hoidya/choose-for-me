'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  options: string[]
  onResult: (result: string) => void
  isDrawing: boolean
}

export default function Card({ options, onResult, isDrawing }: CardProps) {
  const [drawnCard, setDrawnCard] = useState<string | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    if (isDrawing) {
      setIsFlipped(false)
      setDrawnCard(null)

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * options.length)
        const selected = options[randomIndex]
        setDrawnCard(selected)

        setTimeout(() => {
          setIsFlipped(true)
          onResult(selected)
        }, 500)
      }, 300)
    }
  }, [isDrawing, options, onResult])

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="relative w-56 h-80 md:w-64 md:h-96" style={{ perspective: '1000px' }}>
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* 卡牌背面 */}
          <div
            className="absolute inset-0"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg shadow-xl border-2 border-neutral-700 flex items-center justify-center">
              <div className="text-white text-4xl font-bold">?</div>
            </div>
          </div>

          {/* 卡牌正面 */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="w-full h-full bg-white rounded-lg shadow-xl border-2 border-neutral-200 flex items-center justify-center p-8">
              {drawnCard && (
                <motion.p
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-medium text-center text-neutral-900"
                >
                  {drawnCard}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

