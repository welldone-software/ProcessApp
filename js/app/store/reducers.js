import * as actions from './actions'

export const goals = (state = [], { type, payload }) => {
  console.log(type, payload)
  switch (type) {
    case actions.addGoal.TYPE:
      return [...state, payload]
    case actions.removeGoal.TYPE:
      return state.filter(item => item.id !== payload.id)
    case actions.updateGoal.TYPE:
      return state.map(item => {
        if (item.id === payload.id) {
          return payload
        }
        return item
      })
    default:
      return state
  }
}

export const memories = (state = [], { type, payload }) => {
  switch (type) {
    case actions.addMemory.TYPE:
      return [...state, payload]
    case actions.removeMemory.TYPE:
      return state.filter(item => item.id !== payload.id)
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
