import { IWuXueType, wuXueType, IWuXueCard } from './interface';
import { IWuXue } from 'src/lib/interface';
import { zhenYuanBase } from "./constant";

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