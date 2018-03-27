import React, { Component } from 'react';
import { Platform, AsyncStorage, Alert,Button,Text,View,StyleSheet } from 'react-native';
import AppNavigator from './js/app/components/AppNavigator'
import {NavigationActions} from "react-navigation";
import configureStore from "./js/app/store/configureStore";
import {Provider, connect} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { Permissions, Constants } from 'expo'
import { AuthSession } from 'expo';
import jwtDecoder from 'jwt-decode';

const initialState = AppNavigator.router.getStateForAction(NavigationActions.init())

export const navigation = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)
  return nextState || state
}

const store = configureStore(navigation)

const enhance = connect(({navigation, appReducer}) => ({navigation,appReducer}))
const ConnectedNavigator = enhance(({dispatch, navigation: state, appReducer}) => (
  <AppNavigator/>
))

const auth0ClientId = 'DtcrA5hcQ0MKW0xC32dIDP81zIAXKEAF';
const auth0Domain = 'https://welldone.eu.auth0.com';

function toQueryString(params) {
  return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
}

export default class App extends Component<{}> {

  state = {
    username: undefined,
  };

  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.isDevice && result.status === 'granted') {
      console.log('Notification permissions granted.')
    }
  }

  _loginWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
    const result = await AuthSession.startAsync({
      authUrl: `${auth0Domain}/authorize` + toQueryString({
        client_id: auth0ClientId,
        response_type: 'token',
        scope: 'openid name',
        redirect_uri: redirectUrl,
      }),
    });

    console.log(result);
    if (result.type === 'success') {
      this.handleParams(result.params);
    }
  }

  handleParams = (responseObj) => {
    debugger
    if (responseObj.error) {
      Alert.alert('Error', responseObj.error_description
        || 'something went wrong while logging in');
      return;
    }


    // fetch(`${auth0Domain}/userinfo?access_token=${responseObj.access_token}`)
    //   .then(response => {
    //     debugger
    //     if (response.status === 200) {
    //       debugger
    //       response.json().then(parsedResponse => {
    //         debugger
    //         const { nickname, email, picture } = parsedResponse
    //
    //         this.setState({ nickname, email, picture });
    //       })
    //     }
    //     else {
    //       console.log('Something went wrong. ErrorCode: ', response.status);
    //     }
    //   })


    const encodedToken = responseObj.id_token;
    const decodedToken = jwtDecoder(encodedToken);
    const username = decodedToken.name;
    debugger
    this.setState({ username });
  }



    render() {
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        title: {
          fontSize: 20,
          textAlign: 'center',
          marginTop: 40,
        },
      });

      return (
      <Provider store={store}>
        {/*<PersistGate loading={null} persistor={store.persistor}>*/}
          <ConnectedNavigator/>
        {/*<View style={styles.container}>*/}
          {/*{this.state.username !== undefined ?*/}
            {/*<Text style={styles.title}>Hi {this.state.username}!</Text>*/}
            {/*:*/}
            {/*<View>*/}
              {/*<Text style={styles.title}>Example: Auth0 login</Text>*/}
              {/*<Button title="Login with Auth0" onPress={this._loginWithAuth0} />*/}
              {/*<Text style={styles.title}>Example: Auth0 force Twitter</Text>*/}
              {/*<Button title="Login with Auth0-Twitter" onPress={this._loginWithAuth0Twitter} />*/}
            {/*</View>*/}
          {/*}*/}
        {/*</View>*/}
        {/*</PersistGate>*/}
      </Provider>
    );
  }
}