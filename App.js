import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { I18nManager } from 'react-native'
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import SplashScreen from 'react-native-splash-screen'
import AppNavigator from './js/app/components/AppNavigator'
import configureStore from './js/app/store/configureStore'

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init())

export const navigation = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  return nextState || state
}

const { store, persistor } = configureStore(navigation)

const enhance = connect(({ navigation, appReducer }) => ({ navigation, appReducer }))
const ConnectedNavigator = enhance(({ dispatch, navigation: state, appReducer }) => <AppNavigator />)

I18nManager.allowRTL(false)

export default class App extends Component<{}> {
  componentDidMount() {
    setTimeout(() => SplashScreen.hide(), 500)
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ConnectedNavigator />
        </PersistGate>
      </Provider>
    )
  }
}
