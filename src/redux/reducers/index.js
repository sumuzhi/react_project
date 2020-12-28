import {combineReducers} from "redux";
import createUserInfoSaveReducer from "./login_reducer";
import createSaveTitleReducer from './menu_reducer'
import saveProductListReducer from "./product_reducer";
import createSaveCategoryReducer from "./category_reducer";

export default combineReducers({
  //该对象里的key决定着store里保存该状态的key
  //该对象里的value决定着store里的 state保存该状态的value
  userInfo: createUserInfoSaveReducer,
  saveTitle: createSaveTitleReducer,
  productList: saveProductListReducer,
  categoryListForRedux: createSaveCategoryReducer
})
