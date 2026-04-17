// 斗气段位枚举
export type DouQiLevel =
  | '斗之气'
  | '斗者'
  | '斗师'
  | '大斗师'
  | '斗灵'
  | '斗王'
  | '斗皇'
  | '斗宗'
  | '斗尊'
  | '半圣'
  | '斗圣'
  | '斗帝';

// 段位等级顺序
export const LEVEL_ORDER: DouQiLevel[] = [
  '斗之气',
  '斗者',
  '斗师',
  '大斗师',
  '斗灵',
  '斗王',
  '斗皇',
  '斗宗',
  '斗尊',
  '半圣',
  '斗圣',
  '斗帝',
];

// 段位颜色配置（古风配色）
export const LEVEL_COLORS: Record<DouQiLevel, string> = {
  '斗之气': 'from-stone-400 to-stone-500',
  '斗者': 'from-emerald-400 to-emerald-600',
  '斗师': 'from-cyan-400 to-cyan-600',
  '大斗师': 'from-violet-400 to-violet-600',
  '斗灵': 'from-blue-400 to-blue-600',
  '斗王': 'from-amber-400 to-amber-600',
  '斗皇': 'from-orange-400 to-orange-600',
  '斗宗': 'from-red-400 to-red-600',
  '斗尊': 'from-pink-400 to-pink-600',
  '半圣': 'from-indigo-400 to-indigo-600',
  '斗圣': 'from-fuchsia-300 to-fuchsia-500',
  '斗帝': 'from-yellow-200 via-amber-400 to-yellow-200',
};

// 段位晋升所需修为（按用户建议设计）
export const LEVEL_REQUIREMENTS: Record<DouQiLevel, number> = {
  '斗之气': 0,
  '斗者': 50,
  '斗师': 100,
  '大斗师': 200,
  '斗灵': 300,
  '斗王': 400,
  '斗皇': 500,
  '斗宗': 600,
  '斗尊': 700,
  '半圣': 750,
  '斗圣': 800,
  '斗帝': 900,
};

// 游戏状态
export interface GameState {
  // 显示属性
  hp: number;              // 血量 0-100
  qi: number;              // 斗气 0-100
  medicine: number;        // 丹药 0-100
  
  // 修炼属性
  cultivation: number;     // 修为（累计）
  level: DouQiLevel;       // 当前段位（由修为自动计算）
  
  // 游戏状态
  currentNodeId: string;
  visitedNodes: string[];
  choices: Record<string, string>;
  nodeCount: number;       // 经过的节点数
  
  // 提示信息
  showQiConversionMessage: boolean;    // 斗气转化提示
  showMedicineConversionMessage: boolean; // 炼丹转化提示
}

// 状态变化
export interface StateChange {
  hp?: number;             // 血量变化
  qi?: number;             // 斗气变化
  medicine?: number;       // 丹药变化
  cultivation?: number;    // 修为变化（直接增加，如突破）
}

// 选项
export interface Choice {
  id: string;
  text: string;
  stateChange: StateChange;
  nextNodeId: string;
  requirement?: {
    hp?: number;
    qi?: number;
    medicine?: number;
  };
}

// 场景背景类型
export type SceneBackground =
  | 'wutan'      // 乌坦城
  | 'mountain'   // 魔兽山脉
  | 'yunlan'     // 云岚宗
  | 'desert'     // 塔戈尔沙漠
  | 'city'       // 城市/城镇
  | 'cave'       // 洞穴
  | 'battle'     // 战斗场景
  | 'meditation'; // 修炼场景

// 故事节点
export interface StoryNode {
  id: string;
  title: string;
  description: string;
  background: SceneBackground;
  choices: Choice[];
  isEnding?: boolean;  // 标记为结束节点（无后续选项）
}

// 随机事件
export interface RandomEvent {
  id: string;
  title: string;
  description: string;
  choices: {
    id: string;
    text: string;
    stateChange: StateChange;
  }[];
}

// 结局类型
export type EndingType = 
  | '陨落'        // 血量归零
  | '凡人之路'    // 斗之气~斗者
  | '强者初成'    // 斗师~大斗师
  | '王者之风'    // 斗灵~斗王
  | '宗师之名'    // 斗皇~斗宗
  | '尊者传说'    // 斗尊~半圣
  | '圣者之路'    // 斗圣
  | '炎帝传说';   // 斗帝

// 结局信息
export interface EndingInfo {
  type: EndingType;
  title: string;
  description: string;
  icon: string;
}

