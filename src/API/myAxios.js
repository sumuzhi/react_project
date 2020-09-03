import axios from 'axios'
import qs from 'querystring'
import {message} from "antd"
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//自定义axios实列添加拦截器
const instance = axios.create({
  timeout: 4000
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    nprogress.start()
    // 在发送请求之前做些什么
    /**
     * 在发送请求的时候,axios默认的发送编码为json格式
     * 服务器接收到的编码格式为urlencoding
     * 在此可以利用axios的拦截器将参数进行格式的转化
     * */
    if (config.method.toLowerCase() === 'post') {
      if (config.data instanceof Object) {
        config.data = qs.stringify(config.data)
      }
    }
    // console.log(config)
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    nprogress.done()
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    nprogress.done()
    message.error(error.message)
    return Promise.reject(error);
  });

export default instance