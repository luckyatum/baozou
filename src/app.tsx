import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/zhuangBei/index'

import 'taro-ui/dist/style/index.scss'
import './app.scss'

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/zhenYuan/index',
      'pages/jiChu/index',
      'pages/zhuangBei/index',
      'pages/cangJingGe/index',
      'pages/npc/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      backgroundColor: '#efeff4'
    },
    tabBar: {
      color: "#626567",
      selectedColor: "#6e9eea",
      backgroundColor: "#FBFBFB",
      borderStyle: "white",
      list: [{
        pagePath: "pages/zhenYuan/index",
        text: "真元"
      },
      {
        pagePath: "pages/jiChu/index",
        text: "基础"
      },
      {
        pagePath: "pages/zhuangBei/index",
        text: "装备"
      },
      {
        pagePath: "pages/cangJingGe/index",
        text: "藏经阁"
      },
      {
        pagePath: "pages/npc/index",
        text: "NPC查找"
      }]
    }
  }

  render () {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
