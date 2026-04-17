'use client';

import { Choice, GameState } from '@/lib/types';

interface GameChoiceProps {
  choice: Choice;
  index: number;
  gameState: GameState;
  onChoose: (choice: Choice) => void;
  disabled?: boolean;
}

export function GameChoice({ choice, index, gameState, onChoose, disabled }: GameChoiceProps) {
  // 检查选项是否可用
  const isAvailable = !choice.requirement || (
    (!choice.requirement.hp || gameState.hp >= choice.requirement.hp) &&
    (!choice.requirement.qi || gameState.qi >= choice.requirement.qi) &&
    (!choice.requirement.medicine || gameState.medicine >= choice.requirement.medicine)
  );

  const handleClick = () => {
    if (isAvailable && !disabled) {
      onChoose(choice);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || !isAvailable}
      className={`
        w-full p-4 md:p-5 rounded-xl text-left transition-all duration-300
        border ${isAvailable ? 'border-amber-600/40 hover:border-amber-500/60' : 'border-stone-700/30'}
        ${isAvailable 
          ? 'bg-stone-800/60 hover:bg-stone-700/70 hover:shadow-lg hover:shadow-amber-900/30 hover:-translate-y-0.5' 
          : 'bg-stone-900/40 opacity-50 cursor-not-allowed'
        }
        ${disabled ? 'opacity-60 cursor-wait' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <span className={`
          flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
          ${isAvailable ? 'bg-amber-600/80 text-white' : 'bg-stone-700/80 text-stone-400'}
        `}>
          {index + 1}
        </span>
        <div className="flex-1">
          <p className={`text-base md:text-lg ${isAvailable ? 'text-stone-100' : 'text-stone-500'}`}>
            {choice.text}
          </p>
          
          {/* 显示状态变化提示 */}
          {choice.stateChange && isAvailable && (
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              {choice.stateChange.hp !== undefined && (
                <span className={`${choice.stateChange.hp > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  ❤️ {choice.stateChange.hp > 0 ? '+' : ''}{choice.stateChange.hp}
                </span>
              )}
              {choice.stateChange.qi !== undefined && (
                <span className={`${choice.stateChange.qi > 0 ? 'text-amber-400' : 'text-orange-400'}`}>
                  ⚡ {choice.stateChange.qi > 0 ? '+' : ''}{choice.stateChange.qi}
                </span>
              )}
              {choice.stateChange.medicine !== undefined && (
                <span className={`${choice.stateChange.medicine > 0 ? 'text-emerald-400' : 'text-teal-400'}`}>
                  💊 {choice.stateChange.medicine > 0 ? '+' : ''}{choice.stateChange.medicine}
                </span>
              )}
              {choice.stateChange.cultivation !== undefined && (
                <span className="text-purple-400">
                  ✨ 修为 +{choice.stateChange.cultivation}
                </span>
              )}
            </div>
          )}

          {/* 不可用原因提示 */}
          {!isAvailable && choice.requirement && (
            <p className="mt-2 text-xs text-red-400">
              需要: 
              {choice.requirement.hp && ` 血量≥${choice.requirement.hp}`}
              {choice.requirement.qi && ` 斗气≥${choice.requirement.qi}`}
              {choice.requirement.medicine && ` 丹药≥${choice.requirement.medicine}`}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}
