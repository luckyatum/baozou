import { setStorageSync, getStorageSync } from '@tarojs/taro'
import { commonPrefix } from './constant';

// 封装客户端缓存Api，需要自己捕获异常
export class Store {
  public key
  public commonKey

  constructor(props) {
    this.key = props.prefix
    this.commonKey = commonPrefix
  }

  get(key: string): string {
    return getStorageSync(`${this.key}${this.commonKey}${key}`)
  }

  set(key: string, value: string) {
    setStorageSync(`${this.key}${this.commonKey}${key}`, value)
  }
}
