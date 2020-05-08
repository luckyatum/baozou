import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'
import { AtSwitch } from 'taro-ui'

interface IProps {
  status: boolean;
  name: string;
  key: string;
  handleToggle?: (isActive: boolean) => void;
}

export default class Index extends Component<IProps, {}> {

  constructor (props) {
    super(props)
  }

  render () {
    const { key, status, name } = this.props

    return (
      <View className='wuxue-trigger' key={key}>
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
