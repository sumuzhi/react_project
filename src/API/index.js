import axios from './myAxios'
import {BASE_URL} from "../config/config";
import jsonp from 'jsonp'
import {message} from "antd";

import {location, AK, APPID} from "../config/config";

//请求登录
export const LoginSend = values => axios.post(`${BASE_URL}/login`, values)

//请求获取分类列表,没有做分页处理
export const categoryInfo = () => axios.get(`${BASE_URL}/manage/category/list`)

//请求增加分类
export const addCategorys = (categoryName) => axios.post(`${BASE_URL}/manage/category/add`, {categoryName})

//根据商品ID获取商品分类信息
export const getInfoForCategoryById = (categoryId) => axios.get(`${BASE_URL}/manage/category/info`, {params: {categoryId}})

//请求修改某一个分类
export const updateOneCategory = (categoryId, categoryName) => axios.post(`${BASE_URL}/manage/category/update`, {
  categoryId,
  categoryName
})

//请求获取商品信息,在服务器进行分页处理
export const getProduct = (pageNum, pageSize) => axios.get(`${BASE_URL}/manage/product/list`, {
  params: {
    pageNum,
    pageSize
  }
})

//请求修改商品状态.status是要更新的状态
export const updateProductStatus = (productId, status) => axios.post(`${BASE_URL}/manage/product/updateStatus`, {
  productId,
  status
})

//根据商品Id获取商品详细信息
export const getProductById = (productId) => axios.get(`${BASE_URL}/manage/product/info`, {params: {productId}})

// 根据商品Id删除商品
export const deleteProductById = (cateGoryId) => axios.get(`${BASE_URL}/manage/category/delete`, {params: {cateGoryId}})

//请求获取天气信息
export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    //http://api.map.baidu.com/weather/v1/?district_id=${location}&ak=${AK}
    jsonp(`https://v0.yiketianqi.com/api?version=v61&appid=${APPID}&appsecret=${AK}&cityid=${location}`, (err, data) => {
      if (err) {
        message.error("天气请求失败,请联系管理员", 1)
        return new Promise(() => {
        })
      } else {
        let weather = data.wea
        let temperature = data.tem
        let weatherObj = {
          temperature, weather
        }
        resolve(weatherObj)
      }
    })
  })
}

//根据Name/desc进行搜索产品分页列表
export const searchProduct = (pageNum, pageSize, productType, keyWord) => axios.get(`${BASE_URL}/manage/product/search`, {
  params: {
    pageNum,
    pageSize,
    [productType]: keyWord
  }
})

//通过文件名删除图片
export const deletePicture = (name) => axios.post(`${BASE_URL}/manage/img/delete`, {name})


//添加商品
export const addProduct = (categoryId, name, desc, price, detail, imgs) => axios.post(`${BASE_URL}/manage/product/add`, {
  categoryId,
  name,
  desc,
  price,
  detail,
  imgs
})

//更新商品
export const updateProduct = (_id, categoryId, name, desc, price, detail, imgs) => axios.post(`${BASE_URL}/manage/product/update`, {
  _id,
  categoryId,
  name,
  desc,
  price,
  detail,
  imgs
})

//得到角色列表
export const getRoleList = () => axios.get(`${BASE_URL}/manage/role/list`)

//新增角色
export const addRole = (roleName) => axios.post(`${BASE_URL}/manage/role/add`, {roleName})

//修改角色权限
export const updateRole = (_id, menus, auth_name) => axios.post(`${BASE_URL}/manage/role/update`, {
  _id,
  menus,
  auth_name,
  auth_time: Date.now()
})

//请求获取所有用户列表
export const getUsersList = () => axios.get(`${BASE_URL}/manage/user/list`)

//删除用户请求
export const deleteUser = (userId) => axios.post(`${BASE_URL}/manage/user/delete`, {userId})

//添加用户请求
export const addUser = (username, password, phone, email, role_id) => axios.post(`${BASE_URL}/manage/user/add`, {
  username,
  password,
  phone,
  email,
  role_id
})
