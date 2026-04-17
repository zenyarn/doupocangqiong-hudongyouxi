import { StoryNode, RandomEvent, StateChange } from './types';

// 重新导出SceneBackground供其他模块使用
export type { SceneBackground } from './types';

// 场景背景样式（古风配色）
export const backgroundStyles: Record<string, string> = {
  wutan: 'from-amber-950 via-stone-900 to-yellow-950',      // 乌坦城：古铜色
  mountain: 'from-emerald-950 via-green-950 to-teal-950',   // 魔兽山脉：墨绿色
  yunlan: 'from-sky-950 via-blue-950 to-cyan-950',         // 云岚宗：青白色
  desert: 'from-orange-950 via-amber-950 to-red-950',       // 沙漠：沙黄色
  city: 'from-slate-900 via-stone-900 to-zinc-900',         // 城市：深灰色
  cave: 'from-stone-950 via-neutral-950 to-slate-950',      // 洞穴：暗紫色
  battle: 'from-red-950 via-rose-950 to-orange-950',        // 战斗：暗红色
  meditation: 'from-violet-950 via-purple-950 to-indigo-950', // 修炼：紫金色
};

// 故事节点数据
// 数值设计原则：
// - 扣血量提高（15-40），增加死亡风险
// - 丹药获取量提高（10-25），提高炼丹触发频率
// - 高风险选项有更高回报（修为、丹药）
export const storyNodes: StoryNode[] = [
  // 第一章：乌坦城的嘲讽
  {
    id: 'node_1',
    title: '乌坦城的嘲讽',
    description: '乌坦城萧家训练场，你握着拳头感受着体内微弱的斗气，周围族弟的嘲讽声刺耳传来："废物！还好意思在这里修炼！"父亲萧战的目光中带着担忧与无奈，你知道，只有证明自己，才能改变这一切。',
    background: 'wutan',
    choices: [
      {
        id: 'choice_1_1',
        text: '默默修炼，积蓄力量',
        stateChange: { qi: 15, cultivation: 3 },  // 降低零风险选项修为
        nextNodeId: 'node_2',
      },
      {
        id: 'choice_1_2',
        text: '与族弟理论，维护尊严',
        stateChange: { hp: -15, qi: 10, medicine: 12 },  // 降低扣血，增加丹药
        nextNodeId: 'node_3',
      },
      {
        id: 'choice_1_3',
        text: '前往后山，寻求药老帮助',
        stateChange: { qi: 8, medicine: 5 },
        nextNodeId: 'node_4',
      },
    ],
  },
  // 第二章：山中修炼
  {
    id: 'node_2',
    title: '山中修炼',
    description: '你来到后山的一处僻静之地，盘膝而坐，开始运转家族斗气功法。虽然天赋尽失，但你从未放弃。夜色渐深，山中传来魔兽的低吼声，你感到体内斗气有了一丝增长。',
    background: 'mountain',
    choices: [
      {
        id: 'choice_2_1',
        text: '继续修炼到天明',
        stateChange: { qi: 25, cultivation: 5 },  // 降低零风险选项修为
        nextNodeId: 'node_4',
      },
      {
        id: 'choice_2_2',
        text: '循着声音探索魔兽踪迹',
        stateChange: { medicine: 15, hp: -20, qi: 20, cultivation: 10 },  // 增加丹药，降低扣血
        nextNodeId: 'node_5',
      },
    ],
  },
  // 第三章：冲突升级
  {
    id: 'node_3',
    title: '家族冲突',
    description: '你的反驳激怒了族弟们，他们围了上来。"废物还敢顶嘴！"一拳向你打来。你勉强躲过，心中却燃起一股不服输的火焰。这时，一位长辈出现了……',
    background: 'wutan',
    choices: [
      {
        id: 'choice_3_1',
        text: '向长辈求助，请求主持公道',
        stateChange: { medicine: 10, cultivation: 2 },  // 降低零风险选项
        nextNodeId: 'node_6',
      },
      {
        id: 'choice_3_2',
        text: '独自承受，记住这份屈辱',
        stateChange: { hp: -20, qi: 15, cultivation: 6, medicine: 10 },  // 降低扣血
        nextNodeId: 'node_4',
      },
    ],
  },
  // 第四章：药老现身
  {
    id: 'node_4',
    title: '药老的考验',
    description: '你来到后山山洞，一道苍老的身影从你的戒指中浮现——药老！他用审视的目光打量着你："小娃娃，我可以帮你恢复天赋，但你需要先帮我找到一株血莲精。"',
    background: 'cave',
    choices: [
      {
        id: 'choice_4_1',
        text: '立刻前往魔兽山脉寻找血莲精',
        stateChange: { medicine: 5, qi: 8 },
        nextNodeId: 'node_7',
      },
      {
        id: 'choice_4_2',
        text: '先准备充足再出发',
        stateChange: { medicine: 12, qi: 15, cultivation: 5 },  // 降低修为
        nextNodeId: 'node_8',
      },
      {
        id: 'choice_4_3',
        text: '询问药老更多关于修炼的事',
        stateChange: { qi: 20, cultivation: 8 },  // 降低零风险选项修为
        nextNodeId: 'node_9',
      },
    ],
  },
  // 第五章：魔兽遭遇
  {
    id: 'node_5',
    title: '魔兽遭遇战',
    description: '你循着声音深入山林，发现一只受伤的一阶魔兽——风狼。它警惕地看着你，眼中闪烁着凶光。这是一个危险的机会……',
    background: 'mountain',
    choices: [
      {
        id: 'choice_5_1',
        text: '趁它受伤，奋力一搏',
        stateChange: { hp: -30, medicine: 25, qi: 25, cultivation: 18 },  // 降低扣血，增加丹药
        nextNodeId: 'node_10',
      },
      {
        id: 'choice_5_2',
        text: '绕道离开，避免冲突',
        stateChange: { qi: 5 },
        nextNodeId: 'node_4',
      },
    ],
  },
  // 第六章：家族长辈
  {
    id: 'node_6',
    title: '家族的决定',
    description: '家族长辈了解了事情经过，虽然批评了族弟们的行为，但也暗叹你的弱小。他给了你一瓶疗伤丹药："好好修炼，别辜负萧家的名声。"',
    background: 'wutan',
    choices: [
      {
        id: 'choice_6_1',
        text: '感谢长辈，发奋修炼',
        stateChange: { medicine: 12, hp: 15, qi: 6, cultivation: 3 },  // 降低修为
        nextNodeId: 'node_4',
      },
      {
        id: 'choice_6_2',
        text: '心中不平，暗自记下这笔账',
        stateChange: { hp: -12, cultivation: 4, medicine: 5 },  // 降低扣血
        nextNodeId: 'node_11',
      },
    ],
  },
  // 第七章：魔兽山脉
  {
    id: 'node_7',
    title: '魔兽山脉深处',
    description: '你踏入魔兽山脉，茂密的森林中危机四伏。远处传来魔兽的咆哮，地上散落着前人留下的痕迹。你小心翼翼地前行，寻找血莲精的踪迹。',
    background: 'mountain',
    choices: [
      {
        id: 'choice_7_1',
        text: '深入山脉核心区域',
        stateChange: { hp: -25, medicine: 30, qi: 30, cultivation: 22 },  // 降低扣血，增加丹药
        nextNodeId: 'node_12',
      },
      {
        id: 'choice_7_2',
        text: '在外围区域搜索',
        stateChange: { qi: 12, cultivation: 5, medicine: 8 },  // 降低修为
        nextNodeId: 'node_13',
      },
    ],
  },
  // 第八章：准备工作
  {
    id: 'node_8',
    title: '出发准备',
    description: '你在乌坦城采购了一些必要的物资和丹药。临行前，你回望家族的方向，心中暗暗发誓：一定要成功！带着坚定的信念，你踏上了前往魔兽山脉的路途。',
    background: 'city',
    choices: [
      {
        id: 'choice_8_1',
        text: '走大路，安全但较慢',
        stateChange: { qi: 12, cultivation: 5 },  // 降低修为
        nextNodeId: 'node_7',
      },
      {
        id: 'choice_8_2',
        text: '抄近道，穿过危险地带',
        stateChange: { hp: -20, medicine: 18, qi: 22, cultivation: 12 },  // 降低扣血
        nextNodeId: 'node_14',
      },
    ],
  },
  // 第九章：药老指点
  {
    id: 'node_9',
    title: '药老的教导',
    description: '药老叹息道："当年我纵横大陆，见过无数天才陨落，也见过无数废物崛起。关键不在于起点，而在于你是否有一颗不屈的心。"他传你一门功法——焚诀，可以让你通过吞噬异火来进化。',
    background: 'cave',
    choices: [
      {
        id: 'choice_9_1',
        text: '拜药老为师，全力修炼',
        stateChange: { qi: 35, cultivation: 20 },  // 大幅降低零风险选项修为
        nextNodeId: 'node_15',
      },
      {
        id: 'choice_9_2',
        text: '先找到血莲精再决定',
        stateChange: { qi: 8, cultivation: 4 },  // 降低修为
        nextNodeId: 'node_7',
      },
    ],
  },
  // 第十章：战后休养
  {
    id: 'node_10',
    title: '意外收获',
    description: '你艰难地击败了风狼，在它的巢穴中发现了几株药材和一枚妖丹。虽然浑身是伤，但这次冒险让你获得了宝贵的资源。更重要的是，你证明了自己并非废物！',
    background: 'mountain',
    choices: [
      {
        id: 'choice_10_1',
        text: '就地疗伤，恢复状态',
        stateChange: { hp: 20, medicine: 10, qi: 12, cultivation: 8 },  // 降低修为
        nextNodeId: 'node_4',
      },
      {
        id: 'choice_10_2',
        text: '带伤继续探索',
        stateChange: { hp: -25, medicine: 30, qi: 30, cultivation: 22 },  // 降低扣血
        nextNodeId: 'node_15',
      },
    ],
  },
  // 第十一章：心中的黑暗
  {
    id: 'node_11',
    title: '暗流涌动',
    description: '夜深人静时，你心中的不甘和怨恨如野草般疯长。这时，一个神秘的声音在耳边响起："想要力量吗？我可以给你……"你环顾四周，却找不到声音的来源。',
    background: 'wutan',
    choices: [
      {
        id: 'choice_11_1',
        text: '拒绝神秘声音，坚守本心',
        stateChange: { qi: 12, cultivation: 6, medicine: 5 },  // 降低修为
        nextNodeId: 'node_4',
      },
      {
        id: 'choice_11_2',
        text: '接受神秘力量的提议',
        stateChange: { hp: -30, qi: 45, cultivation: 35 },  // 降低扣血
        nextNodeId: 'node_16',
      },
    ],
  },
  // 第十二章：血莲精
  {
    id: 'node_12',
    title: '发现血莲精',
    description: '在一处隐秘的山谷中，你终于找到了血莲精！然而，守护它的是一只二阶魔兽——赤焰虎。它正趴在血莲精旁，警惕地注视着周围。',
    background: 'mountain',
    choices: [
      {
        id: 'choice_12_1',
        text: '智取，用丹药引开魔兽',
        stateChange: { medicine: -12, qi: 12, cultivation: 18 },  // 降低消耗
        nextNodeId: 'node_17',
      },
      {
        id: 'choice_12_2',
        text: '强攻，正面击杀魔兽',
        stateChange: { hp: -38, medicine: 25, qi: 35, cultivation: 32 },  // 降低扣血
        nextNodeId: 'node_17',
      },
    ],
  },
  // 第十三章：外围搜索
  {
    id: 'node_13',
    title: '外围发现',
    description: '在山脉外围，你虽然没有找到血莲精，但遇到了一位受伤的少女——小医仙。她身中奇毒，正在寻找药材自救。',
    background: 'mountain',
    choices: [
      {
        id: 'choice_13_1',
        text: '帮助她，共享资源',
        stateChange: { medicine: -8, hp: -15, qi: 22, cultivation: 12 },  // 降低扣血
        nextNodeId: 'node_18',
      },
      {
        id: 'choice_13_2',
        text: '各取所需，分道扬镳',
        stateChange: { qi: 10, cultivation: 4, medicine: 6 },  // 降低修为
        nextNodeId: 'node_12',
      },
    ],
  },
  // 第十四章：险途捷径
  {
    id: 'node_14',
    title: '险象环生',
    description: '你选择的近道果然危机四伏。途中，你遭遇了一群山贼，他们盯上了你的物资。"小子，把东西留下，饶你不死！"',
    background: 'mountain',
    choices: [
      {
        id: 'choice_14_1',
        text: '战斗，保护物资',
        stateChange: { hp: -28, qi: 28, cultivation: 18, medicine: 18 },  // 降低扣血
        nextNodeId: 'node_12',
      },
      {
        id: 'choice_14_2',
        text: '交出部分物资，换取安全',
        stateChange: { medicine: -12, hp: 10 },  // 降低消耗
        nextNodeId: 'node_7',
      },
    ],
  },
  // 第十五章：焚诀修炼
  {
    id: 'node_15',
    title: '焚诀初成',
    description: '在药老的指导下，你开始修炼焚诀。这门功法异常霸道，每一次运转都仿佛要将你的经脉撕裂。但你咬牙坚持下来，终于感受到了体内斗气的质变。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_15_1',
        text: '继续苦修，追求更高层次',
        stateChange: { qi: 35, cultivation: 28 },  // 降低零风险选项修为
        nextNodeId: 'node_19',
      },
      {
        id: 'choice_15_2',
        text: '寻找异火，加速进化',
        stateChange: { qi: 18, cultivation: 12, medicine: 12 },
        nextNodeId: 'node_20',
      },
    ],
  },
  // 第十六章：魂殿阴影
  {
    id: 'node_16',
    title: '魂殿使者',
    description: '你接受了神秘力量的帮助，斗气暴涨。然而，代价是你的灵魂深处开始出现一个黑暗的印记。一个身着黑袍的人影出现在你面前："欢迎加入魂殿……"',
    background: 'battle',
    choices: [
      {
        id: 'choice_16_1',
        text: '反抗魂殿的控制',
        stateChange: { hp: -32, qi: 22, cultivation: 18, medicine: 12 },  // 降低扣血
        nextNodeId: 'node_21',
      },
      {
        id: 'choice_16_2',
        text: '接受魂殿的力量',
        stateChange: { hp: -18, qi: 48, cultivation: 42 },  // 降低扣血
        nextNodeId: 'node_22',
      },
    ],
  },
  // 第十七章：药老重塑
  {
    id: 'node_17',
    title: '血莲精到手',
    description: '你成功获得了血莲精！回到山洞，你将药材交给药老。他满意地点点头："很好，我可以为你重塑经脉了。"一道光芒将你笼罩，你感觉到体内那股封印正在被一点点解除。',
    background: 'cave',
    choices: [
      {
        id: 'choice_17_1',
        text: '全力配合药老的治疗',
        stateChange: { hp: 15, qi: 35, cultivation: 48 },  // 降低修为
        nextNodeId: 'node_23',
      },
      {
        id: 'choice_17_2',
        text: '有所保留，保持警惕',
        stateChange: { qi: 22, cultivation: 25 },  // 降低修为
        nextNodeId: 'node_23',
      },
    ],
  },
  // 第十八章：小医仙的友谊
  {
    id: 'node_18',
    title: '医仙之恩',
    description: '你帮助小医仙采集了所需药材，她感激地告诉你一个秘密——塔戈尔沙漠中有一朵青莲地心火。临别时，她给了你一枚解毒丹："以后有缘再见。"',
    background: 'desert',
    choices: [
      {
        id: 'choice_18_1',
        text: '独自前往沙漠寻找异火',
        stateChange: { medicine: 12, qi: 12, cultivation: 12 },  // 降低修为
        nextNodeId: 'node_24',
      },
      {
        id: 'choice_18_2',
        text: '邀请她同行',
        stateChange: { medicine: 10, hp: 10, qi: 18, cultivation: 18 },  // 降低修为
        nextNodeId: 'node_24',
      },
    ],
  },
  // 第十九章：实力精进
  {
    id: 'node_19',
    title: '实力精进',
    description: '经过不懈努力，你的实力有了显著提升。体内斗气如江河奔涌，力量充盈全身。父亲萧战看着你，眼中满是欣慰："好孩子，你没有让萧家失望！"',
    background: 'meditation',
    choices: [
      {
        id: 'choice_19_1',
        text: '参加家族大比，证明自己',
        stateChange: { qi: 18, cultivation: 20, medicine: 10 },  // 降低修为
        nextNodeId: 'node_25',
      },
      {
        id: 'choice_19_2',
        text: '继续修炼，追求更高层次',
        stateChange: { qi: 25, cultivation: 28 },  // 降低零风险选项修为
        nextNodeId: 'node_26',
      },
    ],
  },
  // 第二十章：异火传说
  {
    id: 'node_20',
    title: '异火之路',
    description: '药老告诉你关于异火的传说："大陆上有二十三种异火，每一种都蕴含着恐怖的力量。若能吞噬它们，你的焚诀将不断进化，最终成为大陆顶尖强者。"',
    background: 'meditation',
    choices: [
      {
        id: 'choice_20_1',
        text: '前往塔戈尔沙漠寻找青莲地心火',
        stateChange: { medicine: 10, qi: 12, cultivation: 10 },  // 降低修为
        nextNodeId: 'node_24',
      },
      {
        id: 'choice_20_2',
        text: '先提升实力再做打算',
        stateChange: { qi: 18, cultivation: 20 },  // 降低修为
        nextNodeId: 'node_19',
      },
    ],
  },
  // 第二十一章：挣脱控制
  {
    id: 'node_21',
    title: '灵魂之战',
    description: '你拼尽全力抵抗魂殿的控制，灵魂深处的黑暗印记与你的意志激烈碰撞。在生死边缘，药老的力量注入你的体内，帮助你压制住了邪恶的力量。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_21_1',
        text: '感激药老，更加信任他',
        stateChange: { hp: 15, qi: 25, cultivation: 22, medicine: 10 },  // 降低修为
        nextNodeId: 'node_23',
      },
      {
        id: 'choice_21_2',
        text: '独自消化这场经历',
        stateChange: { qi: 18, cultivation: 18 },  // 降低修为
        nextNodeId: 'node_19',
      },
    ],
  },
  // 第二十二章：魂殿弟子
  {
    id: 'node_22',
    title: '魂殿弟子',
    description: '你成为了魂殿的一员，获得了强大的力量。但你的灵魂也逐渐被黑暗侵蚀，曾经的伙伴开始远离你，你的眼中只剩下对力量的渴望。',
    background: 'battle',
    choices: [
      {
        id: 'choice_22_1',
        text: '彻底投身黑暗',
        stateChange: { hp: -22, qi: 52, cultivation: 58 },  // 降低扣血
        nextNodeId: 'node_end_1',
      },
      {
        id: 'choice_22_2',
        text: '暗中寻找摆脱魂殿的方法',
        stateChange: { hp: -12, qi: 22, cultivation: 22 },  // 降低扣血
        nextNodeId: 'node_21',
      },
    ],
  },
  // 第二十三章：天赋觉醒
  {
    id: 'node_23',
    title: '天赋重铸',
    description: '在药老的帮助下，你的经脉被重新打通，曾经被封印的天赋终于觉醒！你感受到体内斗气如江河奔涌，修炼多年的积淀终于爆发。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_23_1',
        text: '立即闭关精进实力',
        stateChange: { qi: 42, cultivation: 45 },  // 降低零风险选项修为
        nextNodeId: 'node_27',
      },
      {
        id: 'choice_23_2',
        text: '先向父亲报喜',
        stateChange: { hp: 10, qi: 22, cultivation: 25, medicine: 10 },  // 降低修为
        nextNodeId: 'node_25',
      },
    ],
  },
  // 第二十四章：沙漠之旅
  {
    id: 'node_24',
    title: '塔戈尔沙漠',
    description: '你踏入塔戈尔沙漠，烈日炙烤着大地。这里盛产蛇人族，而青莲地心火据说就在蛇人族的圣地深处。你需要做出选择……',
    background: 'desert',
    choices: [
      {
        id: 'choice_24_1',
        text: '乔装潜入蛇人族圣地',
        stateChange: { hp: -20, qi: 18, cultivation: 18, medicine: 12 },  // 降低扣血
        nextNodeId: 'node_28',
      },
      {
        id: 'choice_24_2',
        text: '寻找其他获取异火的方法',
        stateChange: { medicine: 10, qi: 12, cultivation: 10 },  // 降低修为
        nextNodeId: 'node_29',
      },
    ],
  },
  // 第二十五章：家族大比
  {
    id: 'node_25',
    title: '家族大比',
    description: '萧家年度大比开始了！曾经嘲讽你的族弟们看着你如今的实力，眼中满是震惊。在决赛中，你遇到了最强大的对手——萧宁。',
    background: 'wutan',
    choices: [
      {
        id: 'choice_25_1',
        text: '全力以赴，不留余地',
        stateChange: { hp: -18, qi: 28, cultivation: 30, medicine: 12 },  // 降低扣血
        nextNodeId: 'node_30',
      },
      {
        id: 'choice_25_2',
        text: '留有余地，不伤同门',
        stateChange: { qi: 18, cultivation: 22 },  // 降低修为
        nextNodeId: 'node_30',
      },
    ],
  },
  // 第二十六章：云岚宗
  {
    id: 'node_26',
    title: '云岚宗来人',
    description: '云岚宗派人来到萧家，要求与萧家联姻。你曾经的未婚妻纳兰嫣然也随宗门长老前来，她傲慢地看着你，表示要退婚。',
    background: 'yunlan',
    choices: [
      {
        id: 'choice_26_1',
        text: '当众写下休书，三年后云岚宗见',
        stateChange: { qi: 28, cultivation: 22 },  // 降低修为
        nextNodeId: 'node_31',
      },
      {
        id: 'choice_26_2',
        text: '默默承受耻辱',
        stateChange: { hp: -15, cultivation: 6, medicine: 5 },  // 降低扣血
        nextNodeId: 'node_31',
      },
    ],
  },
  // 第二十七章：实力飞跃
  {
    id: 'node_27',
    title: '实力飞跃',
    description: '在天赋觉醒的加持下，你的实力飞速提升！体内斗气愈发凝练，你已经能够感受到更高层次的力量在召唤着你。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_27_1',
        text: '前往中州，开拓眼界',
        stateChange: { qi: 22, cultivation: 35, medicine: 10 },  // 降低修为
        nextNodeId: 'node_32',
      },
      {
        id: 'choice_27_2',
        text: '留在乌坦城，守护家族',
        stateChange: { hp: 10, qi: 18, cultivation: 28, medicine: 12 },  // 降低修为
        nextNodeId: 'node_33',
      },
    ],
  },
  // 第二十八章：蛇人族圣地
  {
    id: 'node_28',
    title: '美杜莎女王',
    description: '你潜入蛇人族圣地，却意外遇到了美杜莎女王！她正在借助青莲地心火进化。你面临一个艰难的选择……',
    background: 'desert',
    choices: [
      {
        id: 'choice_28_1',
        text: '趁她进化时抢夺异火',
        stateChange: { hp: -40, qi: 50, cultivation: 60 },  // 降低扣血
        nextNodeId: 'node_34',
      },
      {
        id: 'choice_28_2',
        text: '等待时机，与她谈判',
        stateChange: { hp: 10, qi: 32, cultivation: 35, medicine: 18 },  // 降低修为
        nextNodeId: 'node_35',
      },
    ],
  },
  // 第二十九章：异火线索
  {
    id: 'node_29',
    title: '古墓探索',
    description: '你在沙漠边缘发现了一座远古遗迹，据说其中藏有异火的线索。然而，这座古墓危机四伏，已有无数探险者葬身其中。',
    background: 'cave',
    choices: [
      {
        id: 'choice_29_1',
        text: '深入古墓探宝',
        stateChange: { hp: -35, medicine: 35, qi: 32, cultivation: 45 },  // 降低扣血
        nextNodeId: 'node_34',
      },
      {
        id: 'choice_29_2',
        text: '在周围搜索资源',
        stateChange: { medicine: 18, qi: 12, cultivation: 10 },  // 降低修为
        nextNodeId: 'node_28',
      },
    ],
  },
  // 第三十章：大比夺魁
  {
    id: 'node_30',
    title: '大比冠军',
    description: '你在家族大比中脱颖而出，获得冠军！父亲萧战激动地拥抱你，曾经轻视你的族人纷纷改观。然而，你的成就也引起了某些人的忌惮……',
    background: 'wutan',
    choices: [
      {
        id: 'choice_30_1',
        text: '低调行事，继续修炼',
        stateChange: { qi: 28, cultivation: 30, medicine: 10 },  // 降低修为
        nextNodeId: 'node_26',
      },
      {
        id: 'choice_30_2',
        text: '高调展示实力',
        stateChange: { hp: -12, qi: 22, cultivation: 25 },  // 降低扣血
        nextNodeId: 'node_26',
      },
    ],
  },
  // 第三十一章：三年之约
  {
    id: 'node_31',
    title: '三年之约',
    description: '你与纳兰嫣然立下三年之约：三年后，你将登上云岚宗，与她一决高下。从此，你的修炼之路有了明确的目标。',
    background: 'yunlan',
    choices: [
      {
        id: 'choice_31_1',
        text: '全力备战，冲击更高层次',
        stateChange: { qi: 35, cultivation: 45 },  // 降低零风险选项修为
        nextNodeId: 'node_36',
      },
      {
        id: 'choice_31_2',
        text: '游历大陆，积累实战经验',
        stateChange: { hp: -18, qi: 28, cultivation: 35, medicine: 15 },  // 降低扣血
        nextNodeId: 'node_37',
      },
    ],
  },
  // 第三十二章：中州之行
  {
    id: 'node_32',
    title: '中州风云',
    description: '中州，斗气大陆的中心，强者如云。你在这里看到了更高层次的世界，也遇到了来自各方的挑战。一次偶然，你得知了一个关于魂殿的重大阴谋。',
    background: 'city',
    choices: [
      {
        id: 'choice_32_1',
        text: '调查魂殿阴谋',
        stateChange: { hp: -25, qi: 28, cultivation: 42, medicine: 18 },  // 降低扣血
        nextNodeId: 'node_38',
      },
      {
        id: 'choice_32_2',
        text: '专注于自己的修炼',
        stateChange: { qi: 32, cultivation: 45 },  // 降低修为
        nextNodeId: 'node_39',
      },
    ],
  },
  // 第三十三章：家族守护者
  {
    id: 'node_33',
    title: '萧家守护',
    description: '你留在乌坦城，全力守护萧家。在你的保护下，家族势力蒸蒸日上。然而，麻烦也随之而来——有势力盯上了萧家的资源。',
    background: 'wutan',
    choices: [
      {
        id: 'choice_33_1',
        text: '主动出击，震慑敌对势力',
        stateChange: { hp: -28, qi: 22, cultivation: 30, medicine: 18 },  // 降低扣血
        nextNodeId: 'node_40',
      },
      {
        id: 'choice_33_2',
        text: '以和为贵，寻求和平解决',
        stateChange: { medicine: 15, qi: 12, cultivation: 22 },  // 降低修为
        nextNodeId: 'node_40',
      },
    ],
  },
  // 第三十四章：异火吞噬
  {
    id: 'node_34',
    title: '青莲地心火',
    description: '你成功获得了青莲地心火！焚诀运转，你开始吞噬这朵异火。痛苦与力量同时涌入你的身体，这是一场意志的考验。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_34_1',
        text: '全力吞噬，不惧痛苦',
        stateChange: { hp: -30, qi: 55, cultivation: 75 },  // 降低扣血
        nextNodeId: 'node_41',
      },
      {
        id: 'choice_34_2',
        text: '循序渐进，稳妥吸收',
        stateChange: { hp: -12, medicine: 18, qi: 40, cultivation: 50 },  // 降低扣血
        nextNodeId: 'node_41',
      },
    ],
  },
  // 第三十五章：美杜莎相助
  {
    id: 'node_35',
    title: '女王之盟',
    description: '你的诚意打动了美杜莎女王，她同意与你分享青莲地心火的部分力量。从此，你多了一位强大的盟友。',
    background: 'desert',
    choices: [
      {
        id: 'choice_35_1',
        text: '邀请女王同行',
        stateChange: { hp: 15, qi: 35, cultivation: 50, medicine: 12 },  // 降低修为
        nextNodeId: 'node_42',
      },
      {
        id: 'choice_35_2',
        text: '独自返回，继续修炼',
        stateChange: { qi: 30, cultivation: 35 },  // 降低修为
        nextNodeId: 'node_36',
      },
    ],
  },
  // 第三十六章：实力大进
  {
    id: 'node_36',
    title: '实力大进',
    description: '经过三年的艰苦修炼，你的实力有了质的飞跃！体内斗气凝练如实质，已经可以御空飞行。三年之约已到，是时候登上云岚宗了！',
    background: 'meditation',
    choices: [
      {
        id: 'choice_36_1',
        text: '独自前往云岚宗',
        stateChange: { qi: 28, cultivation: 35 },  // 降低修为
        nextNodeId: 'node_43',
      },
      {
        id: 'choice_36_2',
        text: '带上伙伴一同前往',
        stateChange: { hp: 10, qi: 22, cultivation: 30, medicine: 10 },  // 降低修为
        nextNodeId: 'node_43',
      },
    ],
  },
  // 第三十七章：大陆游历
  {
    id: 'node_37',
    title: '历练归来',
    description: '三年的大陆游历让你积累了丰富的实战经验，也结识了许多朋友。你的实力飞速提升，距离三年之约越来越近。',
    background: 'city',
    choices: [
      {
        id: 'choice_37_1',
        text: '前往云岚宗赴约',
        stateChange: { qi: 18, cultivation: 30 },  // 降低修为
        nextNodeId: 'node_43',
      },
      {
        id: 'choice_37_2',
        text: '先回萧家探望父亲',
        stateChange: { hp: 15, qi: 12, cultivation: 22, medicine: 12 },  // 降低修为
        nextNodeId: 'node_36',
      },
    ],
  },
  // 第三十八章：魂殿之战
  {
    id: 'node_38',
    title: '揭露真相',
    description: '你调查发现，魂殿正在大陆各地收集强者灵魂，企图复活一位远古邪神！这个发现让你陷入危险，魂殿已经盯上了你。',
    background: 'battle',
    choices: [
      {
        id: 'choice_38_1',
        text: '公开揭露魂殿阴谋',
        stateChange: { hp: -35, qi: 38, cultivation: 48, medicine: 22 },  // 降低扣血
        nextNodeId: 'node_44',
      },
      {
        id: 'choice_38_2',
        text: '暗中积蓄力量',
        stateChange: { qi: 28, cultivation: 35, medicine: 15 },  // 降低修为
        nextNodeId: 'node_45',
      },
    ],
  },
  // 第三十九章：强者之路
  {
    id: 'node_39',
    title: '强者之路',
    description: '在中州的修炼让你的实力突飞猛进！每一次突破都让你感受到体内力量的增长，修炼之路永无止境，你决心继续前行。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_39_1',
        text: '挑战更高层次',
        stateChange: { qi: 38, cultivation: 58 },  // 降低修为
        nextNodeId: 'node_46',
      },
      {
        id: 'choice_39_2',
        text: '建立自己的势力',
        stateChange: { hp: 10, qi: 28, cultivation: 42, medicine: 15 },  // 降低修为
        nextNodeId: 'node_47',
      },
    ],
  },
  // 第四十章：萧家崛起
  {
    id: 'node_40',
    title: '家族振兴',
    description: '在你的带领下，萧家成为乌坦城第一家族！曾经轻视萧家的势力纷纷前来结交，你的名字也开始在大陆传开。',
    background: 'wutan',
    choices: [
      {
        id: 'choice_40_1',
        text: '继续扩大家族势力',
        stateChange: { medicine: 18, qi: 18, cultivation: 30 },  // 降低修为
        nextNodeId: 'node_32',
      },
      {
        id: 'choice_40_2',
        text: '将家族事务交给他人，专心修炼',
        stateChange: { qi: 32, cultivation: 42 },  // 降低修为
        nextNodeId: 'node_36',
      },
    ],
  },
  // 第四十一章：异火融合
  {
    id: 'node_41',
    title: '异火之力',
    description: '青莲地心火与你的焚诀完美融合，你的实力暴涨！火焰在你手中化作实质，这标志着你开始踏上真正的强者之路。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_41_1',
        text: '寻找更多异火',
        stateChange: { qi: 28, cultivation: 48, medicine: 12 },  // 降低修为
        nextNodeId: 'node_48',
      },
      {
        id: 'choice_41_2',
        text: '巩固当前实力',
        stateChange: { hp: 15, qi: 28, cultivation: 42, medicine: 12 },  // 降低修为
        nextNodeId: 'node_36',
      },
    ],
  },
  // 第四十二章：蛇人族联盟
  {
    id: 'node_42',
    title: '跨越种族的羁绊',
    description: '美杜莎女王与你并肩作战，你们之间的羁绊越来越深。蛇人族也成为了你的坚定盟友，在你未来的道路上将提供巨大帮助。',
    background: 'desert',
    choices: [
      {
        id: 'choice_42_1',
        text: '与女王并肩闯荡大陆',
        stateChange: { hp: 10, qi: 35, cultivation: 62, medicine: 12 },  // 降低修为
        nextNodeId: 'node_49',
      },
      {
        id: 'choice_42_2',
        text: '各自发展，保持联系',
        stateChange: { qi: 28, cultivation: 35 },  // 降低修为
        nextNodeId: 'node_36',
      },
    ],
  },
  // 第四十三章：云岚宗之战
  {
    id: 'node_43',
    title: '决战云岚宗',
    description: '你登上云岚宗，与纳兰嫣然展开决战！这一战，你用实力证明了自己，也洗刷了当年的耻辱。然而，云岚宗的底蕴远不止如此……',
    background: 'yunlan',
    choices: [
      {
        id: 'choice_43_1',
        text: '以德报怨，放过云岚宗',
        stateChange: { qi: 32, cultivation: 42 },  // 降低修为
        nextNodeId: 'node_end_2',
      },
      {
        id: 'choice_43_2',
        text: '斩草除根，消灭云岚宗',
        stateChange: { hp: -28, qi: 40, cultivation: 52, medicine: 22 },  // 降低扣血
        nextNodeId: 'node_50',
      },
    ],
  },
  // 第四十四章：大陆英雄
  {
    id: 'node_44',
    title: '正义之师',
    description: '你公开了魂殿的阴谋，成为大陆正义力量的领袖！无数强者响应你的号召，共同对抗魂殿的威胁。',
    background: 'battle',
    choices: [
      {
        id: 'choice_44_1',
        text: '率军进攻魂殿',
        stateChange: { hp: -40, qi: 50, cultivation: 75, medicine: 28 },  // 降低扣血
        nextNodeId: 'node_51',
      },
      {
        id: 'choice_44_2',
        text: '继续积蓄力量',
        stateChange: { qi: 35, cultivation: 52, medicine: 15 },  // 降低修为
        nextNodeId: 'node_46',
      },
    ],
  },
  // 第四十五章：暗夜行动
  {
    id: 'node_45',
    title: '暗度陈仓',
    description: '你在暗中积蓄力量，联合了各方势力。魂殿虽然强大，但你相信，正义终将战胜邪恶。',
    background: 'city',
    choices: [
      {
        id: 'choice_45_1',
        text: '主动出击，打响第一战',
        stateChange: { hp: -32, qi: 40, cultivation: 58, medicine: 22 },  // 降低扣血
        nextNodeId: 'node_51',
      },
      {
        id: 'choice_45_2',
        text: '继续等待最佳时机',
        stateChange: { qi: 22, cultivation: 30, medicine: 10 },  // 降低修为
        nextNodeId: 'node_46',
      },
    ],
  },
  // 第四十六章：巅峰之路
  {
    id: 'node_46',
    title: '巅峰之路',
    description: '你踏上了通往巅峰的道路！每一次修炼都让你感受到力量在增长，前方的道路更加宽广，你看到了更加广阔的世界。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_46_1',
        text: '继续冲击更高层次',
        stateChange: { qi: 45, cultivation: 70 },  // 降低修为
        nextNodeId: 'node_52',
      },
      {
        id: 'choice_46_2',
        text: '寻找远古传承',
        stateChange: { hp: -22, qi: 32, cultivation: 55, medicine: 18 },  // 降低扣血
        nextNodeId: 'node_53',
      },
    ],
  },
  // 第四十七章：势力建立
  {
    id: 'node_47',
    title: '炎盟成立',
    description: '你建立了自己的势力——炎盟！无数强者慕名而来，炎盟迅速成为大陆顶尖势力之一。你的影响力达到了前所未有的高度。',
    background: 'city',
    choices: [
      {
        id: 'choice_47_1',
        text: '将炎盟发展为正道领袖',
        stateChange: { qi: 32, cultivation: 52, medicine: 15 },  // 降低修为
        nextNodeId: 'node_44',
      },
      {
        id: 'choice_47_2',
        text: '以炎盟为根基，专心修炼',
        stateChange: { qi: 40, cultivation: 58 },  // 降低修为
        nextNodeId: 'node_46',
      },
    ],
  },
  // 第四十八章：异火猎人
  {
    id: 'node_48',
    title: '收集异火',
    description: '你踏上了收集异火的旅程，焚诀不断进化。每一朵异火都代表着巨大的力量，也伴随着巨大的危险。',
    background: 'mountain',
    choices: [
      {
        id: 'choice_48_1',
        text: '挑战高阶异火',
        stateChange: { hp: -38, qi: 55, cultivation: 85, medicine: 22 },  // 降低扣血
        nextNodeId: 'node_54',
      },
      {
        id: 'choice_48_2',
        text: '稳扎稳打，逐步提升',
        stateChange: { qi: 32, cultivation: 42, medicine: 12 },  // 降低修为
        nextNodeId: 'node_36',
      },
    ],
  },
  // 第四十九章：并肩作战
  {
    id: 'node_49',
    title: '最强搭档',
    description: '你与美杜莎女王携手闯荡大陆，配合默契无间。你们的组合逐渐为人所知，在这片大陆上留下了属于你们的传说。',
    background: 'city',
    choices: [
      {
        id: 'choice_49_1',
        text: '共同挑战魂殿',
        stateChange: { hp: -28, qi: 45, cultivation: 72, medicine: 22 },  // 降低扣血
        nextNodeId: 'node_51',
      },
      {
        id: 'choice_49_2',
        text: '继续修炼，追求更高层次',
        stateChange: { qi: 45, cultivation: 85 },  // 降低修为
        nextNodeId: 'node_55',
      },
    ],
  },
  // 第五十章：斩尽杀绝
  {
    id: 'node_50',
    title: '云岚覆灭',
    description: '你摧毁了云岚宗，成为大陆公敌。虽然实力大涨，但信任你的人越来越少。孤独的强者之路，是你选择的方向。',
    background: 'yunlan',
    choices: [
      {
        id: 'choice_50_1',
        text: '以实力征服一切',
        stateChange: { hp: -22, qi: 45, cultivation: 58, medicine: 18 },  // 降低扣血
        nextNodeId: 'node_46',
      },
      {
        id: 'choice_50_2',
        text: '反思自己的所作所为',
        stateChange: { qi: 18, cultivation: 30, medicine: 10 },  // 降低修为
        nextNodeId: 'node_44',
      },
    ],
  },
  // 第五十一章：魂殿决战
  {
    id: 'node_51',
    title: '魂殿覆灭',
    description: '你带领联盟攻入魂殿总部，与魂殿殿主展开终极对决！这是大陆命运的决战，胜者将决定世界的走向。',
    background: 'battle',
    choices: [
      {
        id: 'choice_51_1',
        text: '全力以赴，击杀魂殿殿主',
        stateChange: { hp: -42, qi: 60, cultivation: 125, medicine: 28 },  // 降低扣血从-55到-42
        nextNodeId: 'node_end_3',
      },
      {
        id: 'choice_51_2',
        text: '尝试净化而非杀死',
        stateChange: { hp: -28, qi: 50, cultivation: 92, medicine: 22 },  // 降低扣血
        nextNodeId: 'node_end_3',
      },
    ],
  },
  // 第五十二章：至高境界
  {
    id: 'node_52',
    title: '至高境界',
    description: '你感受到了更高层次的力量在召唤！每一次呼吸都仿佛能引动天地之力，体内似乎有什么即将觉醒，前方的道路越来越清晰。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_52_1',
        text: '继续冲击最高层次',
        stateChange: { qi: 55, cultivation: 100 },  // 降低修为
        nextNodeId: 'node_56',
      },
      {
        id: 'choice_52_2',
        text: '先解决大陆危机',
        stateChange: { qi: 35, cultivation: 58, medicine: 15 },  // 降低修为
        nextNodeId: 'node_51',
      },
    ],
  },
  // 第五十三章：远古传承
  {
    id: 'node_53',
    title: '斗帝传承',
    description: '你在一处远古遗迹中发现了斗帝传承！这是通往斗帝境界的最后一步，但接受传承需要面对巨大的考验。',
    background: 'cave',
    choices: [
      {
        id: 'choice_53_1',
        text: '接受传承考验',
        stateChange: { hp: -38, qi: 65, cultivation: 150, medicine: 22 },  // 降低扣血
        nextNodeId: 'node_end_3',
      },
      {
        id: 'choice_53_2',
        text: '暂时放弃，继续积累',
        stateChange: { qi: 32, cultivation: 48, medicine: 10 },  // 降低修为
        nextNodeId: 'node_52',
      },
    ],
  },
  // 第五十四章：异火之主
  {
    id: 'node_54',
    title: '异火合一',
    description: '你成功吞噬了多朵异火，焚诀不断进化！你体内的火焰越发强大，每一次突破都让你感受到焚诀这门功法的奇妙之处。',
    background: 'meditation',
    choices: [
      {
        id: 'choice_54_1',
        text: '继续收集所有异火',
        stateChange: { hp: -30, qi: 60, cultivation: 110, medicine: 22 },  // 降低扣血
        nextNodeId: 'node_55',
      },
      {
        id: 'choice_54_2',
        text: '以现有力量守护大陆',
        stateChange: { qi: 40, cultivation: 68, medicine: 15 },  // 降低修为
        nextNodeId: 'node_end_3',
      },
    ],
  },
  // 第五十五章：实力巅峰
  {
    id: 'node_55',
    title: '实力巅峰',
    description: '你的实力有了质的飞跃！体内斗气凝练如实质，已经可以御空飞行。你感受到自己正在接近某个关键的节点，更高的层次在召唤着你！',
    background: 'meditation',
    choices: [
      {
        id: 'choice_55_1',
        text: '全力冲击更高层次',
        stateChange: { qi: 62, cultivation: 150 },  // 降低修为
        nextNodeId: 'node_56',
      },
      {
        id: 'choice_55_2',
        text: '守护大陆和平',
        stateChange: { qi: 40, cultivation: 75, medicine: 15 },  // 降低修为
        nextNodeId: 'node_end_3',
      },
    ],
  },
  // 第五十六章：实力巅峰
  {
    id: 'node_56',
    title: '实力巅峰',
    description: '你的实力达到了一个新的高度！体内斗气浩瀚如海，举手投足间仿佛能引动天地之力。你已经站在了修炼的更高层次，前方还有更远的道路！',
    background: 'meditation',
    choices: [
      {
        id: 'choice_56_1',
        text: '冲击最高层次',
        stateChange: { qi: 80, cultivation: 250 },  // 降低修为
        nextNodeId: 'node_end_3',
      },
      {
        id: 'choice_56_2',
        text: '守护大陆，成为传说',
        stateChange: { qi: 55, cultivation: 100, medicine: 15 },  // 降低修为
        nextNodeId: 'node_end_3',
      },
    ],
  },
  // 结束节点（无后续选项，根据修为判定结局）
  {
    id: 'node_end_1',
    title: '黑暗之路',
    description: '你踏上了黑暗的道路，魂殿的力量让你变得强大，但也让你逐渐失去了自我。在这条孤独的道路上，你继续前行……',
    background: 'battle',
    choices: [],
    isEnding: true,
  },
  {
    id: 'node_end_2',
    title: '云岚之后',
    description: '你放过了云岚宗，选择了宽恕之路。这次选择让你在大陆上赢得了许多尊重，你的修炼之路还将继续……',
    background: 'yunlan',
    choices: [],
    isEnding: true,
  },
  {
    id: 'node_end_3',
    title: '修炼之巅',
    description: '你站在了修炼的巅峰，回望来时的路，那些艰难与荣耀都化作了永恒的回忆。你的传说，将永远流传在这片大陆上！',
    background: 'meditation',
    choices: [],
    isEnding: true,
  },
];

