import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, ScrollView } from '@tarojs/components'

import './index.scss'
import { IWuXue } from 'src/lib/interface'
import { menPaiList, sexList, allWuXueList } from '../../lib/constant'
import WuXueTrigger from '../WuXueTrigger'

interface IProps {
  menPaiIndex: number;
  sexIndex: number;
  wuXueList: IWuXue[];
  handleWuXueSelect: (wuXue: IWuXue, isActive: boolean) => void;
  handleChange: (menPaiIndex: number, sexIndex: number) => void;
  handleClose?: () => void;
}

interface IState {
  renderWuXueList: IWuXue[];
  activeWuXueIds: string[];
}

export default class Index extends Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    // 获取初始化选择的门派
    const menPaiKey: string = menPaiList[props.menPaiIndex]
    // 获取初始化选择的性别
    const sexKey: string = sexList[props.sexIndex]

    this.state = {
      renderWuXueList: this.filterWuXueList(menPaiKey, sexKey), // 渲染在左侧的武学列表
      activeWuXueIds: props.wuXueList ? props.wuXueList.map((w: IWuXue) => w.Id) : []
    }

    this.bindFunc()
  }

  componentWillMount () { }

  componentDidMount () {
  }

  componentDidUpdate (prevProps: IProps) {
    const { wuXueList: prevWuXueList } = prevProps
    const { wuXueList } = this.props

    if (prevWuXueList.length !== wuXueList.length) {
        // 更新了选择的武学列表，所以更新数据
        this.setState({ activeWuXueIds: wuXueList.map((w: IWuXue) => w.Id) })
    }
  }

  // 绑定函数this
  bindFunc() {
    this.handleClose = this.handleClose.bind(this)
    this.filterWuXueList = this.filterWuXueList.bind(this)
  }

  // 处理关闭按钮事件
  handleClose() {
    this.props.handleClose && this.props.handleClose()
  }

  // 根据门派和性别过滤武学
  filterWuXueList(menPaiKey: string, sexKey: string): IWuXue[] {
      const filterList = allWuXueList.filter((a: IWuXue) => {
          return (a.MenPai === '江湖' || a.MenPai === menPaiKey) && (a.Sex.includes(sexKey))
      })
      return filterList
  }

  render () {
    const { renderWuXueList, activeWuXueIds } = this.state
    const { menPaiIndex, sexIndex } = this.props
    const menPaiKey = menPaiList[menPaiIndex]
    const sexKey = sexList[sexIndex]

    return (
      <View className='wuxue-container'>
        <View className='wuxue-header'>
          <Text className='wuxue-text'>选择门派（可多选）</Text>
          <Text className='wuxue-close-btn' onClick={this.handleClose}>关闭</Text>
        </View>
        <View className='wuxue-body'>
          <View className='select-container'>
            {/* 门派 */}
            <Picker className='select-item' value={menPaiIndex} mode='selector' range={menPaiList} onChange={(event) => {
                const curIndex: number = event.detail.value as number
                this.props.handleChange(curIndex, sexIndex)
                this.setState({ renderWuXueList: this.filterWuXueList(menPaiList[curIndex], sexKey) })
            }}>
                <Text>门派：</Text>
                <Text className='select-trigger'>{menPaiList[menPaiIndex]}</Text>
            </Picker>
            {/* 性别 */}
            <Picker className='select-item' value={sexIndex} mode='selector' range={sexList} onChange={(event) => {
                const curIndex: number = event.detail.value as number
                this.props.handleChange(menPaiIndex, curIndex)
                this.setState({ renderWuXueList: this.filterWuXueList(menPaiKey, sexList[curIndex]) })
            }}>
                <Text>性别：</Text>
                <Text className='select-trigger'>{sexList[sexIndex]}</Text>
            </Picker>
          </View>
          <View
            className='scroll-container'
          >
            {
              renderWuXueList.map((r: IWuXue) =>
                <WuXueTrigger
                  id={r.Id}
                  key={r.Id}
                  status={activeWuXueIds.includes(r.Id)}
                  name={r.Title}
                  handleToggle={(isActive: boolean) => this.props.handleWuXueSelect(r, isActive)}
                />)
            }
          </View>
        </View>
      </View>
    )
  }
}
