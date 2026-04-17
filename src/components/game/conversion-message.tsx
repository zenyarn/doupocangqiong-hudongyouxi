'use client';

import { useEffect, useState } from 'react';

interface ConversionMessageProps {
  type: 'qi' | 'medicine';
  onClose: () => void;
}

export function ConversionMessage({ type, onClose }: ConversionMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const content = type === 'qi' 
    ? { icon: '⚡', title: '斗气转化', desc: '斗气已满，转化为50点修为！', color: 'amber' }
    : { icon: '💊', title: '炼丹成功', desc: '丹药已满，炼制丹药回复30点血量！', color: 'emerald' };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-gradient-to-b ${type === 'qi' ? 'from-amber-900/95 to-orange-900/95 border-amber-500/50' : 'from-emerald-900/95 to-teal-900/95 border-emerald-500/50'} backdrop-blur-sm rounded-2xl border-2 p-8 shadow-2xl transform transition-all duration-300 ${isVisible ? 'scale-100' : 'scale-90'}`}>
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">
            {content.icon}
          </div>
          <h3 className={`text-2xl font-bold text-${content.color}-200 mb-2`}>
            {content.title}
          </h3>
          <p className={`text-${content.color}-100/80`}>
            {content.desc}
          </p>
        </div>
      </div>
    </div>
  );
}
