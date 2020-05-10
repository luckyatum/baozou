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
export enum wuXueType { QUAN='拳法', JIAN='剑法', DAO='刀法', GUN='棍法', BIAN='鞭法', AN='暗器', QING='轻功' }

// 武学类型接口
export interface IWuXueType {
    QUAN?: IWuXue[];
    JIAN?: IWuXue[];
    DAO?: IWuXue[];
    GUN?: IWuXue[];
    BIAN?: IWuXue[];
    AN?: IWuXue[];
    QING?: IWuXue[];
}