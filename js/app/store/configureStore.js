import { combineReducers, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as reducers from './reducers'
import * as actions from './actions'

const persistConfig = {
  key: 'root',
  storage,
}

export default function configureStore(navigation) {
  const rootReducer = combineReducers({
    ...reducers,
    navigation,
  })

  const storeMiddleware = store => next => action => {
    switch (action.type) {
      case actions.addGoal.TYPE:
      case actions.addMemory.TYPE:
        setTimeout(persistor.flush)
        next(action)
        break
      default:
        next(action)
    }
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer, applyMiddleware(storeMiddleware))
  const persistor = persistStore(store)

  return { store, persistor }
}
