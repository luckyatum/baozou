import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

import './index.scss'
import { AtSwitch } from 'taro-ui'

interface IProps {
  id: string;
  status: boolean;
  name: string;
  handleToggle?: (isActive: boolean) => void;
}

export default class Index extends Component<IProps, {}> {

  constructor (props) {
    super(props)
  }

  render () {
    const { id, status, name } = this.props
    return (
      <View className='wuxue-trigger' key={id}>
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
