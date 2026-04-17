'use client';

import { DouQiLevel, LEVEL_COLORS, LEVEL_ORDER, LEVEL_REQUIREMENTS, getNextLevelInfo, calculateProgress } from '@/lib/types';

interface StatusBarProps {
  level: DouQiLevel;
  cultivation: number;
  hp: number;
  qi: number;
  medicine: number;
}

export function StatusBar({ level, cultivation, hp, qi, medicine }: StatusBarProps) {
  const nextLevelInfo = getNextLevelInfo(level);
  const progressPercent = calculateProgress(cultivation, level);

  return (
    <div className="w-full bg-gradient-to-b from-stone-900/95 via-stone-800/90 to-stone-900/95 backdrop-blur-sm border-b-2 border-amber-700/40 shadow-lg shadow-amber-900/20">
      {/* 装饰性顶部边框 */}
      <div className="h-1 bg-gradient-to-r from-transparent via-amber-600/60 to-transparent" />
      
      {/* 段位显示 */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* 段位徽章 */}
            <div className="relative">
              <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${LEVEL_COLORS[level]} bg-clip-text text-transparent tracking-wider`}
                style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.3)' }}>
                {level}
              </div>
              {/* 段位光效 */}
              <div className="absolute -inset-2 bg-amber-500/10 blur-lg rounded-lg -z-10" />
            </div>
          </div>
          
          {/* 下一阶段提示 */}
          {nextLevelInfo && (
            <div className="text-sm text-amber-200/70 flex items-center gap-2">
              <span className="text-stone-400">下一阶段</span>
              <span className="text-amber-300 font-medium">{nextLevelInfo.nextLevel}</span>
            </div>
          )}
        </div>
        
        {/* 进度条 */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-stone-400 mb-1">
            <span>修炼进度</span>
            <span>{cultivation} / {nextLevelInfo?.requirement || '∞'}</span>
          </div>
          <div className="relative h-2 bg-stone-700/50 rounded-full overflow-hidden">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
            {/* 进度条光效 */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 状态值 */}
      <div className="grid grid-cols-3 gap-3 px-4 py-3">
        <StatusItem
          icon="❤️"
          label="血量"
          value={hp}
          color="from-red-400 to-rose-500"
          bgColor="bg-red-900/30"
        />
        <StatusItem
          icon="⚡"
          label="斗气"
          value={qi}
          color="from-amber-400 to-orange-500"
          bgColor="bg-amber-900/30"
          highlight={qi >= 90}
          hint="蓄满转化修为"
        />
        <StatusItem
          icon="💊"
          label="丹药"
          value={medicine}
          color="from-emerald-400 to-teal-500"
          bgColor="bg-emerald-900/30"
          highlight={medicine >= 90}
          hint="蓄满炼丹回血"
        />
      </div>
    </div>
  );
}

interface StatusItemProps {
  icon: string;
  label: string;
  value: number;
  color: string;
  bgColor: string;
  highlight?: boolean;
  hint?: string;
}

function StatusItem({ icon, label, value, color, bgColor, highlight, hint }: StatusItemProps) {
  return (
    <div className={`flex flex-col items-center ${bgColor} rounded-lg p-2 border border-stone-600/30 transition-all duration-300 ${highlight ? 'ring-2 ring-amber-400/50 animate-pulse' : ''}`}>
      <div className="flex items-center gap-1.5 text-sm text-stone-300">
        <span>{icon}</span>
        <span className="text-xs">{label}</span>
      </div>
      <div className={`text-xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mt-0.5`}>
        {value}
      </div>
      <div className="w-full h-1.5 bg-stone-700/50 rounded-full overflow-hidden mt-1.5">
        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
      {highlight && hint && (
        <div className="text-xs text-amber-300 mt-1 animate-pulse">{hint}</div>
      )}
    </div>
  );
}