// 结局配置
export const ENDING_CONFIG: Record<EndingType, EndingInfo> = {
  '陨落': {
    type: '陨落',
    title: '命陨黄泉',
    description: '在一次冒险中，你耗尽了最后一丝生命力。你的修炼之路就此终结，但你的意志将永远铭刻在这片大陆上。或许，在下一个轮回，你会有新的开始……',
    icon: '💀',
  },
  '凡人之路': {
    type: '凡人之路',
    title: '凡人之路',
    description: '虽然你努力修炼，但终究未能突破凡人的桎梏。你回到了平凡的生活中，但这段修炼的经历让你明白了什么是坚持。也许，这才是属于你的道路。',
    icon: '🌱',
  },
  '强者初成': {
    type: '强者初成',
    title: '强者初成',
    description: '经过不懈努力，你终于成为了一名真正的强者！虽然距离巅峰还有很长的路，但你已经证明了自己并非废物。萧家的名声因你而提升，你的故事才刚刚开始！',
    icon: '⚔️',
  },
  '王者之风': {
    type: '王者之风',
    title: '王者之风',
    description: '你踏入了王者的行列！你的实力足以称霸一方，曾经嘲讽你的人如今都对你肃然起敬。你守护了萧家，也在这片大陆上留下了属于自己的传说！',
    icon: '👑',
  },
  '宗师之名': {
    type: '宗师之名',
    title: '宗师之名',
    description: '你成为了一代宗师！你的名字响彻大陆，无数强者慕名而来向你请教。你建立了属于自己的势力，守护着这一方的安宁。你的传奇，将被后人传颂！',
    icon: '🏆',
  },
  '尊者传说': {
    type: '尊者传说',
    title: '尊者传说',
    description: '你达到了尊者之境！这是无数修炼者梦寐以求的境界。你成为了大陆顶尖的存在，足以开宗立派，传承衣钵。你的名字，将永远铭刻在斗气大陆的历史上！',
    icon: '🌟',
  },
  '圣者之路': {
    type: '圣者之路',
    title: '圣者之路',
    description: '你踏入了圣者之境！这是传说中的境界，举手投足间可撼动天地。你成为了大陆的守护者，守护着万千生灵。你的传说，将永远流传在这片大陆上！',
    icon: '✨',
  },
  '炎帝传说': {
    type: '炎帝传说',
    title: '炎帝传说',
    description: '你终于踏入了斗帝之境！火焰环绕周身，天地为你颤抖。你振兴了萧家，守护了大陆，成为传说中的炎帝！你的名字将永远铭刻在斗气大陆的历史长河中！',
    icon: '🔥',
  },
};

// 初始游戏状态
export const INITIAL_GAME_STATE: GameState = {
  hp: 100,   // 从80提高到100，增加新手容错
  qi: 20,
  medicine: 15,  // 从10提高到15
  cultivation: 0,
  level: '斗之气',
  currentNodeId: 'node_1',
  visitedNodes: [],
  choices: {},
  nodeCount: 0,
  showQiConversionMessage: false,
  showMedicineConversionMessage: false,
};

// 根据修为获取段位
export function getLevelByCultivation(cultivation: number): DouQiLevel {
  if (cultivation >= 900) return '斗帝';
  if (cultivation >= 800) return '斗圣';
  if (cultivation >= 750) return '半圣';
  if (cultivation >= 700) return '斗尊';
  if (cultivation >= 600) return '斗宗';
  if (cultivation >= 500) return '斗皇';
  if (cultivation >= 400) return '斗王';
  if (cultivation >= 300) return '斗灵';
  if (cultivation >= 200) return '大斗师';
  if (cultivation >= 100) return '斗师';
  if (cultivation >= 50) return '斗者';
  return '斗之气';
}

// 根据修为获取结局（与段位系统对应）
export function getEndingByCultivation(cultivation: number): EndingInfo {
  // 斗帝（≥900）：炎帝传说 - 提高门槛
  if (cultivation >= 900) return ENDING_CONFIG['炎帝传说'];
  // 斗圣（800-899）：圣者之路
  if (cultivation >= 800) return ENDING_CONFIG['圣者之路'];
  // 半圣~斗尊（600-799）：尊者传说
  if (cultivation >= 600) return ENDING_CONFIG['尊者传说'];
  // 斗宗（450-599）：宗师之名
  if (cultivation >= 450) return ENDING_CONFIG['宗师之名'];
  // 斗王~斗皇（300-449）：王者之风
  if (cultivation >= 300) return ENDING_CONFIG['王者之风'];
  // 斗师~大斗师（100-299）：强者初成
  if (cultivation >= 100) return ENDING_CONFIG['强者初成'];
  // 斗者（50-99）：凡人之路
  if (cultivation >= 50) return ENDING_CONFIG['凡人之路'];
  // 斗之气（0-49）：凡人之路
  return ENDING_CONFIG['凡人之路'];
}

// 获取下一阶段信息
export function getNextLevelInfo(level: DouQiLevel): { nextLevel: DouQiLevel | null; requirement: number } | null {
  const currentIndex = LEVEL_ORDER.indexOf(level);
  if (currentIndex < LEVEL_ORDER.length - 1) {
    const nextLevel = LEVEL_ORDER[currentIndex + 1] as DouQiLevel;
    return {
      nextLevel,
      requirement: LEVEL_REQUIREMENTS[nextLevel],
    };
  }
  return null;
}

// 获取当前阶段的起始修为
export function getCurrentLevelBase(level: DouQiLevel): number {
  return LEVEL_REQUIREMENTS[level];
}

// 计算到下一阶段的进度百分比
export function calculateProgress(cultivation: number, level: DouQiLevel): number {
  const currentBase = LEVEL_REQUIREMENTS[level];
  const nextInfo = getNextLevelInfo(level);
  
  if (!nextInfo) return 100; // 已达最高境界
  
  const progress = (cultivation - currentBase) / (nextInfo.requirement - currentBase) * 100;
  return Math.min(100, Math.max(0, progress));
}
