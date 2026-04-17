/**
 * 蒙特卡洛模拟脚本 - 平衡调整后版本
 * 用于模拟《斗破苍穹：炎帝之路》游戏的各种结局触发情况
 */

// ==================== 数据定义 ====================

// 段位晋升所需修为
const LEVEL_REQUIREMENTS = {
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

// 根据修为获取段位
function getLevelByCultivation(cultivation) {
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

// 根据修为获取结局（调整后的阈值）
function getEndingByCultivation(cultivation) {
  if (cultivation >= 900) return { type: '炎帝传说', title: '炎帝之路', range: '≥900' };
  if (cultivation >= 800) return { type: '圣者之路', title: '圣者之路', range: '800-899' };
  if (cultivation >= 600) return { type: '尊者传说', title: '尊者之路', range: '600-799' };
  if (cultivation >= 450) return { type: '宗师之名', title: '宗师之路', range: '450-599' };
  if (cultivation >= 300) return { type: '王者之风', title: '王者之路', range: '300-449' };
  if (cultivation >= 100) return { type: '强者初成', title: '强者之路', range: '100-299' };
  if (cultivation >= 50) return { type: '凡人之路', title: '凡人之路', range: '50-99' };
  return { type: '凡人之路', title: '凡人之路', range: '0-49' };
}

// ==================== 故事节点数据（平衡调整后）====================

const storyNodes = [
  {
    id: 'node_1',
    title: '乌坦城的嘲讽',
    choices: [
      { id: 'choice_1_1', stateChange: { qi: 15, cultivation: 3 }, nextNodeId: 'node_2' },
      { id: 'choice_1_2', stateChange: { hp: -15, qi: 10, medicine: 12 }, nextNodeId: 'node_3' },
      { id: 'choice_1_3', stateChange: { qi: 8, medicine: 5 }, nextNodeId: 'node_4' },
    ],
  },
  {
    id: 'node_2',
    title: '山中修炼',
    choices: [
      { id: 'choice_2_1', stateChange: { qi: 25, cultivation: 5 }, nextNodeId: 'node_4' },
      { id: 'choice_2_2', stateChange: { medicine: 15, hp: -20, qi: 20, cultivation: 10 }, nextNodeId: 'node_5' },
    ],
  },
  {
    id: 'node_3',
    title: '家族冲突',
    choices: [
      { id: 'choice_3_1', stateChange: { medicine: 10, cultivation: 2 }, nextNodeId: 'node_6' },
      { id: 'choice_3_2', stateChange: { hp: -20, qi: 15, cultivation: 6, medicine: 10 }, nextNodeId: 'node_4' },
    ],
  },
  {
    id: 'node_4',
    title: '药老的考验',
    choices: [
      { id: 'choice_4_1', stateChange: { medicine: 5, qi: 8 }, nextNodeId: 'node_7' },
      { id: 'choice_4_2', stateChange: { medicine: 12, qi: 15, cultivation: 5 }, nextNodeId: 'node_8' },
      { id: 'choice_4_3', stateChange: { qi: 20, cultivation: 8 }, nextNodeId: 'node_9' },
    ],
  },
  {
    id: 'node_5',
    title: '魔兽遭遇战',
    choices: [
      { id: 'choice_5_1', stateChange: { hp: -30, medicine: 25, qi: 25, cultivation: 18 }, nextNodeId: 'node_10' },
      { id: 'choice_5_2', stateChange: { qi: 5 }, nextNodeId: 'node_4' },
    ],
  },
  {
    id: 'node_6',
    title: '家族的决定',
    choices: [
      { id: 'choice_6_1', stateChange: { medicine: 12, hp: 15, qi: 6, cultivation: 3 }, nextNodeId: 'node_4' },
      { id: 'choice_6_2', stateChange: { hp: -12, cultivation: 4, medicine: 5 }, nextNodeId: 'node_11' },
    ],
  },
  {
    id: 'node_7',
    title: '魔兽山脉深处',
    choices: [
      { id: 'choice_7_1', stateChange: { hp: -25, medicine: 30, qi: 30, cultivation: 22 }, nextNodeId: 'node_12' },
      { id: 'choice_7_2', stateChange: { qi: 12, cultivation: 5, medicine: 8 }, nextNodeId: 'node_13' },
    ],
  },
  {
    id: 'node_8',
    title: '出发准备',
    choices: [
      { id: 'choice_8_1', stateChange: { qi: 12, cultivation: 5 }, nextNodeId: 'node_7' },
      { id: 'choice_8_2', stateChange: { hp: -20, medicine: 18, qi: 22, cultivation: 12 }, nextNodeId: 'node_14' },
    ],
  },
  {
    id: 'node_9',
    title: '药老的教导',
    choices: [
      { id: 'choice_9_1', stateChange: { qi: 35, cultivation: 20 }, nextNodeId: 'node_15' },
      { id: 'choice_9_2', stateChange: { qi: 8, cultivation: 4 }, nextNodeId: 'node_7' },
    ],
  },
  {
    id: 'node_10',
    title: '意外收获',
    choices: [
      { id: 'choice_10_1', stateChange: { hp: 20, medicine: 10, qi: 12, cultivation: 8 }, nextNodeId: 'node_4' },
      { id: 'choice_10_2', stateChange: { hp: -25, medicine: 30, qi: 30, cultivation: 22 }, nextNodeId: 'node_15' },
    ],
  },
  {
    id: 'node_11',
    title: '暗流涌动',
    choices: [
      { id: 'choice_11_1', stateChange: { qi: 12, cultivation: 6, medicine: 5 }, nextNodeId: 'node_4' },
      { id: 'choice_11_2', stateChange: { hp: -30, qi: 45, cultivation: 35 }, nextNodeId: 'node_16' },
    ],
  },
  {
    id: 'node_12',
    title: '发现血莲精',
    choices: [
      { id: 'choice_12_1', stateChange: { medicine: -12, qi: 12, cultivation: 18 }, nextNodeId: 'node_17' },
      { id: 'choice_12_2', stateChange: { hp: -38, medicine: 25, qi: 35, cultivation: 32 }, nextNodeId: 'node_17' },
    ],
  },
  {
    id: 'node_13',
    title: '外围发现',
    choices: [
      { id: 'choice_13_1', stateChange: { medicine: -8, hp: -15, qi: 22, cultivation: 12 }, nextNodeId: 'node_18' },
      { id: 'choice_13_2', stateChange: { qi: 10, cultivation: 4, medicine: 6 }, nextNodeId: 'node_12' },
    ],
  },
  {
    id: 'node_14',
    title: '险象环生',
    choices: [
      { id: 'choice_14_1', stateChange: { hp: -28, qi: 28, cultivation: 18, medicine: 18 }, nextNodeId: 'node_12' },
      { id: 'choice_14_2', stateChange: { medicine: -12, hp: 10 }, nextNodeId: 'node_7' },
    ],
  },
  {
    id: 'node_15',
    title: '焚诀初成',
    choices: [
      { id: 'choice_15_1', stateChange: { qi: 35, cultivation: 28 }, nextNodeId: 'node_19' },
      { id: 'choice_15_2', stateChange: { qi: 18, cultivation: 12, medicine: 12 }, nextNodeId: 'node_20' },
    ],
  },
  {
    id: 'node_16',
    title: '魂殿使者',
    choices: [
      { id: 'choice_16_1', stateChange: { hp: -32, qi: 22, cultivation: 18, medicine: 12 }, nextNodeId: 'node_21' },
      { id: 'choice_16_2', stateChange: { hp: -18, qi: 48, cultivation: 42 }, nextNodeId: 'node_22' },
    ],
  },
  {
    id: 'node_17',
    title: '血莲精到手',
    choices: [
      { id: 'choice_17_1', stateChange: { hp: 15, qi: 35, cultivation: 48 }, nextNodeId: 'node_23' },
      { id: 'choice_17_2', stateChange: { qi: 22, cultivation: 25 }, nextNodeId: 'node_23' },
    ],
  },
  {
    id: 'node_18',
    title: '医仙之恩',
    choices: [
      { id: 'choice_18_1', stateChange: { medicine: 12, qi: 12, cultivation: 12 }, nextNodeId: 'node_24' },
      { id: 'choice_18_2', stateChange: { medicine: 10, hp: 10, qi: 18, cultivation: 18 }, nextNodeId: 'node_24' },
    ],
  },
  {
    id: 'node_19',
    title: '实力精进',
    choices: [
      { id: 'choice_19_1', stateChange: { qi: 18, cultivation: 20, medicine: 10 }, nextNodeId: 'node_25' },
      { id: 'choice_19_2', stateChange: { qi: 25, cultivation: 28 }, nextNodeId: 'node_26' },
    ],
  },
  {
    id: 'node_20',
    title: '异火之路',
    choices: [
      { id: 'choice_20_1', stateChange: { medicine: 10, qi: 12, cultivation: 10 }, nextNodeId: 'node_24' },
      { id: 'choice_20_2', stateChange: { qi: 18, cultivation: 20 }, nextNodeId: 'node_19' },
    ],
  },
  {
    id: 'node_21',
    title: '灵魂之战',
    choices: [
      { id: 'choice_21_1', stateChange: { hp: 15, qi: 25, cultivation: 22, medicine: 10 }, nextNodeId: 'node_23' },
      { id: 'choice_21_2', stateChange: { qi: 18, cultivation: 18 }, nextNodeId: 'node_19' },
    ],
  },
  {
    id: 'node_22',
    title: '魂殿弟子',
    choices: [
      { id: 'choice_22_1', stateChange: { hp: -22, qi: 52, cultivation: 58 }, nextNodeId: 'node_end_1' },
      { id: 'choice_22_2', stateChange: { hp: -12, qi: 22, cultivation: 22 }, nextNodeId: 'node_21' },
    ],
  },
  {
    id: 'node_23',
    title: '天赋重铸',
    choices: [
      { id: 'choice_23_1', stateChange: { qi: 42, cultivation: 45 }, nextNodeId: 'node_27' },
      { id: 'choice_23_2', stateChange: { hp: 10, qi: 22, cultivation: 25, medicine: 10 }, nextNodeId: 'node_25' },
    ],
  },
  {
    id: 'node_24',
    title: '塔戈尔沙漠',
    choices: [
      { id: 'choice_24_1', stateChange: { hp: -20, qi: 18, cultivation: 18, medicine: 12 }, nextNodeId: 'node_28' },
      { id: 'choice_24_2', stateChange: { medicine: 10, qi: 12, cultivation: 10 }, nextNodeId: 'node_29' },
    ],
  },
  {
    id: 'node_25',
    title: '家族大比',
    choices: [
      { id: 'choice_25_1', stateChange: { hp: -18, qi: 28, cultivation: 30, medicine: 12 }, nextNodeId: 'node_30' },
      { id: 'choice_25_2', stateChange: { qi: 18, cultivation: 22 }, nextNodeId: 'node_30' },
    ],
  },
  {
    id: 'node_26',
    title: '云岚宗来人',
    choices: [
      { id: 'choice_26_1', stateChange: { qi: 28, cultivation: 22 }, nextNodeId: 'node_31' },
      { id: 'choice_26_2', stateChange: { hp: -15, cultivation: 6, medicine: 5 }, nextNodeId: 'node_31' },
    ],
  },
  {
    id: 'node_27',
    title: '实力飞跃',
    choices: [
      { id: 'choice_27_1', stateChange: { qi: 22, cultivation: 35, medicine: 10 }, nextNodeId: 'node_32' },
      { id: 'choice_27_2', stateChange: { hp: 10, qi: 18, cultivation: 28, medicine: 12 }, nextNodeId: 'node_33' },
    ],
  },
  {
    id: 'node_28',
    title: '美杜莎女王',
    choices: [
      { id: 'choice_28_1', stateChange: { hp: -40, qi: 50, cultivation: 60 }, nextNodeId: 'node_34' },
      { id: 'choice_28_2', stateChange: { hp: 10, qi: 32, cultivation: 35, medicine: 18 }, nextNodeId: 'node_35' },
    ],
  },
  {
    id: 'node_29',
    title: '古墓探索',
    choices: [
      { id: 'choice_29_1', stateChange: { hp: -35, medicine: 35, qi: 32, cultivation: 45 }, nextNodeId: 'node_34' },
      { id: 'choice_29_2', stateChange: { medicine: 18, qi: 12, cultivation: 10 }, nextNodeId: 'node_28' },
    ],
  },
  {
    id: 'node_30',
    title: '大比冠军',
    choices: [
      { id: 'choice_30_1', stateChange: { qi: 28, cultivation: 30, medicine: 10 }, nextNodeId: 'node_26' },
      { id: 'choice_30_2', stateChange: { hp: -12, qi: 22, cultivation: 25 }, nextNodeId: 'node_26' },
    ],
  },
  {
    id: 'node_31',
    title: '三年之约',
    choices: [
      { id: 'choice_31_1', stateChange: { qi: 35, cultivation: 45 }, nextNodeId: 'node_36' },
      { id: 'choice_31_2', stateChange: { hp: -18, qi: 28, cultivation: 35, medicine: 15 }, nextNodeId: 'node_37' },
    ],
  },
  {
    id: 'node_32',
    title: '中州风云',
    choices: [
      { id: 'choice_32_1', stateChange: { hp: -25, qi: 28, cultivation: 42, medicine: 18 }, nextNodeId: 'node_38' },
      { id: 'choice_32_2', stateChange: { qi: 32, cultivation: 45 }, nextNodeId: 'node_39' },
    ],
  },
  {
    id: 'node_33',
    title: '萧家守护',
    choices: [
      { id: 'choice_33_1', stateChange: { hp: -28, qi: 22, cultivation: 30, medicine: 18 }, nextNodeId: 'node_40' },
      { id: 'choice_33_2', stateChange: { medicine: 15, qi: 12, cultivation: 22 }, nextNodeId: 'node_40' },
    ],
  },
  {
    id: 'node_34',
    title: '青莲地心火',
    choices: [
      { id: 'choice_34_1', stateChange: { hp: -30, qi: 55, cultivation: 75 }, nextNodeId: 'node_41' },
      { id: 'choice_34_2', stateChange: { hp: -12, medicine: 18, qi: 40, cultivation: 50 }, nextNodeId: 'node_41' },
    ],
  },
  {
    id: 'node_35',
    title: '女王之盟',
    choices: [
      { id: 'choice_35_1', stateChange: { hp: 15, qi: 35, cultivation: 50, medicine: 12 }, nextNodeId: 'node_42' },
      { id: 'choice_35_2', stateChange: { qi: 30, cultivation: 35 }, nextNodeId: 'node_36' },
    ],
  },
  {
    id: 'node_36',
    title: '实力大进',
    choices: [
      { id: 'choice_36_1', stateChange: { qi: 28, cultivation: 35 }, nextNodeId: 'node_43' },
      { id: 'choice_36_2', stateChange: { hp: 10, qi: 22, cultivation: 30, medicine: 10 }, nextNodeId: 'node_43' },
    ],
  },
  {
    id: 'node_37',
    title: '历练归来',
    choices: [
      { id: 'choice_37_1', stateChange: { qi: 18, cultivation: 30 }, nextNodeId: 'node_43' },
      { id: 'choice_37_2', stateChange: { hp: 15, qi: 12, cultivation: 22, medicine: 12 }, nextNodeId: 'node_36' },
    ],
  },
  {
    id: 'node_38',
    title: '揭露真相',
    choices: [
      { id: 'choice_38_1', stateChange: { hp: -35, qi: 38, cultivation: 48, medicine: 22 }, nextNodeId: 'node_44' },
      { id: 'choice_38_2', stateChange: { qi: 28, cultivation: 35, medicine: 15 }, nextNodeId: 'node_45' },
    ],
  },
  {
    id: 'node_39',
    title: '强者之路',
    choices: [
      { id: 'choice_39_1', stateChange: { qi: 38, cultivation: 58 }, nextNodeId: 'node_46' },
      { id: 'choice_39_2', stateChange: { hp: 10, qi: 28, cultivation: 42, medicine: 15 }, nextNodeId: 'node_47' },
    ],
  },
  {
    id: 'node_40',
    title: '家族振兴',
    choices: [
      { id: 'choice_40_1', stateChange: { medicine: 18, qi: 18, cultivation: 30 }, nextNodeId: 'node_32' },
      { id: 'choice_40_2', stateChange: { qi: 32, cultivation: 42 }, nextNodeId: 'node_36' },
    ],
  },
  {
    id: 'node_41',
    title: '异火之力',
    choices: [
      { id: 'choice_41_1', stateChange: { qi: 28, cultivation: 48, medicine: 12 }, nextNodeId: 'node_48' },
      { id: 'choice_41_2', stateChange: { hp: 15, qi: 28, cultivation: 42, medicine: 12 }, nextNodeId: 'node_36' },
    ],
  },
  {
    id: 'node_42',
    title: '跨越种族的羁绊',
    choices: [
      { id: 'choice_42_1', stateChange: { hp: 10, qi: 35, cultivation: 62, medicine: 12 }, nextNodeId: 'node_49' },
      { id: 'choice_42_2', stateChange: { qi: 28, cultivation: 35 }, nextNodeId: 'node_36' },
    ],
  },
  {
    id: 'node_43',
    title: '决战云岚宗',
    choices: [
      { id: 'choice_43_1', stateChange: { qi: 32, cultivation: 42 }, nextNodeId: 'node_end_2' },
      { id: 'choice_43_2', stateChange: { hp: -28, qi: 40, cultivation: 52, medicine: 22 }, nextNodeId: 'node_50' },
    ],
  },
  {
    id: 'node_44',
    title: '正义之师',
    choices: [
      { id: 'choice_44_1', stateChange: { hp: -40, qi: 50, cultivation: 75, medicine: 28 }, nextNodeId: 'node_51' },
      { id: 'choice_44_2', stateChange: { qi: 35, cultivation: 52, medicine: 15 }, nextNodeId: 'node_46' },
    ],
  },
  {
    id: 'node_45',
    title: '暗度陈仓',
    choices: [
      { id: 'choice_45_1', stateChange: { hp: -32, qi: 40, cultivation: 58, medicine: 22 }, nextNodeId: 'node_51' },
      { id: 'choice_45_2', stateChange: { qi: 22, cultivation: 30, medicine: 10 }, nextNodeId: 'node_46' },
    ],
  },
  {
    id: 'node_46',
    title: '巅峰之路',
    choices: [
      { id: 'choice_46_1', stateChange: { qi: 45, cultivation: 70 }, nextNodeId: 'node_52' },
      { id: 'choice_46_2', stateChange: { hp: -22, qi: 32, cultivation: 55, medicine: 18 }, nextNodeId: 'node_53' },
    ],
  },
  {
    id: 'node_47',
    title: '炎盟成立',
    choices: [
      { id: 'choice_47_1', stateChange: { qi: 32, cultivation: 52, medicine: 15 }, nextNodeId: 'node_44' },
      { id: 'choice_47_2', stateChange: { qi: 40, cultivation: 58 }, nextNodeId: 'node_46' },
    ],
  },
  {
    id: 'node_48',
    title: '收集异火',
    choices: [
      { id: 'choice_48_1', stateChange: { hp: -38, qi: 55, cultivation: 85, medicine: 22 }, nextNodeId: 'node_54' },
      { id: 'choice_48_2', stateChange: { qi: 32, cultivation: 42, medicine: 12 }, nextNodeId: 'node_36' },
    ],
  },
  {
    id: 'node_49',
    title: '最强搭档',
    choices: [
      { id: 'choice_49_1', stateChange: { hp: -28, qi: 45, cultivation: 72, medicine: 22 }, nextNodeId: 'node_51' },
      { id: 'choice_49_2', stateChange: { qi: 45, cultivation: 85 }, nextNodeId: 'node_55' },
    ],
  },
  {
    id: 'node_50',
    title: '云岚覆灭',
    choices: [
      { id: 'choice_50_1', stateChange: { hp: -22, qi: 45, cultivation: 58, medicine: 18 }, nextNodeId: 'node_46' },
      { id: 'choice_50_2', stateChange: { qi: 18, cultivation: 30, medicine: 10 }, nextNodeId: 'node_44' },
    ],
  },
  {
    id: 'node_51',
    title: '魂殿覆灭',
    choices: [
      { id: 'choice_51_1', stateChange: { hp: -42, qi: 60, cultivation: 125, medicine: 28 }, nextNodeId: 'node_end_3' },
      { id: 'choice_51_2', stateChange: { hp: -28, qi: 50, cultivation: 92, medicine: 22 }, nextNodeId: 'node_end_3' },
    ],
  },
  {
    id: 'node_52',
    title: '至高境界',
    choices: [
      { id: 'choice_52_1', stateChange: { qi: 55, cultivation: 100 }, nextNodeId: 'node_56' },
      { id: 'choice_52_2', stateChange: { qi: 35, cultivation: 58, medicine: 15 }, nextNodeId: 'node_51' },
    ],
  },
  {
    id: 'node_53',
    title: '斗帝传承',
    choices: [
      { id: 'choice_53_1', stateChange: { hp: -38, qi: 65, cultivation: 150, medicine: 22 }, nextNodeId: 'node_end_3' },
      { id: 'choice_53_2', stateChange: { qi: 32, cultivation: 48, medicine: 10 }, nextNodeId: 'node_52' },
    ],
  },
  {
    id: 'node_54',
    title: '异火合一',
    choices: [
      { id: 'choice_54_1', stateChange: { hp: -30, qi: 60, cultivation: 110, medicine: 22 }, nextNodeId: 'node_55' },
      { id: 'choice_54_2', stateChange: { qi: 40, cultivation: 68, medicine: 15 }, nextNodeId: 'node_end_3' },
    ],
  },
  {
    id: 'node_55',
    title: '实力巅峰',
    choices: [
      { id: 'choice_55_1', stateChange: { qi: 62, cultivation: 150 }, nextNodeId: 'node_56' },
      { id: 'choice_55_2', stateChange: { qi: 40, cultivation: 75, medicine: 15 }, nextNodeId: 'node_end_3' },
    ],
  },
  {
    id: 'node_56',
    title: '实力巅峰',
    choices: [
      { id: 'choice_56_1', stateChange: { qi: 80, cultivation: 250 }, nextNodeId: 'node_end_3' },
      { id: 'choice_56_2', stateChange: { qi: 55, cultivation: 100, medicine: 15 }, nextNodeId: 'node_end_3' },
    ],
  },
  // 结束节点
  { id: 'node_end_1', title: '黑暗之路', choices: [], isEnding: true },
  { id: 'node_end_2', title: '云岚之后', choices: [], isEnding: true },
  { id: 'node_end_3', title: '修炼之巅', choices: [], isEnding: true },
];

// 随机事件数据（平衡调整后）
const randomEvents = [
  {
    id: 'event_1',
    title: '意外发现',
    choices: [
      { id: 'event_1_1', stateChange: { hp: 18, qi: 22, cultivation: 12 } },
      { id: 'event_1_2', stateChange: { medicine: 18 } },
    ],
  },
  {
    id: 'event_2',
    title: '魂殿杀手',
    choices: [
      { id: 'event_2_1', stateChange: { hp: -28, qi: 22, cultivation: 22, medicine: 18 } },
      { id: 'event_2_2', stateChange: { hp: -12 } },
    ],
  },
  {
    id: 'event_3',
    title: '神秘老者',
    choices: [
      { id: 'event_3_1', stateChange: { qi: 25, cultivation: 22, medicine: 5 } },
      { id: 'event_3_2', stateChange: { qi: 6 } },
    ],
  },
  {
    id: 'event_4',
    title: '顿悟',
    choices: [
      { id: 'event_4_1', stateChange: { hp: -20, qi: 42, cultivation: 35 } },
      { id: 'event_4_2', stateChange: { qi: 18, cultivation: 12 } },
    ],
  },
  {
    id: 'event_5',
    title: '拍卖会',
    choices: [
      { id: 'event_5_1', stateChange: { medicine: 22, hp: -12, cultivation: 8 } },
      { id: 'event_5_2', stateChange: { qi: 6 } },
    ],
  },
  {
    id: 'event_6',
    title: '受伤的旅人',
    choices: [
      { id: 'event_6_1', stateChange: { medicine: -8, qi: 12, cultivation: 10 } },
      { id: 'event_6_2', stateChange: { qi: 4 } },
    ],
  },
  {
    id: 'event_7',
    title: '古药方',
    choices: [
      { id: 'event_7_1', stateChange: { medicine: 22, hp: -15, cultivation: 12 } },
      { id: 'event_7_2', stateChange: { qi: 10, medicine: 5 } },
    ],
  },
  {
    id: 'event_8',
    title: '魔兽袭击',
    choices: [
      { id: 'event_8_1', stateChange: { hp: -38, medicine: 28, qi: 35, cultivation: 35 } },
      { id: 'event_8_2', stateChange: { hp: -15 } },
    ],
  },
];

// ==================== 模拟逻辑 ====================

// 常量
const QI_CONVERSION_AMOUNT = 50;
const MEDICINE_CONVERSION_HP = 30;

// 初始状态（平衡调整后：hp: 100, medicine: 15）
function createInitialState() {
  return {
    hp: 100,
    qi: 20,
    medicine: 15,
    cultivation: 0,
    currentNodeId: 'node_1',
    nodeCount: 0,
  };
}

// 检查斗气转化
function checkQiConversion(state) {
  if (state.qi >= 100) {
    return {
      ...state,
      qi: 0,
      cultivation: state.cultivation + QI_CONVERSION_AMOUNT,
    };
  }
  return state;
}

// 检查丹药转化
function checkMedicineConversion(state) {
  if (state.medicine >= 100) {
    return {
      ...state,
      medicine: 0,
      hp: Math.min(100, state.hp + MEDICINE_CONVERSION_HP),
    };
  }
  return state;
}

// 应用状态变化
function applyStateChange(state, change) {
  let newState = { ...state };

  if (change.hp !== undefined) {
    newState.hp = Math.max(0, Math.min(100, state.hp + change.hp));
  }
  if (change.qi !== undefined) {
    newState.qi = Math.max(0, Math.min(100, state.qi + change.qi));
  }
  if (change.medicine !== undefined) {
    newState.medicine = Math.max(0, Math.min(100, state.medicine + change.medicine));
  }
  if (change.cultivation !== undefined) {
    newState.cultivation = Math.max(0, state.cultivation + change.cultivation);
  }

  // 检查转化
  newState = checkQiConversion(newState);
  newState = checkMedicineConversion(newState);

  return newState;
}

// 获取节点
function getNodeById(nodeId) {
  return storyNodes.find(n => n.id === nodeId);
}

// 获取随机事件
function getRandomEvent() {
  return randomEvents[Math.floor(Math.random() * randomEvents.length)];
}

// 模拟单次游戏
function simulateGame(strategy = 'random', verbose = false) {
  let state = createInitialState();
  let gameOver = false;
  let ending = null;
  const path = [];
  const eventCount = { total: 0, triggered: 0 };

  while (!gameOver) {
    const node = getNodeById(state.currentNodeId);
    
    if (!node) {
      ending = { type: '错误', title: '节点未找到', cultivation: state.cultivation };
      break;
    }

    path.push(node.id);

    // 检查是否到达结束节点
    if (node.isEnding || node.choices.length === 0) {
      ending = {
        ...getEndingByCultivation(state.cultivation),
        cultivation: state.cultivation,
        level: getLevelByCultivation(state.cultivation),
        hp: state.hp,
        nodeCount: state.nodeCount,
      };
      break;
    }

    // 检查死亡
    if (state.hp <= 0) {
      ending = {
        type: '陨落',
        title: '命陨黄泉',
        cultivation: state.cultivation,
        level: getLevelByCultivation(state.cultivation),
        hp: 0,
        nodeCount: state.nodeCount,
      };
      break;
    }

    // 根据策略选择选项
    let choice;
    if (strategy === 'random') {
      choice = node.choices[Math.floor(Math.random() * node.choices.length)];
    } else if (strategy === 'conservative') {
      // 保守策略：优先选择扣血少的
      choice = node.choices.reduce((best, c) => {
        const bestHpLoss = Math.abs(best.stateChange.hp || 0);
        const cHpLoss = Math.abs(c.stateChange.hp || 0);
        return cHpLoss < bestHpLoss ? c : best;
      });
    } else if (strategy === 'aggressive') {
      // 激进策略：优先选择修为高的
      choice = node.choices.reduce((best, c) => {
        const bestCult = best.stateChange.cultivation || 0;
        const cCult = c.stateChange.cultivation || 0;
        return cCult > bestCult ? c : best;
      });
    } else if (strategy === 'balanced') {
      // 平衡策略：根据血量调整
      if (state.hp < 40) {
        // 低血量时选择扣血少的
        choice = node.choices.reduce((best, c) => {
          const bestHpLoss = Math.abs(best.stateChange.hp || 0);
          const cHpLoss = Math.abs(c.stateChange.hp || 0);
          return cHpLoss < bestHpLoss ? c : best;
        });
      } else {
        // 否则优先修为
        choice = node.choices.reduce((best, c) => {
          const bestCult = best.stateChange.cultivation || 0;
          const cCult = c.stateChange.cultivation || 0;
          return cCult > bestCult ? c : best;
        });
      }
    }

    // 应用选择
    state = applyStateChange(state, choice.stateChange);
    state.currentNodeId = choice.nextNodeId;
    state.nodeCount++;

    // 检查随机事件（每3个节点）
    if (state.nodeCount % 3 === 0) {
      eventCount.total++;
      const event = getRandomEvent();
      let eventChoice;
      
      if (strategy === 'random') {
        eventChoice = event.choices[Math.floor(Math.random() * event.choices.length)];
      } else if (strategy === 'conservative') {
        eventChoice = event.choices.reduce((best, c) => {
          const bestHpLoss = Math.abs(best.stateChange.hp || 0);
          const cHpLoss = Math.abs(c.stateChange.hp || 0);
          return cHpLoss < bestHpLoss ? c : best;
        });
      } else {
        eventChoice = event.choices[Math.floor(Math.random() * event.choices.length)];
      }

      state = applyStateChange(state, eventChoice.stateChange);
      eventCount.triggered++;
    }

    // 防止无限循环
    if (state.nodeCount > 100) {
      if (verbose) console.log('超过100个节点，强制结束');
      break;
    }
  }

  return { ending, state, path, eventCount };
}

// 运行蒙特卡洛模拟
function runMonteCarloSimulation(iterations, strategy) {
  const results = {
    strategy,
    iterations,
    endings: {},
    levelDistribution: {},
    avgCultivation: 0,
    avgNodeCount: 0,
    avgHp: 0,
    deathCount: 0,
    maxCultivation: 0,
    minCultivation: Infinity,
    totalEventTriggers: 0,
  };

  let totalCultivation = 0;
  let totalNodeCount = 0;
  let totalHp = 0;

  for (let i = 0; i < iterations; i++) {
    const { ending, state, eventCount } = simulateGame(strategy);
    
    // 统计结局
    const endingKey = ending.type;
    if (!results.endings[endingKey]) {
      results.endings[endingKey] = {
        count: 0,
        avgCultivation: 0,
        totalCultivation: 0,
      };
    }
    results.endings[endingKey].count++;
    results.endings[endingKey].totalCultivation += ending.cultivation;

    // 统计段位
    const level = ending.level || getLevelByCultivation(ending.cultivation);
    if (!results.levelDistribution[level]) {
      results.levelDistribution[level] = 0;
    }
    results.levelDistribution[level]++;

    // 累计统计
    totalCultivation += ending.cultivation;
    totalNodeCount += state.nodeCount;
    totalHp += ending.hp || 0;
    results.totalEventTriggers += eventCount.triggered;

    if (ending.type === '陨落') {
      results.deathCount++;
    }

    results.maxCultivation = Math.max(results.maxCultivation, ending.cultivation);
    results.minCultivation = Math.min(results.minCultivation, ending.cultivation);
  }

  // 计算平均值
  results.avgCultivation = totalCultivation / iterations;
  results.avgNodeCount = totalNodeCount / iterations;
  results.avgHp = totalHp / iterations;

  // 计算结局平均修为
  for (const key of Object.keys(results.endings)) {
    results.endings[key].avgCultivation = 
      results.endings[key].totalCultivation / results.endings[key].count;
  }

  return results;
}

// ==================== 主程序 ====================

function main() {
  const ITERATIONS = 10000;
  const strategies = ['random', 'conservative', 'aggressive', 'balanced'];

  console.log('========================================');
  console.log('《斗破苍穹：炎帝之路》蒙特卡洛模拟');
  console.log('(平衡调整后版本)');
  console.log(`模拟次数: ${ITERATIONS}`);
  console.log('========================================\n');

  const allResults = {};

  for (const strategy of strategies) {
    console.log(`正在模拟 [${strategy}] 策略...`);
    const results = runMonteCarloSimulation(ITERATIONS, strategy);
    allResults[strategy] = results;
    console.log(`完成！\n`);
  }

  // 输出结果
  console.log('\n========================================');
  console.log('模拟结果汇总');
  console.log('========================================\n');

  for (const strategy of strategies) {
    const r = allResults[strategy];
    console.log(`\n### ${strategy.toUpperCase()} 策略\n`);
    console.log(`- 平均修为: ${r.avgCultivation.toFixed(1)}`);
    console.log(`- 平均节点数: ${r.avgNodeCount.toFixed(1)}`);
    console.log(`- 平均血量: ${r.avgHp.toFixed(1)}`);
    console.log(`- 死亡次数: ${r.deathCount} (${(r.deathCount/ITERATIONS*100).toFixed(1)}%)`);
    console.log(`- 最高修为: ${r.maxCultivation}`);
    console.log(`- 最低修为: ${r.minCultivation}`);
    
    console.log(`\n结局分布:`);
    for (const [ending, data] of Object.entries(r.endings)) {
      const pct = (data.count / ITERATIONS * 100).toFixed(1);
      console.log(`  - ${ending}: ${data.count}次 (${pct}%) 平均修为: ${data.avgCultivation.toFixed(1)}`);
    }
    
    console.log(`\n段位分布:`);
    const levelOrder = ['斗之气', '斗者', '斗师', '大斗师', '斗灵', '斗王', '斗皇', '斗宗', '斗尊', '半圣', '斗圣', '斗帝'];
    for (const level of levelOrder) {
      const count = r.levelDistribution[level] || 0;
      if (count > 0) {
        const pct = (count / ITERATIONS * 100).toFixed(1);
        console.log(`  - ${level}: ${count}次 (${pct}%)`);
      }
    }
  }

  // 返回结果供文档生成使用
  return allResults;
}

// 导出结果
const simulationResults = main();

// 将结果写入文件
const fs = require('fs');
const outputPath = './docs/monte-carlo-results.json';
fs.writeFileSync(outputPath, JSON.stringify(simulationResults, null, 2));
console.log(`\n结果已保存到: ${outputPath}`);
