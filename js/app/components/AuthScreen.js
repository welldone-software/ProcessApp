import { AuthSession } from 'expo'
import React from 'react'
import { connect } from 'react-redux'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import jwtDecoder from 'jwt-decode'
import { setUser } from '../store/actions'

const auth0Domain = 'https://welldone-diplomat-questionnaire.eu.auth0.com'

const getAuth0Params = redirectUrl => ({
  client_id: 'jHnzCjTaOmXqEWLaK2R6T9IeaCe9GtEK',
  response_type: 'token',
  audience: `${auth0Domain}/userinfo`,
  scope: 'openid email name',
  redirect_uri: redirectUrl,
})

function toQueryString(params) {
  return `?${Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')}`
}

class AuthScreen extends React.Component {
  componentWillMount() {
    if (this.props.user) {
      this.goToApp()
    }
  }

  goToApp() {
    this.props.navigation.navigate('App')
  }

  _loginWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const authUrl = `${auth0Domain}/authorize${toQueryString(getAuth0Params(redirectUrl))}`
    console.log({ authUrl, redirectUrl })
    const result = await AuthSession.startAsync({ authUrl })

    console.log(result)
    if (result.type === 'success') {
      this.handleParams(result.params)
    }
  }

  handleParams = responseObj => {
    if (responseObj.error) {
      Alert.alert('Error', responseObj.error_description || 'something went wrong while logging in')
      return
    }

    fetch(`${auth0Domain}/userinfo?access_token=${responseObj.access_token}`)
      .then(response => {
        if (response && response.status === 200) {
          return response.json().then(({ email }) => {
            this.props.setUser(email)
            this.goToApp()
          })
        }
        throw new Error((response && response.error_description) || 'Failed to get email during login')
      })
      .catch(err => {
        Alert.alert('Error', err.message)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.user ? (
          <Text style={styles.title}>Hi {this.props.user}!</Text>
        ) : (
          <View>
            <Text style={styles.title}>Example: Auth0 login</Text>
            <Button title='Login with Auth0' onPress={this._loginWithAuth0} />
          </View>
        )}
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
