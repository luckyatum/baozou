import { IWuXue } from 'src/lib/interface';
import { zhenYuanBase } from "./constant";

// 根据难度、等级计算真元数值
export function calcZhenYuan(level: number, nanDu: number): number {
    return zhenYuanBase[level] * nanDu
}

// 找到一堆同类型武学中的主武学位置
export function getMainWuXueIndex(sameWuXueList: IWuXue[]): number {
    const maxNanDu = Math.max.call(sameWuXueList.map(s => s.NanDu))
    return sameWuXueList.findIndex(s => s.NanDu === maxNanDu) || 0
}