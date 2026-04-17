'use client';

import { StoryNode, Choice } from '@/lib/types';
import { backgroundStyles } from '@/lib/story-data';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';

interface StoryScreenProps {
  node: StoryNode;
  choices: Choice[];
  onChoice: (choice: Choice) => void;
}

export function StoryScreen({ node, choices, onChoice }: StoryScreenProps) {
  const backgroundGradient = backgroundStyles[node.background] || backgroundStyles.wutan;

  // 随机事件效果（保留接口）
  const randomEventEffect = useMemo(() => null, []);

  return (
    <div className="h-full flex flex-col">
      {/* 背景层 */}
      <div className={`absolute inset-0 bg-gradient-to-b ${backgroundGradient} transition-all duration-1000`}>
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* 场景标题 */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-amber-100 mb-2"
              style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.3)' }}>
              {node.title}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
          </div>

          {/* 故事描述 */}
          <div className="bg-stone-900/70 backdrop-blur-sm rounded-xl p-6 border border-amber-700/30 mb-6">
            <p className="text-stone-200 leading-relaxed text-lg">
              {node.description}
            </p>
          </div>

          {/* 随机事件效果显示（保留接口） */}
          {randomEventEffect && (
            <div className="bg-amber-900/30 backdrop-blur-sm rounded-lg p-4 border border-amber-600/30 mb-6">
              <div className="text-amber-200 text-center">
                {randomEventEffect}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 选项区域 */}
      <div className="relative z-10 bg-gradient-to-t from-stone-950 via-stone-900/95 to-transparent pt-8 pb-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-stone-400 text-sm mb-3">选择你的行动：</div>
          <div className="space-y-3">
            {choices.map((choice, index) => (
              <ChoiceButton
                key={choice.id}
                choice={choice}
                index={index}
                onClick={() => onChoice(choice)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  onClick: () => void;
}

function ChoiceButton({ choice, index, onClick }: ChoiceButtonProps) {
  // 解析状态变化显示
  const changeTexts = [];
  const { hp, qi, medicine, cultivation } = choice.stateChange;
  
  if (hp) changeTexts.push(<span key="hp" className={hp > 0 ? 'text-emerald-400' : 'text-red-400'}>血量{hp > 0 ? '+' : ''}{hp}</span>);
  if (qi) changeTexts.push(<span key="qi" className={qi > 0 ? 'text-amber-400' : 'text-amber-600'}>斗气{qi > 0 ? '+' : ''}{qi}</span>);
  if (medicine) changeTexts.push(<span key="medicine" className={medicine > 0 ? 'text-teal-400' : 'text-teal-600'}>丹药{medicine > 0 ? '+' : ''}{medicine}</span>);
  if (cultivation) changeTexts.push(<span key="cultivation" className="text-purple-400">修为+{cultivation}</span>);

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-stone-800/80 hover:bg-stone-700/80 backdrop-blur-sm rounded-lg p-4 border border-amber-700/30 hover:border-amber-600/50 transition-all duration-200 group"
    >
      <div className="flex items-start gap-3">
        <span className="text-amber-500/50 group-hover:text-amber-400 font-bold text-lg shrink-0">
          {index + 1}.
        </span>
        <div className="flex-1">
          <div className="text-amber-100 font-medium group-hover:text-amber-50 transition-colors">
            {choice.text}
          </div>
          {changeTexts.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 text-sm">
              {changeTexts.map((text, i) => (
                <span key={i} className="bg-stone-900/50 px-2 py-0.5 rounded">
                  {text}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
