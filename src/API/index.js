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
