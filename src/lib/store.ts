import { setStorageSync, getStorageSync } from '@tarojs/taro'
import { commonPrefix } from './constant';

interface IProps {
  prefix: string;
}
// 封装客户端缓存Api，需要自己捕获异常
export class Store<T> {
  public key: string;
  public commonKey: string;

  constructor(props: IProps) {
    this.key = props.prefix
    this.commonKey = commonPrefix
  }

  get(key: string): T {
    return getStorageSync(`${this.key}${this.commonKey}${key}`)
  }

  set(key: string, value: T) {
    setStorageSync(`${this.key}${this.commonKey}${key}`, value)
  }
}
