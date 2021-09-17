import {
  SET_LOGON,
} from './constants';

const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOGON:
      return {
        ...state,
        ...payload
      }
    default: 
      return state
  }
}