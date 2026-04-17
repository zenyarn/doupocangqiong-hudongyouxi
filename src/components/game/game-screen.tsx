'use client';

import { useEffect, useRef, useState } from 'react';
import { StatusBar } from './status-bar';
import { GameChoice } from './game-choice';
import { RandomEventModal } from './random-event-modal';
import { ConversionMessage } from './conversion-message';
import { EndingPage } from './ending-page';
import { StartScreen } from './start-screen';
import { useGame } from '@/hooks/use-game';
import { backgroundStyles } from '@/lib/story-data';
import { animateValue } from '@/lib/animations';

export function GameScreen() {
  const [gameStarted, setGameStarted] = useState(false);
  const {
    gameState,
    currentNode,
    showRandomEvent,
    currentRandomEvent,
    showQiConversionMessage,
    showMedicineConversionMessage,
    currentEnding,
    makeChoice,
    handleRandomEventChoice,
    closeRandomEvent,
    closeQiConversionMessage,
    closeMedicineConversionMessage,
    resetGame,
    getShareText,
    isGameOver,
  } = useGame();

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [prevValues, setPrevValues] = useState({
    hp: gameState.hp,
    qi: gameState.qi,
    medicine: gameState.medicine,
    cultivation: gameState.cultivation,
  });
  
  const prevNodeIdRef = useRef(gameState.currentNodeId);

  // 打字机效果 - 必须在所有条件判断之前调用
  useEffect(() => {
    if (!gameStarted || !currentNode) return;
    
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    const text = currentNode.description;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30);
    
    return () => clearInterval(timer);
  }, [gameStarted, currentNode?.id]);

  // 检测数值变化并动画 - 必须在所有条件判断之前调用
  useEffect(() => {
    if (!gameStarted) return;
    
    const changes: string[] = [];
    if (gameState.hp !== prevValues.hp) {
      animateValue('hp-bar', gameState.hp);
      changes.push(`血量 ${gameState.hp > prevValues.hp ? '+' : ''}${gameState.hp - prevValues.hp}`);
    }
    if (gameState.qi !== prevValues.qi) {
      animateValue('qi-bar', gameState.qi);
      changes.push(`斗气 ${gameState.qi > prevValues.qi ? '+' : ''}${gameState.qi - prevValues.qi}`);
    }
    if (gameState.medicine !== prevValues.medicine) {
      animateValue('medicine-bar', gameState.medicine);
      changes.push(`丹药 ${gameState.medicine > prevValues.medicine ? '+' : ''}${gameState.medicine - prevValues.medicine}`);
    }
    
    setPrevValues({
      hp: gameState.hp,
      qi: gameState.qi,
      medicine: gameState.medicine,
      cultivation: gameState.cultivation,
    });
  }, [gameStarted, gameState.hp, gameState.qi, gameState.medicine, gameState.cultivation]);

  // 条件渲染 - 放在所有 hooks 之后
  // 未开始游戏时显示开始界面
  if (!gameStarted) {
    return <StartScreen onStart={() => setGameStarted(true)} />;
  }

  // 如果游戏结束，显示结局页面
  if (isGameOver && currentEnding) {
    return (
      <>
        <EndingPage
          ending={currentEnding}
          gameState={gameState}
          onRestart={() => {
            resetGame();
            setGameStarted(false);
          }}
          getShareText={getShareText}
        />
        {/* 转化提示 */}
        {showQiConversionMessage && (
          <ConversionMessage type="qi" onClose={closeQiConversionMessage} />
        )}
        {showMedicineConversionMessage && (
          <ConversionMessage type="medicine" onClose={closeMedicineConversionMessage} />
        )}
      </>
    );
  }

  if (!currentNode) {
    return (
      <div className="min-h-screen bg-stone-900 flex items-center justify-center">
        <div className="text-amber-400 text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen bg-gradient-to-br ${backgroundStyles[currentNode.background] || 'from-stone-900 to-stone-800'} flex flex-col transition-colors duration-700`}
    >
      {/* 状态栏 */}
      <StatusBar
        level={gameState.level}
        cultivation={gameState.cultivation}
        hp={gameState.hp}
        qi={gameState.qi}
        medicine={gameState.medicine}
      />

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col px-4 py-6 max-w-2xl mx-auto w-full">
        {/* 场景标题 */}
        <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4 text-center"
          style={{ textShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}>
          {currentNode.title}
        </h2>

        {/* 场景描述 */}
        <div className="flex-1 bg-stone-900/60 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-amber-700/30 mb-6">
          <p className="text-stone-200 text-base md:text-lg leading-relaxed whitespace-pre-wrap pt-2">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2 h-5 bg-amber-400 ml-1 animate-pulse" />
            )}
          </p>
        </div>

        {/* 选项区域 */}
        <div className="space-y-3">
          {currentNode.choices.length > 0 ? (
            currentNode.choices.map((choice, index) => (
              <GameChoice
                key={choice.id}
                choice={choice}
                index={index}
                gameState={gameState}
                onChoose={makeChoice}
                disabled={isTyping}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-stone-400 text-lg mb-4">你的修炼之旅暂时告一段落...</p>
              <button
                onClick={() => {
                  resetGame();
                  setGameStarted(false);
                }}
                className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg font-medium hover:from-amber-500 hover:to-orange-500 transition-all duration-300 shadow-lg shadow-amber-900/50"
              >
                再来一次
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 随机事件弹窗 */}
      {showRandomEvent && currentRandomEvent && (
        <RandomEventModal
          event={currentRandomEvent}
          onChoice={handleRandomEventChoice}
          onClose={closeRandomEvent}
        />
      )}

      {/* 斗气转化提示 */}
      {showQiConversionMessage && (
        <ConversionMessage type="qi" onClose={closeQiConversionMessage} />
      )}
      {showMedicineConversionMessage && (
        <ConversionMessage type="medicine" onClose={closeMedicineConversionMessage} />
      )}
    </div>
  );
}
