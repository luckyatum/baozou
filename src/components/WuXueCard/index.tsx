import Taro from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'

import './index.scss'
import { AtIcon } from 'taro-ui'
import { IWuXueCard } from '../../lib/interface'
import { wuXueTypeMap, levelList } from '../../lib/constant'

interface IProps {
  wuXueKey: string;
  wuXueCardList: IWuXueCard[];
  onLevelChange: (id: string, level: number) => void;
  onDel: (id: string) => void;
}

export default function Index(props: IProps) {
  const { wuXueKey, wuXueCardList } = props
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
        wuXueCardList
        ? wuXueCardList.map(w => (
          <View className='wuxue-card-body' key={w.Id}>
            <Text className='card-item' style={{ width: '30%', textIndent: '16px' }}>{w.Title}</Text>
            <Text className='card-item' style={{ width: '10%' }}>{w.IsMain ? '✔' : ''}</Text>
            <Text className='card-item' style={{ width: '15%' }}>{w.NanDu}</Text>
            <Text className='card-item' style={{ width: '15%' }}>{w.ZhenYuan}</Text>
            <Picker className='card-item' style={{ width: '15%' }} value={w.Level} mode='selector' range={levelList} onChange={(event) => {
              this.props.onLevelChange(w.Id, levelList[event.detail.value])
            }}>
              <Text>{w.Level}</Text>
            </Picker>
            <AtIcon value='trash' size='18' onClick={() => this.props.onDel(w.Id)} />
          </View>
        ))
        : null
      }
    </View>
  )
}
