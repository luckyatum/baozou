import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'
import { AtSwitch } from 'taro-ui'

interface IProps {
  status: boolean;
  name: string;
  handleToggle?: (isActive: boolean) => void;
}

export default class Index extends Component<IProps, {}> {

  constructor (props) {
    super(props)
  }

  render () {
    const { status, name } = this.props

    return (
      <View className='wuxue-trigger'>
        <AtSwitch
          title={name}
          color='#4cd964'
          checked={status}
          border={false}
          onChange={(value: boolean) => this.props.handleToggle && this.props.handleToggle(value)}
        />
      </View>
    )
  }
}
