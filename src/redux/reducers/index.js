import {combineReducers} from "redux";
import createUserInfoSaveAction from "./login_reducer";

export default combineReducers({
  //该对象里的key决定着store里保存该状态的key
  //该对象里的value决定着store里保存该状态的value
  userInfo:createUserInfoSaveAction
})