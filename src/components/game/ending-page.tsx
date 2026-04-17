'use client';

import { DouQiLevel, GameState, EndingInfo, LEVEL_COLORS } from '@/lib/types';
import { useState } from 'react';

interface EndingPageProps {
  ending: EndingInfo;
  gameState: GameState;
  onRestart: () => void;
  getShareText: () => string;
}

export function EndingPage({ ending, gameState, onRestart, getShareText }: EndingPageProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const text = getShareText();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-900 via-amber-950/50 to-stone-900 flex items-center justify-center p-4">
      {/* 装饰性光效 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-2xl" />
      </div>

      <div className="relative bg-stone-900/80 backdrop-blur-md rounded-2xl border-2 border-amber-600/40 p-6 md:p-8 max-w-lg w-full shadow-2xl shadow-amber-900/30">
        {/* 结局图标 */}
        <div className="text-center mb-6">
          <div className="text-6xl md:text-7xl mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
            {ending.icon}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-amber-400 mb-2"
            style={{ textShadow: '0 0 30px rgba(251, 191, 36, 0.6)' }}>
            {ending.title}
          </h1>
          <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${LEVEL_COLORS[gameState.level]} text-sm font-medium`}
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
            {gameState.level}
          </div>
        </div>

        {/* 结局描述 */}
        <div className="bg-stone-800/50 rounded-lg p-4 mb-6">
          <p className="text-stone-200 text-base md:text-lg leading-relaxed text-center">
            {ending.description}
          </p>
        </div>

        {/* 最终数值 */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-stone-800/50 rounded-lg p-3 text-center">
            <div className="text-amber-400 text-sm mb-1">最终修为</div>
            <div className="text-2xl font-bold text-amber-300">{gameState.cultivation}</div>
          </div>
          <div className="bg-stone-800/50 rounded-lg p-3 text-center">
            <div className="text-rose-400 text-sm mb-1">剩余血量</div>
            <div className="text-2xl font-bold text-rose-300">{gameState.hp}</div>
          </div>
          <div className="bg-stone-800/50 rounded-lg p-3 text-center">
            <div className="text-orange-400 text-sm mb-1">斗气值</div>
            <div className="text-2xl font-bold text-orange-300">{gameState.qi}</div>
          </div>
          <div className="bg-stone-800/50 rounded-lg p-3 text-center">
            <div className="text-emerald-400 text-sm mb-1">丹药储备</div>
            <div className="text-2xl font-bold text-emerald-300">{gameState.medicine}</div>
          </div>
        </div>

        {/* 按钮区域 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onRestart}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:from-amber-500 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-amber-900/50"
          >
            再来一次
          </button>
          <button
            onClick={handleShare}
            className="flex-1 px-6 py-3 bg-stone-700 hover:bg-stone-600 text-stone-100 rounded-lg font-medium transition-all duration-300 border border-stone-600"
          >
            {copied ? '已复制！' : '分享结果'}
          </button>
        </div>
      </div>
    </div>
  );
}