// 随机事件数据（更新数值 - 平衡调整）
export const randomEvents: RandomEvent[] = [
  {
    id: 'event_1',
    title: '意外发现',
    description: '你在探索时发现了一个隐蔽的山洞，里面藏着一枚珍贵的丹药！',
    choices: [
      { id: 'event_1_1', text: '立即服下丹药', stateChange: { hp: 18, qi: 22, cultivation: 12 } },  // 降低数值
      { id: 'event_1_2', text: '保存起来以备不时之需', stateChange: { medicine: 18 } },  // 降低数值
    ],
  },
  {
    id: 'event_2',
    title: '魂殿杀手',
    description: '魂殿的杀手突然出现！他们似乎在追杀某个人，却发现了一身不凡的你。',
    choices: [
      { id: 'event_2_1', text: '全力反击', stateChange: { hp: -28, qi: 22, cultivation: 22, medicine: 18 } },  // 降低扣血
      { id: 'event_2_2', text: '迅速撤离', stateChange: { hp: -12 } },  // 降低扣血
    ],
  },
  {
    id: 'event_3',
    title: '神秘老者',
    description: '一位神秘的老者出现在你面前，他似乎是某位隐世高人，愿意指点你一番。',
    choices: [
      { id: 'event_3_1', text: '虚心请教', stateChange: { qi: 25, cultivation: 22, medicine: 5 } },  // 降低修为
      { id: 'event_3_2', text: '保持警惕，婉言谢绝', stateChange: { qi: 6 } },  // 降低数值
    ],
  },
  {
    id: 'event_4',
    title: '顿悟',
    description: '在一次修炼中，你感到体内有某种力量在觉醒，似乎是要突破的征兆！',
    choices: [
      { id: 'event_4_1', text: '全力冲击瓶颈', stateChange: { hp: -20, qi: 42, cultivation: 35 } },  // 降低扣血
      { id: 'event_4_2', text: '稳妥起见，继续积累', stateChange: { qi: 18, cultivation: 12 } },  // 降低修为
    ],
  },
  {
    id: 'event_5',
    title: '拍卖会',
    description: '你路过一个城镇，恰好赶上一场拍卖会，有不少珍贵的物品正在拍卖。',
    choices: [
      { id: 'event_5_1', text: '参与竞拍', stateChange: { medicine: 22, hp: -12, cultivation: 8 } },  // 降低扣血
      { id: 'event_5_2', text: '只是看看', stateChange: { qi: 6 } },  // 降低数值
    ],
  },
  {
    id: 'event_6',
    title: '受伤的旅人',
    description: '你在路上遇到一个受伤的旅人，他似乎需要帮助。',
    choices: [
      { id: 'event_6_1', text: '伸出援手', stateChange: { medicine: -8, qi: 12, cultivation: 10 } },  // 降低数值
      { id: 'event_6_2', text: '绕道而行', stateChange: { qi: 4 } },  // 降低数值
    ],
  },
  {
    id: 'event_7',
    title: '古药方',
    description: '你在一处遗迹中发现了一张古老的药方，上面记载着一种强力丹药的炼制方法。',
    choices: [
      { id: 'event_7_1', text: '尝试炼制', stateChange: { medicine: 22, hp: -15, cultivation: 12 } },  // 降低扣血
      { id: 'event_7_2', text: '记住配方，以后再说', stateChange: { qi: 10, medicine: 5 } },  // 降低数值
    ],
  },
  {
    id: 'event_8',
    title: '魔兽袭击',
    description: '一只高阶魔兽突然袭击了你！这是危险，也是机遇。',
    choices: [
      { id: 'event_8_1', text: '正面对决', stateChange: { hp: -38, medicine: 28, qi: 35, cultivation: 35 } },  // 降低扣血
      { id: 'event_8_2', text: '战术撤退', stateChange: { hp: -15 } },  // 降低扣血
    ],
  },
];

// 获取节点
export function getNodeById(id: string): StoryNode | undefined {
  return storyNodes.find((node) => node.id === id);
}

// 获取随机事件
export function getRandomEvent(): RandomEvent {
  const index = Math.floor(Math.random() * randomEvents.length);
  return randomEvents[index];
}
