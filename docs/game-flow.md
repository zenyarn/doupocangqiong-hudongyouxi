# 关卡节点流程图

## 游戏主线流程 (Mermaid)

```mermaid
flowchart TB
    subgraph 第一章[第一章：乌坦城开端]
        N1[node_1: 乌坦城的嘲讽] --> N2[node_2: 山中修炼]
        N1 --> N3[node_3: 家族冲突]
        N1 --> N4[node_4: 药老的考验]
        N2 --> N4
        N2 --> N5[node_5: 魔兽遭遇战]
        N3 --> N4
        N3 --> N6[node_6: 家族的决定]
        N6 --> N4
    end

    subgraph 第二章[第二章：魔兽山脉]
        N4 --> N7[node_7: 魔兽山脉深处]
        N4 --> N8[node_8: 出发准备]
        N4 --> N9[node_9: 药老的教导]
        N5 --> N10[node_10: 意外收获]
        N10 --> N4
        N7 --> N12[node_12: 发现血莲精]
        N7 --> N13[node_13: 外围发现]
        N8 --> N7
        N8 --> N14[node_14: 险象环生]
        N9 --> N15[node_15: 焚诀初成]
        N9 --> N7
    end

    subgraph 第三章[第三章：关键抉择]
        N12 --> N17[node_17: 血莲精到手]
        N13 --> N18[node_18: 医仙之恩]
        N14 --> N12
        N15 --> N19[node_19: 实力精进]
        N15 --> N20[node_20: 异火之路]
    end

    subgraph 第四章[第四章：成长之路]
        N17 --> N23[node_23: 天赋觉醒]
        N18 --> N24[node_24: 塔戈尔沙漠]
        N19 --> N25[node_25: 家族大比]
        N19 --> N26[node_26: 云岚宗来人]
        N20 --> N24
        N20 --> N19
    end

    subgraph 第五章[第五章：异火之路]
        N23 --> N27[node_27: 实力飞跃]
        N24 --> N28[node_28: 美杜莎女王]
        N24 --> N29[node_29: 古墓探索]
        N25 --> N30[node_30: 大比夺魁]
        N26 --> N31[node_31: 三年之约]
    end

    subgraph 第六章[第六章：实力提升]
        N27 --> N32[node_32: 中州之行]
        N27 --> N33[node_33: 萧家守护]
        N28 --> N34[node_34: 青莲地心火]
        N28 --> N35[node_35: 女王之盟]
        N29 --> N34
        N30 --> N26
        N31 --> N36[node_36: 实力大进]
        N31 --> N37[node_37: 大陆游历]
    end

    subgraph 第七章[第七章：强者之路]
        N32 --> N38[node_38: 揭露真相]
        N32 --> N39[node_39: 强者之路]
        N33 --> N40[node_40: 家族振兴]
        N34 --> N41[node_41: 异火之力]
        N35 --> N42[node_42: 跨越种族的羁绊]
    end

    subgraph 第八章[第八章：决战前夕]
        N36 --> N43[node_43: 决战云岚宗]
        N37 --> N36
        N38 --> N44[node_44: 正义之师]
        N38 --> N45[node_45: 暗度陈仓]
        N39 --> N46[node_46: 巅峰之路]
        N39 --> N47[node_47: 炎盟成立]
        N40 --> N32
        N41 --> N36
        N41 --> N48[node_48: 收集异火]
        N42 --> N49[node_49: 最强搭档]
    end

    subgraph 第九章[第九章：巅峰对决]
        N43 --> END2[node_end_2: 云岚之后]
        N43 --> N50[node_50: 云岚覆灭]
        N44 --> N51[node_51: 魂殿覆灭]
        N45 --> N51
        N46 --> N52[node_52: 至高境界]
        N47 --> N44
        N47 --> N46
        N48 --> N54[node_54: 异火合一]
        N49 --> N51
        N49 --> N55[node_55: 实力飞跃]
    end

    subgraph 第十章[第十章：最终结局]
        N50 --> N46
        N51 --> END3[node_end_3: 修炼之巅]
        N52 --> N56[node_56: 实力巅峰]
        N54 --> N55
        N55 --> N56
        N56 --> END3
    end

    subgraph 特殊分支[特殊分支：魂殿路线]
        N11[node_11: 暗流涌动] --> N16[node_16: 魂殿使者]
        N16 --> N21[node_21: 灵魂之战]
        N16 --> N22[node_22: 魂殿弟子]
        N21 --> N23
        N22 --> END1[node_end_1: 黑暗之路]
        N22 --> N21
    end
```

## 节点统计

| 类别 | 数量 |
|------|------|
| 总节点数 | 56 |
| 普通节点 | 53 |
| 结局节点 | 3 |
| 随机事件 | 8 |

## 主要分支路线

### 路线A：修炼路线
```
node_1 → node_2 → node_4 → node_9 → node_15 → node_19 → node_25 → node_30 → node_26 → node_31 → node_36 → node_43
```

### 路线B：异火路线
```
node_1 → node_4 → node_7 → node_12 → node_17 → node_23 → node_27 → node_32 → node_39 → node_46 → node_52 → node_56
```

### 路线C：魂殿路线（黑暗）
```
node_1 → node_3 → node_11 → node_16 → node_22 → node_end_1
```

## 结局触发条件

| 结局节点 | 触发条件 |
|----------|----------|
| node_end_1 | 魂殿路线选择接受黑暗力量 |
| node_end_2 | 云岚宗之战选择宽恕 |
| node_end_3 | 正常游戏结束，根据修为判定最终结局类型 |
