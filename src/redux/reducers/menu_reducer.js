import {SAVE_TITLE} from '../action_types'

// createSaveTitleAction
export default function createSaveTitleAction(preState = '', action) {
  
  let {type, data} = action
  let newState;
  switch (type) {
    case SAVE_TITLE:
      newState = data
      return newState
    default:
      return preState;
  }
}
