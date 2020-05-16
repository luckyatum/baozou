import Taro, { useState, useEffect, showLoading, hideLoading, showToast, arrayBufferToBase64 } from '@tarojs/taro'
import { View, RichText, Image } from '@tarojs/components'
import { AtSearchBar, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import { IPreview, INpc } from '../../lib/interface'
import { Api } from '../../lib/api'
import { loadingProps, toastDurationConfig } from '../../lib/constant'
import { Request } from '../../lib/request'
import Header from '../../components/Header'

export default function Index() {
  const [ searchVal, setSearchVal ] = useState<string>('') // 搜索框值
  const [ previewList, setPreviewList ] = useState<IPreview[]>([]) // 搜索预览列表
  const [ sId, setSId ] = useState<string>('') // 搜索id
  const [ npc, setNpc ] = useState<INpc|null>(null) // NPC列表
  const [ npcImgs, setNpcImgs ] = useState<string[]>([]) // @todo 小程序没办法请求到富文本中的图片，暂时以这种方式嵌入

  useEffect(() => {
    if (sId) {
      getNpc()
      // 隐藏预览页
      setPreviewList([])
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
        setSId('')
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
      const imgDatas = text.match(reg)
      if (imgDatas && imgDatas.length > 0) {
        // 预请求图片
        showLoading({
          title: '图片火速加载中...'
        })
        const results = await Promise.all(imgDatas.map(async imgData => {
          return await Request({
            url: `https://cors-anywhere.herokuapp.com/http://bz.hpeng.cn${imgData.substr(5)}`,
            responseType: 'arraybuffer',
            method: 'GET'
          })
        }))

        console.log('results', results)
        // 只保留成功的
        const successResults = results.filter(r => r && r.statusCode === 200)
        // 把其data值付给imgs数组

        setNpcImgs(successResults.map(s => `data:image/png;base64,${arrayBufferToBase64(s.data)}`))
      }
    } catch (err) {
      showToast({
        title: err.message|| '请求失败，再尝试一下吧~',
        icon: 'none',
        duration: toastDurationConfig
      })
    } finally {
      hideLoading()
    }
  }

  return (
    <View className='npc'>
      <Header />
      <View className='npc-search'>
        <AtSearchBar
          value={searchVal}
          placeholder='请输入地名、npc名字或拼音简写，不区分大小写'
          onChange={(value) => setSearchVal(value)}
          onActionClick={getPreviewList}
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
                  onClick={() => {
                    setSearchVal(p.Name)
                    setSId(p.Id)
                  }}
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
        {
          npcImgs.map(n => <Image key={n} mode='aspectFit' className='npc-img' src={n} />)
        }
      </View>
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '藏经阁',
}
