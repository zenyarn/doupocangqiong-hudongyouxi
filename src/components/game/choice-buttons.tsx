'use client';

import { Choice, StateChange } from '@/lib/types';
import { useState } from 'react';

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoice: (choice: Choice) => void;
  disabled?: boolean;
}

export function ChoiceButtons({ choices, onChoice, disabled }: ChoiceButtonsProps) {
  const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);

  const getStateChangeText = (change: StateChange): string[] => {
    const parts: string[] = [];
    if (change.hp !== undefined) {
      parts.push(`❤️ ${change.hp > 0 ? '+' : ''}${change.hp}`);
    }
    if (change.qi !== undefined) {
      parts.push(`⚡ ${change.qi > 0 ? '+' : ''}${change.qi}`);
    }
    if (change.medicine !== undefined) {
      parts.push(`💊 ${change.medicine > 0 ? '+' : ''}${change.medicine}`);
    }
    if (change.cultivation !== undefined) {
      parts.push(`✨ +${change.cultivation}`);
    }
    return parts;
  };

  return (
    <div className="w-full space-y-3 mt-6">
      {choices.map((choice, index) => (
        <div
          key={choice.id}
          className="relative"
          onMouseEnter={() => setHoveredChoice(choice.id)}
          onMouseLeave={() => setHoveredChoice(null)}
        >
          {/* 按钮主体 */}
          <button
            onClick={() => onChoice(choice)}
            disabled={disabled}
            className={`
              w-full relative overflow-hidden
              py-4 px-6 text-left
              bg-gradient-to-r from-stone-800/90 via-stone-700/80 to-stone-800/90
              border-2 border-amber-700/40
              rounded-lg
              transition-all duration-300 ease-out
              hover:border-amber-500/80
              hover:from-amber-900/50 hover:via-amber-800/40 hover:to-amber-900/50
              hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-amber-700/40
              disabled:hover:from-stone-800/90 disabled:hover:via-stone-700/80 disabled:hover:to-stone-800/90
              group
            `}
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            {/* 背景装饰 */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-amber-400/10 to-amber-500/5" />
            </div>

            {/* 内容 */}
            <div className="relative z-10 flex flex-col w-full">
              <div className="flex items-center justify-between gap-4">
                <span className="text-stone-100 text-base md:text-lg font-medium group-hover:text-amber-100 transition-colors duration-300">
                  {choice.text}
                </span>
                <span className="text-amber-600/60 group-hover:text-amber-400 transition-colors duration-300 text-xl shrink-0">
                  →
                </span>
              </div>
              
              {/* 状态变化提示 */}
              {getStateChangeText(choice.stateChange).length > 0 && (
                <div
                  className={`
                    mt-2 flex flex-wrap gap-2
                    transition-all duration-300
                    ${hoveredChoice === choice.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}
                  `}
                >
                  {getStateChangeText(choice.stateChange).map((text, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded bg-stone-700/50 text-amber-300">
                      {text}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 边框光效 */}
            <div className={`
              absolute inset-0 rounded-lg pointer-events-none
              transition-all duration-300
              ${hoveredChoice === choice.id ? 'shadow-[inset_0_0_15px_rgba(251,191,36,0.15)]' : ''}
            `} />
          </button>
        </div>
      ))}
    </div>
  );
}
