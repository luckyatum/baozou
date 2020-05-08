import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Text } from '@tarojs/components';
import './index.scss';
export default class Index extends Taro.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.bindFunc();
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  // 绑定函数this
  bindFunc() {
    this.handleClose.bind(this);
  }
  // 处理关闭按钮事件
  handleClose() {
    this.props.handleClose && this.props.handleClose();
  }
  render() {
    return <View className="wuxue-container">
        <View className="wuxue-header">
            <Text className="wuxue-text">选择门派（可多选）</Text>
            <Text className="wuxue-close-btn" onClick={this.handleClose}>关闭</Text>
        </View>
        <View className="wuxue-body">
            <View className="wuxue-select-container">
                
                <View className="wuxue-select-item">
                    
                </View>
                
                <View className="wuxue-select-item"></View>
            </View>
        </View>
      </View>;
  }
}