import {SAVE_CATEGORY} from '../action_types'

// createSaveCategoryReducer
export default function createSaveCategoryReducer(preState = '', action) {
  
  let {type, data} = action
  let newState;
  switch (type) {
    case SAVE_CATEGORY:
      newState = data
      return newState
    default:
      return preState;
  }
}
