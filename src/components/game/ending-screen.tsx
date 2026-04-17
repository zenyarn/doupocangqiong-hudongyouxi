'use client';

import { DouQiLevel, LEVEL_COLORS, GameState, EndingInfo } from '@/lib/types';
import { useState } from 'react';

interface EndingScreenProps {
  endingType?: '斗帝' | '英雄' | '黑化' | '陨落';
  title: string;
  description: string;
  gameState: GameState;
  onRestart: () => void;
  onShare: () => void;
}

const ENDING_STYLES = {
  '斗帝': {
    bg: 'from-amber-900/90 via-yellow-900/80 to-orange-900/90',
    border: 'border-amber-400/60',
    title: 'text-amber-300',
    glow: 'shadow-amber-500/40',
    icon: '👑',
  },
  '英雄': {
    bg: 'from-cyan-900/90 via-blue-900/80 to-teal-900/90',
    border: 'border-cyan-400/60',
    title: 'text-cyan-300',
    glow: 'shadow-cyan-500/40',
    icon: '⚔️',
  },
  '黑化': {
    bg: 'from-stone-900/90 via-purple-950/80 to-black/90',
    border: 'border-purple-400/60',
    title: 'text-purple-300',
    glow: 'shadow-purple-500/40',
    icon: '💀',
  },
  '陨落': {
    bg: 'from-red-950/90 via-rose-900/80 to-red-950/90',
    border: 'border-red-400/60',
    title: 'text-red-300',
    glow: 'shadow-red-500/40',
    icon: '💔',
  },
};

export function EndingScreen({
  endingType = '陨落',
  title,
  description,
  gameState,
  onRestart,
  onShare,
}: EndingScreenProps) {
  const [copied, setCopied] = useState(false);
  const style = ENDING_STYLES[endingType];

  const handleShare = () => {
    onShare();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full max-w-2xl mx-auto bg-gradient-to-br ${style.bg} rounded-2xl p-8 border-2 ${style.border} shadow-2xl ${style.glow}`}>
      {/* 结局图标 */}
      <div className="text-center">
        <div className="text-6xl mb-6 animate-bounce">{style.icon}</div>

        {/* 结局标题 */}
        <h1 className={`text-3xl md:text-4xl font-bold ${style.title} mb-4`} style={{ textShadow: '0 0 20px currentColor' }}>
          {title}
        </h1>

        {/* 结局类型 */}
        <div className={`${style.title} text-lg mb-6 px-4 py-1 rounded-full bg-black/30 inline-block`}>
          {endingType}结局
        </div>
      </div>

      {/* 结局描述 */}
      <p className="text-stone-200 text-center leading-relaxed mb-8">
        {description}
      </p>

      {/* 最终数值 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black/40 rounded-lg p-4 text-center border border-stone-700/50">
          <div className="text-amber-400/80 text-sm mb-1">最终段位</div>
          <div className={`text-xl font-bold bg-gradient-to-r ${LEVEL_COLORS[gameState.level]} bg-clip-text text-transparent`}>
            {gameState.level}
          </div>
        </div>
        <div className="bg-black/40 rounded-lg p-4 text-center border border-stone-700/50">
          <div className="text-purple-400/80 text-sm mb-1">累计修为</div>
          <div className="text-xl font-bold text-purple-300">{gameState.cultivation}</div>
        </div>
        <div className="bg-black/40 rounded-lg p-4 text-center border border-stone-700/50">
          <div className="text-rose-400/80 text-sm mb-1">剩余血量</div>
          <div className="text-xl font-bold text-rose-300">{gameState.hp}</div>
        </div>
        <div className="bg-black/40 rounded-lg p-4 text-center border border-stone-700/50">
          <div className="text-emerald-400/80 text-sm mb-1">丹药储备</div>
          <div className="text-xl font-bold text-emerald-300">{gameState.medicine}</div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={onRestart}
          className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 px-8 text-lg rounded-lg transition-all duration-300"
        >
          再来一次
        </button>
        <button
          onClick={handleShare}
          className="border border-amber-500/50 text-amber-200 hover:bg-amber-900/40 py-3 px-8 text-lg rounded-lg transition-all duration-300"
        >
          {copied ? '已复制!' : '分享结果'}
        </button>
      </div>
    </div>
  );
}
