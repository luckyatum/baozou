// taro.request封装
import { request } from '@tarojs/taro'

export async function Request(options: request.Option)  {
    return await request(Object.assign(options, {
        header: {
            'x-requested-with': 'servicewechat.com'
        }
    }))
}