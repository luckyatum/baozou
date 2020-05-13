import { IWuXueType, IWuXueCard, enumJoint, IDaily, IFuDi, riChangEnum } from './interface'
import { IWuXue } from 'src/lib/interface'
import { zhenYuanBase } from "./constant"

// 根据难度、等级计算真元数值
export function calcZhenYuan(level: number, nanDu: number): number {
    // 取整
    return Math.trunc(zhenYuanBase[level] * nanDu)
}

// 找到一堆同类型武学中的主武学位置
export function getMainWuXueIndex(sameWuXueList: IWuXue[]): number {
    const maxNanDu = Math.max(...sameWuXueList.map(s => Number(s.NanDu)))
    return sameWuXueList.findIndex(s => Number(s.NanDu) === maxNanDu) || 0
}

// 计算总真元值
export function calcTotalZhenYuan(wuXueListWithType: IWuXueType): number {
    const keys = Object.keys(wuXueListWithType)
    let sum = 0
    for (const type of keys) {
        const wuXueList: IWuXueCard[] = wuXueListWithType[type]
        sum += wuXueList.reduce((pre, cur) => {
            return pre + cur.ZhenYuan
        }, 0)
    }
    return sum
}

// 找到最高真元的武学
export function findHighestZhenYuanW(wList: IWuXueCard[]): IWuXueCard|null {
    if (wList.length === 0) return null
    const [...newWList] = wList
    return newWList.sort((pre, cur) => Number(cur.ZhenYuan) - Number(pre.ZhenYuan))[0]
}

// 计算日常
// 公式来自@神机堂，http://bz.hpeng.cn
export function calcDaily(highestLevel: number, x: number): number {
    if (highestLevel >= 1 && highestLevel <= 59) {
        return 900 * x
    }
    else if (highestLevel >= 60 && highestLevel <= 99) {
        return 1300 * x
    }
    else if (highestLevel >= 100 && highestLevel <= 151) {
        return 1800 * x
    }
    else {
        return (1800 + (highestLevel - 151) * 10) * x
    }
}

// 计算委托
// 公式来自@神机堂，http://bz.hpeng.cn
export function calcWeiTuo(highestLevel: number, x: number): number {
    if (highestLevel >= 0 && highestLevel <= 99) {
        return 5200 * x
    }
    else if (highestLevel >= 100 && highestLevel <= 149) {
        return 7200 * x
    }
    else if (highestLevel >= 150 && highestLevel <= 199) {
        return 9200 * x
    }
    else if (highestLevel >= 200 && highestLevel <= 249) {
        return 11200 * x
    }
    else if (highestLevel >= 250 && highestLevel <= 299) {
        return 13200 * x
    }
    else if (highestLevel >= 300 && highestLevel <= 349) {
        return 15200 * x
    }
    else if (highestLevel >= 350 && highestLevel <= 399) {
        return 17200 * x
    }
    else if (highestLevel >= 400 && highestLevel <= 449) {
        return 19200 * x
    }
    else if (highestLevel >= 450 && highestLevel <= 499) {
        return 21200 * x
    }
    else if (highestLevel >= 500 && highestLevel <= 550) {
        return 23200 * x
    } else {
        return 0
    }
}

// 返回拼接字符串
export function jointQianNeng(type: enumJoint, daily: IDaily, fuDi: IFuDi): string {
    // 非会员展示
    const feiTotal =
    `   寻宝箱*${riChangEnum.baoXiang}: ${daily.baoXiang || 0}
        奇人异事*${riChangEnum.qiRen}: ${daily.qiRen || 0}
        押镖*${riChangEnum.yaBiao}: ${daily.yaBiao || 0}
        四大恶人*${riChangEnum.siDa}: ${daily.siDa || 0}
        威虎山(困难)*${riChangEnum.weiHuShan}: ${daily.weiHuShan || 0}
        海盗副本(困难)*${riChangEnum.haiDao}: ${daily.haiDao || 0}
        暗号*${riChangEnum.anHao}: ${daily.anHao || 0}
        五星委托*${riChangEnum.weiTuo}: ${daily.weiTuo || 0}
        非会员合计: ${daily.total}\n
    `
    // 会员展示
    const huiTotal =
    `   威虎山(困难)*${riChangEnum.huiWeiHuShan}: ${daily.huiWeiHuShan || 0}
        海盗副本(困难)*${riChangEnum.huiHaiDao}: ${daily.huiHaiDao || 0}
        飞鸽传书*${riChangEnum.huiFeiGe}: ${daily.huiFeiGe || 0}
        会员合计: ${(daily.total || 0) + (daily.huiTotal || 0)}\n
    `

    // 福地展示
    const fuDiTotal =
    `   幻境之尘: ${fuDi.huanChen || 0}
        银两: ${fuDi.yinLiang || 0}
        潜能: ${fuDi.qianNeng || 0}
        江湖经验: ${fuDi.jingYan || 0}
        宝箱合计: \n${fuDi.baoXiang && fuDi.baoXiang.split(',').join('\n')}
    `
    switch (type) {
        case enumJoint.TOTAL:
            return feiTotal + huiTotal + fuDiTotal
        case enumJoint.HUI_TOTAL:
            return feiTotal + huiTotal
        case enumJoint.FEI_TOTAL:
            return feiTotal
        case enumJoint.FUDI:
            return fuDiTotal
    }
}

// 根据详细等级计算真元
// 公式来自@神机堂，http://bz.hpeng.cn
export function calcZhenYuanByLevel(level: number, nanDu: number): number {
    return Math.trunc(3 * level * level * level * nanDu / 10127)
}