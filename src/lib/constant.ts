import { IWuXue, wuXueType } from './interface';

// 门派列表
export const menPaiList: string[] = ['丐帮', '少林', '太极', '五毒', '逍遥', '雪山', '血刀', '伊贺', '玉女']

// 性别列表
export const sexList: string[] = ['男', '女']

// 等级列表
export const levelList: number[] = [ 100, 150, 200, 250, 300, 350, 400 ]

// 真元等级对应的基数值
export const zhenYuanBase = {
    100: 300,
    150: 1000,
    200: 2400,
    250: 4630,
    300: 8000,
    350: 12700,
    400: 19000
}

// 武学类型对应简称
export const wuXueTypeMap = {
    QUAN: '拳法',
    JIAN: '剑法',
    DAO: '刀法',
    GUN: '棍法',
    BIAN: '鞭法',
    AN: '暗器',
    QING: '轻功'
}

// 武学列表
export const allWuXueList: IWuXue[] = [
    {
        Id: "90",
        Title: "咏春拳",
        MenPai: "江湖",
        Type: wuXueType.QUAN,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "10",
        Title: "虾米拳法",
        MenPai: "江湖",
        Type: wuXueType.QUAN,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "11",
        Title: "太极拳",
        MenPai: "太极",
        Type: wuXueType.QUAN,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "85",
        Title: "金蛇游身掌",
        MenPai: "江湖",
        Type: wuXueType.QUAN,
        NanDu: "1.4",
        Sex: "男,女"
    },
    {
        Id: "124",
        Title: "雪山六阳掌",
        MenPai: "雪山",
        Type: wuXueType.QUAN,
        NanDu: "2",
        Sex: "男,女"
    },
    {
        Id: "125",
        Title: "雪山六阳掌",
        MenPai: "逍遥",
        Type: wuXueType.QUAN,
        NanDu: "2",
        Sex: "男,女"
    },
    {
        Id: "12",
        Title: "雪影擒拿手",
        MenPai: "雪山",
        Type: wuXueType.QUAN,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "13",
        Title: "血杀掌",
        MenPai: "血刀",
        Type: wuXueType.QUAN,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "14",
        Title: "万毒手",
        MenPai: "五毒",
        Type: wuXueType.QUAN,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "15",
        Title: "达摩拳法",
        MenPai: "少林",
        Type: wuXueType.QUAN,
        NanDu: "1.1",
        Sex: "男"
    },
    {
        Id: "117",
        Title: "金刚般若掌",
        MenPai: "少林",
        Type: wuXueType.QUAN,
        NanDu: "1.8",
        Sex: "男"
    },
    {
        Id: "116",
        Title: "真*降龙十八掌",
        MenPai: "丐帮",
        Type: wuXueType.QUAN,
        NanDu: "2",
        Sex: "男,女"
    },
    {
        Id: "16",
        Title: "降龙十八掌",
        MenPai: "丐帮",
        Type: wuXueType.QUAN,
        NanDu: "1.5",
        Sex: "男,女"
    },
    {
        Id: "17",
        Title: "素心掌",
        MenPai: "玉女",
        Type: wuXueType.QUAN,
        NanDu: "1.1",
        Sex: "女"
    },
    {
        Id: "18",
        Title: "七伤拳",
        MenPai: "逍遥",
        Type: wuXueType.QUAN,
        NanDu: "1.5",
        Sex: "男,女"
    },
    {
        Id: "126",
        Title: "九阴幽冥爪",
        MenPai: "逍遥",
        Type: wuXueType.QUAN,
        NanDu: "1.8",
        Sex: "男,女"
    },
    {
        Id: "19",
        Title: "伊贺体术",
        MenPai: "伊贺",
        Type: wuXueType.QUAN,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "20",
        Title: "如来神掌",
        MenPai: "少林",
        Type: wuXueType.QUAN,
        NanDu: "2",
        Sex: "男"
    },
    {
        Id: "61",
        Title: "如来神掌",
        MenPai: "逍遥",
        Type: wuXueType.QUAN,
        NanDu: "2",
        Sex: "男，女"
    },
    {
        Id: "114",
        Title: "玄冥神掌",
        MenPai: "江湖",
        Type: wuXueType.QUAN,
        NanDu: "1.7",
        Sex: "男，女"
    },
    {
        Id: "108",
        Title: "雪饮刀法",
        MenPai: "江湖",
        Type: wuXueType.DAO,
        NanDu: "1.7",
        Sex: "男,女"
    },
    {
        Id: "22",
        Title: "杀猪刀法",
        MenPai: "江湖",
        Type: wuXueType.DAO,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "23",
        Title: "狂风刀法",
        MenPai: "江湖",
        Type: wuXueType.DAO,
        NanDu: "1.4",
        Sex: "男,女"
    },
    {
        Id: "24",
        Title: "血影刀法",
        MenPai: "血刀",
        Type: wuXueType.DAO,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "25",
        Title: "慈悲刀法",
        MenPai: "少林",
        Type: wuXueType.DAO,
        NanDu: "1.1",
        Sex: "男"
    },
    {
        Id: "26",
        Title: "玄虚刀法",
        MenPai: "太极",
        Type: wuXueType.DAO,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "27",
        Title: "川枫一刀流",
        MenPai: "伊贺",
        Type: wuXueType.DAO,
        NanDu: "1.3",
        Sex: "男,女"
    },
    {
        Id: "28",
        Title: "六合刀法",
        MenPai: "江湖",
        Type: wuXueType.DAO,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "111",
        Title: "雄霸天下刀法",
        MenPai: "江湖",
        Type: wuXueType.DAO,
        NanDu: "2",
        Sex: "男，女"
    },
    {
        Id: "118",
        Title: "影忍三刀流",
        MenPai: "伊贺",
        Type: wuXueType.DAO,
        NanDu: "1.8",
        Sex: "男,女"
    },
    {
        Id: "29",
        Title: "太极剑",
        MenPai: "太极",
        Type: wuXueType.JIAN,
        NanDu: "1.5",
        Sex: "男,女"
    },
    {
        Id: "30",
        Title: "雪山剑法",
        MenPai: "雪山",
        Type: wuXueType.JIAN,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "31",
        Title: "唐诗剑法",
        MenPai: "江湖",
        Type: wuXueType.JIAN,
        NanDu: "1.4",
        Sex: "男,女"
    },
    {
        Id: "32",
        Title: "采花剑法",
        MenPai: "江湖",
        Type: wuXueType.JIAN,
        NanDu: "1.2",
        Sex: "男"
    },
    {
        Id: "33",
        Title: "玉女剑法",
        MenPai: "玉女",
        Type: wuXueType.JIAN,
        NanDu: "1.4",
        Sex: "女"
    },
    {
        Id: "34",
        Title: "芙蓉剑法",
        MenPai: "江湖",
        Type: wuXueType.JIAN,
        NanDu: "1.2",
        Sex: "女"
    },
    {
        Id: "119",
        Title: "玉女素心剑",
        MenPai: "玉女",
        Type: wuXueType.JIAN,
        NanDu: "1.8",
        Sex: "女"
    },
    {
        Id: "110",
        Title: "两仪剑法",
        MenPai: "太极",
        Type: wuXueType.JIAN,
        NanDu: "2.0",
        Sex: "男，女"
    },
    {
        Id: "87",
        Title: "金蛇剑法",
        MenPai: "江湖",
        Type: wuXueType.JIAN,
        NanDu: "1.5",
        Sex: "男,女"
    },
    {
        Id: "88",
        Title: "流星蝴蝶剑",
        MenPai: "江湖",
        Type: wuXueType.JIAN,
        NanDu: "1.8",
        Sex: "男,女"
    },
    {
        Id: "35",
        Title: "流氓棍法",
        MenPai: "江湖",
        Type: wuXueType.GUN,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "36",
        Title: "八卦棍法",
        MenPai: "江湖",
        Type: wuXueType.GUN,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "37",
        Title: "罗汉棍法",
        MenPai: "少林",
        Type: wuXueType.GUN,
        NanDu: "1.2",
        Sex: "男"
    },
    {
        Id: "106",
        Title: "霸王枪法",
        MenPai: "江湖",
        Type: wuXueType.GUN,
        NanDu: "1.8",
        Sex: "男,女"
    },
    {
        Id: "38",
        Title: "打狗棍法",
        MenPai: "丐帮",
        Type: wuXueType.GUN,
        NanDu: "1.5",
        Sex: "男,女"
    },
    {
        Id: "39",
        Title: "齐眉棍法",
        MenPai: "江湖",
        Type: wuXueType.GUN,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "40",
        Title: "夜叉棍法",
        MenPai: "江湖",
        Type: wuXueType.GUN,
        NanDu: "1.5",
        Sex: "男,女"
    },
    {
        Id: "121",
        Title: "燎原枪法",
        MenPai: "少林",
        Type: wuXueType.GUN,
        NanDu: "2",
        Sex: "男"
    },
    {
        Id: "122",
        Title: "燎原枪法",
        MenPai: "逍遥",
        Type: wuXueType.GUN,
        NanDu: "2",
        Sex: "男,女"
    },
    {
        Id: "123",
        Title: "燎原枪法",
        MenPai: "丐帮",
        Type: wuXueType.GUN,
        NanDu: "2",
        Sex: "男,女"
    },
    {
        Id: "41",
        Title: "女王鞭法",
        MenPai: "江湖",
        Type: wuXueType.BIAN,
        NanDu: "1.5",
        Sex: "女"
    },
    {
        Id: "42",
        Title: "万花鞭法",
        MenPai: "玉女",
        Type: wuXueType.BIAN,
        NanDu: "1.2",
        Sex: "女"
    },
    {
        Id: "43",
        Title: "父爱鞭法",
        MenPai: "江湖",
        Type: wuXueType.BIAN,
        NanDu: "1.3",
        Sex: "男"
    },
    {
        Id: "44",
        Title: "无常鞭法",
        MenPai: "江湖",
        Type: wuXueType.BIAN,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "45",
        Title: "游龙鞭法",
        MenPai: "江湖",
        Type: wuXueType.BIAN,
        NanDu: "1.3",
        Sex: "男,女"
    },
    {
        Id: "115",
        Title: "天女鞭法",
        MenPai: "江湖",
        Type: wuXueType.BIAN,
        NanDu: "2",
        Sex: "女"
    },
    {
        Id: "89",
        Title: "红拂拂法",
        MenPai: "江湖",
        Type: wuXueType.BIAN,
        NanDu: "1.5",
        Sex: "女"
    },
    {
        Id: "46",
        Title: "投石术",
        MenPai: "江湖",
        Type: wuXueType.AN,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "47",
        Title: "唐门秘录",
        MenPai: "江湖",
        Type: wuXueType.AN,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "49",
        Title: "赌神飞牌",
        MenPai: "江湖",
        Type: wuXueType.AN,
        NanDu: "1.4",
        Sex: "男,女"
    },
    {
        Id: "86",
        Title: "金蛇锥法",
        MenPai: "江湖",
        Type: wuXueType.AN,
        NanDu: "1.4",
        Sex: "男,女"
    },
    {
        Id: "112",
        Title: "天龙八音指法",
        MenPai: "江湖",
        Type: wuXueType.AN,
        NanDu: "2",
        Sex: "男，女"
    },
    {
        Id: "113",
        Title: "小李飞刀",
        MenPai: "江湖",
        Type: wuXueType.AN,
        NanDu: "2",
        Sex: "男，女"
    },
    {
        Id: "48",
        Title: "五毒暗器",
        MenPai: "五毒",
        Type: wuXueType.AN,
        NanDu: "1.4",
        Sex: "男,女"
    },
    {
        Id: "107",
        Title: "神机百变",
        MenPai: "江湖",
        Type: wuXueType.QING,
        NanDu: "1.4",
        Sex: "男,女"
    },
    {
        Id: "50",
        Title: "草上飞",
        MenPai: "江湖",
        Type: wuXueType.QING,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "51",
        Title: "踏雪无痕",
        MenPai: "雪山",
        Type: wuXueType.QING,
        NanDu: "1.3",
        Sex: "男,女"
    },
    {
        Id: "52",
        Title: "血影步",
        MenPai: "血刀",
        Type: wuXueType.QING,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "53",
        Title: "五毒幻形",
        MenPai: "五毒",
        Type: wuXueType.QING,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "54",
        Title: "水上漂",
        MenPai: "少林",
        Type: wuXueType.QING,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "55",
        Title: "梯云纵",
        MenPai: "太极",
        Type: wuXueType.QING,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "56",
        Title: "逍遥游",
        MenPai: "丐帮",
        Type: wuXueType.QING,
        NanDu: "1.1",
        Sex: "男,女"
    },
    {
        Id: "57",
        Title: "飞蝶舞步",
        MenPai: "玉女",
        Type: wuXueType.QING,
        NanDu: "1.3",
        Sex: "女"
    },
    {
        Id: "58",
        Title: "疾风步",
        MenPai: "逍遥",
        Type: wuXueType.QING,
        NanDu: "1.2",
        Sex: "男,女"
    },
    {
        Id: "59",
        Title: "影遁之术",
        MenPai: "伊贺",
        Type: wuXueType.QING,
        NanDu: "1.1",
        Sex: "男,女"
    }
]

