import {SAVE_PRODUCT} from '../action_types'

export const saveProductAction = (value) => {
  /**
   * 将第一次向服务器发送的数据存储在本地的localstore中,实现7天免登录的状态
   * 存入的数据格式为字符串格式,将value中的值要进行类型转换操作
   * */
  return {type: SAVE_PRODUCT, data: value}  //将数据存入redux中
}
