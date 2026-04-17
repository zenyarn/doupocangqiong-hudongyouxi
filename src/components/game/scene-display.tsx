'use client';

import { SceneBackground, backgroundStyles } from '@/lib/story-data';
import { TypewriterText } from './typewriter-text';
import { useEffect, useState, useMemo } from 'react';

interface SceneDisplayProps {
  title: string;
  description: string;
  background: SceneBackground;
  onTypingComplete?: () => void;
}

interface Particle {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export function SceneDisplay({ title, description, background, onTypingComplete }: SceneDisplayProps) {
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 在客户端生成随机粒子位置，避免 hydration 错误
  const particles: Particle[] = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: 12 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
    setShowTitle(false);
    setShowDescription(false);
    
    const titleTimer = setTimeout(() => setShowTitle(true), 300);
    const descTimer = setTimeout(() => setShowDescription(true), 800);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(descTimer);
    };
  }, [title, description, background]);

  return (
    <div
      className={`relative w-full min-h-[380px] rounded-xl overflow-hidden bg-gradient-to-br ${backgroundStyles[background]} transition-all duration-1000 border border-amber-900/30`}
    >
      {/* 背景装饰 - 灵气飘动效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 灵气粒子 - 仅在客户端渲染 */}
        {mounted && (
          <div className="absolute inset-0">
            {particles.map((particle, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full animate-float"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                  background: 'radial-gradient(circle, rgba(251,191,36,0.6) 0%, rgba(217,119,6,0.2) 70%, transparent 100%)',
                }}
              />
            ))}
          </div>
        )}
        
        {/* 斗气流动层 */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute w-full h-full animate-qi-flow bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        </div>

        {/* 边角装饰 */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-amber-600/30 rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-amber-600/30 rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-amber-600/30 rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-amber-600/30 rounded-br-xl" />
      </div>

      {/* 内容容器 */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-center min-h-[380px]">
        {/* 场景标题 */}
        {showTitle && (
          <h2
            className="text-xl md:text-2xl font-bold text-amber-300 mb-5 animate-fade-in-down tracking-wide"
            style={{ textShadow: '0 0 15px rgba(252, 211, 77, 0.4)' }}
          >
            「{title}」
          </h2>
        )}

        {/* 场景描述 */}
        {showDescription && (
          <div className="text-stone-200 text-base md:text-lg leading-relaxed max-w-2xl animate-fade-in">
            <TypewriterText
              text={description}
              speed={25}
              onComplete={onTypingComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
