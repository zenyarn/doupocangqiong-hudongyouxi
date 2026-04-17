'use client';

import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-amber-50 flex flex-col">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      {/* 主内容 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent mb-4 tracking-wider"
            style={{ textShadow: '0 0 40px rgba(251, 191, 36, 0.3)' }}>
            斗破苍穹
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-amber-200/80 tracking-widest">
            炎帝之路
          </h2>
          <div className="mt-4 text-stone-400 text-sm">
            一个废材的逆袭传奇
          </div>
        </div>

        {/* 主角身份卡片 */}
        <div className="w-full max-w-2xl bg-gradient-to-b from-stone-800/60 to-stone-900/60 backdrop-blur-sm rounded-xl border border-amber-700/30 p-6 mb-8 shadow-2xl shadow-amber-900/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center text-3xl shadow-lg">
              🔥
            </div>
            <div>
              <h3 className="text-2xl font-bold text-amber-100">萧炎</h3>
              <p className="text-stone-400">乌坦城萧家 · 三少爷</p>
            </div>
          </div>
          
          <div className="space-y-4 text-stone-300">
            <p className="leading-relaxed">
              你曾是萧家百年难遇的天才，四岁练气，十岁九段斗之气，十一岁突破十段。
              然而就在你意气风发之时，一切戛然而止——你的斗气不断流失，三年间沦为三段斗之气。
            </p>
            <p className="leading-relaxed">
              族人的嘲讽、未婚妻的退婚、父亲的无奈……这一切都刻在你的心中。
              而一切的转机，始于那个一直陪伴你的古朴戒指……
            </p>
          </div>
        </div>

        {/* 数值规则说明 */}
        <div className="w-full max-w-2xl bg-gradient-to-b from-stone-800/40 to-stone-900/40 backdrop-blur-sm rounded-xl border border-stone-600/30 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 四大属性 */}
            <div className="space-y-3">
              <h5 className="text-amber-100 font-medium">四大属性</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3 p-2 bg-stone-800/50 rounded-lg">
                  <span className="text-lg">❤️</span>
                  <div>
                    <span className="text-red-400 font-medium">血量</span>
                    <span className="text-stone-400"> - 归零即死亡</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-stone-800/50 rounded-lg">
                  <span className="text-lg">⚡</span>
                  <div>
                    <span className="text-amber-400 font-medium">斗气</span>
                    <span className="text-stone-400"> - 满100转化为50修为</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-stone-800/50 rounded-lg">
                  <span className="text-lg">💊</span>
                  <div>
                    <span className="text-emerald-400 font-medium">丹药</span>
                    <span className="text-stone-400"> - 满100炼丹回30血</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-stone-800/50 rounded-lg">
                  <span className="text-lg">⭐</span>
                  <div>
                    <span className="text-purple-400 font-medium">修为</span>
                    <span className="text-stone-400"> - 累计晋升段位</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 段位说明 */}
            <div className="space-y-3">
              <h5 className="text-amber-100 font-medium">修炼境界</h5>
              <div className="space-y-1 text-xs text-stone-400 max-h-48 overflow-y-auto pr-2">
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-stone-300">斗之气</span>
                  <span className="text-stone-500">0修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-emerald-400">斗者</span>
                  <span className="text-stone-500">50修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-cyan-400">斗师</span>
                  <span className="text-stone-500">100修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-violet-400">大斗师</span>
                  <span className="text-stone-500">200修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-blue-400">斗灵</span>
                  <span className="text-stone-500">300修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-amber-400">斗王</span>
                  <span className="text-stone-500">400修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-orange-400">斗皇</span>
                  <span className="text-stone-500">500修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-red-400">斗宗</span>
                  <span className="text-stone-500">600修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-pink-400">斗尊</span>
                  <span className="text-stone-500">700修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-indigo-400">半圣</span>
                  <span className="text-stone-500">750修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-fuchsia-300">斗圣</span>
                  <span className="text-stone-500">800修为</span>
                </div>
                <div className="flex items-center justify-between p-1.5 bg-stone-800/30 rounded">
                  <span className="text-yellow-300">斗帝</span>
                  <span className="text-stone-500">900修为</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 提示 */}
          <div className="mt-4 p-3 bg-amber-900/20 rounded-lg border border-amber-700/30">
            <p className="text-sm text-amber-200/80">
              💡 选择时注意风险与收益的平衡。斗气和丹药满后自动转化，不要浪费资源！
            </p>
          </div>
        </div>

        {/* 开始按钮 */}
        <Button
          onClick={onStart}
          className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white rounded-xl shadow-2xl shadow-amber-900/50 transition-all duration-300 hover:scale-105 hover:shadow-amber-800/60"
        >
          开始修炼之路
        </Button>
        
        <p className="mt-6 text-stone-500 text-sm">
          你的选择将决定你成为一代炎帝，还是陨落在修炼路上
        </p>
      </div>
    </div>
  );
}
