import Taro, { useState, useEffect, showLoading, hideLoading } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
import './index.scss'
import { IZhuangBei } from '../../lib/interface'
import { Api } from '../../lib/api'
import { zhuangBeiTypeList, loadingProps } from '../../lib/constant'
import { Store } from '../../lib/store'

const STORAGE_PREFIX = 'zhuangBei::'
const zhuangBeiStore = new Store<IZhuangBei[]>({ prefix: STORAGE_PREFIX })
export default function Index() {
  const [ zId, setZId ] = useState<string>('64')
  const [ zhuangBeiList, setZhuangBeiList ] = useState<IZhuangBei[]>([])
  const [ prop, setProp ] = useState<IZhuangBei>({ Name: '', Id: '', Des: '点击武器查看详细说明~', ShuXing: '' })

  useEffect(() => {
    // 获取缓存内容
    const storeList = zhuangBeiStore.get(zId)
    if (storeList && storeList.length) {
      setZhuangBeiList(storeList)
    } else {
      // 重新获取
      getZhuangBei()
    }
  }, [ zId ])

  // 获取装备
  async function getZhuangBei() {
    try {
      showLoading(loadingProps)
      // 请求福地数据
      const res = await Taro.request({
        url: Api.getZhuangBei,
        method: 'GET',
        data: { CId: zId , t: Date.now() }
      })
      if (res && res.statusCode === 200) {
        // 缓存结果
        zhuangBeiStore.set(zId, res.data)
        setZhuangBeiList(res.data)
      } else {
        Taro.atMessage({
          message: res.errMsg|| '请求失败，再尝试一下吧~',
          type: 'error'
        })
      }
    } catch (err) {
      Taro.atMessage({
        message: err.message|| '请求失败，再尝试一下吧~',
        type: 'error'
      })
    } finally {
      hideLoading()
    }
  }

  return (
    <View className='zhuang-bei'>
      <View className='baozou-header'>暴走英雄坛计算器</View>
      <View className='zhuang-bei-intro'>
        <View className='zhuang-bei-head'>
          <View className='zhuang-bei-name'>{ prop && prop.Name }</View>
          <View className='zhuang-bei-prop'>{ prop && prop.ShuXing }</View>
        </View>
        <View className='zhuang-bei-desc'>{ prop && prop.Des }</View>
      </View>
      <View className='zhuang-bei-wrapper'>
        <View className='zhuang-bei-left'>
          {
            zhuangBeiTypeList.map(z => <View className={`zhuang-bei-type ${zId === z.id ? 'active' : ''}`} key={z.id} onClick={() => setZId(z.id)}>{z.name}</View>)
          }
        </View>
        <View className='zhuang-bei-right'>
          {
            zhuangBeiList.map(z => (
            <View key={z.Id} className={`props-item ${prop.Id === z.Id ? 'active' : ''}`} onClick={() => setProp(z)}>
              <View className='props-name'>{z.Name}</View>
              <View className='props-text'>{z.ShuXing}</View>
            </View>))
          }
        </View>
      </View>
      <AtMessage />
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '装备',
}
