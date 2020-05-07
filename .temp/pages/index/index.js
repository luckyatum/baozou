import Nerv from "nervjs";
import Taro, { request as _request } from "@tarojs/taro-h5";
import { View, Text } from '@tarojs/components';
import './index.scss';
export default class Index extends Taro.Component {
  constructor(props) {
    super(props);
    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */

    this.state = {
      equipmentList: [] // 装备列表
    };
  }
  componentWillMount() {}
  componentDidMount() {
    // 获取装备
    this.getEquipment();
  }
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  // 装备
  getEquipment() {
    _request({
      url: 'https://cors-anywhere.herokuapp.com/http://bz.hpeng.cn/Ajax/AjaxGetZB.aspx?CId=64&t=1588844199131',
      success: res => {
        console.log(res.data);
        this.setState({ equipmentList: res.data });
      }
    });
  }
  render() {
    const { equipmentList } = this.state;
    return <View className="index">
        <Text>{JSON.stringify(equipmentList)}</Text>
      </View>;
  }
  config = {
    navigationBarTitleText: '首页'
  };
}