import * as actions from './actions'
import { AsyncStorage } from "react-native"

export const goals = (state = [], { type, payload }) => {
  switch (type) {
    case actions.addGoal.TYPE:
      return [
        ...state,
        payload
      ]
  }
  return state
}

export const memories = (state = [], { type, payload }) => {
  switch (type) {
    case actions.addMemory.TYPE:
      return [
        ...state,
        payload
      ]
  }
  return state
}