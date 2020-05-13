import Taro, { useState, useEffect } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import * as _ from 'lodash'
import './index.scss'
import { IZhuangBei } from '../../lib/interface'
import { Api } from '../../lib/api'
import {  } from '../../lib/util'

export default function Index() {
  const [ zId, setZId ] = useState<string>('64')
  const [ zhuanBeiList, setZhuangBeiList ] = useState<IZhuangBei[]>([])
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  useEffect(() => {
    getZhuangBei()
  }, [ zId ])

  // 获取装备
  async function getZhuangBei() {
    try {
      setIsLoading(true)
      // 请求福地数据
      const res = await Taro.request({
        url: Api.getZhuangBei,
        method: 'GET',
        data: { CId: zId , t: Date.now() }
      })
      if (res && res.statusCode === 200) {
        setZhuangBeiList(res.data)
      } else {
        Taro.atMessage({
          message: res.errMsg|| '请求失败，再尝试一下吧~',
          type: 'error'
        })
      }
    } catch (err) {

    } finally {
      setIsLoading(false)
    }
  }
  return (
    <View className='zhuang-bei'>
      <View className='baozou-header'>暴走英雄坛计算器</View>

      <AtMessage />
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '装备',
}
