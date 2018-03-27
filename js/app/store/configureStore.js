import { combineReducers, createStore } from 'redux'
import { goals, memories } from './reducers'

export default function configureStore(navigation) {
  const rootReducer = combineReducers({
    goals,
    memories,
    navigation,
  })

  const store = createStore(rootReducer)

  return store
}
