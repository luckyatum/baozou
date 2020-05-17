import { View } from '@tarojs/components'
import './index.scss'
import { AtButton } from 'taro-ui'

interface IProps {
  onClose?: () => void
}

export default function Index(props: IProps) {
  return <View className='statement'>
    <View className='statement-header'>号外号外！暴走英雄坛新版计算器V1.0.0版上线啦~~</View>
    <View className='main-title'>重要声明</View>
    <View className='list-container'>
      <View>1. 本小程序所有公式以及接口均来自【神机堂】官方网站: http://bz.hpeng.cn/。</View>
      <View>2. 本小程序仅为了便于玩家查阅资料等用途，不包含商业信息。</View>
      <View>3. 由于小程序端限制，因此访问神机堂数据会有些慢，有可能会出现部分数据获取失败的情况，希望各位见谅。</View>
    </View>
    <View className='main-title'>特别感谢</View>
    <View className='list-container'>
      <View>1. 再次感谢神机堂大佬们的贡献，还有@错觉大佬的支持。</View>
    </View>
    <View className='main-title'>补充</View>
    <View className='list-container'>
      <View>1. 本小程序的源码已经在github上开源，欢迎大神们来star、issue或者Pull Request，一起把这个项目做下去。</View>
      <View>2. github地址：https://github.com/luckyatum/baozou</View>
      <View>3. 作者：【混三 欧小白】 2439768801@qq.com</View>
    </View>
    <AtButton type="primary" onClick={props.onClose}>关闭声明</AtButton>
  </View>
}