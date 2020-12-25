//最核心的管理者
//从redux中引入createStore,用于创建最核心的store对象
import {createStore, applyMiddleware} from 'redux'
//引入redux-thunk 中间件,用来管理异步请求
import thunk from 'redux-thunk';
//引入redux-devtools-extension用于支持开发者调试工具的运行
import {composeWithDevTools} from "redux-devtools-extension";

//引入reducer
import reducers from './reducers/index'

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

//最核心的部分,大多数是固定写法
