import { makeAsyncActionCreator, makeActionCreator } from 'redux-toolbelt'

export const addGoal = makeAsyncActionCreator('addGoal')
export const addMemory = makeAsyncActionCreator('addMemory')
export const setUser = makeActionCreator('setUser')
