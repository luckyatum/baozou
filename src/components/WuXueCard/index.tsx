import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

import './index.scss'
import { AtIcon } from 'taro-ui'
import { IWuXue, IWuXueCard } from '../../lib/interface'
import { calcZhenYuan, getMainWuXueIndex } from '../../lib/util'
import { wuXueTypeMap } from '../../lib/constant'

interface IProps {
  wuXueKey: string;
  level: number;
  sameWuXueList: IWuXue[];
}

interface IStates {
  wuXueCardList: IWuXueCard[];
}

export default class Index extends Component<IProps, IStates> {

  constructor (props) {
    super(props)

    const { sameWuXueList, level } = props
    console.log('sameWuXueList=', sameWuXueList, level)
    // 初始化武学列表
    this.state = {
      wuXueCardList: this.handleWuXueList(sameWuXueList, level)
    }
  }

  // 处理武学列表
  handleWuXueList(sameWuXueList: IWuXue[], level: number): IWuXueCard[] {
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

  render () {
    const { wuXueKey } = this.props
    const { wuXueCardList } = this.state

    return (
      <View className='wuxue-card-container'>
        <View className='wuxue-card-header'>
          <Text className='card-item' style={{ width: '30%', textIndent: '16px' }}>{wuXueTypeMap[wuXueKey]}武学</Text>
          <Text className='card-item' style={{ width: '10%' }}>主</Text>
          <Text className='card-item' style={{ width: '15%' }}>难度</Text>
          <Text className='card-item' style={{ width: '15%' }}>真元</Text>
          <Text className='card-item' style={{ width: '15%' }}>等级</Text>
          <Text className='card-item' style={{ width: '10%' }}>删</Text>
        </View>
        {
          wuXueCardList.map(w => (
            <View className='wuxue-card-body'>
              <Text className='card-item' style={{ width: '30%', textIndent: '16px' }}>{w.Title}</Text>
              <Text className='card-item' style={{ width: '10%' }}>{w.IsMain ? '✔' : ''}</Text>
              <Text className='card-item' style={{ width: '15%' }}>{w.NanDu}</Text>
              <Text className='card-item' style={{ width: '15%' }}>{w.ZhenYuan}</Text>
              <Text className='card-item' style={{ width: '15%' }}>{w.Level}</Text>
              <AtIcon value='trash' size='18' />
            </View>
          ))
        }
      </View>
    )
  }
}
