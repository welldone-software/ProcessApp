import { makeAsyncActionCreator, makeActionCreator } from 'redux-toolbelt'

export const addGoal = makeAsyncActionCreator('addGoal')
export const updateGoal = makeAsyncActionCreator('updateGoal')
export const removeGoal = makeAsyncActionCreator('removeGoal')
export const addMemory = makeAsyncActionCreator('addMemory')
export const removeMemory = makeAsyncActionCreator('removeMemory')
export const setUser = makeActionCreator('setUser')
