import { View, Text } from '@tarojs/components'
import './index.scss'
import { AtIcon, AtDrawer } from 'taro-ui'
import { useState, useEffect } from '@tarojs/taro'
import Statement from '../Statement'
import { Store } from '../../lib/store'

const STORAGE_PREFIX = 'initData-statement::'
const statementStore = new Store<boolean>({ prefix: STORAGE_PREFIX })

export default function Index() {
  const hasInit = statementStore.get('hasInit')

  const [ isShowShengMing, setIsShowShengMing ] = useState<boolean>(!hasInit) // 是否展示声明
  useEffect(() => {
    if (!hasInit) {
      statementStore.set('hasInit', true)
    }
  }, [])

  return <View className='baozou-header'>
    <Text>暴走英雄坛计算器(神机堂)</Text>
    <View className='baozou-icon' onClick={() => setIsShowShengMing(true)}><AtIcon value='help' size='16' color='#fff'></AtIcon></View>
    <AtDrawer
      show={isShowShengMing}
      right
      width={'100%'}
      onClose={() => setIsShowShengMing(false)}
    >
      <Statement onClose={() => setIsShowShengMing(false)} />
    </AtDrawer>
  </View>
}