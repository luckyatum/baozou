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