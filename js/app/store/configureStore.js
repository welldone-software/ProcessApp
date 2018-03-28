import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import * as reducers from './reducers'

const persistConfig = {
  key: 'root',
  storage,
}

export default function configureStore(navigation) {
  const rootReducer = combineReducers({
    ...reducers,
    navigation,
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store = createStore(persistedReducer)
  const persistor = persistStore(store)

  return { store, persistor }
}
