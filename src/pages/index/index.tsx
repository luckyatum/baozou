import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import ZhenYuan from '../zhenYuan'
import { IEquipment } from 'src/lib/interface'

import './index.scss'

interface IState {
  equipmentList: IEquipment[];
  current: number;
}

export default class Index extends Component<{}, IState> {

  constructor (props) {
    super(props)

    this.state = {
      equipmentList: [], // 装备列表
      current: 0 // 当前激活的tab
    }

    this.bindFunc()
  }

  componentWillMount () { }

  componentDidMount () {
    // 获取装备
    // this.getEquipment()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    window: {
      backgroundColor: 'red'
    }
  }

  // 绑定函数this
  bindFunc() {
  }

  // 装备
  getEquipment() {
    Taro.request({
      // url: 'https://cors-anywhere.herokuapp.com/http://bz.hpeng.cn/Ajax/AjaxGetZB.aspx?CId=64&t=1588844199131',
      url: 'http://bz.hpeng.cn/Ajax/AjaxGetZB.aspx?CId=64&t=1588844199131',
      success: (res) => {
        console.log(res.data)
        this.setState({ equipmentList: res.data })
      }
    })
  }

  render () {
    const { current } = this.state

    return (
      <View className='index'>
        <AtTabs
          current={current}
          scroll
          tabList={[
            { title: '真元' },
            { title: '基础' },
            { title: '装备' },
            { title: '藏经阁' },
            { title: 'NPC查找' }
          ]}
          onClick={(key: number): void => this.setState({ current: key })}>
          <AtTabsPane current={current} index={0}>
            <ZhenYuan />
          </AtTabsPane>
          <AtTabsPane current={current} index={1}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页二的内容</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={2}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页三的内容</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={3}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页四的内容</View>
          </AtTabsPane>
          <AtTabsPane current={current} index={4}>
            <View style='font-size:18px;text-align:center;height:100px;'>标签页五的内容</View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}
