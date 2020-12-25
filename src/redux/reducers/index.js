import {combineReducers} from "redux";
import createUserInfoSaveAction from "./login_reducer";
import createSaveTitleAction from './menu_reducer'
import saveProductListAction from "./product_reducer";
import createSaveCategoryReducer from "./category_reducer";

export default combineReducers({
  //该对象里的key决定着store里保存该状态的key
  //该对象里的value决定着store里的 state保存该状态的value
  userInfo: createUserInfoSaveAction,
  saveTitle: createSaveTitleAction,
  productList: saveProductListAction,
  categoryList: createSaveCategoryReducer
})
