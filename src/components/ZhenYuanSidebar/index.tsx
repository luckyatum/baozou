import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './index.scss'
import { IWuXue } from 'src/lib/interface'

interface IProps {
    wuXueList: IWuXue[]
    handleClose?: () => void
}

export default class Index extends Component<IProps, {}> {

  constructor (props) {
    super(props)

    this.state = {
    }

    this.bindFunc()
  }

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // 绑定函数this
  bindFunc() {
      this.handleClose.bind(this)
  }

  // 处理关闭按钮事件
  handleClose() {
    this.props.handleClose && this.props.handleClose()
  }

  render () {
    return (
      <View className='wuxue-container'>
        <View className='wuxue-header'>
            <Text className='wuxue-text'>选择门派（可多选）</Text>
            <Text className='wuxue-close-btn' onClick={this.handleClose}>关闭</Text>
        </View>
        <View className='wuxue-body'>
            <View className='wuxue-select-container'>
                {/* 门派 */}
                <View className='wuxue-select-item'>
                    
                </View>
                {/* 性别 */}
                <View className='wuxue-select-item'></View>
            </View>
        </View>
      </View>
    )
  }
}
