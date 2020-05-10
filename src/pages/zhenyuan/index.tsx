import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtDrawer, AtButton, AtTag } from 'taro-ui'
import * as _ from 'lodash'
import ZhenYuanSidebar from '../../components/ZhenYuanSidebar'
import WuXueCard from '../../components/WuXueCard'
import { IWuXueType, IWuXue, wuXueType, IWuXueCard } from '../../lib/interface'
import { levelList, wuXueTypeMap } from '../../lib/constant'
import { getMainWuXueIndex, calcZhenYuan, calcTotalZhenYuan } from '../../lib/util'
import './index.scss'

export default function Index() {
  const [ totalZhenYuan, setTotalZhenYuan ] = useState<number>(0) // 总真元
  const [ activeLevel, setActiveLevel ] = useState<number>(100) // 当前选择的等级
  const [ menPaiIndex, setMenPaiIndex ] = useState<number>(0) // 当前激活的门派
  const [ sexIndex, setSexIndex ] = useState<number>(0) // 当前激活的性别
  const [ wuXueList, setWuXueList ] = useState<IWuXue[]>([]) // 左侧栏选择的武学列表
  const [ wuXueListWithType, setWuXueListWithType ] = useState<IWuXueType>({}) // 已选中武学中根据武学类型区分的列表
  const [ isShowDrawer, setIsShowDrawer ] = useState<boolean>(false) // 是否展示左侧抽屉

  // 等级以及武学变化之后，更新武学类型列表和总真元值
  useEffect(() => {
    const wLength = wuXueList.length
    if (wLength === 0) {
      setWuXueListWithType({})
      setTotalZhenYuan(0)
      return
    }

    // 重新计算真元值
    const newWuXueListWithType: IWuXueType = {}
    for (const type of Object.keys(wuXueTypeMap)) {
      newWuXueListWithType[type] = handleWuXueList(wuXueList.filter(n => n.Type === type), activeLevel)
    }

    // 重新计算总真元值
    setTotalZhenYuan(calcTotalZhenYuan(newWuXueListWithType))
    setWuXueListWithType(newWuXueListWithType)
  }, [ wuXueList, activeLevel ])

  // 武学选择后触发
  function handleWuXueSelect(wuXue: IWuXue, isActive: boolean) {
    // 深拷贝数组
    const [ ...newWuXueList ] = wuXueList

    if (isActive) {
      // 新增加武学
      newWuXueList.push(wuXue)

    } else {
      // 删除对应武学
      _.remove(newWuXueList, (n: IWuXue) => {
        return n.Id === wuXue.Id
      })
    }
    setWuXueList(newWuXueList)
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
    const [ ...newWuXueList ] = wuXueList

    // 删除对应武学
    _.remove(newWuXueList, (n: IWuXue) => {
      return n.Id === id
    })

    setWuXueList(newWuXueList)
  }

  return (
    <View className='zhenyuan'>
      <AtButton type='primary' onClick={() => setIsShowDrawer(true)}>选择门派</AtButton>
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
            return value.length > 0 ? <WuXueCard key={key} wuXueKey={key} wuXueCardList={value} onDel={handleDel} /> : null
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
