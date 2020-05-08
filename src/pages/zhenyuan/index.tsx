import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtDrawer, AtButton } from 'taro-ui'
import ZhenYuanSidebar from '../../components/ZhenYuanSidebar'

import './index.scss'
import { IWuXue } from 'src/lib/interface'
import * as _ from 'lodash'

interface IState {
  wuXueList: IWuXue[];
  isShowDrawer: boolean;
}

export default class Index extends Component<{}, IState> {

  constructor (props) {
    super(props)

    this.state = {
      wuXueList: [], // 左侧栏选择的武学列表
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
    navigationBarTitleText: '首页'
  }

  // 绑定函数this
  bindFunc() {
    this.handleWuXueSelect = this.handleWuXueSelect.bind(this)
  }

  // 武学选择后触发
  handleWuXueSelect(wuXue: IWuXue, isActive: boolean) {
    const { wuXueList } = this.state

    // 深拷贝数组
    const [ ...newWuXueList ] = wuXueList

    if (isActive) {
      // 新增加武学
      newWuXueList.push(wuXue)
    } else {
      // 删除对应武学
      _.remove(newWuXueList, (n: IWuXue) => {
        return n.id === wuXue.id
      })
    }

    // 更新列表
    this.setState({ wuXueList: newWuXueList })
  }

  render () {
    const { isShowDrawer, wuXueList } = this.state

    return (
      <View className='zhenyuan'>
        <AtButton type='primary' onClick={() => this.setState({ isShowDrawer: true })}>选择门派</AtButton>
        <AtDrawer
          show={isShowDrawer}
          mask
          onClose={() => this.setState({ isShowDrawer: false })}
        >
          <ZhenYuanSidebar wuXueList={wuXueList} handleWuXueSelect={this.handleWuXueSelect} handleClose={() => this.setState({ isShowDrawer: false })} />
        </AtDrawer>
      </View>
    )
  }
}
