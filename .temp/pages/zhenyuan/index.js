import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View } from '@tarojs/components';
import { AtDrawer, AtButton } from 'taro-ui';
import ZhenYuanSidebar from "../../components/ZhenYuanSidebar/index";
import './index.scss';
import * as _ from 'lodash';
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
      wuXueList: [],
      isShowDrawer: false // 是否展示左侧抽屉
    };
    this.bindFunc();
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}
  componentDidShow() {}
  componentDidHide() {}
  // 绑定函数this
  bindFunc() {
    this.handleWuXueSelect = this.handleWuXueSelect.bind(this);
  }
  // 武学选择后触发
  handleWuXueSelect(wuXue, isActive) {
    const { wuXueList } = this.state;
    // 深拷贝数组
    const [...newWuXueList] = wuXueList;
    if (isActive) {
      // 新增加武学
      newWuXueList.push(wuXue);
    } else {
      // 删除对应武学
      _.remove(newWuXueList, n => {
        return n.id === wuXue.id;
      });
    }
    // 更新列表
    this.setState({ wuXueList: newWuXueList });
  }
  render() {
    const { isShowDrawer, wuXueList } = this.state;
    return <View className="zhenyuan">
        <AtButton type="primary" onClick={() => this.setState({ isShowDrawer: true })}>选择门派</AtButton>
        <AtDrawer show={isShowDrawer} mask onClose={() => this.setState({ isShowDrawer: false })}>
          <ZhenYuanSidebar wuXueList={wuXueList} handleWuXueSelect={this.handleWuXueSelect} handleClose={() => this.setState({ isShowDrawer: false })} />
        </AtDrawer>
      </View>;
  }
  config = {
    navigationBarTitleText: '首页'
  };
}