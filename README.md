# 斗破苍穹：炎帝之路

一个基于《斗破苍穹》世界观改编的互动式文字冒险游戏。玩家将以萧炎的成长路线为蓝本，在分支剧情、属性变化、随机事件和多结局中推进故事，体验从乌坦城少年一路走向巅峰的修炼之旅。

## 项目简介

本项目是一个单页沉浸式互动游戏，重点围绕以下体验设计：

- 分支叙事：根据不同选择进入不同剧情节点，推进主线或特殊支线。
- 数值成长：血量、斗气、丹药、修为等状态会随着选择实时变化。
- 随机事件：在固定剧情之外插入特殊事件，增强不确定性和可重玩性。
- 多结局设计：支持常规成长结局、特殊路线结局和偏黑暗分支结局。
- 视觉氛围：通过背景渐变、状态栏、打字机效果和弹窗反馈营造小说改编游戏的沉浸感。

当前主页面入口位于 [src/app/page.tsx](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/src/app/page.tsx:1)，游戏主界面位于 [src/components/game/game-screen.tsx](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/src/components/game/game-screen.tsx:1)。

## 技术栈

- Next.js 16 App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui
- 自定义 Node HTTP 服务入口

## 核心玩法

- 开局进入开始页，点击后进入主线剧情。
- 每个剧情节点都会展示描述文本与可选行动。
- 玩家选择会影响角色状态，并决定后续节点走向。
- 特定节点会触发随机事件或资源转化提示。
- 游戏结束后会根据路径和状态进入对应结局，并支持重新开始。

根据当前设计文档，项目已规划出 56 个节点、8 个随机事件和 3 个主要结局分支，详情可见 [docs/game-flow.md](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/docs/game-flow.md:1)。

## 快速开始

### 环境要求

- Node.js 24
- pnpm 9 及以上

### 安装依赖

```bash
pnpm install
```

### 启动开发环境

```bash
pnpm dev
```

开发脚本会优先尝试默认端口；如果端口已被占用，会自动回退到下一个可用端口，并在终端输出实际访问地址。

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务

```bash
pnpm start
```

### 代码检查

```bash
pnpm lint
pnpm ts-check
```

## 目录结构

```text
.
├── assets/                 # 项目插图和素材
├── docs/                   # 剧情、数值、结局、流程等设计文档
├── public/                 # 静态资源
├── scripts/                # 构建、启动与模拟分析脚本
├── src/
│   ├── app/                # Next.js 路由与全局样式
│   ├── components/
│   │   ├── game/           # 游戏界面、结局页、事件弹窗等业务组件
│   │   └── ui/             # shadcn/ui 基础组件
│   ├── hooks/              # 游戏状态等自定义 Hooks
│   ├── lib/                # 故事数据、类型、动画与工具函数
│   └── server.ts           # 自定义服务端入口
├── AGENTS.md               # 协作与开发约束
├── package.json
└── README.md
```

## 关键模块

- [src/components/game](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/src/components/game)：
  游戏的主要视觉与交互组件，包括开始页、状态栏、剧情界面、随机事件、结局页等。
- [src/hooks/use-game.ts](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/src/hooks/use-game.ts:1)：
  管理游戏流程、节点推进、状态变化、结局判定和重开逻辑。
- [src/lib/story-data.ts](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/src/lib/story-data.ts:1)：
  定义剧情节点、背景风格、随机事件等核心内容数据。
- [src/lib/types.ts](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/src/lib/types.ts:1)：
  统一游戏中的状态、节点、选项和结局类型。
- [scripts/monte-carlo-simulation.js](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/scripts/monte-carlo-simulation.js:1)：
  用于对数值系统和平衡性做模拟分析。

## 开发约束

- 仅允许使用 `pnpm` 管理依赖。
- 默认优先复用 `src/components/ui/` 下的 shadcn/ui 组件。
- 避免在 JSX 渲染期间直接使用 `Date.now()`、`Math.random()`、`typeof window` 等会引发 hydration 问题的动态值。
- 动态客户端逻辑应放在 `use client` 组件中，并通过 `useEffect`、`useState` 控制挂载后的表现。

## 文档参考

- [docs/game-flow.md](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/docs/game-flow.md:1)：主线流程与节点统计
- [docs/design-v2.md](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/docs/design-v2.md:1)：版本化设计思路
- [docs/cultivation-system.md](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/docs/cultivation-system.md:1)：修炼体系设计
- [docs/numerical-system.md](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/docs/numerical-system.md:1)：数值系统说明
- [docs/ending-design.md](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/docs/ending-design.md:1)：结局设计
- [docs/monte-carlo-analysis.md](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/docs/monte-carlo-analysis.md:1)：模拟分析说明
