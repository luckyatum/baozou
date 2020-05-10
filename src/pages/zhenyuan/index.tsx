import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtDrawer, AtButton, AtTag } from 'taro-ui'
import * as _ from 'lodash'
import ZhenYuanSidebar from '../../components/ZhenYuanSidebar'
import WuXueCard from '../../components/WuXueCard'
import { IWuXueType, IWuXue } from '../../lib/interface'
import { levelList } from '../../lib/constant'
import './index.scss'

interface IState {
  activeLevel: number;
  menPaiIndex: number;
  sexIndex: number;
  wuXueList: IWuXue[];
  wuXueListWithType: IWuXueType;
  isShowDrawer: boolean;
}

export default class Index extends Component<{}, IState> {

  constructor (props) {
    super(props)

    this.state = {
      activeLevel: 100, // 当前选择的等级
      menPaiIndex: 0, // 当前激活的门派
      sexIndex: 0, // 当前激活的性别
      wuXueList: [], // 左侧栏选择的武学列表
      wuXueListWithType: {}, // 已选中武学中根据武学类型区分的列表
      isShowDrawer: false // 是否展示左侧抽屉
    }

    this.bindFunc()
  }

  componentWillMount () { }

  componentDidMount () {
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '真元',
  }

  // 绑定函数this
  bindFunc() {
    this.handleWuXueSelect = this.handleWuXueSelect.bind(this)
  }

  // 武学选择后触发
  handleWuXueSelect(wuXue: IWuXue, isActive: boolean) {
    const { wuXueList, wuXueListWithType } = this.state

    // 深拷贝数组
    const [ ...newWuXueList ] = wuXueList

    if (isActive) {
      // 新增加武学
      newWuXueList.push(wuXue)
    } else {
      // 删除对应武学
      _.remove(newWuXueList, (n: IWuXue) => {
        return n.Id === wuXue.Id
      })
    }

    // 更新对应类型武学列表
    newWuXueList.forEach(n => {
      const { Type } = n

      if (wuXueListWithType[Type]) {
        wuXueListWithType[Type].push(n)
      } else {
        wuXueListWithType[Type] = [n]
      }
    })

    // 更新列表
    this.setState({ wuXueList: newWuXueList, wuXueListWithType: Object.assign({}, wuXueListWithType) })
  }

  // 等级更新触发
  handleLevelChange = ({ name, active }) {
    if (!active) {
      // 当前未激活，则更新当前等级为该等级
      this.setState({ activeLevel: Number(name) })
    }
  }

  render () {
    const { isShowDrawer, wuXueList, menPaiIndex, sexIndex, activeLevel } = this.state
    console.log('wuXueList=', wuXueList)
    return (
      <View className='zhenyuan'>
        <AtButton type='primary' onClick={() => this.setState({ isShowDrawer: true })}>选择门派</AtButton>
        <View className='zhenyuan-level-container'>
          {
            levelList.map(level => <AtTag type='primary' key={level} active={level === activeLevel} name={String(level)} onClick={this.handleLevelChange}>{level}</AtTag>)
          }
        </View>
        <View className='zhenyuan-preview-container'>
          <Text className='zhenyuan-preview-text'>返还真元: {1100}</Text>
        </View>
        {
          wuXueList.length > 0
            ? <WuXueCard level={activeLevel} wuXueKey={wuXueList[0].Type} sameWuXueList={wuXueList} />
            : null
        }
        <AtDrawer
          show={isShowDrawer}
          mask
          onClose={() => this.setState({ isShowDrawer: false })}
        >
          <ZhenYuanSidebar
            menPaiIndex={menPaiIndex}
            sexIndex={sexIndex}
            wuXueList={wuXueList}
            handleWuXueSelect={this.handleWuXueSelect}
            handleClose={() => this.setState({ isShowDrawer: false })}
            handleChange={(menPaiIndex, sexIndex) => this.setState({ menPaiIndex, sexIndex })}
          />
        </AtDrawer>
      </View>
    )
  }
}
