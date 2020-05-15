import Taro, { useState, useEffect, showLoading, hideLoading, showToast } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './index.scss'
import { ICang } from '../../lib/interface'
import { Api } from '../../lib/api'
import { cangSearchList, loadingProps, toastDurationConfig } from '../../lib/constant'
import { Store } from '../../lib/store'
import { cangMockList } from '../../lib/mock'

const STORAGE_PREFIX = 'cangJingGe::'
const cangStore = new Store<ICang[]>({ prefix: STORAGE_PREFIX })
export default function Index() {
  const [ zId, setZId ] = useState<string>('92')
  const [ cangList, setCangList ] = useState<ICang[]>([])

  useEffect(() => {
    // 获取缓存内容
    const storeList = cangStore.get(zId)
    if (storeList && storeList.length) {
      setCangList(storeList)
    } else {
      // 重新获取
      // getCangList()
      setCangList(cangMockList)
    }
  }, [ zId ])

  // 获取装备
  async function getCangList() {
    try {
      showLoading(loadingProps)
      // 请求藏经阁数据
      const res = await Taro.request({
        url: Api.getCang,
        method: 'GET',
        dataType: '其他',
        data: { FId: zId , t: Date.now() }
      })
      hideLoading()
      if (res && res.statusCode === 200) {
        // 缓存结果
        cangStore.set(zId, res.data)
        setCangList(res.data)
      } else {
        showToast({
          title: res.errMsg|| '请求失败，再尝试一下吧.',
          icon: 'none',
          duration: toastDurationConfig
        })
      }
    } catch (err) {
      hideLoading()
      showToast({
        title: err.message|| '请求失败，再尝试一下吧~',
        icon: 'none',
        duration: toastDurationConfig
      })
    }
  }

  return (
    <View className='cang'>
      <View className='baozou-header'>暴走英雄坛计算器</View>
      <View className='cang-select-container'>
        {
          cangSearchList.map(z => <View className={`cang-type ${zId === z.id ? 'active' : ''}`} key={z.id} onClick={() => setZId(z.id)}>{z.name}</View>)
        }
      </View>
      <View className='cang-wrapper'>
        {
          cangList.map(c => (
          <AtCard key={c.Id} className='cang-item' title={c.Title} onClick={() => {}}>
            <View className='cang-content'>{c.Text.substr(0, 50)}</View>
          </AtCard>))
        }
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '藏经阁',
}
