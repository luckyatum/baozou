import Nerv from "nervjs";
import Taro from "@tarojs/taro-h5";
import { View, Text, Picker, ScrollView } from '@tarojs/components';
import './index.scss';
import { menPaiList, sexList, allWuXueList } from '../../lib/constant';
import WuXueTrigger from "../WuXueTrigger/index";
const initMenPaiIndex = 0;
const initSexIndex = 0;
export default class Index extends Taro.Component {
  constructor(props) {
    super(props);
    // 获取初始化选择的门派
    const menPaiKey = menPaiList[initMenPaiIndex];
    // 获取初始化选择的性别
    const sexKey = sexList[initSexIndex];
    this.state = {
      menPaiIndex: initMenPaiIndex,
      sexIndex: initSexIndex,
      renderWuXueList: this.filterWuXueList(menPaiKey, sexKey),
      activeWuXueIds: props.wuXueList.map(w => w.Id)
    };
    this.bindFunc();
  }
  componentWillMount() {}
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    const { wuXueList: prevWuXueList } = prevProps;
    const { wuXueList } = this.props;
    if (prevWuXueList.length !== wuXueList.length) {
      // 更新了选择的武学列表，所以更新数据
      this.setState({ activeWuXueIds: wuXueList.map(w => w.Id) });
    }
  }
  // 绑定函数this
  bindFunc() {
    this.handleClose = this.handleClose.bind(this);
    this.filterWuXueList = this.filterWuXueList.bind(this);
  }
  // 处理关闭按钮事件
  handleClose() {
    this.props.handleClose && this.props.handleClose();
  }
  // 根据门派和性别过滤武学
  filterWuXueList(menPaiKey, sexKey) {
    return allWuXueList.filter(a => {
      console.log(menPaiKey, sexKey, a.MenPai === '江湖', a.MenPai === menPaiKey, a.Sex.includes(sexKey));
      return (a.MenPai === '江湖' || a.MenPai === menPaiKey) && a.Sex.includes(sexKey);
    });
  }
  render() {
    const { menPaiIndex, sexIndex, renderWuXueList, activeWuXueIds } = this.state;
    return <View className="wuxue-container">
        <View className="wuxue-header">
          <Text className="wuxue-text">选择门派（可多选）</Text>
          <Text className="wuxue-close-btn" onClick={this.handleClose}>关闭</Text>
        </View>
        <View className="wuxue-body">
          <View className="select-container">
            
            <Picker className="select-item" value={menPaiIndex} mode="selector" range={menPaiList} onChange={event => {
            this.setState({ menPaiIndex: event.detail.value });
          }}>
                <Text>门派：</Text>
                <Text className="select-trigger">{menPaiList[menPaiIndex]}</Text>
            </Picker>
            
            <Picker className="select-item" value={sexIndex} mode="selector" range={sexList} onChange={event => {
            this.setState({ sexIndex: event.detail.value });
          }}>
                <Text>性别：</Text>
                <Text className="select-trigger">{sexList[sexIndex]}</Text>
            </Picker>
          </View>
          <ScrollView className="scroll-container" scrollY scrollWithAnimation>
            {renderWuXueList.map(r => <WuXueTrigger status={activeWuXueIds.includes(r.Id)} name={r.Title} handleToggle={isActive => this.props.handleWuXueSelect(r, isActive)} />)}
          </ScrollView>
        </View>
      </View>;
  }
}