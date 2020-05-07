import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtDrawer, AtButton } from 'taro-ui'

import './index.scss'

interface IState {
  isShowDrawer: boolean;
}

export default class Index extends Component<{}, IState> {

  constructor (props) {
    super(props)

    this.state = {
      isShowDrawer: false // 是否展示左侧抽屉
    }

    this.bindFunc()
  }

  componentWillMount () { }

  componentDidMount () {
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
    navigationBarTitleText: '首页'
  }

  // 绑定函数this
  bindFunc() {
  }

  render () {
    const { isShowDrawer } = this.state

    return (
      <View className='zhenyuan'>
        <AtButton type='primary' onClick={() => this.setState({ isShowDrawer: true })}>选择门派</AtButton>
        <AtDrawer
          show={isShowDrawer}
          mask
          onClose={() => this.setState({ isShowDrawer: false })}
          items={['菜单1', '菜单2']}
        >
        </AtDrawer>
      </View>
    )
  }
}
