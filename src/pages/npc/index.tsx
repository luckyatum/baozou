import Taro, { useState, useEffect, showLoading, hideLoading, showToast, arrayBufferToBase64 } from '@tarojs/taro'
import { View, RichText, Image } from '@tarojs/components'
import { AtSearchBar, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import { IPreview, INpc } from '../../lib/interface'
import { Api } from '../../lib/api'
import { loadingProps, toastDurationConfig } from '../../lib/constant'
import { Request } from '../../lib/request'

export default function Index() {
  const [ searchVal, setSearchVal ] = useState<string>('') // 搜索框值
  const [ previewList, setPreviewList ] = useState<IPreview[]>([]) // 搜索预览列表
  const [ sId, setSId ] = useState<string>('') // 搜索id
  const [ npc, setNpc ] = useState<INpc|null>(null) // NPC列表
  const [ npcImg, setNpcImg ] = useState<string>('') // @todo 小程序没办法请求到富文本中的图片，暂时以这种方式嵌入

  useEffect(() => {
    // 搜索值变化，搜索结果
    if (searchVal) {
      getPreviewList()
    } else {
      setPreviewList([])
    }
  }, [ searchVal ])

  useEffect(() => {
    if (sId) {
      getNpc()
      // 隐藏预览页
      setPreviewList([])
      // 设置搜索值
      // setSearchVal()
    }
  }, [ sId ])

  // 搜索预览列表
  async function getPreviewList() {
    try {
      showLoading(loadingProps)
      // 请求藏经阁数据
      const res = await Request({
        url: Api.getNpc,
        method: 'GET',
        data: { searchText: searchVal , t: Date.now() }
      })
      hideLoading()
      if (res && res.statusCode === 200) {
        setPreviewList(res.data)
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

  // 搜索NPC列表
  async function getNpc() {
    try {
      showLoading(loadingProps)
      // 请求藏经阁数据
      const res = await Request({
        url: Api.getNpc,
        method: 'GET',
        data: { Id: sId , t: Date.now() }
      })
      hideLoading()
      if (res && res.statusCode === 200) {
        const jsonRes = formatJsonData(res.data)
        setNpc(jsonRes)
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

  // input框输入变化
  function handleSearchInput(value) {
    setSearchVal(value)
  }

  // 格式化有问题数据，返回json格式数据
  function formatJsonData(data: string): INpc {
    // 处理错误的json结果
    const triData = data.replace(/\n|\s/g, ' ')
    const parseData: INpc = JSON.parse(triData.replace(/(src=')([^']*)/g, 'delay$1$2'))
    asyncLoadImg(parseData.Text)
    return parseData
  }

  // @todo 备用方案，因为小程序没办法请求到http协议的数据，所以单独拿链接出来，延迟加载图片
  async function asyncLoadImg(text: string) {
    try {

      const reg = /src='([^\']*)/g
      const imgData = reg.exec(text)
      if (imgData && imgData.length > 1) {
        const imgUrl = imgData[1]
        // 预请求图片
        showLoading({
          title: '图片火速加载中...'
        })
        const imgRes = await Request({
          url: `https://cors-anywhere.herokuapp.com/http://bz.hpeng.cn${imgUrl}`,
          responseType: 'arraybuffer',
          method: 'GET'
        })

        if (imgRes && imgRes.statusCode === 200) {
          setNpcImg(`data:image/png;base64,${arrayBufferToBase64(imgRes.data)}`)
        }
      }
    } catch (err) {

    } finally {
      hideLoading()
    }
  }

  return (
    <View className='npc'>
      <View className='baozou-header'>暴走英雄坛计算器</View>
      <View className='npc-search'>
        <AtSearchBar
          value={searchVal}
          placeholder='请输入地名、npc名字或拼音简写，不区分大小写'
          onChange={handleSearchInput}
        />
        <View className='npc-preview'>
          <AtList>
            {
              previewList.map(p => (
                <AtListItem
                  key={p.Id}
                  className='preview-item'
                  title={`[${p.JianMa}] ${p.Name}`}
                  extraText={p.PinYin}
                  arrow='right'
                  onClick={() => setSId(p.Id)}
                />))
            }
          </AtList>
        </View>
      </View>
      <View className='npc-wrapper'>
        {
          npc
          ? <RichText key={npc.Id} nodes={npc.Text} />
          : null
        }
        { npcImg && <Image className='npc-img' src={npcImg} /> }
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '藏经阁',
}
