// import { AuthSession } from 'expo'
import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Text, View, Platform } from 'react-native'
import Auth0 from 'react-native-auth0'
import config from '../config'
import { setUser } from '../store/actions'

const auth0 = new Auth0({ domain: config.auth0Domain, clientId: config.authClientId })

class AuthScreen extends React.Component {
  componentWillMount() {
    if (this.props.user) {
      this.goToApp()
    }
  }

  goToApp() {
    this.props.navigation.navigate('AppWithModal')
  }

  _loginWithAuth0 = async () => {
    try {
      const authParams = {
        scope: 'openid profile email',
        audience: `https://${config.auth0Domain}/userinfo`,
        connection: 'Username-Password-Authentication',
      }

      if (Platform.OS === 'android') {
        authParams.prompt = 'login'
      }
      const { accessToken } = await auth0.webAuth.authorize(authParams)
      const { email } = await auth0.auth.userInfo({ token: accessToken })
      this.props.setUser(email)
      this.goToApp()
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    if (this.props.user) {
      return <View />
    }
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
          <Text style={{ fontSize: 16 }}>Yonatan Primes'</Text>
          <Text style={{ fontSize: 26 }}>"Process Goal App"</Text>
        </View>
        <View>
          <Button title='Login' onPress={this._loginWithAuth0} />
        </View>
      </View>
    )
  }
}

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
})

export default connect(({ user }) => console.log({ user }) || { user }, { setUser })(AuthScreen)
