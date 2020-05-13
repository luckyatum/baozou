import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtDrawer, AtButton, AtTag } from 'taro-ui'
import { remove } from 'lodash'
import ZhenYuanSidebar from '../../components/ZhenYuanSidebar'
import WuXueCard from '../../components/WuXueCard'
import { IWuXueType, IWuXue, wuXueType, IWuXueCard } from '../../lib/interface'
import { levelList, wuXueTypeMap } from '../../lib/constant'
import { getMainWuXueIndex, calcZhenYuan, calcTotalZhenYuan, findHighestZhenYuanW } from '../../lib/util'
import './index.scss'

export default function Index() {
  const [ totalZhenYuan, setTotalZhenYuan ] = useState<number>(0) // 总真元
  const [ activeLevel, setActiveLevel ] = useState<number>(100) // 当前选择的等级
  const [ menPaiIndex, setMenPaiIndex ] = useState<number>(0) // 当前激活的门派
  const [ sexIndex, setSexIndex ] = useState<number>(0) // 当前激活的性别
  const [ wuXueList, setWuXueList ] = useState<IWuXue[]>([]) // 左侧栏选择的武学列表
  const [ wuXueId, setWuXueId ] = useState<[string, boolean]>(['', false]) // [最后一次操作数组变化时候的武学id, 操作是增加还是删除]
  const [ wuXueListWithType, setWuXueListWithType ] = useState<IWuXueType>({}) // 已选中武学中根据武学类型区分的列表
  const [ isShowDrawer, setIsShowDrawer ] = useState<boolean>(false) // 是否展示左侧抽屉

  // 选择武学变化，重新计算所有武学的真元值
  useEffect(() => {
    const wLength = wuXueList.length
    if (wLength === 0) {
      setWuXueListWithType({})
      setTotalZhenYuan(0)
      return
    }

    const [ id, isAdd ] = wuXueId

    if (isAdd) {
      const { Title, MenPai, Type, NanDu } = wuXueList.find(w => w.Id === id) as IWuXue
      const w = wuXueListWithType[Type] || []
      // 新增武学,计算新的武学的真元
      const zhenYuan = calcZhenYuan(activeLevel, Number(NanDu))
      // 找到主要武学
      const oldMainW = w.find(w => w.IsMain)

      if (!oldMainW) {
        // 没有旧武学，直接成为主武学
        w.push({
          Id: id,
          Title,
          MenPai,
          NanDu,
          Level: activeLevel,
          ZhenYuan: zhenYuan,
          IsMain: true
        })
      } else {
        const { ZhenYuan: mainZhenYuan, Id: mainId } = oldMainW
        // 比较两者真元
        if (mainZhenYuan > zhenYuan) {
          // 主武学仍然不变
          w.push({
            Id: id,
            Title,
            MenPai,
            NanDu,
            Level: activeLevel,
            ZhenYuan: zhenYuan / 2,
            IsMain: false
          })
        } else {
          // 主武学变为新武学，然后旧的主武学数据变化
          w.push({
            Id: id,
            Title,
            MenPai,
            NanDu,
            Level: activeLevel,
            ZhenYuan: zhenYuan,
            IsMain: true
          })

          oldMainW.IsMain = false
          oldMainW.ZhenYuan = mainZhenYuan / 2
        }
      }
    } else {
      // 删除武学，先删除对应card数组的元素，再重新计算真元
      const wList = getWListWithTypeById(id) as IWuXueCard[]
      const [{ IsMain: delIsMain }] = wList.splice(wList.findIndex(delW => delW.Id === id), 1)

      if (delIsMain) {
        // 删除的是主武学，则重新找一个主武学，逻辑是找当前真元最高的
        const highestMainW = findHighestZhenYuanW(wList)

        if (highestMainW) {
          const { ZhenYuan: highestZhenYuan } = highestMainW
            // 最高的变为主武学
            const curMainW = wList.find(w => w.Id === highestMainW.Id) as IWuXueCard
            curMainW.IsMain = true
            curMainW.ZhenYuan = highestZhenYuan * 2
        }
      }
    }

    // 重新计算总真元值
    setTotalZhenYuan(calcTotalZhenYuan(wuXueListWithType))
    setWuXueListWithType(wuXueListWithType)
  }, [ wuXueList ])

  // 等级变化，统一全部更新
  useEffect(() => {
    // 重新计算真元值
    const newWuXueListWithType: IWuXueType = {}
    for (const type of Object.keys(wuXueTypeMap)) {
      newWuXueListWithType[type] = handleWuXueList(wuXueList.filter(n => n.Type === type), activeLevel)
    }

    // 重新计算总真元值
    setTotalZhenYuan(calcTotalZhenYuan(newWuXueListWithType))
    setWuXueListWithType(newWuXueListWithType)
  }, [ activeLevel ])

  // 通过id获取武学card对象
  function getWListWithTypeById(id: string): IWuXueCard[] | void {
    for (const key of Object.keys(wuXueListWithType)) {
      const wList: IWuXueCard[] = wuXueListWithType[key]

      const w = wList.find(w => w.Id === id)
      if (w) {
        return wList
      }
    }
  }

  // 武学选择后触发
  function handleWuXueSelect(wuXue: IWuXue, isActive: boolean) {
    if (isActive) {
      // 新增加武学
      wuXueList.push(wuXue)
    } else {
      // 删除对应武学
      handleDel(wuXue.Id)
    }
    setWuXueId([wuXue.Id, isActive])
    setWuXueList([ ...wuXueList ])
  }

  // 等级更新触发
  function handleLevelChange({ name, active }) {
    if (!active) {
      // 当前未激活，则更新当前等级为该等级
      setActiveLevel(Number(name))
    }
  }

  // 处理武学列表
  function handleWuXueList(sameWuXueList: IWuXue[], level: number): IWuXueCard[] {
    if (!sameWuXueList) return []
    // 找到主难度武学所在位置
    const mainWuXueIndex = getMainWuXueIndex(sameWuXueList)

    return sameWuXueList.map((w, i) => {
      const isMain = (i === mainWuXueIndex)
      // 计算真元
      const zhenYuan = calcZhenYuan(level, isMain ? Number(w.NanDu) : Number(w.NanDu) / 2)
      return {
        Id: w.Id,
        Title: w.Title,
        MenPai: w.MenPai,
        NanDu: w.NanDu,
        Level: level,
        ZhenYuan: zhenYuan,
        IsMain: isMain
      }
    })
  }

  // 处理删除武学事件
  function handleDel(id: string) {
    // 删除对应武学
    remove(wuXueList, (n: IWuXue) => {
      return n.Id === id
    })

    setWuXueId([id, false])
    setWuXueList([ ...wuXueList ])
  }

  // 处理武学自身修改等级
  function handleOwnLevelChange(id: string, level: number) {
    const keys = Object.keys(wuXueListWithType)

    for (const key of keys) {
      const wList: IWuXueCard[] = wuXueListWithType[key]
      const curW = wList.find(w => w.Id === id)

      if (curW) {
        // 找到武学id存在的位置
        const curMainW = wList.find(w => w.IsMain) as IWuXueCard
        curW.Level = level

        if (curMainW.Id === curW.Id) {
          // 修改的就是主武学的等级
          // 将其真元减半之后，判断是否还是最高真元的
          const curZhenYuan = calcZhenYuan(level, Number(curW.NanDu))
          curW.ZhenYuan = curZhenYuan / 2

          const highestZhenYuanW = findHighestZhenYuanW(wList) as IWuXueCard

          const { ZhenYuan: highestZhenYuan } = highestZhenYuanW
          if (curW.Id === highestZhenYuanW.Id) {
            // 还是最高
            curW.ZhenYuan = curZhenYuan
          } else {
            // 不是最高了
            curW.IsMain = false
            curW.ZhenYuan = curZhenYuan / 2

            // 最高的的变为主武学
            const oldHighestZhenYuanW = wList.find(w => w.Id === highestZhenYuanW.Id) as IWuXueCard
            oldHighestZhenYuanW.IsMain = true
            oldHighestZhenYuanW.ZhenYuan = highestZhenYuan * 2
          }
        } else {
          // 修改的不是主武学等级，需要重新选出主武学，只要判断修改等级后是否真元比当前主武学多
          const zhenYuan = calcZhenYuan(level, Number(curW.NanDu))
          const { ZhenYuan: mainZhenYuan } = curMainW

          if (mainZhenYuan > zhenYuan) {
            // 主武学不变
            curW.ZhenYuan = zhenYuan / 2
          } else {
            // 主武学变了
            curW.ZhenYuan = zhenYuan
            curW.IsMain = true

            curMainW.IsMain = false
            curMainW.ZhenYuan = mainZhenYuan / 2
          }
        }

        // 更新整个数组真元值
        wuXueListWithType[key] = wList

        // 重新计算总真元值
        setTotalZhenYuan(calcTotalZhenYuan(wuXueListWithType))
        setWuXueListWithType(JSON.parse(JSON.stringify(wuXueListWithType)))
        break
      }
    }
  }

  return (
    <View className='zhenyuan'>
      <View className='baozou-header'>暴走英雄坛计算器</View>
      <AtButton className='zhenyuan-btn' type='primary' onClick={() => setIsShowDrawer(true)}>选择门派</AtButton>
      <View className='zhenyuan-level-container'>
        {
          levelList.map(level => <AtTag type='primary' key={level} active={level === activeLevel} name={String(level)} onClick={handleLevelChange}>{level}</AtTag>)
        }
      </View>
      <View className='zhenyuan-preview-container'>
        <Text className='zhenyuan-preview-text'>返还真元: {totalZhenYuan}</Text>
      </View>
      <View className='zhenyuan-wuxue-container'>
        {
          Object.keys(wuXueListWithType).map((key: wuXueType) => {
            const value = wuXueListWithType[key] || []
            return value.length > 0
              ? <WuXueCard
                  key={key}
                  wuXueKey={key}
                  wuXueCardList={value}
                  onDel={handleDel}
                  onLevelChange={handleOwnLevelChange}
                />
              : null
          })
        }
      </View>
      <AtDrawer
        show={isShowDrawer}
        mask
        onClose={() => setIsShowDrawer(false)}
      >
        <ZhenYuanSidebar
          menPaiIndex={menPaiIndex}
          sexIndex={sexIndex}
          wuXueList={wuXueList}
          handleWuXueSelect={handleWuXueSelect}
          handleClose={() => setIsShowDrawer(false)}
          handleChange={(menPaiIndex, sexIndex) => {
            setMenPaiIndex(menPaiIndex)
            setSexIndex(sexIndex)
          }}
        />
      </AtDrawer>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '真元',
}
