import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'

export default class Index extends Component<{}, {}> {

  constructor (props) {
    super(props)
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
    return <View>装备</View>
  }
}
