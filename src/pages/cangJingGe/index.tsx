import Taro, { useState, useEffect, showLoading, hideLoading, showToast, useShareAppMessage } from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'
import { AtCard, AtDrawer } from 'taro-ui'
import './index.scss'
import { ICang } from '../../lib/interface'
import { Api } from '../../lib/api'
import { cangSearchList, loadingProps, toastDurationConfig } from '../../lib/constant'
import { Store } from '../../lib/store'
import { Request } from '../../lib/request'
import Header from '../../components/Header'

const STORAGE_PREFIX = 'cangJingGe::'
const cangStore = new Store<ICang[]|ICang>({ prefix: STORAGE_PREFIX })
export default function Index() {
  const [ zId, setZId ] = useState<string>('92')
  const [ cangList, setCangList ] = useState<ICang[]>([])
  const [ isShowDrawer, setIsShowDrawer ] = useState<boolean>(false)
  const [ cId, setCId ] = useState<string>()
  const [ cang, setCang ] = useState<ICang|null>(null)

  useEffect(() => {
    // 获取缓存内容
    const storeList = cangStore.get(zId) as ICang[]
    if (storeList && storeList.length) {
      setCangList(storeList)
    } else {
      // 重新获取
      getCangList()
    }
  }, [ zId ])

  useEffect(() => {
    // 获取缓存内容
    if (!cId) return
    setIsShowDrawer(true)
    const cang = cangStore.get(cId) as ICang
    if (cang) {
      setCang(cang)
    } else {
      // 重新获取
      getCang()
    }
  }, [ cId ])

  useEffect(() => {
    if (!isShowDrawer) {
      setCang(null)
      setCId('')
    }
  }, [ isShowDrawer ])

  useShareAppMessage(() => {
    return {
      title: '各种门派攻略，武功秘籍，尽在藏经阁中',
      path: '/pages/cangJingGe/index'
    }
  })

  // 获取藏经阁列表
  async function getCangList() {
    try {
      showLoading(loadingProps)
      // 请求藏经阁数据
      const res = await Request({
        url: Api.getCang,
        method: 'GET',
        data: { FId: zId , t: Date.now() }
      })
      hideLoading()
      if (res && res.statusCode === 200) {
        // 处理错误的json结果
        const jsonRes = formatJsonData<ICang[]>(res.data)
        // 缓存结果
        if (jsonRes.length > 0) {
          cangStore.set(zId, jsonRes)
        }
        setCangList(jsonRes)
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

  // 获取详细数据
  async function getCang() {
    if (!cId) return
    try {
      showLoading(loadingProps)
      // 请求藏经阁数据
      const res = await Request({
        url: Api.getCang,
        method: 'GET',
        data: { id: cId , t: Date.now() }
      })
      hideLoading()
      if (res && res.statusCode === 200) {
        // 处理错误的json结果
        const jsonRes = formatJsonData<ICang>(res.data)
        // 缓存结果
        cangStore.set(cId, jsonRes)
        setCang(jsonRes)
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

  // 格式化有问题数据，返回json格式数据
  function formatJsonData<T>(data: string): T {
    // 处理错误的json结果
    return JSON.parse(data.replace(/\n|\s/g, ''))
  }

  return (
    <View className='cang'>
      <Header />
      <View className='cang-select-container'>
        {
          cangSearchList.map(z => <View className={`cang-type ${zId === z.id ? 'active' : ''}`} key={z.id} onClick={() => setZId(z.id)}>{z.name}</View>)
        }
      </View>
      <View className='cang-wrapper'>
        {
          cangList.map(c => (
          <AtCard key={c.Id} className='cang-item' title={c.Title} onClick={() => {
            setCId(c.Id)
          }}
          >
            <View className='cang-content'>{c.Text}</View>
          </AtCard>))
        }
      </View>
      <AtDrawer
        show={isShowDrawer}
        mask
        right
        width={'80%'}
        onClose={() => setIsShowDrawer(false)}
      >
        <View className='cang-drawer'>
          <View className='cang-drawer-title'>{cang ? cang.Title : ''}</View>
          <View className='cang-drawer-content'>
            {
              cang ? <RichText nodes={cang.Text} />
              : <View className='no-data'>暂无数据</View>
            }
          </View>
        </View>
      </AtDrawer>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '藏经阁',
}
