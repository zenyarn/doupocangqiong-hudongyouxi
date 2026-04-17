'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  GameState,
  INITIAL_GAME_STATE,
  Choice,
  StateChange,
  getLevelByCultivation,
  getEndingByCultivation,
  EndingInfo,
} from '@/lib/types';
import { getNodeById, getRandomEvent } from '@/lib/story-data';

export interface UseGameReturn {
  gameState: GameState;
  currentNode: ReturnType<typeof getNodeById>;
  showRandomEvent: boolean;
  currentRandomEvent: ReturnType<typeof getRandomEvent>;
  showQiConversionMessage: boolean;
  showMedicineConversionMessage: boolean;
  currentEnding: EndingInfo | null;
  makeChoice: (choice: Choice) => void;
  handleRandomEventChoice: (stateChange: StateChange) => void;
  closeRandomEvent: () => void;
  closeQiConversionMessage: () => void;
  closeMedicineConversionMessage: () => void;
  resetGame: () => void;
  getShareText: () => string;
  isGameOver: boolean;
}

// 斗气满转化修为的数值
const QI_CONVERSION_AMOUNT = 50;

// 丹药满炼丹回复血量
const MEDICINE_CONVERSION_HP = 30;

export function useGame(): UseGameReturn {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [showRandomEvent, setShowRandomEvent] = useState(false);
  const [currentRandomEvent, setCurrentRandomEvent] = useState(getRandomEvent());
  const [showQiConversionMessage, setShowQiConversionMessage] = useState(false);
  const [showMedicineConversionMessage, setShowMedicineConversionMessage] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentEnding, setCurrentEnding] = useState<EndingInfo | null>(null);

  const currentNode = getNodeById(gameState.currentNodeId);

  // 检查斗气是否蓄满并转化
  const checkQiConversion = useCallback((state: GameState): GameState => {
    if (state.qi >= 100) {
      setShowQiConversionMessage(true);
      return {
        ...state,
        qi: 0,
        cultivation: state.cultivation + QI_CONVERSION_AMOUNT,
        level: getLevelByCultivation(state.cultivation + QI_CONVERSION_AMOUNT),
      };
    }
    return state;
  }, []);

  // 检查丹药是否蓄满并触发炼丹
  const checkMedicineConversion = useCallback((state: GameState): GameState => {
    if (state.medicine >= 100) {
      setShowMedicineConversionMessage(true);
      return {
        ...state,
        medicine: 0,
        hp: Math.min(100, state.hp + MEDICINE_CONVERSION_HP),
      };
    }
    return state;
  }, []);

  // 应用状态变化
  const applyStateChange = useCallback((state: GameState, change: StateChange): GameState => {
    let newState = { ...state };

    // 血量变化
    if (change.hp !== undefined) {
      newState.hp = Math.max(0, Math.min(100, state.hp + change.hp));
    }

    // 斗气变化
    if (change.qi !== undefined) {
      newState.qi = Math.max(0, Math.min(100, state.qi + change.qi));
    }

    // 丹药变化
    if (change.medicine !== undefined) {
      newState.medicine = Math.max(0, Math.min(100, state.medicine + change.medicine));
    }

    // 修为变化（直接增加，如突破）
    if (change.cultivation !== undefined) {
      newState.cultivation = Math.max(0, state.cultivation + change.cultivation);
    }

    // 更新段位
    newState.level = getLevelByCultivation(newState.cultivation);

    // 检查斗气转化
    newState = checkQiConversion(newState);

    // 检查丹药转化（炼丹）
    newState = checkMedicineConversion(newState);

    return newState;
  }, [checkQiConversion, checkMedicineConversion]);

  // 做出选择
  const makeChoice = useCallback((choice: Choice) => {
    setGameState((prev) => {
      // 检查选项要求
      if (choice.requirement) {
        const { hp, qi, medicine } = choice.requirement;
        if (hp !== undefined && prev.hp < hp) return prev;
        if (qi !== undefined && prev.qi < qi) return prev;
        if (medicine !== undefined && prev.medicine < medicine) return prev;
      }

      // 应用状态变化
      let newState = applyStateChange(prev, choice.stateChange);

      // 更新访问节点
      newState.visitedNodes = [...prev.visitedNodes, prev.currentNodeId];
      newState.choices = { ...prev.choices, [prev.currentNodeId]: choice.id };
      newState.currentNodeId = choice.nextNodeId;
      newState.nodeCount = prev.nodeCount + 1;

      // 检查是否触发随机事件（每3个节点）
      const newEventCount = prev.nodeCount + 1;
      if (newEventCount % 3 === 0 && newEventCount > 0) {
        setCurrentRandomEvent(getRandomEvent());
        setShowRandomEvent(true);
      }

      return newState;
    });
  }, [applyStateChange]);

  // 处理随机事件选择
  const handleRandomEventChoice = useCallback((stateChange: StateChange) => {
    setGameState((prev) => {
      const newState = applyStateChange(prev, stateChange);
      return newState;
    });
    setShowRandomEvent(false);
  }, [applyStateChange]);

  // 关闭随机事件
  const closeRandomEvent = useCallback(() => {
    setShowRandomEvent(false);
  }, []);

  // 关闭斗气转化提示
  const closeQiConversionMessage = useCallback(() => {
    setShowQiConversionMessage(false);
  }, []);

  // 关闭炼丹转化提示
  const closeMedicineConversionMessage = useCallback(() => {
    setShowMedicineConversionMessage(false);
  }, []);

  // 重置游戏
  const resetGame = useCallback(() => {
    setGameState(INITIAL_GAME_STATE);
    setShowRandomEvent(false);
    setShowQiConversionMessage(false);
    setShowMedicineConversionMessage(false);
    setIsGameOver(false);
    setCurrentEnding(null);
  }, []);

  // 获取分享文本
  const getShareText = useCallback((): string => {
    const ending = currentEnding || getEndingByCultivation(gameState.cultivation);
    return `我在斗破苍穹世界修炼至【${gameState.level}】，结局是【${ending.title}】，修为${gameState.cultivation}/血量${gameState.hp}/丹药${gameState.medicine}，你能超越我吗？`;
  }, [gameState, currentEnding]);

  // 使用 useEffect 检查游戏结束状态（修复死亡结局不触发的bug）
  useEffect(() => {
    if (isGameOver) return; // 已经结束就不再检查

    // 检查血量是否归零
    if (gameState.hp <= 0) {
      setIsGameOver(true);
      setCurrentEnding({
        type: '陨落',
        title: '命陨黄泉',
        description: '在一次冒险中，你耗尽了最后一丝生命力。你的修炼之路就此终结，但你的意志将永远铭刻在这片大陆上。或许，在下一个轮回，你会有新的开始……',
        icon: '💀',
      });
      return;
    }

    // 检查是否到达结束节点
    const node = getNodeById(gameState.currentNodeId);
    const hasNoChoices = !node || node.choices.length === 0 || node.isEnding;
    
    if (hasNoChoices) {
      setIsGameOver(true);
      setCurrentEnding(getEndingByCultivation(gameState.cultivation));
    }
  }, [gameState, isGameOver]);

  return {
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
  };
}
