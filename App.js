import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { Provider, connect } from 'react-redux'

import AppNavigator from './js/app/components/AppNavigator'
import configureStore from './js/app/store/configureStore'


const initialState = AppNavigator.router.getStateForAction(NavigationActions.init())

export const navigation = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  return nextState || state
}

const store = configureStore(navigation)

const enhance = connect(({ navigation, appReducer }) => ({ navigation, appReducer }))
const ConnectedNavigator = enhance(({ dispatch, navigation: state, appReducer }) => <AppNavigator />)

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <ConnectedNavigator />
      </Provider>
    )
  }
}
