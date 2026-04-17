'use client';

import { RandomEvent, StateChange } from '@/lib/types';

interface RandomEventModalProps {
  event: RandomEvent;
  onChoice: (stateChange: StateChange) => void;
  onClose: () => void;
}

export function RandomEventModal({ event, onChoice, onClose }: RandomEventModalProps) {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-900/95 backdrop-blur-md rounded-2xl border-2 border-amber-600/40 p-6 max-w-md w-full shadow-2xl shadow-amber-900/30 animate-scale-in">
        {/* 装饰性光效 */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />
        </div>

        {/* 标题 */}
        <div className="relative text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl animate-pulse">⚡</span>
            <h3 className="text-xl font-bold text-amber-400"
              style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
              {event.title}
            </h3>
          </div>
        </div>

        {/* 描述 */}
        <div className="relative bg-stone-800/50 rounded-lg p-4 mb-5">
          <p className="text-stone-200 text-base leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* 选项 */}
        <div className="relative space-y-3">
          {event.choices.map((choice) => {
            const changes = getStateChangeText(choice.stateChange);
            return (
              <button
                key={choice.id}
                onClick={() => onChoice(choice.stateChange)}
                className="
                  w-full py-3 px-5 text-left
                  bg-gradient-to-r from-stone-800/80 via-amber-900/30 to-stone-800/80
                  border border-amber-600/30 rounded-xl
                  hover:border-amber-500/60 hover:from-amber-900/40 hover:to-amber-900/40
                  transition-all duration-300
                  group
                "
              >
                <div className="flex flex-col w-full">
                  <span className="text-stone-100 text-base group-hover:text-amber-50 transition-colors">
                    {choice.text}
                  </span>
                  {changes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {changes.map((change, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 rounded bg-stone-700/50 text-amber-300">
                          {change}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* 装饰性边角 */}
        <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-amber-600/40 rounded-tl pointer-events-none" />
        <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-amber-600/40 rounded-tr pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-amber-600/40 rounded-bl pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-amber-600/40 rounded-br pointer-events-none" />
      </div>
    </div>
  );
}
