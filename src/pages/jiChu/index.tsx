import Taro, { useState, showModal, showLoading, hideLoading } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtMessage, AtCard, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import { ILearnForm, IDailyForm, IDaily, riChangEnum, IFuDi, enumJoint, ILevelZhenYuan } from '../../lib/interface'
import { Api } from '../../lib/api'
import { calcDaily, jointQianNeng, calcZhenYuanByLevel } from '../../lib/util'
import { loadingProps } from '../../lib/constant'

export default function Index() {
  const [ learnForm, setLearnForm ] = useState<ILearnForm>({
    daiMai: '0',
    nanDu: '1',
  })
  const [ learn, setLearn ] = useState<string>('')
  const [ lZhenYuanForm, setLZhenYuanForm ] = useState<ILevelZhenYuan>({})
  const [ lZhenYuan, setLZhenYuan ] = useState<string>('')
  const [ dailyForm, setDailyForm ] = useState<IDailyForm>({})
  const [ daily, setDaily ] = useState<IDaily>({})
  const [ fuDi, setFuDi ] = useState<IFuDi>({})

  // 提交计算
  async function handleLearnSubmit() {
    try {
      const { wuXing: wx = '', nanDu: nd = '', daiMai: dm = '', start = '', end = '' } = learnForm
      showLoading(loadingProps)
      const res = await Taro.request({
        url: Api.getLearnQianNeng,
        method: 'GET',
        data: { wx, nd, dm, start, end, t: Date.now() }
      })
      if (res && res.statusCode === 200) {
        setLearn(String(res.data))
      } else {
        Taro.atMessage({
          message: res.errMsg|| '请求失败，再尝试一下吧~',
          type: 'error'
        })
      }
    } catch (err) {
      Taro.atMessage({
        message: err.toString() || '请求失败，再尝试一下吧~',
        type: 'error',
      })
    } finally {
      hideLoading()
    }
  }

  // 计算等级对应真元
  function handleLZhenYuanSubmit() {
    const zhenYuan = calcZhenYuanByLevel(Number(lZhenYuanForm.level || 0), Number(lZhenYuanForm.nanDu || 0))
    setLZhenYuan(String(zhenYuan))
  }

  // 提交每日获得潜能
  async function handleDailySubmit() {
    if (!dailyValidate(dailyForm)) return false

    try {
      showLoading(loadingProps)
      const { highestLevel, fuDi } = dailyForm as { highestLevel: string; fuDi: string; }
      // 计算日常数据
      const daily = getDailyObj(Number(highestLevel))

      // 请求福地数据
      const res = await Taro.request({
        url: Api.getFuDi,
        method: 'GET',
        data: { Lv: fuDi , t: Date.now() }
      })
      if (res && res.statusCode === 200) {
        const { _baoxiang: baoXiang, _huanchen: huanChen, _jingyan: jingYan, _qianneng: qianNeng, _yinliang: yinLiang } = res.data
        setDaily(daily)
        setFuDi({ baoXiang, huanChen, jingYan, qianNeng, yinLiang })
      } else {
        Taro.atMessage({
          message: res.errMsg|| '请求失败，再尝试一下吧~',
          type: 'error'
        })
      }
    } catch (err) {
      Taro.atMessage({
        message: err.toString() || '请求失败，再尝试一下吧~',
        type: 'error',
      })
    } finally {
      hideLoading()
    }
  }

  // 获取日常潜能
  function getDailyObj(highestLevelNum: number): IDaily {

    // 计算每日潜能
    const dailyQianNeng: IDaily = {
      baoXiang: calcDaily(highestLevelNum, 1) * riChangEnum.baoXiang,
      qiRen: calcDaily(highestLevelNum, 1) * riChangEnum.qiRen,
      yaBiao: calcDaily(highestLevelNum, 8) * riChangEnum.yaBiao,
      siDa: calcDaily(highestLevelNum, 4) * riChangEnum.siDa,
      weiHuShan: 2200 * riChangEnum.weiHuShan,
      haiDao: (1500 + 600 * 6) * riChangEnum.haiDao,
      anHao: calcDaily(highestLevelNum, 1) * riChangEnum.anHao,
      weiTuo: calcDaily(highestLevelNum, 5) * riChangEnum.weiTuo,
    }

    // 计算非会员合计潜能
    dailyQianNeng.total = Object.values(dailyQianNeng).reduce((prev, cur) => {
      return prev + cur
    }, 0)
    // 添加会员潜能
    const huiDailyQianNeng: IDaily = {
      huiWeiHuShan: 2200 * riChangEnum.huiWeiHuShan,
      huiHaiDao: (1500 + 600 * 6) * riChangEnum.huiHaiDao,
      huiFeiGe: calcDaily(highestLevelNum, 2) * riChangEnum.huiFeiGe
    }

    huiDailyQianNeng.huiTotal = Object.values(huiDailyQianNeng).reduce((prev, cur) => {
      return prev + cur
    }, 0)
    return Object.assign(dailyQianNeng, huiDailyQianNeng)
  }

  // 验证输入
  function dailyValidate(daily: IDailyForm): boolean {
    const { highestLevel, fuDi } = daily
    if (!highestLevel || (Number(highestLevel) < 1) || Number(highestLevel) > 500) {
      Taro.atMessage({
        message: '请输入1-500最高武学等级~',
        type: 'error'
      })
      return false
    } else if (!fuDi || (Number(fuDi) < 0) || Number(fuDi) > 50) {
      Taro.atMessage({
        message: '请输入0-50福地层数~',
        type: 'error'
      })
      return false
    }
    return true
  }

  return (
    <View className='jichu'>
      <View className='baozou-header'>暴走英雄坛计算器</View>
      <View className='jichu-form-item'>
        <View className='jichu-form-header'>技能学习潜能计算（基础武学难度是1）</View>
        <AtForm
          onSubmit={handleLearnSubmit}
        >
          <AtInput
            name='value'
            title='人物悟性'
            type='text'
            placeholder='请输入人物悟性'
            value={learnForm.wuXing || ''}
            onChange={(value) => setLearnForm(Object.assign(learnForm, { wuXing: value }))}
          />
          <AtInput
            name='value'
            title='武学难度'
            type='text'
            placeholder='请输入武学难度'
            value={learnForm.nanDu || ''}
            onChange={(value) => setLearnForm(Object.assign(learnForm, { nanDu: value }))}
          />
          <AtInput
            name='value'
            title='带脉减免'
            type='text'
            placeholder='请输入带脉减免'
            value={learnForm.daiMai || ''}
            onChange={(value) => setLearnForm(Object.assign(learnForm, { daiMai: value }))}
          />
          <AtInput
            name='value'
            title='起始等级'
            type='text'
            placeholder='请输入起始等级'
            value={learnForm.start || ''}
            onChange={(value) => setLearnForm(Object.assign(learnForm, { start: value }))}
          />
          <AtInput
            name='value'
            title='目标等级'
            type='text'
            placeholder='请输入目标等级'
            value={learnForm.end || ''}
            onChange={(value) => setLearnForm(Object.assign(learnForm, { end: value }))}
          />
          <AtButton formType='submit' type='primary'>计算</AtButton>
        </AtForm>
        <View className='jichu-result'>所需潜能：{learn}</View>
      </View>
      <View className='jichu-form-item'>
        <View className='jichu-form-header'>计算武学等级对应真元</View>
        <AtForm
          onSubmit={handleLZhenYuanSubmit}
        >
          <AtInput
            name='value'
            title='武学等级'
            type='text'
            placeholder='请输入武学等级'
            value={lZhenYuanForm.level || ''}
            onChange={(value) => setLZhenYuanForm(Object.assign(lZhenYuanForm, { level: value }))}
          />
          <AtInput
            name='value'
            title='武学难度'
            type='text'
            placeholder='请输入武学难度'
            value={lZhenYuanForm.nanDu || ''}
            onChange={(value) => setLZhenYuanForm(Object.assign(lZhenYuanForm, { nanDu: value }))}
          />
          <AtButton formType='submit' type='primary'>计算</AtButton>
        </AtForm>
        <View className='jichu-result'>获得真元：{lZhenYuan}</View>
      </View>
      <View className='jichu-form-item'>
        <View className='jichu-form-header'>计算每日获得潜能（不包含青龙和木桩）</View>
        <AtForm
          onSubmit={handleDailySubmit}
        >
          <AtInput
            name='value'
            title='最高武学等级'
            type='number'
            placeholder='请输入最高武学等级'
            value={dailyForm.highestLevel || ''}
            onChange={(value) => setDailyForm(Object.assign(dailyForm, { highestLevel: value }))}
          />
          <AtInput
            name='value'
            title='福地层数'
            type='number'
            placeholder='请输入福地层数'
            value={dailyForm.fuDi || ''}
            onChange={(value) => setDailyForm(Object.assign(dailyForm, { fuDi: value }))}
          />
          <AtButton formType='submit' type='primary'>计算</AtButton>
        </AtForm>
        <AtCard
          className='jichu-card-container'
          note='可能跟实际数值有出入.'
          title='每日获得潜能'
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='总潜能:'
              extraText={String((daily.total || 0) + (daily.huiTotal || 0) + (fuDi.qianNeng || 0))}
              hasBorder={false}
              onClick={() => showModal({
                title: '总潜能详细分布',
                content: jointQianNeng(enumJoint.TOTAL, daily, fuDi)
              })}
            />
            <AtListItem
              title='会员获得潜能:'
              extraText={String((daily.total || 0) + (daily.huiTotal || 0))}
              hasBorder={false}
              onClick={() => showModal({
                title: '会员潜能详细分布',
                content: jointQianNeng(enumJoint.HUI_TOTAL, daily, fuDi)
              })}
            />
            <AtListItem
              title='非会员获得潜能:'
              extraText={String(daily.total || 0)}
              hasBorder={false}
              onClick={() => showModal({
                title: '非会员潜能详细分布',
                content: jointQianNeng(enumJoint.FEI_TOTAL, daily, fuDi)
              })}
            />
            <AtListItem
              title='福地获得潜能:'
              extraText={String(fuDi.qianNeng || 0)}
              hasBorder={false}
              onClick={() => showModal({
                title: '福地奖励详细分布',
                content: jointQianNeng(enumJoint.FUDI, daily, fuDi)
              })}
            />
          </AtList>
        </AtCard>
      </View>
      <AtMessage />
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '基础',
}
