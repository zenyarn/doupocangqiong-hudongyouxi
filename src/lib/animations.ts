// 动画辅助函数

// 数值变化动画
export function animateValue(elementId: string, value: number): void {
  if (typeof document === 'undefined') return;
  
  const element = document.getElementById(elementId);
  if (element) {
    // 添加动画类
    element.classList.add('animate-value-change');
    
    // 移除动画类
    setTimeout(() => {
      element.classList.remove('animate-value-change');
    }, 500);
  }
}

// 打字机效果
export async function typeWriter(
  text: string,
  callback: (char: string) => void,
  speed: number = 30
): Promise<void> {
  for (let i = 0; i < text.length; i++) {
    callback(text.slice(0, i + 1));
    await new Promise(resolve => setTimeout(resolve, speed));
  }
}

// 淡入动画
export function fadeIn(element: HTMLElement, duration: number = 300): void {
  element.style.opacity = '0';
  element.style.display = 'block';
  
  let start: number | null = null;
  
  function animate(timestamp: number) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const opacity = Math.min(progress / duration, 1);
    element.style.opacity = opacity.toString();
    
    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

// 淡出动画
export function fadeOut(element: HTMLElement, duration: number = 300): Promise<void> {
  return new Promise(resolve => {
    let start: number | null = null;
    
    function animate(timestamp: number) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const opacity = 1 - Math.min(progress / duration, 1);
      element.style.opacity = opacity.toString();
      
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
        resolve();
      }
    }
    
    requestAnimationFrame(animate);
  });
}

// 弹跳动画
export function bounce(element: HTMLElement): void {
  element.style.transform = 'scale(1.1)';
  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 150);
}

// 震动效果
export function shake(element: HTMLElement): void {
  element.classList.add('animate-shake');
  setTimeout(() => {
    element.classList.remove('animate-shake');
  }, 500);
}

// 发光效果
export function glow(element: HTMLElement, color: string = 'rgba(251, 191, 36, 0.5)'): void {
  element.style.boxShadow = `0 0 20px ${color}`;
  setTimeout(() => {
    element.style.boxShadow = '';
  }, 500);
}
