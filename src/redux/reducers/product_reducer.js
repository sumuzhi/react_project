import {SAVE_PRODUCT} from '../action_types'

export default function saveProductListAction(preState = '', action) {
  
  let {type, data} = action
  let newState;
  switch (type) {
    case SAVE_PRODUCT:
      newState = [...data]
      return newState
    default:
      return preState;
  }
}
