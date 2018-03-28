import * as actions from './actions'

export const goals = (state = [], { type, payload }) => {
  switch (type) {
    case actions.addGoal.TYPE:
      return [...state, payload]
    default:
      return state
  }
}

export const memories = (state = [], { type, payload }) => {
  switch (type) {
    case actions.addMemory.TYPE:
      return [...state, payload]
    default:
      return state
  }
}

export const user = (state = '', { type, payload }) => {
  switch (type) {
    case actions.setUser.TYPE:
      return payload
    default:
      return state
  }
}
