# 构建风险排查报告

排查日期：2026-04-17

本文档用于对照 [docs/build-error.md](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/docs/build-error.md:1) 中总结的 Vercel 构建错误，逐项检查当前项目是否存在同类潜在问题，并记录本次修复与验证结果。

先说结论：`build-error.md` 中列出的 7 类典型错误里，当前项目共命中 5 类潜在风险，未命中 2 类。

- 已命中并完成修复：1、2、3、4、7
- 当前未命中：5、6

## 排查结论

当前项目在排查前，确实存在多项与 `build-error.md` 同类的潜在构建风险，主要集中在：

- `next.config.ts` 仍然使用 TypeScript 配置文件
- 根目录保留了 `.babelrc`，并启用了 `@react-dev-inspector/babel-plugin`
- `react-dev-inspector` 仍然出现在运行时代码链路中
- `tailwindcss`、`@tailwindcss/postcss`、`typescript`、`@types/react`、`@types/react-dom`、`@types/node`、`@types/pg` 仍位于 `devDependencies`
- `scripts/build.sh` 仍使用 `npx next build` 与 `npx tsup`
- `scripts/build.sh` 未在 `VERCEL=1` 场景下跳过自定义 Node server 打包

本次已全部完成修复，并通过本地构建验证。

## 逐项排查结果

### 1. `next.config.ts` 转译风险

结论：已命中，已修复。

排查结果：

- 项目原本使用的是 `next.config.ts`
- 这会让 Next.js 在构建阶段依赖 TypeScript 去转译配置文件
- 在 devDependencies 未完整安装的构建环境中，存在复现 `Failed to transpile "next.config.ts"` 的风险

修复动作：

- 删除 `next.config.ts`
- 新增 `next.config.mjs`
- 保留原有配置项，不改变业务行为

### 2. `.babelrc` 与 `@react-dev-inspector/babel-plugin` 风险

结论：已命中，已修复。

排查结果：

- 根目录原本存在 `.babelrc`
- `.babelrc` 明确启用了 `@react-dev-inspector/babel-plugin`
- 这会让生产构建直接走 Babel 外部配置，并引入开发期调试插件

修复动作：

- 删除 `.babelrc`
- 移除 `package.json` 中 `@react-dev-inspector/babel-plugin`、`@react-dev-inspector/middleware`、`react-dev-inspector`

### 3. `react-dev-inspector` 运行时代码链路风险

结论：已命中，已修复。

排查结果：

- [src/app/layout.tsx](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/src/app/layout.tsx:1) 原本直接引入了 `react-dev-inspector`
- 虽然代码通过 `COZE_PROJECT_ENV === 'DEV'` 做了条件判断，但模块导入本身仍然会进入构建链路

修复动作：

- 删除 `react-dev-inspector` 的导入
- 删除 `<Inspector />` 运行时代码
- 保留 `layout` 的其余结构不变

### 4. Tailwind / TypeScript / 类型包仅放在 `devDependencies` 的风险

结论：已命中，已修复。

排查结果：

构建前，以下包仅位于 `devDependencies`：

- `tailwindcss`
- `@tailwindcss/postcss`
- `typescript`
- `@types/react`
- `@types/react-dom`
- `@types/node`
- `@types/pg`

这些包都可能在 Next.js 16 + Tailwind 4 的构建或类型检查阶段被直接使用，因此存在在 Vercel 环境下复现 “Cannot find module ...” 或 “缺少类型包” 的风险。

修复动作：

- 将以上包移动到 `dependencies`
- 执行 `pnpm install` 更新 [pnpm-lock.yaml](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/pnpm-lock.yaml:1)

### 5. `@types/pg` / `pg` 相关类型风险

结论：未在当前业务代码中触发，但已做预防性修复。

排查结果：

- 当前项目依赖中存在 `pg`
- 但本次代码扫描未发现 `src/` 下有直接导入 `pg` 的服务端业务代码
- 因此当前仓库暂未复现 `Could not find a declaration file for module 'pg'`

修复动作：

- 仍将 `@types/pg` 放入 `dependencies`
- 避免后续新增服务端数据库代码时，再次踩到同类构建问题

### 6. `strict: true` 下的 TypeScript `implicit any` 风险

结论：当前未命中。

排查结果：

- [tsconfig.json](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/tsconfig.json:1) 开启了 `strict: true`
- 本次执行 `pnpm ts-check` 与 `pnpm build` 均通过
- 当前项目未复现 `implicit any` 相关构建失败

说明：

- 项目中存在一些 `map((item) => ...)` 形式的代码，但当前上下文下类型可被正确推断
- 这类风险在后续增加后台数据层、分页结果封装或弱类型接口映射时仍需特别注意

### 7. `tsup` 阶段找不到 `typescript` / 云环境不应额外打包自定义 server

结论：已命中潜在风险，已修复。

排查结果：

- [scripts/build.sh](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/scripts/build.sh:1) 原本使用：
  - `npx next build`
  - `npx tsup ...`
- 在 Vercel 这类云构建环境中，`npx` 更容易拉起不稳定的临时依赖解析
- 同时对于纯 Next.js 部署，`VERCEL=1` 场景下通常不需要再额外打包自定义 Node server

修复动作：

- 将 `npx next build` 改为 `pnpm exec next build`
- 将 `npx tsup` 改为 `pnpm exec tsup`
- 在 `VERCEL=1` 时跳过 `tsup` 打包步骤

## 本次实际修改

本次修复涉及以下文件：

- 删除 [.babelrc](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/.babelrc)
- 删除 [next.config.ts](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/next.config.ts)
- 新增 [next.config.mjs](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/next.config.mjs:1)
- 更新 [package.json](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/package.json:1)
- 更新 [pnpm-lock.yaml](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/pnpm-lock.yaml:1)
- 更新 [src/app/layout.tsx](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/src/app/layout.tsx:1)
- 更新 [scripts/build.sh](/Users/mfyx/azen/coze/doupocangqiong-hudongyouxi/scripts/build.sh:1)

## 验证结果

本次已完成以下验证：

- `pnpm ts-check`
- `pnpm build`
- `VERCEL=1 pnpm build`

验证结果：

- 正常构建通过
- TypeScript 检查通过
- `VERCEL=1` 场景下会正确跳过 `tsup`，构建通过

## 最终结论

当前项目已不存在 `docs/build-error.md` 中列出的主要同类构建风险，至少在本次排查覆盖的范围内：

- 不再依赖 `next.config.ts` 转译
- 不再把开发态 Inspector/Babel 插件带入生产构建链路
- 构建期必需依赖已从 `devDependencies` 挪到更稳妥的位置
- Vercel 场景下不会再额外执行自定义 server 打包
- 当前代码未发现会阻塞构建的 TypeScript `implicit any` 问题

后续如果你再创建类似项目，建议优先复用这次修复后的配置组合，而不是沿用默认模板。
