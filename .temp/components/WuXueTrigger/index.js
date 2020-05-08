import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import './index.scss';
import { AtSwitch } from 'taro-ui';
export default class Index extends Taro.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { status, name } = this.props;
    return <View className="wuxue-trigger">
        <AtSwitch title={name} color="#4cd964" checked={status} border={false} onChange={value => this.props.handleToggle && this.props.handleToggle(value)} />
      </View>;
  }
}