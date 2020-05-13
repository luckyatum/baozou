// 装备接口
export interface IEquipment {
    Id: string;
    Name: string;
    ShuXing: string;
    Des: string;
}

// 武学接口
export interface IWuXue {
    Id: string;
    Title: string;
    MenPai: string;
    Type: wuXueType;
    NanDu: string;
    Sex: string;
}

// 武学卡片（真元界面展示）接口
export interface IWuXueCard {
    Id: string;
    Title: string;
    MenPai: string;
    NanDu: string;
    Level: number;
    ZhenYuan: number;
    IsMain: boolean;
}

// 武学类型
export enum wuXueType { QUAN='QUAN', JIAN='JIAN', DAO='DAO', GUN='GUN', BIAN='BIAN', AN='AN', QING='QING' }

// 武学类型接口
export interface IWuXueType {
    QUAN?: IWuXueCard[];
    JIAN?: IWuXueCard[];
    DAO?: IWuXueCard[];
    GUN?: IWuXueCard[];
    BIAN?: IWuXueCard[];
    AN?: IWuXueCard[];
    QING?: IWuXueCard[];
}

// 学习潜能接口
export interface ILearnForm {
    wuXing?: string;
    nanDu?: string;
    daiMai?: string;
    start?: string;
    end?: string;
}

// 每日潜能接口
export interface IDailyForm {
    highestLevel?: string;
    fuDi?: string;
}

// 每日潜能对象
export interface IDaily {
    baoXiang?: number;
    qiRen?: number;
    yaBiao?: number;
    siDa?: number;
    weiHuShan?: number;
    haiDao?: number;
    anHao?: number;
    weiTuo?: number;
    total?: number;
    huiWeiHuShan?: number;
    huiHaiDao?: number;
    huiFeiGe?: number;
    huiTotal?: number;
}

// 日常次数枚举
export enum riChangEnum { baoXiang=10, qiRen=10, yaBiao=1, siDa=1, weiHuShan=3, haiDao=3, anHao=1, weiTuo=5, huiWeiHuShan=1, huiHaiDao=1, huiFeiGe=1 }

// 福地对象
export interface IFuDi {
    baoXiang?: string;
    huanChen?: number;
    qianNeng?: number;
    jingYan?: number;
    yinLiang?: number;
}

// 拼接对象
export enum enumJoint { TOTAL, HUI_TOTAL, FEI_TOTAL, FUDI }

// 等级对应真元表单
export interface ILevelZhenYuan {
    level?: string;
    nanDu?: string;
}