import Taro, { useState, useEffect } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'

import './index.scss'
import { IWuXue } from 'src/lib/interface'
import { menPaiList, sexList, allWuXueList } from '../../lib/constant'
import WuXueTrigger from '../WuXueTrigger'

interface IProps {
  menPaiIndex: number;
  sexIndex: number;
  wuXueList: IWuXue[];
  handleWuXueSelect: (wuXue: IWuXue, isActive: boolean) => void;
  handleChange: (menPaiIndex: number, sexIndex: number) => void;
  handleClose?: () => void;
}

export default function Index(props: IProps) {
  const { menPaiIndex, sexIndex } = props
  // 获取选择的门派
  const menPaiKey = menPaiList[menPaiIndex]
  // 获取选择的性别
  const sexKey = sexList[sexIndex]

  const [ renderWuXueList, setRenderWuXueList ] = useState<IWuXue[]>(filterWuXueList(menPaiKey, sexKey)) // 渲染在左侧的武学列表
  const [ activeWuXueIds, setActiveWuXueIds ] = useState<string[]>(props.wuXueList ? props.wuXueList.map((w: IWuXue) => w.Id) : []) // 渲染在左侧的武学列表

  useEffect(() => {
    setActiveWuXueIds(props.wuXueList.map((w: IWuXue) => w.Id))
  }, [ props.wuXueList ])

  // 处理关闭按钮事件
  function handleClose() {
    props.handleClose && props.handleClose()
  }

  // 根据门派和性别过滤武学
  function filterWuXueList(menPaiKey: string, sexKey: string): IWuXue[] {
      const filterList = allWuXueList.filter((a: IWuXue) => {
          return (a.MenPai === '江湖' || a.MenPai === menPaiKey) && (a.Sex.includes(sexKey))
      })
      return filterList
  }

  return (
    <View className='wuxue-container'>
      <View className='wuxue-header'>
        <Text className='wuxue-text'>选择门派（可多选）</Text>
        <Text className='wuxue-close-btn' onClick={handleClose}>关闭</Text>
      </View>
      <View className='wuxue-body'>
        <View className='select-container'>
          {/* 门派 */}
          <Picker className='select-item' value={menPaiIndex} mode='selector' range={menPaiList} onChange={(event) => {
              const curIndex: number = event.detail.value as number
              props.handleChange(curIndex, sexIndex)
              setRenderWuXueList(filterWuXueList(menPaiList[curIndex], sexKey))
          }}>
              <Text>门派：</Text>
              <Text className='select-trigger'>{menPaiList[menPaiIndex]}</Text>
          </Picker>
          {/* 性别 */}
          <Picker className='select-item' value={sexIndex} mode='selector' range={sexList} onChange={(event) => {
              const curIndex: number = event.detail.value as number
              props.handleChange(menPaiIndex, curIndex)
              setRenderWuXueList(filterWuXueList(menPaiList[curIndex], sexKey))
          }}>
              <Text>性别：</Text>
              <Text className='select-trigger'>{sexList[sexIndex]}</Text>
          </Picker>
        </View>
        <View
          className='scroll-container'
        >
          {
            renderWuXueList.map((r: IWuXue) =>
              <WuXueTrigger
                id={r.Id}
                key={r.Id}
                status={activeWuXueIds.includes(r.Id)}
                name={r.Title}
                handleToggle={(isActive: boolean) => props.handleWuXueSelect(r, isActive)}
              />)
          }
        </View>
      </View>
    </View>
  )
}
