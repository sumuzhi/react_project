import {SAVE_USER_INFO, DELETE_USER_INFO} from '../action_types'

export const createSaveUserInfoAction = (value) => {
  /**
   * 将第一次向服务器发送的数据存储在本地的localstore中,实现7天免登录的状态
   * 存入的数据格式为字符串格式,将value中的值要进行类型转换操作
   * */
  localStorage.setItem('user', JSON.stringify(value.user))
  localStorage.setItem('token', value.token)
  localStorage.setItem('isLogin', true)
  return {type: SAVE_USER_INFO, data: value}  //将数据存入redux中
}

export const createDeleteUserInfoAction = () => {
  localStorage.removeItem('user')   //清除本地数据
  localStorage.removeItem('token')
  return {type: DELETE_USER_INFO}    //调用方法清除redux中存入的数据
}